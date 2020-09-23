import { constant, constVoid } from 'fp-ts/lib/function';
import { h, shallowRef } from 'vue';
import { constEmptyArray } from '../../utils/helpers';
import { DEFAULT_USE_NOTICE_PROPS, useNoticeController, UseNoticePropsDefinition } from '../noticeController';
export const SnackbarPropsDefinition = {
    ...UseNoticePropsDefinition,
    actionText: {
        type: String,
        default: 'OK'
    },
    onAction: {
        type: Function,
        default: constant(constVoid)
    }
};
const DEFAULT_SNACKBAR_PROPS = {
    ...DEFAULT_USE_NOTICE_PROPS,
    actionText: SnackbarPropsDefinition.actionText.default,
    onAction: SnackbarPropsDefinition.onAction.default()
};
function generateMessage(slots, message) {
    return h('p', { class: 'text' }, slots.message ? slots.message() : message);
}
function generateAction(props, slots, noticeController, options) {
    return h('div', {
        class: ['action', options.variant || props.variant, options.position || props.position]
    }, [
        h('button', {
            class: 'button',
            onClick: () => {
                props.onAction();
                noticeController.close();
            }
        }, slots.action ? slots.action() : props.actionText)
    ]);
}
function getGenerateSnackbar(props, slots, noticeController) {
    return (options) => () => {
        return [
            h('article', {
                class: ['snackbar', options.position || props.position],
                role: 'alert'
            }, [
                generateMessage(slots, options.message ?? props.message),
                generateAction(props, slots, noticeController, options)
            ])
        ];
    };
}
export function useSnackbar(props = DEFAULT_SNACKBAR_PROPS, slots = {}) {
    const renderNotification = shallowRef(constant(constEmptyArray));
    const controller = useNoticeController(props, renderNotification);
    renderNotification.value = getGenerateSnackbar(props, slots, controller);
    return controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlU25hY2tiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9zYWJsZXMvc25hY2tiYXIvdXNlU25hY2tiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRSxPQUFPLEVBQW9CLENBQUMsRUFBWSxVQUFVLEVBQWdCLE1BQU0sS0FBSyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsd0JBQXdCLEVBR3hCLG1CQUFtQixFQUNuQix3QkFBd0IsRUFDekIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRztJQUNyQyxHQUFHLHdCQUF3QjtJQUMzQixVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsTUFBMEI7UUFDaEMsT0FBTyxFQUFFLElBQUk7S0FDZDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUE4QjtRQUNwQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQztLQUM3QjtDQUNGLENBQUM7QUFJRixNQUFNLHNCQUFzQixHQUFrQjtJQUM1QyxHQUFHLHdCQUF3QjtJQUMzQixVQUFVLEVBQUUsdUJBQXVCLENBQUMsVUFBVSxDQUFDLE9BQU87SUFDdEQsUUFBUSxFQUFFLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Q0FDckQsQ0FBQztBQUVGLFNBQVMsZUFBZSxDQUFDLEtBQVksRUFBRSxPQUFnQjtJQUNyRCxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQ3JCLEtBQW9CLEVBQ3BCLEtBQVksRUFDWixnQkFBa0MsRUFDbEMsT0FBNEI7SUFFNUIsT0FBTyxDQUFDLENBQ04sS0FBSyxFQUNMO1FBQ0UsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7S0FDeEYsRUFDRDtRQUNFLENBQUMsQ0FDQyxRQUFRLEVBQ1I7WUFDRSxLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ1osS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQixDQUFDO1NBQ0YsRUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQ2pEO0tBQ0YsQ0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsS0FBb0IsRUFBRSxLQUFZLEVBQUUsZ0JBQWtDO0lBQ2pHLE9BQU8sQ0FBQyxPQUE0QixFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUU7UUFDNUMsT0FBTztZQUNMLENBQUMsQ0FDQyxTQUFTLEVBQ1Q7Z0JBQ0UsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztnQkFDdkQsSUFBSSxFQUFFLE9BQU87YUFDZCxFQUNEO2dCQUNFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUN4RCxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLENBQUM7YUFDeEQsQ0FDRjtTQUNGLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUF1QixzQkFBc0IsRUFBRSxRQUFlLEVBQUU7SUFDMUYsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBa0QsQ0FBQyxDQUFDO0lBQ2xILE1BQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xFLGtCQUFrQixDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pFLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25zdGFudCwgY29uc3RWb2lkLCBGdW5jdGlvbk4gfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nO1xuaW1wb3J0IHsgSU8gfSBmcm9tICdmcC10cy9saWIvSU8nO1xuaW1wb3J0IHsgRXh0cmFjdFByb3BUeXBlcywgaCwgUHJvcFR5cGUsIHNoYWxsb3dSZWYsIFZOb2RlLCBTbG90cyB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBjb25zdEVtcHR5QXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7XG4gIERFRkFVTFRfVVNFX05PVElDRV9QUk9QUyxcbiAgTm90aWNlQ29udHJvbGxlcixcbiAgUmVuZGVyTm90aWNlT3B0aW9ucyxcbiAgdXNlTm90aWNlQ29udHJvbGxlcixcbiAgVXNlTm90aWNlUHJvcHNEZWZpbml0aW9uXG59IGZyb20gJy4uL25vdGljZUNvbnRyb2xsZXInO1xuXG5leHBvcnQgY29uc3QgU25hY2tiYXJQcm9wc0RlZmluaXRpb24gPSB7XG4gIC4uLlVzZU5vdGljZVByb3BzRGVmaW5pdGlvbixcbiAgYWN0aW9uVGV4dDoge1xuICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTxzdHJpbmc+LFxuICAgIGRlZmF1bHQ6ICdPSydcbiAgfSxcbiAgb25BY3Rpb246IHtcbiAgICB0eXBlOiBGdW5jdGlvbiBhcyBQcm9wVHlwZTxJTzx2b2lkPj4sXG4gICAgZGVmYXVsdDogY29uc3RhbnQoY29uc3RWb2lkKVxuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFNuYWNrYmFyUHJvcHMgZXh0ZW5kcyBFeHRyYWN0UHJvcFR5cGVzPHR5cGVvZiBTbmFja2JhclByb3BzRGVmaW5pdGlvbj4ge31cblxuY29uc3QgREVGQVVMVF9TTkFDS0JBUl9QUk9QUzogU25hY2tiYXJQcm9wcyA9IHtcbiAgLi4uREVGQVVMVF9VU0VfTk9USUNFX1BST1BTLFxuICBhY3Rpb25UZXh0OiBTbmFja2JhclByb3BzRGVmaW5pdGlvbi5hY3Rpb25UZXh0LmRlZmF1bHQsXG4gIG9uQWN0aW9uOiBTbmFja2JhclByb3BzRGVmaW5pdGlvbi5vbkFjdGlvbi5kZWZhdWx0KClcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTWVzc2FnZShzbG90czogU2xvdHMsIG1lc3NhZ2U/OiBzdHJpbmcpOiBWTm9kZSB7XG4gIHJldHVybiBoKCdwJywgeyBjbGFzczogJ3RleHQnIH0sIHNsb3RzLm1lc3NhZ2UgPyBzbG90cy5tZXNzYWdlKCkgOiBtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVBY3Rpb24oXG4gIHByb3BzOiBTbmFja2JhclByb3BzLFxuICBzbG90czogU2xvdHMsXG4gIG5vdGljZUNvbnRyb2xsZXI6IE5vdGljZUNvbnRyb2xsZXIsXG4gIG9wdGlvbnM6IFJlbmRlck5vdGljZU9wdGlvbnNcbik6IFZOb2RlIHtcbiAgcmV0dXJuIGgoXG4gICAgJ2RpdicsXG4gICAge1xuICAgICAgY2xhc3M6IFsnYWN0aW9uJywgb3B0aW9ucy52YXJpYW50IHx8IHByb3BzLnZhcmlhbnQsIG9wdGlvbnMucG9zaXRpb24gfHwgcHJvcHMucG9zaXRpb25dXG4gICAgfSxcbiAgICBbXG4gICAgICBoKFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiAnYnV0dG9uJyxcbiAgICAgICAgICBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBwcm9wcy5vbkFjdGlvbigpO1xuICAgICAgICAgICAgbm90aWNlQ29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2xvdHMuYWN0aW9uID8gc2xvdHMuYWN0aW9uKCkgOiBwcm9wcy5hY3Rpb25UZXh0XG4gICAgICApXG4gICAgXVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRHZW5lcmF0ZVNuYWNrYmFyKHByb3BzOiBTbmFja2JhclByb3BzLCBzbG90czogU2xvdHMsIG5vdGljZUNvbnRyb2xsZXI6IE5vdGljZUNvbnRyb2xsZXIpIHtcbiAgcmV0dXJuIChvcHRpb25zOiBSZW5kZXJOb3RpY2VPcHRpb25zKSA9PiAoKSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGgoXG4gICAgICAgICdhcnRpY2xlJyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBbJ3NuYWNrYmFyJywgb3B0aW9ucy5wb3NpdGlvbiB8fCBwcm9wcy5wb3NpdGlvbl0sXG4gICAgICAgICAgcm9sZTogJ2FsZXJ0J1xuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgZ2VuZXJhdGVNZXNzYWdlKHNsb3RzLCBvcHRpb25zLm1lc3NhZ2UgPz8gcHJvcHMubWVzc2FnZSksXG4gICAgICAgICAgZ2VuZXJhdGVBY3Rpb24ocHJvcHMsIHNsb3RzLCBub3RpY2VDb250cm9sbGVyLCBvcHRpb25zKVxuICAgICAgICBdXG4gICAgICApXG4gICAgXTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVNuYWNrYmFyKHByb3BzOiBTbmFja2JhclByb3BzID0gREVGQVVMVF9TTkFDS0JBUl9QUk9QUywgc2xvdHM6IFNsb3RzID0ge30pIHtcbiAgY29uc3QgcmVuZGVyTm90aWZpY2F0aW9uID0gc2hhbGxvd1JlZihjb25zdGFudChjb25zdEVtcHR5QXJyYXkpIGFzIEZ1bmN0aW9uTjxbUmVuZGVyTm90aWNlT3B0aW9uc10sIElPPFZOb2RlW10+Pik7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSB1c2VOb3RpY2VDb250cm9sbGVyKHByb3BzLCByZW5kZXJOb3RpZmljYXRpb24pO1xuICByZW5kZXJOb3RpZmljYXRpb24udmFsdWUgPSBnZXRHZW5lcmF0ZVNuYWNrYmFyKHByb3BzLCBzbG90cywgY29udHJvbGxlcik7XG4gIHJldHVybiBjb250cm9sbGVyO1xufVxuIl19