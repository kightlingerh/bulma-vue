import { constVoid } from 'fp-ts/lib/function';
import { none, some } from 'fp-ts/lib/Option';
import { shallowRef, computed, provide } from 'vue';
import { useToggle } from '../toggle';
import { DEFAULT_BREAK_POINTS } from '../windowSize/provideWindowSize';
export const NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL = Symbol('navigation-drawer-controller');
export const ProvideNavigationDrawerControllerPropsDefinition = {
    isVisible: {
        type: Boolean,
        required: false,
        default: !!window && window.innerWidth > DEFAULT_BREAK_POINTS.value.desktop
    },
    hasPopup: {
        type: Boolean,
        required: false,
        default: true
    }
};
export const DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION = {
    isVisible: shallowRef(none),
    attrs: shallowRef(none),
    listeners: shallowRef(none),
    show: constVoid,
    hide: constVoid,
    toggle: constVoid
};
export function provideNavigationDrawerController(props) {
    const toggle = useToggle(props, 'isVisible');
    const injection = {
        isVisible: computed(() => some(toggle.isOn.value)),
        listeners: computed(() => some(toggle.listeners)),
        attrs: computed(() => some(toggle.attrs.value)),
        show: toggle.setOn,
        hide: toggle.setOff,
        toggle: toggle.toggle
    };
    provide(NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL, injection);
    return injection;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZU5hdmlnYXRpb25EcmF3ZXJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL25hdmlnYXRpb25EcmF3ZXJDb250cm9sbGVyL3Byb3ZpZGVOYXZpZ2F0aW9uRHJhd2VyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLElBQUksRUFBVSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RCxPQUFPLEVBQXlCLFVBQVUsRUFBWSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRXJGLE9BQU8sRUFBZ0MsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBV3ZFLE1BQU0sQ0FBQyxNQUFNLDZDQUE2QyxHQUFHLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXBHLE1BQU0sQ0FBQyxNQUFNLGdEQUFnRCxHQUFHO0lBQzlELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxPQUE0QjtRQUNsQyxRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLE9BQU87S0FDNUU7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsT0FBNEI7UUFDbEMsUUFBUSxFQUFFLEtBQUs7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQztBQU1GLE1BQU0sQ0FBQyxNQUFNLDhDQUE4QyxHQUErQjtJQUN4RixTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQztJQUMzQixLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQztJQUN2QixTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQztJQUMzQixJQUFJLEVBQUUsU0FBUztJQUNmLElBQUksRUFBRSxTQUFTO0lBQ2YsTUFBTSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sVUFBVSxpQ0FBaUMsQ0FBQyxLQUE2QztJQUM3RixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUErQjtRQUM1QyxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELFNBQVMsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSztRQUNsQixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07UUFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO0tBQ3RCLENBQUM7SUFDRixPQUFPLENBQUMsNkNBQTZDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbnN0Vm9pZCB9IGZyb20gJ2ZwLXRzL2xpYi9mdW5jdGlvbic7XG5pbXBvcnQgeyBub25lLCBPcHRpb24sIHNvbWUgfSBmcm9tICdmcC10cy9saWIvT3B0aW9uJztcbmltcG9ydCB7IFJlZiwgRXh0cmFjdFByb3BUeXBlcywgc2hhbGxvd1JlZiwgUHJvcFR5cGUsIGNvbXB1dGVkLCBwcm92aWRlIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IElPIH0gZnJvbSAnZnAtdHMvbGliL0lPJztcbmltcG9ydCB7IFRvZ2dsZUF0dHJzLCBUb2dnbGVMaXN0ZW5lcnMsIHVzZVRvZ2dsZSB9IGZyb20gJy4uL3RvZ2dsZSc7XG5pbXBvcnQgeyBERUZBVUxUX0JSRUFLX1BPSU5UUyB9IGZyb20gJy4uL3dpbmRvd1NpemUvcHJvdmlkZVdpbmRvd1NpemUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5hdmlnYXRpb25EcmF3ZXJDb250cm9sbGVyIHtcbiAgaXNWaXNpYmxlOiBSZWY8T3B0aW9uPGJvb2xlYW4+PjtcbiAgYXR0cnM6IFJlZjxPcHRpb248VG9nZ2xlQXR0cnM+PjtcbiAgbGlzdGVuZXJzOiBSZWY8T3B0aW9uPFRvZ2dsZUxpc3RlbmVycz4+O1xuICBzaG93OiBJTzx2b2lkPjtcbiAgaGlkZTogSU88dm9pZD47XG4gIHRvZ2dsZTogSU88dm9pZD47XG59XG5cbmV4cG9ydCBjb25zdCBOQVZJR0FUSU9OX0RSQVdFUl9DT05UUk9MTEVSX0lOSkVDVElPTl9TWU1CT0wgPSBTeW1ib2woJ25hdmlnYXRpb24tZHJhd2VyLWNvbnRyb2xsZXInKTtcblxuZXhwb3J0IGNvbnN0IFByb3ZpZGVOYXZpZ2F0aW9uRHJhd2VyQ29udHJvbGxlclByb3BzRGVmaW5pdGlvbiA9IHtcbiAgaXNWaXNpYmxlOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdDogISF3aW5kb3cgJiYgd2luZG93LmlubmVyV2lkdGggPiBERUZBVUxUX0JSRUFLX1BPSU5UUy52YWx1ZS5kZXNrdG9wXG4gIH0sXG4gIGhhc1BvcHVwOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9XG59O1xuXG5leHBvcnQgdHlwZSBQcm92aWRlTmF2aWdhdGlvbkRyYXdlckNvbnRyb2xsZXJQcm9wcyA9IEV4dHJhY3RQcm9wVHlwZXM8XG4gIHR5cGVvZiBQcm92aWRlTmF2aWdhdGlvbkRyYXdlckNvbnRyb2xsZXJQcm9wc0RlZmluaXRpb25cbj47XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX05BVklHQVRJT05fRFJBV0VSX0NPTlRST0xMRVJfSU5KRUNUSU9OOiBOYXZpZ2F0aW9uRHJhd2VyQ29udHJvbGxlciA9IHtcbiAgaXNWaXNpYmxlOiBzaGFsbG93UmVmKG5vbmUpLFxuICBhdHRyczogc2hhbGxvd1JlZihub25lKSxcbiAgbGlzdGVuZXJzOiBzaGFsbG93UmVmKG5vbmUpLFxuICBzaG93OiBjb25zdFZvaWQsXG4gIGhpZGU6IGNvbnN0Vm9pZCxcbiAgdG9nZ2xlOiBjb25zdFZvaWRcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTmF2aWdhdGlvbkRyYXdlckNvbnRyb2xsZXIocHJvcHM6IFByb3ZpZGVOYXZpZ2F0aW9uRHJhd2VyQ29udHJvbGxlclByb3BzKSB7XG4gIGNvbnN0IHRvZ2dsZSA9IHVzZVRvZ2dsZShwcm9wcywgJ2lzVmlzaWJsZScpO1xuICBjb25zdCBpbmplY3Rpb246IE5hdmlnYXRpb25EcmF3ZXJDb250cm9sbGVyID0ge1xuICAgIGlzVmlzaWJsZTogY29tcHV0ZWQoKCkgPT4gc29tZSh0b2dnbGUuaXNPbi52YWx1ZSkpLFxuICAgIGxpc3RlbmVyczogY29tcHV0ZWQoKCkgPT4gc29tZSh0b2dnbGUubGlzdGVuZXJzKSksXG4gICAgYXR0cnM6IGNvbXB1dGVkKCgpID0+IHNvbWUodG9nZ2xlLmF0dHJzLnZhbHVlKSksXG4gICAgc2hvdzogdG9nZ2xlLnNldE9uLFxuICAgIGhpZGU6IHRvZ2dsZS5zZXRPZmYsXG4gICAgdG9nZ2xlOiB0b2dnbGUudG9nZ2xlXG4gIH07XG4gIHByb3ZpZGUoTkFWSUdBVElPTl9EUkFXRVJfQ09OVFJPTExFUl9JTkpFQ1RJT05fU1lNQk9MLCBpbmplY3Rpb24pO1xuICByZXR1cm4gaW5qZWN0aW9uO1xufVxuIl19