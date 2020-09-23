import { watch, computed, shallowRef, toRef } from 'vue';
import { isEnterEvent } from '../../utils/eventHelpers';
export function getUseTogglePropsDefinition(statusName) {
    return {
        [statusName]: {
            type: Boolean,
            default: false
        },
        hasPopup: {
            type: Boolean,
            default: false
        },
        onToggle: {
            type: Function,
            required: false
        },
        onSetOn: {
            type: Function,
            required: false
        },
        onSetOff: {
            type: Function,
            required: false
        }
    };
}
export function getToggleAttrs(status, hasPopup) {
    return computed(() => ({
        tabindex: 0,
        role: 'button',
        type: 'button',
        'aria-pressed': status.value,
        'aria-expanded': status.value,
        ...(hasPopup.value ? { 'aria-haspopup': true } : {})
    }));
}
function getListeners(toggle) {
    return {
        onClick: toggle,
        onKeydown: (e) => {
            if (isEnterEvent(e)) {
                e.preventDefault();
                toggle();
            }
        }
    };
}
export function useToggle(props, statusName) {
    const internalStatus = shallowRef(props[statusName]);
    watch(() => props[statusName], status => {
        internalStatus.value = status;
    });
    watch(internalStatus, (value, oldValue) => {
        if (value !== oldValue && props.onToggle) {
            props.onToggle(value);
        }
        if (value && oldValue === false && props.onSetOn) {
            props.onSetOn();
        }
        if (value === false && oldValue === true && props.onSetOff) {
            props.onSetOff();
        }
    });
    function setOn() {
        internalStatus.value = true;
    }
    function setOff() {
        internalStatus.value = false;
    }
    function toggle() {
        internalStatus.value = !internalStatus.value;
    }
    const attrs = getToggleAttrs(internalStatus, toRef(props, 'hasPopup'));
    const listeners = getListeners(toggle);
    return {
        isOn: internalStatus,
        isOff: computed(() => internalStatus.value === false),
        attrs,
        listeners,
        setOn,
        setOff,
        toggle
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlVG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL3RvZ2dsZS91c2VUb2dnbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWlCLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDeEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXhELE1BQU0sVUFBVSwyQkFBMkIsQ0FBbUIsVUFBYTtJQUN6RSxPQUFPO1FBQ0wsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNaLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxRQUFnRDtZQUN0RCxRQUFRLEVBQUUsS0FBSztTQUNoQjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUE4QjtZQUNwQyxRQUFRLEVBQUUsS0FBSztTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxRQUE4QjtZQUNwQyxRQUFRLEVBQUUsS0FBSztTQUNoQjtLQUM2QixDQUFDO0FBQ25DLENBQUM7QUFnQ0QsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFvQixFQUFFLFFBQXNCO0lBQ3pFLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckIsUUFBUSxFQUFFLENBQUM7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxRQUFRO1FBQ2QsY0FBYyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1FBQzVCLGVBQWUsRUFBRSxNQUFNLENBQUMsS0FBSztRQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNOLENBQUM7QUFJRCxTQUFTLFlBQVksQ0FBQyxNQUFnQjtJQUNwQyxPQUFPO1FBQ0wsT0FBTyxFQUFFLE1BQU07UUFDZixTQUFTLEVBQUUsQ0FBQyxDQUFnQixFQUFFLEVBQUU7WUFDOUIsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25CLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsTUFBTSxFQUFFLENBQUM7YUFDVjtRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUlELE1BQU0sVUFBVSxTQUFTLENBQ3ZCLEtBRUcsRUFDSCxVQUFhO0lBRWIsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQVksQ0FBQyxDQUFDO0lBQ2hFLEtBQUssQ0FDSCxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQ3ZCLE1BQU0sQ0FBQyxFQUFFO1FBQ1AsY0FBYyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDaEMsQ0FBQyxDQUNGLENBQUM7SUFDRixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ3hDLElBQUksS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3hDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFJLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDaEQsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUMxRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILFNBQVMsS0FBSztRQUNaLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRCxTQUFTLE1BQU07UUFDYixjQUFjLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBQ0QsU0FBUyxNQUFNO1FBQ2IsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDL0MsQ0FBQztJQUNELE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxPQUFPO1FBQ0wsSUFBSSxFQUFFLGNBQWM7UUFDcEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztRQUNyRCxLQUFLO1FBQ0wsU0FBUztRQUNULEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtLQUNQLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25OIH0gZnJvbSAnZnAtdHMvbGliL2Z1bmN0aW9uJztcbmltcG9ydCB7IElPIH0gZnJvbSAnZnAtdHMvbGliL0lPJztcbmltcG9ydCB7IHdhdGNoLCBjb21wdXRlZCwgUmVmLCBQcm9wVHlwZSwgc2hhbGxvd1JlZiwgdG9SZWYgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgaXNFbnRlckV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnRIZWxwZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZVRvZ2dsZVByb3BzRGVmaW5pdGlvbjxLIGV4dGVuZHMgc3RyaW5nPihzdGF0dXNOYW1lOiBLKTogVXNlVG9nZ2xlUHJvcHNEZWZpbml0aW9uPEs+IHtcbiAgcmV0dXJuIHtcbiAgICBbc3RhdHVzTmFtZV06IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgaGFzUG9wdXA6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgb25Ub2dnbGU6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uIGFzIFByb3BUeXBlPEZ1bmN0aW9uTjxbYm9vbGVhbl0sIHZvaWQ+PixcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH0sXG4gICAgb25TZXRPbjoge1xuICAgICAgdHlwZTogRnVuY3Rpb24gYXMgUHJvcFR5cGU8SU88dm9pZD4+LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBvblNldE9mZjoge1xuICAgICAgdHlwZTogRnVuY3Rpb24gYXMgUHJvcFR5cGU8SU88dm9pZD4+LFxuICAgICAgcmVxdWlyZWQ6IGZhbHNlXG4gICAgfVxuICB9IGFzIFVzZVRvZ2dsZVByb3BzRGVmaW5pdGlvbjxLPjtcbn1cblxuZXhwb3J0IHR5cGUgVXNlVG9nZ2xlUHJvcHNEZWZpbml0aW9uPEsgZXh0ZW5kcyBzdHJpbmc+ID0ge1xuICBvblRvZ2dsZToge1xuICAgIHR5cGU6IFByb3BUeXBlPEZ1bmN0aW9uTjxbYm9vbGVhbl0sIHZvaWQ+PjtcbiAgICByZXF1aXJlZDogZmFsc2U7XG4gIH07XG4gIG9uU2V0T246IHtcbiAgICB0eXBlOiBQcm9wVHlwZTxJTzx2b2lkPj47XG4gICAgcmVxdWlyZWQ6IGZhbHNlO1xuICB9O1xuICBvblNldE9mZjoge1xuICAgIHR5cGU6IFByb3BUeXBlPElPPHZvaWQ+PjtcbiAgICByZXF1aXJlZDogZmFsc2U7XG4gIH07XG59ICYgUmVjb3JkPFxuICBLLFxuICB7XG4gICAgdHlwZTogUHJvcFR5cGU8Ym9vbGVhbj47XG4gICAgZGVmYXVsdDogYm9vbGVhbjtcbiAgfVxuPiAmXG4gIFJlY29yZDxcbiAgICAnaGFzUG9wdXAnLFxuICAgIHtcbiAgICAgIHR5cGU6IFByb3BUeXBlPGJvb2xlYW4+O1xuICAgICAgZGVmYXVsdDogYm9vbGVhbjtcbiAgICB9XG4gID47XG5cbmV4cG9ydCB0eXBlIFVzZVRvZ2dsZVByb3BzPEsgZXh0ZW5kcyBzdHJpbmc+ID0gUmVjb3JkPEssIGJvb2xlYW4+ICYgUmVjb3JkPCdoYXNQb3B1cCcsIGJvb2xlYW4+O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9nZ2xlQXR0cnMoc3RhdHVzOiBSZWY8Ym9vbGVhbj4sIGhhc1BvcHVwOiBSZWY8Ym9vbGVhbj4pIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdGFiaW5kZXg6IDAsXG4gICAgcm9sZTogJ2J1dHRvbicsXG4gICAgdHlwZTogJ2J1dHRvbicsXG4gICAgJ2FyaWEtcHJlc3NlZCc6IHN0YXR1cy52YWx1ZSxcbiAgICAnYXJpYS1leHBhbmRlZCc6IHN0YXR1cy52YWx1ZSxcbiAgICAuLi4oaGFzUG9wdXAudmFsdWUgPyB7ICdhcmlhLWhhc3BvcHVwJzogdHJ1ZSB9IDoge30pXG4gIH0pKTtcbn1cblxuZXhwb3J0IHR5cGUgVG9nZ2xlQXR0cnMgPSBSZXR1cm5UeXBlPHR5cGVvZiBnZXRUb2dnbGVBdHRycz4gZXh0ZW5kcyBSZWY8aW5mZXIgQT4gPyBBIDogbmV2ZXI7XG5cbmZ1bmN0aW9uIGdldExpc3RlbmVycyh0b2dnbGU6IElPPHZvaWQ+KSB7XG4gIHJldHVybiB7XG4gICAgb25DbGljazogdG9nZ2xlLFxuICAgIG9uS2V5ZG93bjogKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGlmIChpc0VudGVyRXZlbnQoZSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFRvZ2dsZUxpc3RlbmVycyA9IFJldHVyblR5cGU8dHlwZW9mIGdldExpc3RlbmVycz47XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VUb2dnbGU8SyBleHRlbmRzIHN0cmluZz4oXG4gIHByb3BzOiB7IG9uVG9nZ2xlPzogRnVuY3Rpb25OPFtib29sZWFuXSwgdm9pZD47IG9uU2V0T24/OiBJTzx2b2lkPjsgb25TZXRPZmY/OiBJTzx2b2lkPiB9ICYgUmVjb3JkPEssIGJvb2xlYW4+ICYge1xuICAgICAgaGFzUG9wdXA6IGJvb2xlYW47XG4gICAgfSxcbiAgc3RhdHVzTmFtZTogS1xuKSB7XG4gIGNvbnN0IGludGVybmFsU3RhdHVzID0gc2hhbGxvd1JlZihwcm9wc1tzdGF0dXNOYW1lXSBhcyBib29sZWFuKTtcbiAgd2F0Y2goXG4gICAgKCkgPT4gcHJvcHNbc3RhdHVzTmFtZV0sXG4gICAgc3RhdHVzID0+IHtcbiAgICAgIGludGVybmFsU3RhdHVzLnZhbHVlID0gc3RhdHVzO1xuICAgIH1cbiAgKTtcbiAgd2F0Y2goaW50ZXJuYWxTdGF0dXMsICh2YWx1ZSwgb2xkVmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlICYmIHByb3BzLm9uVG9nZ2xlKSB7XG4gICAgICBwcm9wcy5vblRvZ2dsZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAmJiBvbGRWYWx1ZSA9PT0gZmFsc2UgJiYgcHJvcHMub25TZXRPbikge1xuICAgICAgcHJvcHMub25TZXRPbigpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT09IGZhbHNlICYmIG9sZFZhbHVlID09PSB0cnVlICYmIHByb3BzLm9uU2V0T2ZmKSB7XG4gICAgICBwcm9wcy5vblNldE9mZigpO1xuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIHNldE9uKCkge1xuICAgIGludGVybmFsU3RhdHVzLnZhbHVlID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBzZXRPZmYoKSB7XG4gICAgaW50ZXJuYWxTdGF0dXMudmFsdWUgPSBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgaW50ZXJuYWxTdGF0dXMudmFsdWUgPSAhaW50ZXJuYWxTdGF0dXMudmFsdWU7XG4gIH1cbiAgY29uc3QgYXR0cnMgPSBnZXRUb2dnbGVBdHRycyhpbnRlcm5hbFN0YXR1cywgdG9SZWYocHJvcHMsICdoYXNQb3B1cCcpKTtcbiAgY29uc3QgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRvZ2dsZSk7XG4gIHJldHVybiB7XG4gICAgaXNPbjogaW50ZXJuYWxTdGF0dXMsXG4gICAgaXNPZmY6IGNvbXB1dGVkKCgpID0+IGludGVybmFsU3RhdHVzLnZhbHVlID09PSBmYWxzZSksXG4gICAgYXR0cnMsXG4gICAgbGlzdGVuZXJzLFxuICAgIHNldE9uLFxuICAgIHNldE9mZixcbiAgICB0b2dnbGVcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVG9nZ2xlID0gUmV0dXJuVHlwZTx0eXBlb2YgdXNlVG9nZ2xlPjtcbiJdfQ==