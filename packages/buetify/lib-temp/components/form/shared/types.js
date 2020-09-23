import { defineAsyncComponent } from 'vue';
export const DEFAULT_INPUT_ICONS = {
    isSuccess: defineAsyncComponent(() => import('../../icons/check')),
    isDanger: defineAsyncComponent(() => import('../../icons/exclamationCircle')),
    isInfo: defineAsyncComponent(() => import('../../icons/infoCircle')),
    isWarning: defineAsyncComponent(() => import('../../icons/exclamationTriangle')),
    passwordInvisible: defineAsyncComponent(() => import('../../icons/eye')),
    passwordVisible: defineAsyncComponent(() => import('../../icons/eyeSlash'))
};
export function getInputIcons(icons) {
    return {
        ...DEFAULT_INPUT_ICONS,
        ...icons
    };
}
export const DEFAULT_NUMBER_INPUT_ICONS = {
    minus: defineAsyncComponent(() => import('../../icons/minus')),
    plus: defineAsyncComponent(() => import('../../icons/plus'))
};
export function getNumberInputIcons(icons) {
    return {
        ...DEFAULT_NUMBER_INPUT_ICONS,
        ...icons
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9mb3JtL3NoYXJlZC90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFXdEQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWU7SUFDN0MsU0FBUyxFQUFFLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xFLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQztJQUM3RSxNQUFNLEVBQUUsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDcEUsU0FBUyxFQUFFLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ2hGLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hFLGVBQWUsRUFBRSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztDQUM1RSxDQUFDO0FBRUYsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUEwQjtJQUN0RCxPQUFPO1FBQ0wsR0FBRyxtQkFBbUI7UUFDdEIsR0FBRyxLQUFLO0tBQ1QsQ0FBQztBQUNKLENBQUM7QUFPRCxNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBcUI7SUFDMUQsS0FBSyxFQUFFLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlELElBQUksRUFBRSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztDQUM3RCxDQUFDO0FBRUYsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQWdDO0lBQ2xFLE9BQU87UUFDTCxHQUFHLDBCQUEwQjtRQUM3QixHQUFHLEtBQUs7S0FDVCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZGVmaW5lQXN5bmNDb21wb25lbnQgfSBmcm9tICd2dWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElucHV0SWNvbnMge1xuICBpc1N1Y2Nlc3M6IENvbXBvbmVudDtcbiAgaXNEYW5nZXI6IENvbXBvbmVudDtcbiAgaXNXYXJuaW5nOiBDb21wb25lbnQ7XG4gIGlzSW5mbzogQ29tcG9uZW50O1xuICBwYXNzd29yZFZpc2libGU6IENvbXBvbmVudDtcbiAgcGFzc3dvcmRJbnZpc2libGU6IENvbXBvbmVudDtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfSU5QVVRfSUNPTlM6IElucHV0SWNvbnMgPSB7XG4gIGlzU3VjY2VzczogZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCcuLi8uLi9pY29ucy9jaGVjaycpKSxcbiAgaXNEYW5nZXI6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvZXhjbGFtYXRpb25DaXJjbGUnKSksXG4gIGlzSW5mbzogZGVmaW5lQXN5bmNDb21wb25lbnQoKCkgPT4gaW1wb3J0KCcuLi8uLi9pY29ucy9pbmZvQ2lyY2xlJykpLFxuICBpc1dhcm5pbmc6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvZXhjbGFtYXRpb25UcmlhbmdsZScpKSxcbiAgcGFzc3dvcmRJbnZpc2libGU6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvZXllJykpLFxuICBwYXNzd29yZFZpc2libGU6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvZXllU2xhc2gnKSlcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnB1dEljb25zKGljb25zOiBQYXJ0aWFsPElucHV0SWNvbnM+KTogSW5wdXRJY29ucyB7XG4gIHJldHVybiB7XG4gICAgLi4uREVGQVVMVF9JTlBVVF9JQ09OUyxcbiAgICAuLi5pY29uc1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE51bWJlcklucHV0SWNvbnMge1xuICBtaW51czogQ29tcG9uZW50O1xuICBwbHVzOiBDb21wb25lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX05VTUJFUl9JTlBVVF9JQ09OUzogTnVtYmVySW5wdXRJY29ucyA9IHtcbiAgbWludXM6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvbWludXMnKSksXG4gIHBsdXM6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvcGx1cycpKVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE51bWJlcklucHV0SWNvbnMoaWNvbnM6IFBhcnRpYWw8TnVtYmVySW5wdXRJY29ucz4pOiBOdW1iZXJJbnB1dEljb25zIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5ERUZBVUxUX05VTUJFUl9JTlBVVF9JQ09OUyxcbiAgICAuLi5pY29uc1xuICB9O1xufVxuIl19