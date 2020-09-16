import { useWindowSize } from '../../../composables/windowSize';
import { SetupContext, h, ConcreteComponent } from 'vue';

export interface ComponentsByBreakPoint {
  mobile: ConcreteComponent;
  tablet: ConcreteComponent;
  desktop: ConcreteComponent;
  widescreen: ConcreteComponent;
  fullHD: ConcreteComponent;
}

export const ScreenSizeDependentComponent = (components: ComponentsByBreakPoint) => (
  props: any,
  context: SetupContext
) => {
  const windowSize = useWindowSize();
  if (windowSize.value.isMobile) {
    return h(components.mobile, props, context.slots);
  } else if (windowSize.value.isTablet) {
    return h(components.tablet, props, context.slots);
  } else if (windowSize.value.isDesktop) {
    return h(components.desktop, props, context.slots);
  } else if (windowSize.value.isWidescreen) {
    return h(components.widescreen, props, context.slots);
  } else {
    return h(components.fullHD, props, context.slots);
  }
};