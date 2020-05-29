import { useWindowSize } from '../../../composables/windowSize';
import { h } from 'vue';
export const ScreenSizeDependentComponent = (components) => (props, context) => {
    const windowSize = useWindowSize();
    if (windowSize.value.isMobile) {
        return h(components.mobile, { ...props, slots: context.slots });
    }
    else if (windowSize.value.isTablet) {
        return h(components.tablet, { ...props, slots: context.slots });
    }
    else if (windowSize.value.isDesktop) {
        return h(components.desktop, { ...props, slots: context.slots });
    }
    else if (windowSize.value.isWidescreen) {
        return h(components.widescreen, { ...props, slots: context.slots });
    }
    else {
        return h(components.fullHD, { ...props, slots: context.slots });
    }
};
//# sourceMappingURL=ScreenSizeDependentComponent.js.map