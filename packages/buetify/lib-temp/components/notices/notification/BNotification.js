import '../sass/notices.sass';
import { constant } from 'fp-ts/lib/function';
import { useMessage, UseMessagePropsDefinition } from '../../../composables/message';
import { useNoticeController, UseNoticePropsDefinition } from '../../../composables/noticeController';
import { formatTransition } from '../../../composables/transition';
import { Transition, h, defineComponent, shallowRef, withDirectives, vShow } from 'vue';
import { constEmptyArray } from '../../../utils/helpers';
export const BNotificationPropsDefinition = {
    ...UseMessagePropsDefinition,
    ...UseNoticePropsDefinition,
    isNotice: {
        type: Boolean,
        default: true
    }
};
function generateCloseButton(props, messageController, noticeController) {
    return h('button', {
        class: 'delete',
        onClick: props.isNotice ? noticeController.close : messageController.setOff
    });
}
function generateIcon(messageController) {
    return h('div', { class: 'media-left' }, [
        h(messageController.icon.value, { size: messageController.iconSize.value })
    ]);
}
function generateNoticeContent(context, message) {
    return h('div', { class: 'media-content' }, (context.slots.message && context.slots.message()) || h('p', message));
}
function generateNoticeBody(props, context, messageController, noticeController, message) {
    return h('div', { class: 'media' }, props.useIcon && messageController.icon.value
        ? [generateIcon(messageController), generateNoticeContent(context, message)]
        : [generateNoticeContent(context, message)]);
}
function getGenerateNotice(props, context, messageController, noticeController) {
    return (options) => () => {
        const notice = h('article', {
            class: ['notification', options.variant ?? props.variant, options.position ?? props.position]
        }, props.isClosable
            ? [
                generateCloseButton(props, messageController, noticeController),
                generateNoticeBody(props, context, messageController, noticeController, options.message ?? props.message)
            ]
            : [generateNoticeBody(props, context, messageController, noticeController, options.message ?? props.message)]);
        return props.isNotice ? [notice] : [withDirectives(notice, [[vShow, messageController.isOn.value]])];
    };
}
export default defineComponent({
    name: 'b-notification',
    props: BNotificationPropsDefinition,
    setup(props, context) {
        const renderNotification = shallowRef(constant(constEmptyArray));
        const noticeController = useNoticeController(props, renderNotification);
        const messageController = useMessage(props);
        renderNotification.value = getGenerateNotice(props, context, messageController, noticeController);
        return () => props.isNotice
            ? context.slots.default && context.slots.default({ open: noticeController.open, close: noticeController.close })
            : h(Transition, props.transition ? formatTransition(props.transition) : {}, renderNotification.value({}));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQk5vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL25vdGljZXMvbm90aWZpY2F0aW9uL0JOb3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsUUFBUSxFQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFFekQsT0FBTyxFQUFXLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlGLE9BQU8sRUFJTCxtQkFBbUIsRUFDbkIsd0JBQXdCLEVBQ3pCLE1BQU0sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUNMLFVBQVUsRUFFVixDQUFDLEVBRUQsZUFBZSxFQUVmLFVBQVUsRUFDVixjQUFjLEVBRWQsS0FBSyxFQUNOLE1BQU0sS0FBSyxDQUFDO0FBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHO0lBQzFDLEdBQUcseUJBQXlCO0lBQzVCLEdBQUcsd0JBQXdCO0lBQzNCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxPQUE0QjtRQUNsQyxPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQztBQUlGLFNBQVMsbUJBQW1CLENBQzFCLEtBQXlCLEVBQ3pCLGlCQUEwQixFQUMxQixnQkFBa0M7SUFFbEMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQ2pCLEtBQUssRUFBRSxRQUFRO1FBQ2YsT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTTtLQUM1RSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxZQUFZLENB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LGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xHLE9BQU8sR0FBRyxFQUFFLENBQ1YsS0FBSyxDQUFDLFFBQVE7WUFDWixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoSCxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zYXNzL25vdGljZXMuc2Fzcyc7XG5pbXBvcnQgeyBjb25zdGFudCwgRnVuY3Rpb25OIH0gZnJvbSAnZnAtdHMvbGliL2Z1bmN0aW9uJztcbmltcG9ydCB7IElPIH0gZnJvbSAnZnAtdHMvbGliL0lPJztcbmltcG9ydCB7IE1lc3NhZ2UsIHVzZU1lc3NhZ2UsIFVzZU1lc3NhZ2VQcm9wc0RlZmluaXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb21wb3NhYmxlcy9tZXNzYWdlJztcbmltcG9ydCB7XG4gIE5vdGljZUNvbnRyb2xsZXIsXG4gIE9wZW5Ob3RpY2VPcHRpb25zLFxuICBSZW5kZXJOb3RpY2VPcHRpb25zLFxuICB1c2VOb3RpY2VDb250cm9sbGVyLFxuICBVc2VOb3RpY2VQcm9wc0RlZmluaXRpb25cbn0gZnJvbSAnLi4vLi4vLi4vY29tcG9zYWJsZXMvbm90aWNlQ29udHJvbGxlcic7XG5pbXBvcnQgeyBmb3JtYXRUcmFuc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9zYWJsZXMvdHJhbnNpdGlvbic7XG5pbXBvcnQge1xuICBUcmFuc2l0aW9uLFxuICBWTm9kZSxcbiAgaCxcbiAgUHJvcFR5cGUsXG4gIGRlZmluZUNvbXBvbmVudCxcbiAgRXh0cmFjdFByb3BUeXBlcyxcbiAgc2hhbGxvd1JlZixcbiAgd2l0aERpcmVjdGl2ZXMsXG4gIFNldHVwQ29udGV4dCxcbiAgdlNob3dcbn0gZnJvbSAndnVlJztcbmltcG9ydCB7IGNvbnN0RW1wdHlBcnJheSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgQk5vdGlmaWNhdGlvblByb3BzRGVmaW5pdGlvbiA9IHtcbiAgLi4uVXNlTWVzc2FnZVByb3BzRGVmaW5pdGlvbixcbiAgLi4uVXNlTm90aWNlUHJvcHNEZWZpbml0aW9uLFxuICBpc05vdGljZToge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9XG59O1xuXG5leHBvcnQgdHlwZSBCTm90aWZpY2F0aW9uUHJvcHMgPSBFeHRyYWN0UHJvcFR5cGVzPHR5cGVvZiBCTm90aWZpY2F0aW9uUHJvcHNEZWZpbml0aW9uPjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVDbG9zZUJ1dHRvbihcbiAgcHJvcHM6IEJOb3RpZmljYXRpb25Qcm9wcyxcbiAgbWVzc2FnZUNvbnRyb2xsZXI6IE1lc3NhZ2UsXG4gIG5vdGljZUNvbnRyb2xsZXI6IE5vdGljZUNvbnRyb2xsZXJcbik6IFZOb2RlIHtcbiAgcmV0dXJuIGgoJ2J1dHRvbicsIHtcbiAgICBjbGFzczogJ2RlbGV0ZScsXG4gICAgb25DbGljazogcHJvcHMuaXNOb3RpY2UgPyBub3RpY2VDb250cm9sbGVyLmNsb3NlIDogbWVzc2FnZUNvbnRyb2xsZXIuc2V0T2ZmXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUljb24obWVzc2FnZUNvbnRyb2xsZXI6IE1lc3NhZ2UpOiBWTm9kZSB7XG4gIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAnbWVkaWEtbGVmdCcgfSwgW1xuICAgIGgobWVzc2FnZUNvbnRyb2xsZXIuaWNvbi52YWx1ZSBhcyBhbnksIHsgc2l6ZTogbWVzc2FnZUNvbnRyb2xsZXIuaWNvblNpemUudmFsdWUgfSlcbiAgXSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTm90aWNlQ29udGVudChjb250ZXh0OiBTZXR1cENvbnRleHQsIG1lc3NhZ2U/OiBzdHJpbmcpOiBWTm9kZSB7XG4gIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAnbWVkaWEtY29udGVudCcgfSwgKGNvbnRleHQuc2xvdHMubWVzc2FnZSAmJiBjb250ZXh0LnNsb3RzLm1lc3NhZ2UoKSkgfHwgaCgncCcsIG1lc3NhZ2UpKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOb3RpY2VCb2R5KFxuICBwcm9wczogQk5vdGlmaWNhdGlvblByb3BzLFxuICBjb250ZXh0OiBTZXR1cENvbnRleHQsXG4gIG1lc3NhZ2VDb250cm9sbGVyOiBNZXNzYWdlLFxuICBub3RpY2VDb250cm9sbGVyOiBOb3RpY2VDb250cm9sbGVyLFxuICBtZXNzYWdlPzogc3RyaW5nXG4pOiBWTm9kZSB7XG4gIHJldHVybiBoKFxuICAgICdkaXYnLFxuICAgIHsgY2xhc3M6ICdtZWRpYScgfSxcbiAgICBwcm9wcy51c2VJY29uICYmIG1lc3NhZ2VDb250cm9sbGVyLmljb24udmFsdWVcbiAgICAgID8gW2dlbmVyYXRlSWNvbihtZXNzYWdlQ29udHJvbGxlciksIGdlbmVyYXRlTm90aWNlQ29udGVudChjb250ZXh0LCBtZXNzYWdlKV1cbiAgICAgIDogW2dlbmVyYXRlTm90aWNlQ29udGVudChjb250ZXh0LCBtZXNzYWdlKV1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0R2VuZXJhdGVOb3RpY2UoXG4gIHByb3BzOiBCTm90aWZpY2F0aW9uUHJvcHMsXG4gIGNvbnRleHQ6IFNldHVwQ29udGV4dCxcbiAgbWVzc2FnZUNvbnRyb2xsZXI6IE1lc3NhZ2UsXG4gIG5vdGljZUNvbnRyb2xsZXI6IE5vdGljZUNvbnRyb2xsZXJcbikge1xuICByZXR1cm4gKG9wdGlvbnM6IE9wZW5Ob3RpY2VPcHRpb25zKSA9PiAoKSA9PiB7XG4gICAgY29uc3Qgbm90aWNlID0gaChcbiAgICAgICdhcnRpY2xlJyxcbiAgICAgIHtcbiAgICAgICAgY2xhc3M6IFsnbm90aWZpY2F0aW9uJywgb3B0aW9ucy52YXJpYW50ID8/IHByb3BzLnZhcmlhbnQsIG9wdGlvbnMucG9zaXRpb24gPz8gcHJvcHMucG9zaXRpb25dXG4gICAgICB9LFxuICAgICAgcHJvcHMuaXNDbG9zYWJsZVxuICAgICAgICA/IFtcbiAgICAgICAgICAgIGdlbmVyYXRlQ2xvc2VCdXR0b24ocHJvcHMsIG1lc3NhZ2VDb250cm9sbGVyLCBub3RpY2VDb250cm9sbGVyKSxcbiAgICAgICAgICAgIGdlbmVyYXRlTm90aWNlQm9keShwcm9wcywgY29udGV4dCwgbWVzc2FnZUNvbnRyb2xsZXIsIG5vdGljZUNvbnRyb2xsZXIsIG9wdGlvbnMubWVzc2FnZSA/PyBwcm9wcy5tZXNzYWdlKVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbZ2VuZXJhdGVOb3RpY2VCb2R5KHByb3BzLCBjb250ZXh0LCBtZXNzYWdlQ29udHJvbGxlciwgbm90aWNlQ29udHJvbGxlciwgb3B0aW9ucy5tZXNzYWdlID8/IHByb3BzLm1lc3NhZ2UpXVxuICAgICk7XG4gICAgcmV0dXJuIHByb3BzLmlzTm90aWNlID8gW25vdGljZV0gOiBbd2l0aERpcmVjdGl2ZXMobm90aWNlLCBbW3ZTaG93LCBtZXNzYWdlQ29udHJvbGxlci5pc09uLnZhbHVlXV0pXTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ2Itbm90aWZpY2F0aW9uJyxcbiAgcHJvcHM6IEJOb3RpZmljYXRpb25Qcm9wc0RlZmluaXRpb24sXG4gIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgY29uc3QgcmVuZGVyTm90aWZpY2F0aW9uID0gc2hhbGxvd1JlZihjb25zdGFudChjb25zdEVtcHR5QXJyYXkpIGFzIEZ1bmN0aW9uTjxbUmVuZGVyTm90aWNlT3B0aW9uc10sIElPPFZOb2RlW10+Pik7XG4gICAgY29uc3Qgbm90aWNlQ29udHJvbGxlciA9IHVzZU5vdGljZUNvbnRyb2xsZXIocHJvcHMsIHJlbmRlck5vdGlmaWNhdGlvbik7XG4gICAgY29uc3QgbWVzc2FnZUNvbnRyb2xsZXIgPSB1c2VNZXNzYWdlKHByb3BzKTtcbiAgICByZW5kZXJOb3RpZmljYXRpb24udmFsdWUgPSBnZXRHZW5lcmF0ZU5vdGljZShwcm9wcywgY29udGV4dCwgbWVzc2FnZUNvbnRyb2xsZXIsIG5vdGljZUNvbnRyb2xsZXIpO1xuICAgIHJldHVybiAoKSA9PlxuICAgICAgcHJvcHMuaXNOb3RpY2VcbiAgICAgICAgPyBjb250ZXh0LnNsb3RzLmRlZmF1bHQgJiYgY29udGV4dC5zbG90cy5kZWZhdWx0KHsgb3Blbjogbm90aWNlQ29udHJvbGxlci5vcGVuLCBjbG9zZTogbm90aWNlQ29udHJvbGxlci5jbG9zZSB9KVxuICAgICAgICA6IGgoVHJhbnNpdGlvbiwgcHJvcHMudHJhbnNpdGlvbiA/IGZvcm1hdFRyYW5zaXRpb24ocHJvcHMudHJhbnNpdGlvbikgOiB7fSwgcmVuZGVyTm90aWZpY2F0aW9uLnZhbHVlKHt9KSk7XG4gIH1cbn0pO1xuIl19