import './loading.sass';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { useToggle } from '../../composables/toggle';
import { isEscEvent } from '../../utils/eventHelpers';
import { h, defineComponent, shallowRef, Transition, onMounted, onUnmounted } from 'vue';
import { constEmptyArray } from '../../utils/helpers';
export const BLoadingPropsDefinition = {
    ...UsePopupControllerPropsDefinition,
    isFullscreen: {
        type: Boolean,
        default: false
    },
    canCancel: {
        type: Boolean,
        default: false
    }
};
function getGenerateModal(onClick) {
    return () => [
        h('div', { class: 'b-loading-overlay is-active is-fullscreen' }, [
            h('div', {
                class: 'loading-background',
                onClick
            }),
            h('div', { class: 'loading-icon' })
        ])
    ];
}
export default defineComponent({
    name: 'b-loading',
    props: BLoadingPropsDefinition,
    setup(props, { slots }) {
        if (props.isFullscreen) {
            const generateLoadingPopup = shallowRef(constEmptyArray);
            const popup = usePopupController(props, generateLoadingPopup);
            const onClick = () => {
                if (props.canCancel && popup.isOpen.value) {
                    popup.close();
                }
            };
            const onKeyup = (e) => {
                if (isEscEvent(e)) {
                    onClick();
                }
            };
            onMounted(() => {
                if (typeof window !== 'undefined') {
                    document.addEventListener('keyup', onKeyup);
                }
            });
            onUnmounted(() => {
                if (typeof window !== 'undefined') {
                    document.removeEventListener('keyup', onKeyup);
                }
            });
            generateLoadingPopup.value = getGenerateModal(onClick);
            return () => (slots.trigger ? slots.trigger(popup) : []);
        }
        else {
            const toggle = useToggle(props, 'isActive');
            const onClick = () => {
                if (props.canCancel && toggle.isOn.value) {
                    toggle.setOff();
                }
            };
            const render = getGenerateModal(onClick);
            return () => h(Transition, { name: props.transition }, toggle.isOn.value && render());
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQkxvYWRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9sb2FkaW5nL0JMb2FkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGlDQUFpQyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQVMsQ0FBQyxFQUFFLGVBQWUsRUFBb0IsVUFBVSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ2xILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRztJQUNyQyxHQUFHLGlDQUFpQztJQUNwQyxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBSUYsU0FBUyxnQkFBZ0IsQ0FBQyxPQUFpQjtJQUN6QyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSwyQ0FBMkMsRUFBRSxFQUFFO1lBQy9ELENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLG9CQUFvQjtnQkFDM0IsT0FBTzthQUNSLENBQUM7WUFDRixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDO1NBQ3BDLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsZUFBZSxDQUFDO0lBQzdCLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRTtRQUNwQixJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSxvQkFBb0IsR0FBRyxVQUFVLENBQUMsZUFBOEIsQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlELE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUN6QyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2Y7WUFDSCxDQUFDLENBQUM7WUFDRixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQWdCLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2pCLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDYixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtvQkFDakMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDN0M7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7b0JBQ2pDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ2hEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO2FBQU07WUFDTCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUN4QyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM5RjtJQUNILENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vbG9hZGluZy5zYXNzJztcbmltcG9ydCB7IElPIH0gZnJvbSAnZnAtdHMvbGliL0lPJztcbmltcG9ydCB7IHVzZVBvcHVwQ29udHJvbGxlciwgVXNlUG9wdXBDb250cm9sbGVyUHJvcHNEZWZpbml0aW9uIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcG9wdXBDb250cm9sbGVyJztcbmltcG9ydCB7IHVzZVRvZ2dsZSB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3RvZ2dsZSc7XG5pbXBvcnQgeyBpc0VzY0V2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnRIZWxwZXJzJztcbmltcG9ydCB7IFZOb2RlLCBoLCBkZWZpbmVDb21wb25lbnQsIEV4dHJhY3RQcm9wVHlwZXMsIHNoYWxsb3dSZWYsIFRyYW5zaXRpb24sIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgY29uc3RFbXB0eUFycmF5IH0gZnJvbSAnLi4vLi4vdXRpbHMvaGVscGVycyc7XG5cbmV4cG9ydCBjb25zdCBCTG9hZGluZ1Byb3BzRGVmaW5pdGlvbiA9IHtcbiAgLi4uVXNlUG9wdXBDb250cm9sbGVyUHJvcHNEZWZpbml0aW9uLFxuICBpc0Z1bGxzY3JlZW46IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGNhbkNhbmNlbDoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogZmFsc2VcbiAgfVxufTtcblxuZXhwb3J0IHR5cGUgQkxvYWRpbmdQcm9wcyA9IEV4dHJhY3RQcm9wVHlwZXM8dHlwZW9mIEJMb2FkaW5nUHJvcHNEZWZpbml0aW9uPjtcblxuZnVuY3Rpb24gZ2V0R2VuZXJhdGVNb2RhbChvbkNsaWNrOiBJTzx2b2lkPikge1xuICByZXR1cm4gKCkgPT4gW1xuICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdiLWxvYWRpbmctb3ZlcmxheSBpcy1hY3RpdmUgaXMtZnVsbHNjcmVlbicgfSwgW1xuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ2xvYWRpbmctYmFja2dyb3VuZCcsXG4gICAgICAgIG9uQ2xpY2tcbiAgICAgIH0pLFxuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ2xvYWRpbmctaWNvbicgfSlcbiAgICBdKVxuICBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnYi1sb2FkaW5nJyxcbiAgcHJvcHM6IEJMb2FkaW5nUHJvcHNEZWZpbml0aW9uLFxuICBzZXR1cChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgaWYgKHByb3BzLmlzRnVsbHNjcmVlbikge1xuICAgICAgY29uc3QgZ2VuZXJhdGVMb2FkaW5nUG9wdXAgPSBzaGFsbG93UmVmKGNvbnN0RW1wdHlBcnJheSBhcyBJTzxWTm9kZVtdPik7XG4gICAgICBjb25zdCBwb3B1cCA9IHVzZVBvcHVwQ29udHJvbGxlcihwcm9wcywgZ2VuZXJhdGVMb2FkaW5nUG9wdXApO1xuICAgICAgY29uc3Qgb25DbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLmNhbkNhbmNlbCAmJiBwb3B1cC5pc09wZW4udmFsdWUpIHtcbiAgICAgICAgICBwb3B1cC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgb25LZXl1cCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChpc0VzY0V2ZW50KGUpKSB7XG4gICAgICAgICAgb25DbGljaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleXVwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBvblVubW91bnRlZCgoKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXl1cCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZ2VuZXJhdGVMb2FkaW5nUG9wdXAudmFsdWUgPSBnZXRHZW5lcmF0ZU1vZGFsKG9uQ2xpY2spO1xuICAgICAgcmV0dXJuICgpID0+IChzbG90cy50cmlnZ2VyID8gc2xvdHMudHJpZ2dlcihwb3B1cCkgOiBbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvZ2dsZSA9IHVzZVRvZ2dsZShwcm9wcywgJ2lzQWN0aXZlJyk7XG4gICAgICBjb25zdCBvbkNsaWNrID0gKCkgPT4ge1xuICAgICAgICBpZiAocHJvcHMuY2FuQ2FuY2VsICYmIHRvZ2dsZS5pc09uLnZhbHVlKSB7XG4gICAgICAgICAgdG9nZ2xlLnNldE9mZigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgcmVuZGVyID0gZ2V0R2VuZXJhdGVNb2RhbChvbkNsaWNrKTtcbiAgICAgIHJldHVybiAoKSA9PiBoKFRyYW5zaXRpb24gYXMgYW55LCB7IG5hbWU6IHByb3BzLnRyYW5zaXRpb24gfSwgdG9nZ2xlLmlzT24udmFsdWUgJiYgcmVuZGVyKCkpO1xuICAgIH1cbiAgfVxufSk7XG4iXX0=