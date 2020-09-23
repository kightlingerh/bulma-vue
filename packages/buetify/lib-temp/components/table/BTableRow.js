import { BCheckbox } from '../form/checkbox/BCheckbox';
import { getObjectValueByPath, isString } from '../../utils/helpers';
import { useInjectedCheckableTable } from './composables/useCheckableTable';
import { useInjectedSelectableTable } from './composables/useSelectableTable';
import { h, defineComponent, computed } from 'vue';
export default defineComponent({
    name: 'b-table-row',
    props: {
        columns: {
            type: Array,
            required: true
        },
        row: {
            type: Object,
            required: true
        },
        onRowClick: {
            type: Function,
            required: false
        }
    },
    setup(props, { slots }) {
        const { checkedRowIds, variant, toggleRow } = useInjectedCheckableTable();
        const { selectedRowIds, toggleRowSelection } = useInjectedSelectableTable();
        const isChecked = computed(() => checkedRowIds.value.has(props.row.id));
        const isSelected = computed(() => selectedRowIds.value.has(props.row.id));
        const classes = computed(() => {
            return [
                {
                    'is-selected': isSelected.value,
                    'is-checked': isChecked.value,
                    'is-draggable': props.row.isDraggable,
                    'is-droppable': props.row.isDroppable
                },
                props.row.classes
            ];
        });
        return () => {
            const columns = props.columns.map((column) => {
                const children = [];
                const value = isString(column.value)
                    ? getObjectValueByPath(props.row.data, column.value)
                    : column.value && column.value(props.row);
                const columnSlot = slots[column.slotName || column.label];
                if (columnSlot) {
                    children.push(columnSlot({ row: props.row, column, value }));
                }
                else {
                    children.push(value == null ? value : String(value));
                }
                const textClass = column.position === 'is-left'
                    ? 'has-text-left'
                    : column.position === 'is-centered'
                        ? 'has-text-centered'
                        : 'has-text-right';
                return h('td', {
                    class: [textClass, { 'is-sticky-left': column.isSticky }],
                    'data-label': column.label
                }, children);
            });
            if (props.row.isCheckable) {
                columns.unshift(h('td', { class: 'checkbox-cell' }, [
                    h(BCheckbox, {
                        modelValue: isChecked.value,
                        variant: variant.value,
                        'onUpdate:modelValue': toggleRow
                    })
                ]));
            }
            return h('tr', {
                class: classes.value,
                onClick: (e) => {
                    if (props.onRowClick) {
                        props.onRowClick(props.row, e);
                    }
                    if (props.row.isSelectable) {
                        e.stopPropagation();
                        toggleRowSelection(props.row);
                    }
                },
                draggable: props.row.isDraggable
            }, columns);
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlRhYmxlUm93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdGFibGUvQlRhYmxlUm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFOUUsT0FBTyxFQUFFLENBQUMsRUFBUyxlQUFlLEVBQUUsUUFBUSxFQUFZLE1BQU0sS0FBSyxDQUFDO0FBRXBFLGVBQWUsZUFBZSxDQUFDO0lBQzdCLElBQUksRUFBRSxhQUFhO0lBQ25CLEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxLQUFpQztZQUN2QyxRQUFRLEVBQUUsSUFBSTtTQUNmO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQTZCO1lBQ25DLFFBQVEsRUFBRSxJQUFJO1NBQ2Y7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsUUFBOEQ7WUFDcEUsUUFBUSxFQUFFLEtBQUs7U0FDaEI7S0FDRjtJQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUU7UUFDcEIsTUFBTSxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcseUJBQXlCLEVBQUUsQ0FBQztRQUMxRSxNQUFNLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsMEJBQTBCLEVBQUUsQ0FBQztRQUM1RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUM1QixPQUFPO2dCQUNMO29CQUNFLGFBQWEsRUFBRSxVQUFVLENBQUMsS0FBSztvQkFDL0IsWUFBWSxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUM3QixjQUFjLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXO29CQUNyQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXO2lCQUN0QztnQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU87YUFDbEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLE9BQU8sR0FBWSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtnQkFDbEUsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ3BELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTFELElBQUksVUFBVSxFQUFFO29CQUNkLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUN0RDtnQkFFRCxNQUFNLFNBQVMsR0FDYixNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVM7b0JBQzNCLENBQUMsQ0FBQyxlQUFlO29CQUNqQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxhQUFhO3dCQUNuQyxDQUFDLENBQUMsbUJBQW1CO3dCQUNyQixDQUFDLENBQUMsZ0JBQWdCLENBQUM7Z0JBRXZCLE9BQU8sQ0FBQyxDQUNOLElBQUksRUFDSjtvQkFDRSxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3pELFlBQVksRUFBRSxNQUFNLENBQUMsS0FBSztpQkFDM0IsRUFDRCxRQUFRLENBQ1QsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDekIsT0FBTyxDQUFDLE9BQU8sQ0FDYixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxFQUFFO29CQUNsQyxDQUFDLENBQUMsU0FBUyxFQUFFO3dCQUNYLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSzt3QkFDM0IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO3dCQUN0QixxQkFBcUIsRUFBRSxTQUFTO3FCQUNqQyxDQUFDO2lCQUNILENBQUMsQ0FDSCxDQUFDO2FBQ0g7WUFFRCxPQUFPLENBQUMsQ0FDTixJQUFJLEVBQ0o7Z0JBQ0UsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2dCQUNwQixPQUFPLEVBQUUsQ0FBQyxDQUFhLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO3dCQUNwQixLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7d0JBQzFCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDcEIsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMvQjtnQkFDSCxDQUFDO2dCQUNELFNBQVMsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVc7YUFDakMsRUFDRCxPQUFPLENBQ1IsQ0FBQztRQUNKLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jdGlvbk4gfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nO1xuaW1wb3J0IHsgQkNoZWNrYm94IH0gZnJvbSAnLi4vZm9ybS9jaGVja2JveC9CQ2hlY2tib3gnO1xuaW1wb3J0IHsgZ2V0T2JqZWN0VmFsdWVCeVBhdGgsIGlzU3RyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvaGVscGVycyc7XG5pbXBvcnQgeyB1c2VJbmplY3RlZENoZWNrYWJsZVRhYmxlIH0gZnJvbSAnLi9jb21wb3NhYmxlcy91c2VDaGVja2FibGVUYWJsZSc7XG5pbXBvcnQgeyB1c2VJbmplY3RlZFNlbGVjdGFibGVUYWJsZSB9IGZyb20gJy4vY29tcG9zYWJsZXMvdXNlU2VsZWN0YWJsZVRhYmxlJztcbmltcG9ydCB7IEJUYWJsZUNvbHVtbiwgQlRhYmxlUm93IH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgaCwgVk5vZGUsIGRlZmluZUNvbXBvbmVudCwgY29tcHV0ZWQsIFByb3BUeXBlIH0gZnJvbSAndnVlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ2ItdGFibGUtcm93JyxcbiAgcHJvcHM6IHtcbiAgICBjb2x1bW5zOiB7XG4gICAgICB0eXBlOiBBcnJheSBhcyBQcm9wVHlwZTxCVGFibGVDb2x1bW5bXT4sXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcm93OiB7XG4gICAgICB0eXBlOiBPYmplY3QgYXMgUHJvcFR5cGU8QlRhYmxlUm93PixcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBvblJvd0NsaWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvbiBhcyBQcm9wVHlwZTxGdW5jdGlvbk48W0JUYWJsZVJvdywgTW91c2VFdmVudF0sIHZvaWQ+PixcbiAgICAgIHJlcXVpcmVkOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgY2hlY2tlZFJvd0lkcywgdmFyaWFudCwgdG9nZ2xlUm93IH0gPSB1c2VJbmplY3RlZENoZWNrYWJsZVRhYmxlKCk7XG4gICAgY29uc3QgeyBzZWxlY3RlZFJvd0lkcywgdG9nZ2xlUm93U2VsZWN0aW9uIH0gPSB1c2VJbmplY3RlZFNlbGVjdGFibGVUYWJsZSgpO1xuICAgIGNvbnN0IGlzQ2hlY2tlZCA9IGNvbXB1dGVkKCgpID0+IGNoZWNrZWRSb3dJZHMudmFsdWUuaGFzKHByb3BzLnJvdy5pZCkpO1xuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBjb21wdXRlZCgoKSA9PiBzZWxlY3RlZFJvd0lkcy52YWx1ZS5oYXMocHJvcHMucm93LmlkKSk7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICAnaXMtc2VsZWN0ZWQnOiBpc1NlbGVjdGVkLnZhbHVlLFxuICAgICAgICAgICdpcy1jaGVja2VkJzogaXNDaGVja2VkLnZhbHVlLFxuICAgICAgICAgICdpcy1kcmFnZ2FibGUnOiBwcm9wcy5yb3cuaXNEcmFnZ2FibGUsXG4gICAgICAgICAgJ2lzLWRyb3BwYWJsZSc6IHByb3BzLnJvdy5pc0Ryb3BwYWJsZVxuICAgICAgICB9LFxuICAgICAgICBwcm9wcy5yb3cuY2xhc3Nlc1xuICAgICAgXTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb2x1bW5zOiBWTm9kZVtdID0gcHJvcHMuY29sdW1ucy5tYXAoKGNvbHVtbjogQlRhYmxlQ29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gW107XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaXNTdHJpbmcoY29sdW1uLnZhbHVlKVxuICAgICAgICAgID8gZ2V0T2JqZWN0VmFsdWVCeVBhdGgocHJvcHMucm93LmRhdGEsIGNvbHVtbi52YWx1ZSlcbiAgICAgICAgICA6IGNvbHVtbi52YWx1ZSAmJiBjb2x1bW4udmFsdWUocHJvcHMucm93KTtcbiAgICAgICAgY29uc3QgY29sdW1uU2xvdCA9IHNsb3RzW2NvbHVtbi5zbG90TmFtZSB8fCBjb2x1bW4ubGFiZWxdO1xuXG4gICAgICAgIGlmIChjb2x1bW5TbG90KSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChjb2x1bW5TbG90KHsgcm93OiBwcm9wcy5yb3csIGNvbHVtbiwgdmFsdWUgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2godmFsdWUgPT0gbnVsbCA/IHZhbHVlIDogU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZXh0Q2xhc3MgPVxuICAgICAgICAgIGNvbHVtbi5wb3NpdGlvbiA9PT0gJ2lzLWxlZnQnXG4gICAgICAgICAgICA/ICdoYXMtdGV4dC1sZWZ0J1xuICAgICAgICAgICAgOiBjb2x1bW4ucG9zaXRpb24gPT09ICdpcy1jZW50ZXJlZCdcbiAgICAgICAgICAgID8gJ2hhcy10ZXh0LWNlbnRlcmVkJ1xuICAgICAgICAgICAgOiAnaGFzLXRleHQtcmlnaHQnO1xuXG4gICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICd0ZCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3M6IFt0ZXh0Q2xhc3MsIHsgJ2lzLXN0aWNreS1sZWZ0JzogY29sdW1uLmlzU3RpY2t5IH1dLFxuICAgICAgICAgICAgJ2RhdGEtbGFiZWwnOiBjb2x1bW4ubGFiZWxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHByb3BzLnJvdy5pc0NoZWNrYWJsZSkge1xuICAgICAgICBjb2x1bW5zLnVuc2hpZnQoXG4gICAgICAgICAgaCgndGQnLCB7IGNsYXNzOiAnY2hlY2tib3gtY2VsbCcgfSwgW1xuICAgICAgICAgICAgaChCQ2hlY2tib3gsIHtcbiAgICAgICAgICAgICAgbW9kZWxWYWx1ZTogaXNDaGVja2VkLnZhbHVlLFxuICAgICAgICAgICAgICB2YXJpYW50OiB2YXJpYW50LnZhbHVlLFxuICAgICAgICAgICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IHRvZ2dsZVJvd1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgJ3RyJyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICAgIG9uQ2xpY2s6IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvcHMub25Sb3dDbGljaykge1xuICAgICAgICAgICAgICBwcm9wcy5vblJvd0NsaWNrKHByb3BzLnJvdywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHMucm93LmlzU2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICB0b2dnbGVSb3dTZWxlY3Rpb24ocHJvcHMucm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRyYWdnYWJsZTogcHJvcHMucm93LmlzRHJhZ2dhYmxlXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbnNcbiAgICAgICk7XG4gICAgfTtcbiAgfVxufSk7XG4iXX0=