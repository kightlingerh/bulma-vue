import './pricing-table.sass';
import BPricingPlanPrice from './BPricingPlanPrice';
import { h } from 'vue';
export default function BPricingPlan(props, { attrs, slots }) {
    const nodes = [];
    if (slots.header) {
        nodes.push(h('div', { class: 'plan-header' }, slots.header()));
    }
    nodes.push(h('div', { class: 'plan-pricing-container' }, slots.price ? slots.price(props) : h(BPricingPlanPrice, props)));
    nodes.push(h('div', { class: 'plan-items' }, slots.items && slots.items()));
    if (slots.footer) {
        nodes.push(h('div', { class: 'plan-footer' }, slots.footer()));
    }
    return h('section', { ...attrs, class: ['pricing-plan', { 'is-active': !!props.isActive }] }, nodes);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlByaWNpbmdQbGFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcHJpY2luZ1RhYmxlL0JQcmljaW5nUGxhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFTLENBQUMsRUFBZ0IsTUFBTSxLQUFLLENBQUM7QUFRN0MsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsS0FBd0IsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWdCO0lBQzNGLE1BQU0sS0FBSyxHQUFZLEVBQUUsQ0FBQztJQUMxQixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDaEU7SUFDRCxLQUFLLENBQUMsSUFBSSxDQUNSLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDOUcsQ0FBQztJQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hFO0lBQ0QsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3ZHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vcHJpY2luZy10YWJsZS5zYXNzJztcbmltcG9ydCBCUHJpY2luZ1BsYW5QcmljZSBmcm9tICcuL0JQcmljaW5nUGxhblByaWNlJztcbmltcG9ydCB7IFZOb2RlLCBoLCBTZXR1cENvbnRleHQgfSBmcm9tICd2dWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJQcmljaW5nUGxhblByb3BzIHtcbiAgaXNBY3RpdmU/OiBib29sZWFuO1xuICBhbW91bnQ6IG51bWJlcjtcbiAgaW50ZXJ2YWw6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQlByaWNpbmdQbGFuKHByb3BzOiBCUHJpY2luZ1BsYW5Qcm9wcywgeyBhdHRycywgc2xvdHMgfTogU2V0dXBDb250ZXh0KSB7XG4gIGNvbnN0IG5vZGVzOiBWTm9kZVtdID0gW107XG4gIGlmIChzbG90cy5oZWFkZXIpIHtcbiAgICBub2Rlcy5wdXNoKGgoJ2RpdicsIHsgY2xhc3M6ICdwbGFuLWhlYWRlcicgfSwgc2xvdHMuaGVhZGVyKCkpKTtcbiAgfVxuICBub2Rlcy5wdXNoKFxuICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdwbGFuLXByaWNpbmctY29udGFpbmVyJyB9LCBzbG90cy5wcmljZSA/IHNsb3RzLnByaWNlKHByb3BzKSA6IGgoQlByaWNpbmdQbGFuUHJpY2UsIHByb3BzKSlcbiAgKTtcbiAgbm9kZXMucHVzaChoKCdkaXYnLCB7IGNsYXNzOiAncGxhbi1pdGVtcycgfSwgc2xvdHMuaXRlbXMgJiYgc2xvdHMuaXRlbXMoKSkpO1xuICBpZiAoc2xvdHMuZm9vdGVyKSB7XG4gICAgbm9kZXMucHVzaChoKCdkaXYnLCB7IGNsYXNzOiAncGxhbi1mb290ZXInIH0sIHNsb3RzLmZvb3RlcigpKSk7XG4gIH1cbiAgcmV0dXJuIGgoJ3NlY3Rpb24nLCB7IC4uLmF0dHJzLCBjbGFzczogWydwcmljaW5nLXBsYW4nLCB7ICdpcy1hY3RpdmUnOiAhIXByb3BzLmlzQWN0aXZlIH1dIH0sIG5vZGVzKTtcbn1cbiJdfQ==