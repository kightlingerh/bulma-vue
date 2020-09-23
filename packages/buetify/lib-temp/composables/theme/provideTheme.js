import { getItem, setItem } from 'fp-ts-local-storage';
import { constant, constVoid } from 'fp-ts/lib/function';
import { getOrElse, none, some } from 'fp-ts/lib/Option';
import { provide, shallowRef, watch } from 'vue';
export const DEFAULT_THEME_INJECTION = {
    currentTheme: shallowRef(none),
    isThemeable: shallowRef(false),
    setTheme: constVoid
};
export const THEME_INJECTION_SYMBOL = Symbol('theme');
const persistentTheme = getOrElse(constant('dark'))(getItem('theme')());
export const ProvideThemePropDefinitions = {
    isThemeable: {
        type: Boolean,
        default: true
    },
    persistTheme: {
        type: Boolean,
        default: true
    }
};
export function provideTheme(props) {
    const isThemeable = shallowRef(props.isThemeable);
    watch(props, newProps => {
        isThemeable.value = newProps.isThemeable;
    });
    const currentTheme = shallowRef(some(persistentTheme));
    function setTheme(newTheme) {
        currentTheme.value = some(newTheme);
        if (props.persistTheme) {
            setItem('theme', newTheme)();
        }
    }
    const injection = {
        isThemeable,
        currentTheme,
        setTheme
    };
    provide(THEME_INJECTION_SYMBOL, injection);
    return {
        setTheme,
        currentTheme,
        isThemeable
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZVRoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL3RoZW1lL3Byb3ZpZGVUaGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQVUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQU8sS0FBSyxFQUE4QixNQUFNLEtBQUssQ0FBQztBQVVsRixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBbUI7SUFDckQsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDOUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDOUIsUUFBUSxFQUFFLFNBQVM7Q0FDcEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV0RCxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQWUsUUFBUSxDQUFlLE1BQU0sQ0FBQyxDQUFDLENBQzdFLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBMEIsQ0FDM0MsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHO0lBQ3pDLFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxPQUE0QjtRQUNsQyxPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLE9BQTRCO1FBQ2xDLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDRixDQUFDO0FBSUYsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUF3QjtJQUNuRCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUU7UUFDdEIsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELFNBQVMsUUFBUSxDQUFDLFFBQXNCO1FBQ3RDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtZQUN0QixPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBQ0QsTUFBTSxTQUFTLEdBQW1CO1FBQ2hDLFdBQVc7UUFDWCxZQUFZO1FBQ1osUUFBUTtLQUNULENBQUM7SUFDRixPQUFPLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsT0FBTztRQUNMLFFBQVE7UUFDUixZQUFZO1FBQ1osV0FBVztLQUNaLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0SXRlbSwgc2V0SXRlbSB9IGZyb20gJ2ZwLXRzLWxvY2FsLXN0b3JhZ2UnO1xuaW1wb3J0IHsgY29uc3RhbnQsIGNvbnN0Vm9pZCB9IGZyb20gJ2ZwLXRzL2xpYi9mdW5jdGlvbic7XG5pbXBvcnQgeyBnZXRPckVsc2UsIG5vbmUsIE9wdGlvbiwgc29tZSB9IGZyb20gJ2ZwLXRzL2xpYi9PcHRpb24nO1xuaW1wb3J0IHsgcHJvdmlkZSwgc2hhbGxvd1JlZiwgUmVmLCB3YXRjaCwgRXh0cmFjdFByb3BUeXBlcywgUHJvcFR5cGUgfSBmcm9tICd2dWUnO1xuXG5leHBvcnQgdHlwZSBUaGVtZVZhcmlhbnQgPSAnZGFyaycgfCAnbGlnaHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRoZW1lSW5qZWN0aW9uIHtcbiAgaXNUaGVtZWFibGU6IFJlZjxib29sZWFuPjtcbiAgY3VycmVudFRoZW1lOiBSZWY8T3B0aW9uPFRoZW1lVmFyaWFudD4+OyAvLyBhbGxvd3MgZm9yIGVhc2llciBkZWZhdWx0cyBpbiBpbmplY3RlZCBjb21wb25lbnRcbiAgc2V0VGhlbWU6ICh0aGVtZTogVGhlbWVWYXJpYW50KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9USEVNRV9JTkpFQ1RJT046IFRoZW1lSW5qZWN0aW9uID0ge1xuICBjdXJyZW50VGhlbWU6IHNoYWxsb3dSZWYobm9uZSksXG4gIGlzVGhlbWVhYmxlOiBzaGFsbG93UmVmKGZhbHNlKSxcbiAgc2V0VGhlbWU6IGNvbnN0Vm9pZFxufTtcblxuZXhwb3J0IGNvbnN0IFRIRU1FX0lOSkVDVElPTl9TWU1CT0wgPSBTeW1ib2woJ3RoZW1lJyk7XG5cbmNvbnN0IHBlcnNpc3RlbnRUaGVtZSA9IGdldE9yRWxzZTxUaGVtZVZhcmlhbnQ+KGNvbnN0YW50PFRoZW1lVmFyaWFudD4oJ2RhcmsnKSkoXG4gIGdldEl0ZW0oJ3RoZW1lJykoKSBhcyBPcHRpb248VGhlbWVWYXJpYW50PlxuKTtcblxuZXhwb3J0IGNvbnN0IFByb3ZpZGVUaGVtZVByb3BEZWZpbml0aW9ucyA9IHtcbiAgaXNUaGVtZWFibGU6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgcGVyc2lzdFRoZW1lOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH1cbn07XG5cbmV4cG9ydCB0eXBlIFByb3ZpZGVUaGVtZVByb3BzID0gRXh0cmFjdFByb3BUeXBlczx0eXBlb2YgUHJvdmlkZVRoZW1lUHJvcERlZmluaXRpb25zPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVUaGVtZShwcm9wczogUHJvdmlkZVRoZW1lUHJvcHMpIHtcbiAgY29uc3QgaXNUaGVtZWFibGUgPSBzaGFsbG93UmVmKHByb3BzLmlzVGhlbWVhYmxlKTtcbiAgd2F0Y2gocHJvcHMsIG5ld1Byb3BzID0+IHtcbiAgICBpc1RoZW1lYWJsZS52YWx1ZSA9IG5ld1Byb3BzLmlzVGhlbWVhYmxlO1xuICB9KTtcbiAgY29uc3QgY3VycmVudFRoZW1lID0gc2hhbGxvd1JlZihzb21lKHBlcnNpc3RlbnRUaGVtZSkpO1xuICBmdW5jdGlvbiBzZXRUaGVtZShuZXdUaGVtZTogVGhlbWVWYXJpYW50KSB7XG4gICAgY3VycmVudFRoZW1lLnZhbHVlID0gc29tZShuZXdUaGVtZSk7XG4gICAgaWYgKHByb3BzLnBlcnNpc3RUaGVtZSkge1xuICAgICAgc2V0SXRlbSgndGhlbWUnLCBuZXdUaGVtZSkoKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgaW5qZWN0aW9uOiBUaGVtZUluamVjdGlvbiA9IHtcbiAgICBpc1RoZW1lYWJsZSxcbiAgICBjdXJyZW50VGhlbWUsXG4gICAgc2V0VGhlbWVcbiAgfTtcbiAgcHJvdmlkZShUSEVNRV9JTkpFQ1RJT05fU1lNQk9MLCBpbmplY3Rpb24pO1xuICByZXR1cm4ge1xuICAgIHNldFRoZW1lLFxuICAgIGN1cnJlbnRUaGVtZSxcbiAgICBpc1RoZW1lYWJsZVxuICB9O1xufVxuIl19