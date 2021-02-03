import '../../sass/helpers/animations.sass';
import './app.sass';
import { toUndefined } from 'fp-ts/lib/Option';
import {
  defineComponent,
  shallowRef,
  h,
  Slots,
  Ref,
  vShow,
  withDirectives,
  VNode,
  onMounted,
  onUnmounted,
  watch,
  onBeforeMount
} from 'vue';
import { provideNoticeController, ShowNoticeOptions } from '../../composables/noticeController';
import { providePopupController, ShowPopupOptions } from '../../composables/popupController';
import { provideTheme, ProvideThemePropDefinitions } from '../../composables/theme';
import { formatTransition } from '../../composables/transition';
import { provideWindowSize, ProvideWindowSizePropsDefinition } from '../../composables/windowSize';
import { TransitionClasses } from '../../types/Transition';
import BSidebar from '../sidebar/BSidebar';
import BNoticeContainer, { NoticeContainer, NoticeOptions } from '../notices/noticeContainer/BNoticeContainer';
import BPopupContainer, { PopupContainer } from '../popupContainer/BPopupContainer';
import {
  provideSidebarController,
  ProvideSidebarControllerPropsDefinition,
  SidebarController
} from '../sidebar/composables';

const DEFAULT_TRANSITION: TransitionClasses = { name: 'fade' };

function generateNoticeContainer(placement: 'top' | 'bottom', ref: Ref<NoticeContainer>) {
  return h(BNoticeContainer, { ref, class: placement === 'top' ? 'notices-is-top' : 'notices-is-bottom' });
}

function generatePopupContainer(ref: Ref<PopupContainer>) {
  return h(BPopupContainer, { ref });
}

function generateSidebarSlot(
  slots: Slots,
  hasHeader: boolean,
  currentRoute: unknown | undefined,
  sidebar: SidebarController
) {
  return h(
    BSidebar,
    {
      currentRoute
    },
    () => slots.sidebar && slots.sidebar(sidebar)
  );
}

function generateBodyContent(
  slots: Slots,
  hasNavigationDrawer: boolean,
  sidebar: SidebarController,
  currentRoute: unknown | undefined
) {
  const nodes: Array<VNode | VNode[]> = [];
  if (slots.header) {
    const header = slots.header(sidebar);
    if (header) nodes.push(header);
  }
  nodes.push(
    h(
      'div',
      { class: 'b-app-body-content' },
      hasNavigationDrawer
        ? [
            withDirectives(generateSidebarSlot(slots, !!slots.header, currentRoute, sidebar), [
              [vShow, sidebar.isVisible.value]
            ]),
            h('div', { class: 'b-app-content' }, slots.default && slots.default(sidebar))
          ]
        : [h('div', { class: 'b-app-content' }, slots.default && slots.default(sidebar))]
    )
  );
  return nodes;
}

const updateVisualHeight = () =>
  requestAnimationFrame(function updateVisualHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  });

export default defineComponent({
  name: 'b-app',
  props: {
    ...ProvideThemePropDefinitions,
    ...ProvideWindowSizePropsDefinition,
    ...ProvideSidebarControllerPropsDefinition
  },
  setup(props, { slots }) {
    const popup = shallowRef((null as unknown) as PopupContainer);
    const top = shallowRef((null as unknown) as NoticeContainer);
    const bottom = shallowRef((null as unknown) as NoticeContainer);

    function showNotice(params: ShowNoticeOptions) {
      const options: NoticeOptions = {
        ...params,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      };
      return params.placement === 'top' ? top.value.showNotice(options) : bottom.value.showNotice(options);
    }

    function showPopup(params: ShowPopupOptions) {
      return popup.value.showPopup({
        render: params.render,
        transition: params.transition ? formatTransition(params.transition) : DEFAULT_TRANSITION
      });
    }
    const { currentTheme } = provideTheme(props);
    provideNoticeController(showNotice);
    providePopupController(showPopup);
    const { windowSize } = provideWindowSize(props);
    const sidebarController = provideSidebarController(props);

    onBeforeMount(() => {
      window.addEventListener('resize', updateVisualHeight);
      window.addEventListener('orientationchange', updateVisualHeight);
      updateVisualHeight();
    });

    onMounted(() => {
      if (document && slots.sidebar !== undefined && !windowSize.value.isTouch) {
        document.documentElement.classList.add('overflow-hidden');
      }
    });

    onUnmounted(() => {
      if (document) {
        document.documentElement.classList.remove('overflow-hidden');
      }
      window.removeEventListener('resize', updateVisualHeight);
      window.removeEventListener('orientationchange', updateVisualHeight);
    });

    watch(
      () => windowSize.value.isTouch,
      (newVal, oldVal) => {
        if (document && slots.sidebar !== undefined && newVal) {
          document.documentElement.classList.remove('overflow-hidden');
        } else if (document && newVal === false) {
          document.documentElement.classList.add('overflow-hidden');
        }
      }
    );

    return () => {
      const hasNavigationDrawer = !!slots['sidebar'];
      const nodes = [
        generateNoticeContainer('top', top),
        generateNoticeContainer('bottom', bottom),
        generatePopupContainer(popup)
      ];

      nodes.unshift(
        h(
          'div',
          {
            class: [
              'b-app-container',
              {
                'has-navigation-drawer': hasNavigationDrawer && sidebarController.isVisible.value,
                'has-header': !!slots.header
              }
            ]
          },
          generateBodyContent(slots, hasNavigationDrawer, sidebarController, props.currentRoute)
        )
      );

      return h('div', { class: ['b-app', toUndefined(currentTheme.value)] }, nodes);
    };
  }
});
