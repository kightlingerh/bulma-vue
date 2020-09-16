import './menu.sass';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import VerticalExpandTransition from '../../transitions/verticalExpandTransition';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BMenuList from './BMenuList';
import { withDirectives, vShow, defineComponent, h, PropType } from 'vue';

export default defineComponent({
  name: 'b-menu-group',
  props: {
    ...getUseTogglePropsDefinition('isExpanded'),
    menuLabelClass: {
      type: String as PropType<Classes>,
      default: ''
    },
    menuListClass: {
      type: String as PropType<Classes>,
      default: ''
    }
  },
  setup(props, { slots }) {
    const toggle = useToggle(props, 'isExpanded');
    return () =>
      h('section', [
        h(
          'button',
          {
            class: mergeClasses(
              'is-flex flex-direction-row justify-content-space-between align-items-center is-fullwidth padding-bottom-size-8',
              props.menuLabelClass
            ),
            ...toggle.listeners,
            ...toggle.attrs.value
          },
          [
            slots['menu-label'] && slots['menu-label'](),
            h(VerticalExpansionIcon, {
              isExpanded: toggle.isOn.value
            })
          ]
        ),
        h(VerticalExpandTransition, undefined, () => [
          withDirectives(
            h(
              BMenuList,
              {
                class: [props.menuListClass, 'expand-vertical-transition'],
                'aria-hidden': toggle.isOff.value
              },
              slots.default
            ),
            [[vShow, toggle.isOn.value]]
          )
        ])
      ]);
  }
});