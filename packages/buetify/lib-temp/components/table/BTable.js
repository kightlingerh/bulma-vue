import { isEmpty } from 'fp-ts/lib/Array';
import { exists, fromNullable, isSome } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, h, computed } from 'vue';
import { useProxy } from '../../composables/proxy';
import { useWindowSize } from '../../composables/windowSize';
import BSimpleTable from './BSimpleTable';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import BTableRowElement from './BTableRow';
import { BTableCheckPropsDefinition, useCheckableTable } from './composables/useCheckableTable';
import { BTableDraggablePropsDefinition, useDraggableTable } from './composables/useDraggableTable';
import { BTableSelectablePropsDefinition, useSelectableTable } from './composables/useSelectableTable';
import { BTableSortingPropsDefinition, useSorting } from './composables/useSorting';
import { eqBTableRow, eqColumnTableData } from './shared';
import './table.sass';
export const BTablePropsDefinition = {
    isBordered: {
        type: Boolean,
        default: false
    },
    isStriped: {
        type: Boolean,
        default: false
    },
    isNarrow: {
        type: Boolean,
        default: false
    },
    isFullwidth: {
        type: Boolean,
        default: true
    },
    size: {
        type: String,
        default: ''
    },
    isHoverable: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    isScrollable: {
        type: Boolean,
        default: true
    },
    columns: {
        type: Array,
        required: true
    },
    isFocusable: {
        type: Boolean,
        default: false
    },
    useMobileCards: {
        type: Boolean,
        default: true
    },
    mobileSortPlaceholder: {
        type: String
    },
    headerClasses: {
        type: [String, Object, Array],
        default: undefined
    },
    onRowClick: {
        type: Function,
        required: false
    },
    ...BTableCheckPropsDefinition,
    ...BTableDraggablePropsDefinition,
    ...BTableSelectablePropsDefinition,
    ...BTableSortingPropsDefinition
};
function getBTableRow(rowProps) {
    return (data, index) => ({
        ...data,
        index,
        isDroppable: data.isDroppable !== undefined ? data.isDroppable : rowProps.isDraggable,
        isDraggable: data.isDraggable !== undefined ? data.isDraggable : rowProps.isDraggable,
        isSelectable: data.isSelectable !== undefined ? data.isSelectable : rowProps.isSelectable,
        isCheckable: data.isCheckable !== undefined ? data.isCheckable : rowProps.isCheckable
    });
}
function generateMobileSort(props, sort, visibleColumns) {
    return h(BTableMobileSort, {
        sortColumn: sort.sortColumn.value,
        'onUpdate:sortColumn': sort['onUpdate:sortColumn'],
        sortType: sort.sortType.value,
        'onUpdate:sortType': sort['onUpdate:sortType'],
        columns: visibleColumns.value,
        placeholder: props.mobileSortPlaceholder
    });
}
function generateTableHeader(props, sort, visibleColumns, slots) {
    return h(BTableHeader, {
        class: props.headerClasses,
        columns: visibleColumns.value,
        sortType: sort.sortType.value,
        'onUpdate:sortType': sort['onUpdate:sortType'],
        'onUpdate:sortColumn': sort['onUpdate:sortColumn']
    }, { ...slots });
}
function generateEmptyTable(columns, slots) {
    return h('tbody', [
        h('tr', { class: 'is-empty' }, [
            h('td', { colspan: columns.value.filter(column => column.isVisible).length }, slots.empty && slots.empty())
        ])
    ]);
}
function generateRows(props, rows, visibleColumns, drag, slots) {
    return rows.value.map((row, index) => h(BTableRowElement, {
        key: row.id,
        class: {
            'is-drop-target': isSome(drag.dropTarget.value)
                ? eqBTableRow.equals(row, drag.dropTarget.value.value)
                : false,
            'is-undroppable': drag.dragIsActive.value && !row.isDroppable
        },
        row,
        onRowClick: props.onRowClick,
        columns: visibleColumns.value,
        ...drag.getRowDragListeners(row, index)
    }, { ...slots }));
}
function generateTableBody(props, rows, visibleColumns, drag, slots) {
    if (isEmpty(rows.value) || isEmpty(visibleColumns.value)) {
        return generateEmptyTable(visibleColumns, slots);
    }
    if (slots.row) {
        return h('tbody', rows.value.map((row, index) => h('tr', { key: row.id }, slots.row &&
            slots.row({
                row,
                index,
                columns: visibleColumns.value
            }))));
    }
    else {
        return h('tbody', generateRows(props, rows, visibleColumns, drag, slots));
    }
}
function generateTableFooter(visibleColumns, slots) {
    return h('tfoot', [
        h('tr', { class: 'table-footer' }, slots.footer && slots.footer({ numberOfColumns: visibleColumns.value.length }))
    ]);
}
function generateTable(props, rows, visibleColumns, drag, sort, slots) {
    return h(BSimpleTable, {
        tableClasses: [
            {
                'is-bordered': props.isBordered,
                'is-striped': props.isStriped,
                'is-narrow': props.isNarrow,
                'is-fullwidth': props.isFullwidth,
                'is-hoverable': props.isHoverable,
                'has-mobile-cards': props.useMobileCards
            },
            props.size
        ],
        isLoading: props.isLoading,
        isScrollable: props.isScrollable
    }, () => {
        const nodes = [
            generateTableHeader(props, sort, visibleColumns, slots),
            generateTableBody(props, rows, visibleColumns, drag, slots)
        ];
        if (slots.footer) {
            nodes.push(generateTableFooter(visibleColumns, slots));
        }
        return nodes;
    });
}
export default defineComponent({
    name: 'b-table',
    props: BTablePropsDefinition,
    setup(props, { slots }) {
        const rows = computed(() => props.rows.map(getBTableRow(props)));
        const { value: sortColumn } = useProxy(computed(() => fromNullable(props.sortColumn)), (column) => {
            if (props['onUpdate:sortColumn'] && isSome(column)) {
                props['onUpdate:sortColumn'](column.value);
            }
        });
        function isCurrentSortColumn(column) {
            return pipe(sortColumn.value, exists(c => eqColumnTableData.equals(column, c)));
        }
        const columns = computed(() => props.columns.map((column) => {
            return {
                ...column,
                position: column.position ?? 'is-centered',
                isVisible: column.isVisible ?? true,
                isSortColumn: isCurrentSortColumn(column),
                isSortable: !!column.isSortable || !!column.ord
            };
        }));
        const sort = useSorting(props, sortColumn, rows, columns);
        useCheckableTable(props, rows);
        useSelectableTable(props);
        const drag = useDraggableTable(props);
        const windowSize = useWindowSize();
        const useMobileSorting = computed(() => props.useMobileCards && windowSize.value.isTouch);
        const visibleColumns = computed(() => columns.value.filter(column => column.isVisible));
        return () => h('div', useMobileSorting.value
            ? [generateMobileSort(props, sort, visibleColumns)]
            : [generateTable(props, rows, visibleColumns, drag, sort, slots)]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdGFibGUvQlRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQTBDLFFBQVEsRUFBUyxNQUFNLEtBQUssQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzdELE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxnQkFBZ0IsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEcsT0FBTyxFQUFFLDhCQUE4QixFQUFxQixpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZILE9BQU8sRUFDTCwrQkFBK0IsRUFDL0Isa0JBQWtCLEVBQ25CLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLDRCQUE0QixFQUFjLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hHLE9BQU8sRUFBNEQsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BILE9BQU8sY0FBYyxDQUFDO0FBRXRCLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHO0lBQ25DLFVB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QUssRUFDTCxnQkFBZ0IsQ0FBQyxLQUFLO1lBQ3BCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDcEUsQ0FBQztJQUNOLENBQUM7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnZnAtdHMvbGliL0FycmF5JztcbmltcG9ydCB7IEZ1bmN0aW9uTiB9IGZyb20gJ2ZwLXRzL2xpYi9mdW5jdGlvbic7XG5pbXBvcnQgeyBleGlzdHMsIGZyb21OdWxsYWJsZSwgaXNTb21lLCBPcHRpb24gfSBmcm9tICdmcC10cy9saWIvT3B0aW9uJztcbmltcG9ydCB7IHBpcGUgfSBmcm9tICdmcC10cy9saWIvcGlwZWFibGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCBoLCBQcm9wVHlwZSwgVk5vZGUsIFJlZiwgRXh0cmFjdFByb3BUeXBlcywgY29tcHV0ZWQsIFNsb3RzIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHVzZVByb3h5IH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJveHknO1xuaW1wb3J0IHsgdXNlV2luZG93U2l6ZSB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3dpbmRvd1NpemUnO1xuaW1wb3J0IHsgU2l6ZVZhcmlhbnQgfSBmcm9tICcuLi8uLi90eXBlcy9TaXplVmFyaWFudHMnO1xuaW1wb3J0IHsgQ2xhc3NlcyB9IGZyb20gJy4uLy4uL3V0aWxzL21lcmdlQ2xhc3Nlcyc7XG5pbXBvcnQgQlNpbXBsZVRhYmxlIGZyb20gJy4vQlNpbXBsZVRhYmxlJztcbmltcG9ydCBCVGFibGVIZWFkZXIgZnJvbSAnLi9CVGFibGVIZWFkZXInO1xuaW1wb3J0IEJUYWJsZU1vYmlsZVNvcnQgZnJvbSAnLi9CVGFibGVNb2JpbGVTb3J0JztcbmltcG9ydCBCVGFibGVSb3dFbGVtZW50IGZyb20gJy4vQlRhYmxlUm93JztcbmltcG9ydCB7IEJUYWJsZUNoZWNrUHJvcHNEZWZpbml0aW9uLCB1c2VDaGVja2FibGVUYWJsZSB9IGZyb20gJy4vY29tcG9zYWJsZXMvdXNlQ2hlY2thYmxlVGFibGUnO1xuaW1wb3J0IHsgQlRhYmxlRHJhZ2dhYmxlUHJvcHNEZWZpbml0aW9uLCBVc2VEcmFnZ2FibGVUYWJsZSwgdXNlRHJhZ2dhYmxlVGFibGUgfSBmcm9tICcuL2NvbXBvc2FibGVzL3VzZURyYWdnYWJsZVRhYmxlJztcbmltcG9ydCB7XG4gIEJUYWJsZVNlbGVjdGFibGVQcm9wc0RlZmluaXRpb24sXG4gIHVzZVNlbGVjdGFibGVUYWJsZVxufSBmcm9tICcuL2NvbXBvc2FibGVzL3VzZVNlbGVjdGFibGVUYWJsZSc7XG5pbXBvcnQgeyBCVGFibGVTb3J0aW5nUHJvcHNEZWZpbml0aW9uLCBVc2VTb3J0aW5nLCB1c2VTb3J0aW5nIH0gZnJvbSAnLi9jb21wb3NhYmxlcy91c2VTb3J0aW5nJztcbmltcG9ydCB7IEJUYWJsZUNvbHVtbiwgQlRhYmxlQ29sdW1uRGF0YSwgQlRhYmxlUm93LCBCVGFibGVSb3dEYXRhLCBlcUJUYWJsZVJvdywgZXFDb2x1bW5UYWJsZURhdGEgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgJy4vdGFibGUuc2Fzcyc7XG5cbmV4cG9ydCBjb25zdCBCVGFibGVQcm9wc0RlZmluaXRpb24gPSB7XG4gIGlzQm9yZGVyZWQ6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGlzU3RyaXBlZDoge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogZmFsc2VcbiAgfSxcbiAgaXNOYXJyb3c6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGlzRnVsbHdpZHRoOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIHNpemU6IHtcbiAgICB0eXBlOiBTdHJpbmcgYXMgUHJvcFR5cGU8U2l6ZVZhcmlhbnQ+LFxuICAgIGRlZmF1bHQ6ICcnIGFzIGNvbnN0XG4gIH0sXG4gIGlzSG92ZXJhYmxlOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICBkZWZhdWx0OiBmYWxzZVxuICB9LFxuICBpc0xvYWRpbmc6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGlzU2Nyb2xsYWJsZToge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBjb2x1bW5zOiB7XG4gICAgdHlwZTogQXJyYXkgYXMgUHJvcFR5cGU8QlRhYmxlQ29sdW1uRGF0YTx1bmtub3duPltdPixcbiAgICByZXF1aXJlZDogdHJ1ZSBhcyBjb25zdFxuICB9LFxuICBpc0ZvY3VzYWJsZToge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogZmFsc2VcbiAgfSxcbiAgdXNlTW9iaWxlQ2FyZHM6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgbW9iaWxlU29ydFBsYWNlaG9sZGVyOiB7XG4gICAgdHlwZTogU3RyaW5nIGFzIFByb3BUeXBlPHN0cmluZz5cbiAgfSxcbiAgaGVhZGVyQ2xhc3Nlczoge1xuICAgIHR5cGU6IFtTdHJpbmcsIE9iamVjdCwgQXJyYXldIGFzIFByb3BUeXBlPENsYXNzZXM+LFxuICAgIGRlZmF1bHQ6IHVuZGVmaW5lZFxuICB9LFxuICBvblJvd0NsaWNrOiB7XG4gICAgdHlwZTogRnVuY3Rpb24gYXMgUHJvcFR5cGU8RnVuY3Rpb25OPFtCVGFibGVSb3csIE1vdXNlRXZlbnRdLCB2b2lkPj4sXG4gICAgcmVxdWlyZWQ6IGZhbHNlXG4gIH0sXG4gIC4uLkJUYWJsZUNoZWNrUHJvcHNEZWZpbml0aW9uLFxuICAuLi5CVGFibGVEcmFnZ2FibGVQcm9wc0RlZmluaXRpb24sXG4gIC4uLkJUYWJsZVNlbGVjdGFibGVQcm9wc0RlZmluaXRpb24sXG4gIC4uLkJUYWJsZVNvcnRpbmdQcm9wc0RlZmluaXRpb25cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQlRhYmxlUHJvcHMgZXh0ZW5kcyBFeHRyYWN0UHJvcFR5cGVzPHR5cGVvZiBCVGFibGVQcm9wc0RlZmluaXRpb24+IHt9XG5cbmludGVyZmFjZSBSb3dQcm9wcyB7XG4gIGlzU2VsZWN0YWJsZTogYm9vbGVhbjtcbiAgaXNDaGVja2FibGU6IGJvb2xlYW47XG4gIGlzRHJhZ2dhYmxlOiBib29sZWFuO1xufVxuXG5mdW5jdGlvbiBnZXRCVGFibGVSb3cocm93UHJvcHM6IFJvd1Byb3BzKSB7XG4gIHJldHVybiAoZGF0YTogQlRhYmxlUm93RGF0YSwgaW5kZXg6IG51bWJlcik6IEJUYWJsZVJvdyA9PiAoe1xuICAgIC4uLmRhdGEsXG4gICAgaW5kZXgsXG4gICAgaXNEcm9wcGFibGU6IGRhdGEuaXNEcm9wcGFibGUgIT09IHVuZGVmaW5lZCA/IGRhdGEuaXNEcm9wcGFibGUgOiByb3dQcm9wcy5pc0RyYWdnYWJsZSxcbiAgICBpc0RyYWdnYWJsZTogZGF0YS5pc0RyYWdnYWJsZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5pc0RyYWdnYWJsZSA6IHJvd1Byb3BzLmlzRHJhZ2dhYmxlLFxuICAgIGlzU2VsZWN0YWJsZTogZGF0YS5pc1NlbGVjdGFibGUgIT09IHVuZGVmaW5lZCA/IGRhdGEuaXNTZWxlY3RhYmxlIDogcm93UHJvcHMuaXNTZWxlY3RhYmxlLFxuICAgIGlzQ2hlY2thYmxlOiBkYXRhLmlzQ2hlY2thYmxlICE9PSB1bmRlZmluZWQgPyBkYXRhLmlzQ2hlY2thYmxlIDogcm93UHJvcHMuaXNDaGVja2FibGVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTW9iaWxlU29ydChwcm9wczogQlRhYmxlUHJvcHMsIHNvcnQ6IFVzZVNvcnRpbmcsIHZpc2libGVDb2x1bW5zOiBSZWY8QlRhYmxlQ29sdW1uW10+KSB7XG4gIHJldHVybiBoKEJUYWJsZU1vYmlsZVNvcnQsIHtcbiAgICBzb3J0Q29sdW1uOiBzb3J0LnNvcnRDb2x1bW4udmFsdWUgYXMgYW55LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgJ29uVXBkYXRlOnNvcnRDb2x1bW4nOiBzb3J0WydvblVwZGF0ZTpzb3J0Q29sdW1uJ10sXG4gICAgc29ydFR5cGU6IHNvcnQuc29ydFR5cGUudmFsdWUsXG4gICAgJ29uVXBkYXRlOnNvcnRUeXBlJzogc29ydFsnb25VcGRhdGU6c29ydFR5cGUnXSxcbiAgICBjb2x1bW5zOiB2aXNpYmxlQ29sdW1ucy52YWx1ZSxcbiAgICBwbGFjZWhvbGRlcjogcHJvcHMubW9iaWxlU29ydFBsYWNlaG9sZGVyXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlSGVhZGVyKFxuICBwcm9wczogQlRhYmxlUHJvcHMsXG4gIHNvcnQ6IFVzZVNvcnRpbmcsXG4gIHZpc2libGVDb2x1bW5zOiBSZWY8QlRhYmxlQ29sdW1uW10+LFxuICBzbG90czogU2xvdHNcbik6IFZOb2RlIHtcbiAgcmV0dXJuIGgoXG4gICAgQlRhYmxlSGVhZGVyLFxuICAgIHtcbiAgICAgIGNsYXNzOiBwcm9wcy5oZWFkZXJDbGFzc2VzLFxuICAgICAgY29sdW1uczogdmlzaWJsZUNvbHVtbnMudmFsdWUsXG4gICAgICBzb3J0VHlwZTogc29ydC5zb3J0VHlwZS52YWx1ZSxcbiAgICAgICdvblVwZGF0ZTpzb3J0VHlwZSc6IHNvcnRbJ29uVXBkYXRlOnNvcnRUeXBlJ10sXG4gICAgICAnb25VcGRhdGU6c29ydENvbHVtbic6IHNvcnRbJ29uVXBkYXRlOnNvcnRDb2x1bW4nXVxuICAgIH0sXG4gICAgeyAuLi5zbG90cyB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRW1wdHlUYWJsZShjb2x1bW5zOiBSZWY8QlRhYmxlQ29sdW1uW10+LCBzbG90czogU2xvdHMpOiBWTm9kZSB7XG4gIHJldHVybiBoKCd0Ym9keScsIFtcbiAgICBoKCd0cicsIHsgY2xhc3M6ICdpcy1lbXB0eScgfSwgW1xuICAgICAgaCgndGQnLCB7IGNvbHNwYW46IGNvbHVtbnMudmFsdWUuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4uaXNWaXNpYmxlKS5sZW5ndGggfSwgc2xvdHMuZW1wdHkgJiYgc2xvdHMuZW1wdHkoKSlcbiAgICBdKVxuICBdKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSb3dzKFxuICBwcm9wczogQlRhYmxlUHJvcHMsXG4gIHJvd3M6IFJlZjxCVGFibGVSb3dbXT4sXG4gIHZpc2libGVDb2x1bW5zOiBSZWY8QlRhYmxlQ29sdW1uW10+LFxuICBkcmFnOiBVc2VEcmFnZ2FibGVUYWJsZSxcbiAgc2xvdHM6IFNsb3RzXG4pIHtcbiAgcmV0dXJuIHJvd3MudmFsdWUubWFwKChyb3csIGluZGV4KSA9PlxuICAgIGgoXG4gICAgICBCVGFibGVSb3dFbGVtZW50LFxuICAgICAge1xuICAgICAgICBrZXk6IHJvdy5pZCxcbiAgICAgICAgY2xhc3M6IHtcbiAgICAgICAgICAnaXMtZHJvcC10YXJnZXQnOiBpc1NvbWUoZHJhZy5kcm9wVGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgPyBlcUJUYWJsZVJvdy5lcXVhbHMocm93LCBkcmFnLmRyb3BUYXJnZXQudmFsdWUudmFsdWUpXG4gICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICAgICdpcy11bmRyb3BwYWJsZSc6IGRyYWcuZHJhZ0lzQWN0aXZlLnZhbHVlICYmICFyb3cuaXNEcm9wcGFibGVcbiAgICAgICAgfSxcbiAgICAgICAgcm93LFxuICAgICAgICBvblJvd0NsaWNrOiBwcm9wcy5vblJvd0NsaWNrLFxuICAgICAgICBjb2x1bW5zOiB2aXNpYmxlQ29sdW1ucy52YWx1ZSxcbiAgICAgICAgLi4uZHJhZy5nZXRSb3dEcmFnTGlzdGVuZXJzKHJvdywgaW5kZXgpXG4gICAgICB9LFxuICAgICAgeyAuLi5zbG90cyB9XG4gICAgKVxuICApO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlQm9keShcbiAgcHJvcHM6IEJUYWJsZVByb3BzLFxuICByb3dzOiBSZWY8QlRhYmxlUm93W10+LFxuICB2aXNpYmxlQ29sdW1uczogUmVmPEJUYWJsZUNvbHVtbltdPixcbiAgZHJhZzogVXNlRHJhZ2dhYmxlVGFibGUsXG4gIHNsb3RzOiBTbG90c1xuKTogVk5vZGUge1xuICBpZiAoaXNFbXB0eShyb3dzLnZhbHVlKSB8fCBpc0VtcHR5KHZpc2libGVDb2x1bW5zLnZhbHVlKSkge1xuICAgIHJldHVybiBnZW5lcmF0ZUVtcHR5VGFibGUodmlzaWJsZUNvbHVtbnMsIHNsb3RzKTtcbiAgfVxuICBpZiAoc2xvdHMucm93KSB7XG4gICAgcmV0dXJuIGgoXG4gICAgICAndGJvZHknLFxuICAgICAgcm93cy52YWx1ZS5tYXAoKHJvdywgaW5kZXgpID0+XG4gICAgICAgIGgoXG4gICAgICAgICAgJ3RyJyxcbiAgICAgICAgICB7IGtleTogcm93LmlkIH0sXG4gICAgICAgICAgc2xvdHMucm93ICYmXG4gICAgICAgICAgICBzbG90cy5yb3coe1xuICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICBjb2x1bW5zOiB2aXNpYmxlQ29sdW1ucy52YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGgoJ3Rib2R5JywgZ2VuZXJhdGVSb3dzKHByb3BzLCByb3dzLCB2aXNpYmxlQ29sdW1ucywgZHJhZywgc2xvdHMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlRm9vdGVyKHZpc2libGVDb2x1bW5zOiBSZWY8QlRhYmxlQ29sdW1uW10+LCBzbG90czogU2xvdHMpOiBWTm9kZSB7XG4gIHJldHVybiBoKCd0Zm9vdCcsIFtcbiAgICBoKCd0cicsIHsgY2xhc3M6ICd0YWJsZS1mb290ZXInIH0sIHNsb3RzLmZvb3RlciAmJiBzbG90cy5mb290ZXIoeyBudW1iZXJPZkNvbHVtbnM6IHZpc2libGVDb2x1bW5zLnZhbHVlLmxlbmd0aCB9KSlcbiAgXSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGFibGUoXG4gIHByb3BzOiBCVGFibGVQcm9wcyxcbiAgcm93czogUmVmPEJUYWJsZVJvd1tdPixcbiAgdmlzaWJsZUNvbHVtbnM6IFJlZjxCVGFibGVDb2x1bW5bXT4sXG4gIGRyYWc6IFVzZURyYWdnYWJsZVRhYmxlLFxuICBzb3J0OiBVc2VTb3J0aW5nLFxuICBzbG90czogU2xvdHNcbik6IFZOb2RlIHtcbiAgcmV0dXJuIGgoXG4gICAgQlNpbXBsZVRhYmxlLFxuICAgIHtcbiAgICAgIHRhYmxlQ2xhc3NlczogW1xuICAgICAgICB7XG4gICAgICAgICAgJ2lzLWJvcmRlcmVkJzogcHJvcHMuaXNCb3JkZXJlZCxcbiAgICAgICAgICAnaXMtc3RyaXBlZCc6IHByb3BzLmlzU3RyaXBlZCxcbiAgICAgICAgICAnaXMtbmFycm93JzogcHJvcHMuaXNOYXJyb3csXG4gICAgICAgICAgJ2lzLWZ1bGx3aWR0aCc6IHByb3BzLmlzRnVsbHdpZHRoLFxuICAgICAgICAgICdpcy1ob3ZlcmFibGUnOiBwcm9wcy5pc0hvdmVyYWJsZSxcbiAgICAgICAgICAnaGFzLW1vYmlsZS1jYXJkcyc6IHByb3BzLnVzZU1vYmlsZUNhcmRzXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BzLnNpemVcbiAgICAgIF0sXG4gICAgICBpc0xvYWRpbmc6IHByb3BzLmlzTG9hZGluZyxcbiAgICAgIGlzU2Nyb2xsYWJsZTogcHJvcHMuaXNTY3JvbGxhYmxlXG4gICAgfSxcbiAgICAoKSA9PiB7XG4gICAgICBjb25zdCBub2RlcyA9IFtcbiAgICAgICAgZ2VuZXJhdGVUYWJsZUhlYWRlcihwcm9wcywgc29ydCwgdmlzaWJsZUNvbHVtbnMsIHNsb3RzKSxcbiAgICAgICAgZ2VuZXJhdGVUYWJsZUJvZHkocHJvcHMsIHJvd3MsIHZpc2libGVDb2x1bW5zLCBkcmFnLCBzbG90cylcbiAgICAgIF07XG4gICAgICBpZiAoc2xvdHMuZm9vdGVyKSB7XG4gICAgICAgIG5vZGVzLnB1c2goZ2VuZXJhdGVUYWJsZUZvb3Rlcih2aXNpYmxlQ29sdW1ucywgc2xvdHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdiLXRhYmxlJyxcbiAgcHJvcHM6IEJUYWJsZVByb3BzRGVmaW5pdGlvbixcbiAgc2V0dXAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHJvd3MgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5yb3dzLm1hcChnZXRCVGFibGVSb3cocHJvcHMpKSk7XG4gICAgY29uc3QgeyB2YWx1ZTogc29ydENvbHVtbiB9ID0gdXNlUHJveHkoXG4gICAgICBjb21wdXRlZCgoKSA9PiBmcm9tTnVsbGFibGUocHJvcHMuc29ydENvbHVtbikpLFxuICAgICAgKGNvbHVtbjogT3B0aW9uPEJUYWJsZUNvbHVtbkRhdGE8dW5rbm93bj4+KSA9PiB7XG4gICAgICAgIGlmIChwcm9wc1snb25VcGRhdGU6c29ydENvbHVtbiddICYmIGlzU29tZShjb2x1bW4pKSB7XG4gICAgICAgICAgcHJvcHNbJ29uVXBkYXRlOnNvcnRDb2x1bW4nXShjb2x1bW4udmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGlzQ3VycmVudFNvcnRDb2x1bW4oY29sdW1uOiBCVGFibGVDb2x1bW5EYXRhPHVua25vd24+KTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gcGlwZShcbiAgICAgICAgc29ydENvbHVtbi52YWx1ZSxcbiAgICAgICAgZXhpc3RzKGMgPT4gZXFDb2x1bW5UYWJsZURhdGEuZXF1YWxzKGNvbHVtbiwgYykpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbHVtbnM6IFJlZjxCVGFibGVDb2x1bW48dW5rbm93bj5bXT4gPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuY29sdW1ucy5tYXAoKGNvbHVtbjogQlRhYmxlQ29sdW1uRGF0YTx1bmtub3duPikgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICBwb3NpdGlvbjogY29sdW1uLnBvc2l0aW9uID8/ICdpcy1jZW50ZXJlZCcsXG4gICAgICAgICAgaXNWaXNpYmxlOiBjb2x1bW4uaXNWaXNpYmxlID8/IHRydWUsXG4gICAgICAgICAgaXNTb3J0Q29sdW1uOiBpc0N1cnJlbnRTb3J0Q29sdW1uKGNvbHVtbiksXG4gICAgICAgICAgaXNTb3J0YWJsZTogISFjb2x1bW4uaXNTb3J0YWJsZSB8fCAhIWNvbHVtbi5vcmRcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb25zdCBzb3J0ID0gdXNlU29ydGluZyhwcm9wcywgc29ydENvbHVtbiwgcm93cywgY29sdW1ucyk7XG4gICAgdXNlQ2hlY2thYmxlVGFibGUocHJvcHMsIHJvd3MpO1xuICAgIHVzZVNlbGVjdGFibGVUYWJsZShwcm9wcyk7XG4gICAgY29uc3QgZHJhZyA9IHVzZURyYWdnYWJsZVRhYmxlKHByb3BzKTtcblxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSB1c2VXaW5kb3dTaXplKCk7XG4gICAgY29uc3QgdXNlTW9iaWxlU29ydGluZyA9IGNvbXB1dGVkKCgpID0+IHByb3BzLnVzZU1vYmlsZUNhcmRzICYmIHdpbmRvd1NpemUudmFsdWUuaXNUb3VjaCk7XG4gICAgY29uc3QgdmlzaWJsZUNvbHVtbnMgPSBjb21wdXRlZCgoKSA9PiBjb2x1bW5zLnZhbHVlLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLmlzVmlzaWJsZSkpO1xuXG4gICAgcmV0dXJuICgpID0+XG4gICAgICBoKFxuICAgICAgICAnZGl2JyxcbiAgICAgICAgdXNlTW9iaWxlU29ydGluZy52YWx1ZVxuICAgICAgICAgID8gW2dlbmVyYXRlTW9iaWxlU29ydChwcm9wcywgc29ydCwgdmlzaWJsZUNvbHVtbnMpXVxuICAgICAgICAgIDogW2dlbmVyYXRlVGFibGUocHJvcHMsIHJvd3MsIHZpc2libGVDb2x1bW5zLCBkcmFnLCBzb3J0LCBzbG90cyldXG4gICAgICApO1xuICB9XG59KTtcbiJdfQ==