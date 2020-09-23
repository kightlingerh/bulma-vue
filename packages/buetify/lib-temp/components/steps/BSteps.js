import './steps.sass';
import { getUseModelPropsDefinition, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { constEmptyArray, isObject } from '../../utils/helpers';
import { head } from 'fp-ts/lib/Array';
import { chain, getOrElse, none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { Transition, defineComponent, nextTick, onBeforeMount, h, provide, shallowRef, isVNode } from 'vue';
import { STEP_ITEM_NAME, STEPS_SYMBOL } from './shared';
export const BStepsPropsDefinition = {
    ...getUseModelPropsDefinition(),
    ...DefaultThemePropsDefinition,
    variant: {
        type: String,
        default: 'is-link'
    },
    size: {
        type: String,
        default: ''
    },
    isAnimated: {
        type: Boolean,
        default: true
    }
};
function getOnStepItemClick(step, index, model, activeLabel, transition) {
    return () => {
        const val = model.modelValue.value || 0;
        if (val !== index) {
            transition.value = index < val ? 'slide-next' : 'slide-prev';
            nextTick(() => {
                model.set(index);
                activeLabel.value = some(step.props.label);
            });
        }
    };
}
function getGenerateNavItem(props, model, activeLabel, transition) {
    return function generateNavItem(step, index) {
        return h('li', {
            key: step.props.label,
            class: [
                {
                    'is-active': index === model.modelValue.value
                }
            ]
        }, [
            h('a', { onClick: getOnStepItemClick(step, index, model, activeLabel, transition) }, step.props.icon ? [h(step.props.icon), step.props.label] : step.props.label)
        ]);
    };
}
function generateNavItems(props, tabs, model, activeLabel, transition) {
    return h('ul', tabs.map(getGenerateNavItem(props, model, activeLabel, transition)));
}
function generateNavHeaderContent(props, steps, model, activeLabel, transition, themeClasses) {
    return h('nav', {
        class: ['tabs', props.size, ...(props.variant === '' ? themeClasses : [props.variant])]
    }, generateNavItems(props, steps, model, activeLabel, transition));
}
function generateNavHeader(props, steps, model, activeLabel, transition, themeClasses) {
    return generateNavHeaderContent(props, steps, model, activeLabel, transition, themeClasses);
}
function generateStepContent(props, steps, model, transition) {
    return props.isAnimated
        ? h(Transition, { name: transition.value }, () => steps[model.modelValue.value || 0])
        : steps[model.modelValue.value || 0];
}
function isStepItemNode(node) {
    return (isObject(node) &&
        isObject(node.type) &&
        node.type.name === STEP_ITEM_NAME &&
        (node.props['is-visible'] === undefined ||
            node.props['is-visible'] ||
            node.props.isVisible === undefined ||
            node.props.isVisible));
}
function getSteps(slots) {
    return pipe(slots.default ? slots.default() : [], head, chain(fragment => fragment.children && Array.isArray(fragment.children) ? some(fragment.children.filter(isVNode)) : none), getOrElse(constEmptyArray)).filter(isStepItemNode);
}
export default defineComponent({
    name: 'b-steps',
    props: BStepsPropsDefinition,
    setup(props, context) {
        const { themeClasses } = useTheme(props);
        const model = useModel(props);
        const transition = shallowRef('slide-next');
        const injection = {
            activeLabel: shallowRef(none)
        };
        provide(STEPS_SYMBOL, injection);
        onBeforeMount(() => {
            if (model.modelValue.value === undefined) {
                model.set(0);
            }
        });
        return () => {
            const steps = getSteps(context.slots);
            return h('article', { class: 'b-steps' }, [
                generateNavHeader(props, steps, model, injection.activeLabel, transition, themeClasses.value),
                generateStepContent(props, steps, model, transition)
            ]);
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlN0ZXBzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc3RlcHMvQlN0ZXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSwwQkFBMEIsRUFBUyxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFVLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsVUFBVSxFQUVWLGVBQWUsRUFDZixRQUFRLEVBR1IsYUFBYSxFQUNiLENBQUMsRUFFRCxPQUFPLEVBQ1AsVUFBVSxFQUVWLE9BQU8sRUFDUixNQUFNLEtBQUssQ0FBQztBQUNiLE9BQU8sRUFBa0IsY0FBYyxFQUFpQixZQUFZLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFNdkYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUc7SUFDbkMsR0FBRywwQkFBMEIsRUFBVTtJQUN2QyxHQUFHLDJCQUEyQjtJQUM5QixPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBZ0M7UUFDdEMsT0FBTyxFQUFFLFNBQWtCO0tBQzVCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQTZCO1FBQ25DLE9BQU8sRUFBRSxFQUFXO0tBQ3JCO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLE9BQTRCO1FBQ2xDLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDRixD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QUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDO2FBQ3JELENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3RlcHMuc2Fzcyc7XG5pbXBvcnQgeyBnZXRVc2VNb2RlbFByb3BzRGVmaW5pdGlvbiwgTW9kZWwsIHVzZU1vZGVsIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvbW9kZWwnO1xuaW1wb3J0IHsgRGVmYXVsdFRoZW1lUHJvcHNEZWZpbml0aW9uLCB1c2VUaGVtZSB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3RoZW1lJztcbmltcG9ydCB7IGNvbnN0RW1wdHlBcnJheSwgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7IENvbG9yVmFyaWFudCB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9yVmFyaWFudHMnO1xuaW1wb3J0IHsgaGVhZCB9IGZyb20gJ2ZwLXRzL2xpYi9BcnJheSc7XG5pbXBvcnQgeyBjaGFpbiwgZ2V0T3JFbHNlLCBub25lLCBPcHRpb24sIHNvbWUgfSBmcm9tICdmcC10cy9saWIvT3B0aW9uJztcbmltcG9ydCB7IHBpcGUgfSBmcm9tICdmcC10cy9saWIvcGlwZWFibGUnO1xuaW1wb3J0IHtcbiAgVHJhbnNpdGlvbixcbiAgUmVmLFxuICBkZWZpbmVDb21wb25lbnQsXG4gIG5leHRUaWNrLFxuICBWTm9kZSxcbiAgUHJvcFR5cGUsXG4gIG9uQmVmb3JlTW91bnQsXG4gIGgsXG4gIEV4dHJhY3RQcm9wVHlwZXMsXG4gIHByb3ZpZGUsXG4gIHNoYWxsb3dSZWYsXG4gIFNsb3RzLFxuICBpc1ZOb2RlXG59IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBCU3RlcEl0ZW1Qcm9wcywgU1RFUF9JVEVNX05BTUUsIFN0ZXBJbmplY3Rpb24sIFNURVBTX1NZTUJPTCB9IGZyb20gJy4vc2hhcmVkJztcblxuZXhwb3J0IHR5cGUgU3RlcHNTaXplID0gJ2lzLXNtYWxsJyB8ICdpcy1tZWRpdW0nIHwgJ2lzLWxhcmdlJyB8ICcnO1xuXG50eXBlIFN0ZXBUcmFuc2l0aW9uID0gJ3NsaWRlLW5leHQnIHwgJ3NsaWRlLXByZXYnO1xuXG5leHBvcnQgY29uc3QgQlN0ZXBzUHJvcHNEZWZpbml0aW9uID0ge1xuICAuLi5nZXRVc2VNb2RlbFByb3BzRGVmaW5pdGlvbjxudW1iZXI+KCksXG4gIC4uLkRlZmF1bHRUaGVtZVByb3BzRGVmaW5pdGlvbixcbiAgdmFyaWFudDoge1xuICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTxDb2xvclZhcmlhbnQ+LFxuICAgIGRlZmF1bHQ6ICdpcy1saW5rJyBhcyBjb25zdFxuICB9LFxuICBzaXplOiB7XG4gICAgdHlwZTogU3RyaW5nIGFzIFByb3BUeXBlPFN0ZXBzU2l6ZT4sXG4gICAgZGVmYXVsdDogJycgYXMgY29uc3RcbiAgfSxcbiAgaXNBbmltYXRlZDoge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9XG59O1xuXG5leHBvcnQgdHlwZSBCU3RlcHNQcm9wcyA9IEV4dHJhY3RQcm9wVHlwZXM8dHlwZW9mIEJTdGVwc1Byb3BzRGVmaW5pdGlvbj47XG5cbmZ1bmN0aW9uIGdldE9uU3RlcEl0ZW1DbGljayhcbiAgc3RlcDogQlN0ZXBJdGVtTm9kZSxcbiAgaW5kZXg6IG51bWJlcixcbiAgbW9kZWw6IE1vZGVsPG51bWJlcj4sXG4gIGFjdGl2ZUxhYmVsOiBSZWY8T3B0aW9uPHN0cmluZz4+LFxuICB0cmFuc2l0aW9uOiBSZWY8U3RlcFRyYW5zaXRpb24+XG4pIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjb25zdCB2YWwgPSBtb2RlbC5tb2RlbFZhbHVlLnZhbHVlIHx8IDA7XG4gICAgaWYgKHZhbCAhPT0gaW5kZXgpIHtcbiAgICAgIHRyYW5zaXRpb24udmFsdWUgPSBpbmRleCA8IHZhbCA/ICdzbGlkZS1uZXh0JyA6ICdzbGlkZS1wcmV2JztcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgbW9kZWwuc2V0KGluZGV4KTtcbiAgICAgICAgYWN0aXZlTGFiZWwudmFsdWUgPSBzb21lKHN0ZXAucHJvcHMubGFiZWwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRHZW5lcmF0ZU5hdkl0ZW0oXG4gIHByb3BzOiBCU3RlcHNQcm9wcyxcbiAgbW9kZWw6IE1vZGVsPG51bWJlcj4sXG4gIGFjdGl2ZUxhYmVsOiBSZWY8T3B0aW9uPHN0cmluZz4+LFxuICB0cmFuc2l0aW9uOiBSZWY8U3RlcFRyYW5zaXRpb24+XG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdlbmVyYXRlTmF2SXRlbShzdGVwOiBCU3RlcEl0ZW1Ob2RlLCBpbmRleDogbnVtYmVyKTogVk5vZGUge1xuICAgIHJldHVybiBoKFxuICAgICAgJ2xpJyxcbiAgICAgIHtcbiAgICAgICAga2V5OiBzdGVwLnByb3BzLmxhYmVsLFxuICAgICAgICBjbGFzczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgICdpcy1hY3RpdmUnOiBpbmRleCA9PT0gbW9kZWwubW9kZWxWYWx1ZS52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgaChcbiAgICAgICAgICAnYScsXG4gICAgICAgICAgeyBvbkNsaWNrOiBnZXRPblN0ZXBJdGVtQ2xpY2soc3RlcCwgaW5kZXgsIG1vZGVsLCBhY3RpdmVMYWJlbCwgdHJhbnNpdGlvbikgfSxcbiAgICAgICAgICBzdGVwLnByb3BzLmljb24gPyBbaChzdGVwLnByb3BzLmljb24pLCBzdGVwLnByb3BzLmxhYmVsXSA6IHN0ZXAucHJvcHMubGFiZWxcbiAgICAgICAgKVxuICAgICAgXVxuICAgICk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmF2SXRlbXMoXG4gIHByb3BzOiBCU3RlcHNQcm9wcyxcbiAgdGFiczogQlN0ZXBJdGVtTm9kZVtdLFxuICBtb2RlbDogTW9kZWw8bnVtYmVyPixcbiAgYWN0aXZlTGFiZWw6IFJlZjxPcHRpb248c3RyaW5nPj4sXG4gIHRyYW5zaXRpb246IFJlZjxTdGVwVHJhbnNpdGlvbj5cbikge1xuICByZXR1cm4gaCgndWwnLCB0YWJzLm1hcChnZXRHZW5lcmF0ZU5hdkl0ZW0ocHJvcHMsIG1vZGVsLCBhY3RpdmVMYWJlbCwgdHJhbnNpdGlvbikpKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOYXZIZWFkZXJDb250ZW50KFxuICBwcm9wczogQlN0ZXBzUHJvcHMsXG4gIHN0ZXBzOiBCU3RlcEl0ZW1Ob2RlW10sXG4gIG1vZGVsOiBNb2RlbDxudW1iZXI+LFxuICBhY3RpdmVMYWJlbDogUmVmPE9wdGlvbjxzdHJpbmc+PixcbiAgdHJhbnNpdGlvbjogUmVmPFN0ZXBUcmFuc2l0aW9uPixcbiAgdGhlbWVDbGFzc2VzOiBzdHJpbmdbXVxuKTogVk5vZGUge1xuICByZXR1cm4gaChcbiAgICAnbmF2JyxcbiAgICB7XG4gICAgICBjbGFzczogWyd0YWJzJywgcHJvcHMuc2l6ZSwgLi4uKHByb3BzLnZhcmlhbnQgPT09ICcnID8gdGhlbWVDbGFzc2VzIDogW3Byb3BzLnZhcmlhbnRdKV1cbiAgICB9LFxuICAgIGdlbmVyYXRlTmF2SXRlbXMocHJvcHMsIHN0ZXBzLCBtb2RlbCwgYWN0aXZlTGFiZWwsIHRyYW5zaXRpb24pXG4gICk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmF2SGVhZGVyKFxuICBwcm9wczogQlN0ZXBzUHJvcHMsXG4gIHN0ZXBzOiBCU3RlcEl0ZW1Ob2RlW10sXG4gIG1vZGVsOiBNb2RlbDxudW1iZXI+LFxuICBhY3RpdmVMYWJlbDogUmVmPE9wdGlvbjxzdHJpbmc+PixcbiAgdHJhbnNpdGlvbjogUmVmPFN0ZXBUcmFuc2l0aW9uPixcbiAgdGhlbWVDbGFzc2VzOiBzdHJpbmdbXVxuKTogVk5vZGUge1xuICByZXR1cm4gZ2VuZXJhdGVOYXZIZWFkZXJDb250ZW50KHByb3BzLCBzdGVwcywgbW9kZWwsIGFjdGl2ZUxhYmVsLCB0cmFuc2l0aW9uLCB0aGVtZUNsYXNzZXMpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVN0ZXBDb250ZW50KFxuICBwcm9wczogQlN0ZXBzUHJvcHMsXG4gIHN0ZXBzOiBCU3RlcEl0ZW1Ob2RlW10sXG4gIG1vZGVsOiBNb2RlbDxudW1iZXI+LFxuICB0cmFuc2l0aW9uOiBSZWY8U3RlcFRyYW5zaXRpb24+XG4pOiBWTm9kZSB7XG4gIHJldHVybiBwcm9wcy5pc0FuaW1hdGVkXG4gICAgPyBoKFRyYW5zaXRpb24sIHsgbmFtZTogdHJhbnNpdGlvbi52YWx1ZSB9LCAoKSA9PiBzdGVwc1ttb2RlbC5tb2RlbFZhbHVlLnZhbHVlIHx8IDBdKVxuICAgIDogc3RlcHNbbW9kZWwubW9kZWxWYWx1ZS52YWx1ZSB8fCAwXTtcbn1cblxuaW50ZXJmYWNlIEJTdGVwSXRlbU5vZGUgZXh0ZW5kcyBWTm9kZSB7XG4gIHR5cGU6IHtcbiAgICBuYW1lOiB0eXBlb2YgU1RFUF9JVEVNX05BTUU7XG4gIH07XG4gIHByb3BzOiBCU3RlcEl0ZW1Qcm9wcztcbn1cblxuZnVuY3Rpb24gaXNTdGVwSXRlbU5vZGUobm9kZTogdW5rbm93bik6IG5vZGUgaXMgQlN0ZXBJdGVtTm9kZSB7XG4gIHJldHVybiAoXG4gICAgaXNPYmplY3Qobm9kZSkgJiZcbiAgICBpc09iamVjdCgobm9kZSBhcyBhbnkpLnR5cGUpICYmXG4gICAgKG5vZGUgYXMgYW55KS50eXBlLm5hbWUgPT09IFNURVBfSVRFTV9OQU1FICYmXG4gICAgKChub2RlIGFzIGFueSkucHJvcHNbJ2lzLXZpc2libGUnXSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAobm9kZSBhcyBhbnkpLnByb3BzWydpcy12aXNpYmxlJ10gfHxcbiAgICAgIChub2RlIGFzIGFueSkucHJvcHMuaXNWaXNpYmxlID09PSB1bmRlZmluZWQgfHxcbiAgICAgIChub2RlIGFzIGFueSkucHJvcHMuaXNWaXNpYmxlKVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRTdGVwcyhzbG90czogU2xvdHMpOiBhbnlbXSB7XG4gIHJldHVybiBwaXBlKFxuICAgIHNsb3RzLmRlZmF1bHQgPyBzbG90cy5kZWZhdWx0KCkgOiBbXSxcbiAgICBoZWFkLFxuICAgIGNoYWluKGZyYWdtZW50ID0+XG4gICAgICBmcmFnbWVudC5jaGlsZHJlbiAmJiBBcnJheS5pc0FycmF5KGZyYWdtZW50LmNoaWxkcmVuKSA/IHNvbWUoZnJhZ21lbnQuY2hpbGRyZW4uZmlsdGVyKGlzVk5vZGUpKSA6IG5vbmVcbiAgICApLFxuICAgIGdldE9yRWxzZTxWTm9kZVtdPihjb25zdEVtcHR5QXJyYXkpXG4gICkuZmlsdGVyKGlzU3RlcEl0ZW1Ob2RlKSBhcyBhbnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdiLXN0ZXBzJyxcbiAgcHJvcHM6IEJTdGVwc1Byb3BzRGVmaW5pdGlvbixcbiAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcbiAgICBjb25zdCB7IHRoZW1lQ2xhc3NlcyB9ID0gdXNlVGhlbWUocHJvcHMpO1xuICAgIGNvbnN0IG1vZGVsID0gdXNlTW9kZWwocHJvcHMpO1xuICAgIGNvbnN0IHRyYW5zaXRpb24gPSBzaGFsbG93UmVmKCdzbGlkZS1uZXh0JyBhcyAnc2xpZGUtbmV4dCcgfCAnc2xpZGUtcHJldicpO1xuICAgIGNvbnN0IGluamVjdGlvbjogU3RlcEluamVjdGlvbiA9IHtcbiAgICAgIGFjdGl2ZUxhYmVsOiBzaGFsbG93UmVmKG5vbmUpXG4gICAgfTtcblxuICAgIHByb3ZpZGUoU1RFUFNfU1lNQk9MLCBpbmplY3Rpb24pO1xuXG4gICAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgICBpZiAobW9kZWwubW9kZWxWYWx1ZS52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG1vZGVsLnNldCgwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBzdGVwcyA9IGdldFN0ZXBzKGNvbnRleHQuc2xvdHMpO1xuICAgICAgcmV0dXJuIGgoJ2FydGljbGUnLCB7IGNsYXNzOiAnYi1zdGVwcycgfSwgW1xuICAgICAgICBnZW5lcmF0ZU5hdkhlYWRlcihwcm9wcywgc3RlcHMsIG1vZGVsLCBpbmplY3Rpb24uYWN0aXZlTGFiZWwsIHRyYW5zaXRpb24sIHRoZW1lQ2xhc3Nlcy52YWx1ZSksXG4gICAgICAgIGdlbmVyYXRlU3RlcENvbnRlbnQocHJvcHMsIHN0ZXBzLCBtb2RlbCwgdHJhbnNpdGlvbilcbiAgICAgIF0pO1xuICAgIH07XG4gIH1cbn0pO1xuIl19