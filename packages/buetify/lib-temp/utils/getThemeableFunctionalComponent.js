import { isSome } from 'fp-ts/lib/Option';
import { inject, h, defineComponent } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, DEFAULT_THEME_INJECTION, getThemeClasses, useThemePropsDefinition, THEME_INJECTION_SYMBOL } from '../composables/theme';
import { mergeClasses } from './mergeClasses';
export function isThemeable(props, injection) {
    return !!props.isThemeable && !!props.themeMap && isSome(injection.currentTheme.value);
}
export function getThemeableFunctionalComponent({ cls, el = 'div', themeMap = DEFAULT_THEME_COLOR_MAP }) {
    return defineComponent({
        props: {
            ...useThemePropsDefinition(themeMap, true),
            tag: {
                type: [String, Function],
                default: el
            }
        },
        setup(props, { slots }) {
            const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
            return () => h(props.tag, {
                class: isThemeable(props, themeInjection)
                    ? mergeClasses(getThemeClasses(props.themeMap, themeInjection), cls)
                    : cls
            }, slots.default && slots.default());
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGhlbWVhYmxlRnVuY3Rpb25hbENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXRUaGVtZWFibGVGdW5jdGlvbmFsQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxlQUFlLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDakQsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsZUFBZSxFQUNmLHVCQUF1QixFQUN2QixzQkFBc0IsRUFHdkIsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFZOUMsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUEwQixFQUFFLFNBQXlCO0lBQy9FLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekYsQ0FBQztBQUVELE1BQU0sVUFBVSwrQkFBK0IsQ0FBQyxFQUM5QyxHQUFHLEVBQ0gsRUFBRSxHQUFHLEtBQUssRUFDVixRQUFRLEdBQUcsdUJBQXVCLEVBQ1I7SUFDMUIsT0FBTyxlQUFlLENBQUM7UUFDckIsS0FBSyxFQUFFO1lBQ0wsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO1lBQzFDLEdBQUcsRUFBRTtnQkFDSCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO2dCQUN4QixPQUFPLEVBQUUsRUFBRTthQUNaO1NBQ0Y7UUFDRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFO1lBQ3BCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1lBQy9FLE9BQU8sR0FBRyxFQUFFLENBQ1YsQ0FBQyxDQUNDLEtBQUssQ0FBQyxHQUFVLEVBQ2hCO2dCQUNFLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUM7b0JBQ3BFLENBQUMsQ0FBQyxHQUFHO2FBQ1IsRUFDRCxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FDakMsQ0FBQztRQUNOLENBQUM7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNTb21lIH0gZnJvbSAnZnAtdHMvbGliL09wdGlvbic7XG5pbXBvcnQgeyBpbmplY3QsIGgsIGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQge1xuICBERUZBVUxUX1RIRU1FX0NPTE9SX01BUCxcbiAgREVGQVVMVF9USEVNRV9JTkpFQ1RJT04sXG4gIGdldFRoZW1lQ2xhc3NlcyxcbiAgdXNlVGhlbWVQcm9wc0RlZmluaXRpb24sXG4gIFRIRU1FX0lOSkVDVElPTl9TWU1CT0wsXG4gIFRoZW1lSW5qZWN0aW9uLFxuICBUaGVtZVByb3BzXG59IGZyb20gJy4uL2NvbXBvc2FibGVzL3RoZW1lJztcbmltcG9ydCB7IFRoZW1lQ29sb3JNYXAgfSBmcm9tICcuLi90eXBlcy9UaGVtZUNvbG9yTWFwJztcbmltcG9ydCB7IG1lcmdlQ2xhc3NlcyB9IGZyb20gJy4vbWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IGludGVyZmFjZSBUaGVtZWFibGVDb21wb25lbnRPcHRpb25zIHtcbiAgY2xzOiBzdHJpbmc7XG4gIGVsPzogc3RyaW5nO1xuICB0aGVtZU1hcD86IFRoZW1lQ29sb3JNYXA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhlbWVhYmxlQ29tcG9uZW50UHJvcHMgZXh0ZW5kcyBQYXJ0aWFsPFRoZW1lUHJvcHM+IHtcbiAgdGFnPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUaGVtZWFibGUocHJvcHM6IFBhcnRpYWw8VGhlbWVQcm9wcz4sIGluamVjdGlvbjogVGhlbWVJbmplY3Rpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuICEhcHJvcHMuaXNUaGVtZWFibGUgJiYgISFwcm9wcy50aGVtZU1hcCAmJiBpc1NvbWUoaW5qZWN0aW9uLmN1cnJlbnRUaGVtZS52YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaGVtZWFibGVGdW5jdGlvbmFsQ29tcG9uZW50KHtcbiAgY2xzLFxuICBlbCA9ICdkaXYnLFxuICB0aGVtZU1hcCA9IERFRkFVTFRfVEhFTUVfQ09MT1JfTUFQXG59OiBUaGVtZWFibGVDb21wb25lbnRPcHRpb25zKSB7XG4gIHJldHVybiBkZWZpbmVDb21wb25lbnQoe1xuICAgIHByb3BzOiB7XG4gICAgICAuLi51c2VUaGVtZVByb3BzRGVmaW5pdGlvbih0aGVtZU1hcCwgdHJ1ZSksXG4gICAgICB0YWc6IHtcbiAgICAgICAgdHlwZTogW1N0cmluZywgRnVuY3Rpb25dLFxuICAgICAgICBkZWZhdWx0OiBlbFxuICAgICAgfVxuICAgIH0sXG4gICAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgICAgY29uc3QgdGhlbWVJbmplY3Rpb24gPSBpbmplY3QoVEhFTUVfSU5KRUNUSU9OX1NZTUJPTCwgREVGQVVMVF9USEVNRV9JTkpFQ1RJT04pO1xuICAgICAgcmV0dXJuICgpID0+XG4gICAgICAgIGgoXG4gICAgICAgICAgcHJvcHMudGFnIGFzIGFueSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjbGFzczogaXNUaGVtZWFibGUocHJvcHMsIHRoZW1lSW5qZWN0aW9uKVxuICAgICAgICAgICAgICA/IG1lcmdlQ2xhc3NlcyhnZXRUaGVtZUNsYXNzZXMocHJvcHMudGhlbWVNYXAsIHRoZW1lSW5qZWN0aW9uKSwgY2xzKVxuICAgICAgICAgICAgICA6IGNsc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2xvdHMuZGVmYXVsdCAmJiBzbG90cy5kZWZhdWx0KClcbiAgICAgICAgKTtcbiAgICB9XG4gIH0pO1xufVxuIl19