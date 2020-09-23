import './datepicker.sass';
import { DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import { addDays, getDatesInWeek, getEndOfMonth, getEndOfWeek, getStartOfMonth, getStartOfWeek, isDate, isOnOrAfterDate, isOnOrBeforeDate, isWithinWeek } from './utils';
import { constEmptyArray } from '../../../utils/helpers';
import { isEmpty, rotate } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { fromNullable, isNone, none } from 'fp-ts/lib/Option';
import { defineComponent, h, computed } from 'vue';
import BDatepickerTableRow from './BDatepickerTableRow';
export const BDatepickerTablePropsDefinition = {
    modelValue: {
        type: [Array, Date],
        required: true
    },
    'onUpdate:modelValue': {
        type: Function,
        required: true
    },
    focusedDate: {
        type: Object,
        required: true
    },
    'onUpdate:focusedDate': {
        type: Function,
        required: true
    },
    dateSelectionData: {
        type: Object,
        required: true
    },
    dayNames: {
        type: Array,
        default: constant(DEFAULT_DAY_NAMES)
    },
    monthNames: {
        type: Array,
        default: constant(DEFAULT_MONTH_NAMES)
    },
    firstDayOfWeek: {
        type: Number,
        default: 0
    },
    events: {
        type: Array,
        default: constEmptyArray
    },
    indicators: {
        type: String,
        required: true
    },
    minDate: {
        type: Date,
        required: false
    },
    maxDate: {
        type: Date,
        required: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    unselectableDates: {
        type: Array,
        default: constEmptyArray
    },
    unselectableDaysOfWeek: {
        type: Array,
        default: constEmptyArray
    },
    selectableDates: {
        type: Object
    },
    showWeekNumber: {
        type: Boolean,
        default: false
    }
};
function getWeeksWithinMonth(props) {
    const startOfMonth = getStartOfMonth(new Date(props.dateSelectionData.year, props.dateSelectionData.month + 1, 0));
    const endOfCalendar = getEndOfWeek(getEndOfMonth(startOfMonth));
    const weeks = [];
    let date = getStartOfWeek(startOfMonth);
    while (isOnOrBeforeDate(date, endOfCalendar)) {
        weeks.push(getDatesInWeek(date, props.firstDayOfWeek));
        date = addDays(date, 7);
    }
    return weeks;
}
function getEventsWithinWeek(props, week) {
    return props.events.filter(event => {
        const eventDate = isDate(event) ? event : event.date;
        return isWithinWeek(week[0], eventDate, props.firstDayOfWeek);
    });
}
function getWeeks(props) {
    return getWeeksWithinMonth(props).map((week, weekNumber) => ({
        week,
        weekNumber,
        events: getEventsWithinWeek(props, week)
    }));
}
function generateTableHeader(dayNames) {
    return h('thead', { class: 'datepicker-header' }, [
        h('tr', dayNames.map(day => h('th', { key: day, class: 'datepicker-cell' }, day)))
    ]);
}
function getGenerateTableRow(props, focusedDate) {
    return function generateTableRow(weekData) {
        return h(BDatepickerTableRow, {
            key: weekData.weekNumber,
            modelValue: props.modelValue,
            'onUpdate:modelValue': props['onUpdate:modelValue'],
            focusedDate: focusedDate.value,
            'onUpdate:focusedDate': (val) => {
                focusedDate.value = val;
            },
            week: weekData.week,
            weekNumber: weekData.weekNumber,
            month: props.dateSelectionData.month,
            minDate: fromNullable(props.minDate),
            maxDate: fromNullable(props.maxDate),
            unselectableDates: props.unselectableDates,
            unselectableDaysOfWeek: props.unselectableDaysOfWeek,
            selectableDates: fromNullable(props.selectableDates),
            events: weekData.events,
            indicators: props.indicators
        });
    };
}
function generateTableBody(props, focusedDate) {
    return h('tbody', {
        class: ['datepicker-body', { 'has-events': !isEmpty(props.events) }]
    }, getWeeks(props).map(getGenerateTableRow(props, focusedDate)));
}
export default defineComponent({
    name: 'b-datepicker-table',
    props: BDatepickerTablePropsDefinition,
    setup(props) {
        const focusedDate = computed({
            get() {
                return props.focusedDate;
            },
            set(date) {
                if (isNone(date)) {
                    props['onUpdate:focusedDate'](date);
                }
                else if (props.minDate && props.maxDate) {
                    props['onUpdate:focusedDate'](isOnOrAfterDate(date.value, props.minDate) && isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
                }
                else if (props.minDate) {
                    props['onUpdate:focusedDate'](isOnOrAfterDate(date.value, props.minDate) ? date : none);
                }
                else if (props.maxDate) {
                    props['onUpdate:focusedDate'](isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
                }
                else {
                    props['onUpdate:focusedDate'](date);
                }
            }
        });
        return () => {
            return h('table', { class: 'datepicker-table' }, [
                generateTableHeader(rotate(-props.firstDayOfWeek)(props.dayNames)),
                generateTableBody(props, focusedDate)
            ]);
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQkRhdGVwaWNrZXJUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2Zvcm0vZGF0ZXBpY2tlci9CRGF0ZXBpY2tlclRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFnQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoRyxPQUFPLEVBQ0wsT0FBTyxFQUNQLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxFQUNaLGVBQWUsRUFDZixjQUFjLEVBQ2QsTUFBTSxFQUNOLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsWUFBWSxFQUViLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQVUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFxQyxDQUFDLEVBQUUsUUFBUSxFQUFPLE1BQU0sS0FBSyxDQUFDO0FBQzNGLE9BQU8sbUJBQW1CLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQUc7SUFDN0MsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBNEI7UUFDOUMsUUFBUSxFQUFFLElBQWE7S0FDeEI7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsUUFBc0Q7UUFDNUQsUUFBUSxFQUFFLElBQWE7S0FDeEI7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBZ0M7UUFDdEMsUUFBUSxF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ZGF0ZXBpY2tlci5zYXNzJztcbmltcG9ydCB7IERhdGVFdmVudCwgRGF0ZVNlbGVjdGlvbkRhdGEsIERFRkFVTFRfREFZX05BTUVTLCBERUZBVUxUX01PTlRIX05BTUVTIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgYWRkRGF5cyxcbiAgZ2V0RGF0ZXNJbldlZWssXG4gIGdldEVuZE9mTW9udGgsXG4gIGdldEVuZE9mV2VlayxcbiAgZ2V0U3RhcnRPZk1vbnRoLFxuICBnZXRTdGFydE9mV2VlayxcbiAgaXNEYXRlLFxuICBpc09uT3JBZnRlckRhdGUsXG4gIGlzT25PckJlZm9yZURhdGUsXG4gIGlzV2l0aGluV2VlayxcbiAgV2Vla2RheU51bWJlclxufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGNvbnN0RW1wdHlBcnJheSB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNFbXB0eSwgcm90YXRlIH0gZnJvbSAnZnAtdHMvbGliL0FycmF5JztcbmltcG9ydCB7IGNvbnN0YW50LCBGdW5jdGlvbk4gfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nO1xuaW1wb3J0IHsgZnJvbU51bGxhYmxlLCBpc05vbmUsIG5vbmUsIE9wdGlvbiB9IGZyb20gJ2ZwLXRzL2xpYi9PcHRpb24nO1xuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCBQcm9wVHlwZSwgVk5vZGUsIEV4dHJhY3RQcm9wVHlwZXMsIGgsIGNvbXB1dGVkLCBSZWYgfSBmcm9tICd2dWUnO1xuaW1wb3J0IEJEYXRlcGlja2VyVGFibGVSb3cgZnJvbSAnLi9CRGF0ZXBpY2tlclRhYmxlUm93JztcblxuZXhwb3J0IGNvbnN0IEJEYXRlcGlja2VyVGFibGVQcm9wc0RlZmluaXRpb24gPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBbQXJyYXksIERhdGVdIGFzIFByb3BUeXBlPERhdGUgfCBEYXRlW10+LFxuICAgIHJlcXVpcmVkOiB0cnVlIGFzIGNvbnN0XG4gIH0sXG4gICdvblVwZGF0ZTptb2RlbFZhbHVlJzoge1xuICAgIHR5cGU6IEZ1bmN0aW9uIGFzIFByb3BUeXBlPEZ1bmN0aW9uTjxbRGF0ZSB8IERhdGVbXV0sIHZvaWQ+PixcbiAgICByZXF1aXJlZDogdHJ1ZSBhcyBjb25zdFxuICB9LFxuICBmb2N1c2VkRGF0ZToge1xuICAgIHR5cGU6IE9iamVjdCBhcyBQcm9wVHlwZTxPcHRpb248RGF0ZT4+LFxuICAgIHJlcXVpcmVkOiB0cnVlIGFzIGNvbnN0XG4gIH0sXG4gICdvblVwZGF0ZTpmb2N1c2VkRGF0ZSc6IHtcbiAgICB0eXBlOiBGdW5jdGlvbiBhcyBQcm9wVHlwZTxGdW5jdGlvbk48W09wdGlvbjxEYXRlPl0sIGFueT4+LFxuICAgIHJlcXVpcmVkOiB0cnVlIGFzIGNvbnN0XG4gIH0sXG4gIGRhdGVTZWxlY3Rpb25EYXRhOiB7XG4gICAgdHlwZTogT2JqZWN0IGFzIFByb3BUeXBlPERhdGVTZWxlY3Rpb25EYXRhPixcbiAgICByZXF1aXJlZDogdHJ1ZSBhcyBjb25zdFxuICB9LFxuICBkYXlOYW1lczoge1xuICAgIHR5cGU6IEFycmF5IGFzIFByb3BUeXBlPHN0cmluZ1tdPixcbiAgICBkZWZhdWx0OiBjb25zdGFudChERUZBVUxUX0RBWV9OQU1FUylcbiAgfSxcbiAgbW9udGhOYW1lczoge1xuICAgIHR5cGU6IEFycmF5IGFzIFByb3BUeXBlPHN0cmluZ1tdPixcbiAgICBkZWZhdWx0OiBjb25zdGFudChERUZBVUxUX01PTlRIX05BTUVTKVxuICB9LFxuICBmaXJzdERheU9mV2Vlazoge1xuICAgIHR5cGU6IE51bWJlciBhcyBQcm9wVHlwZTxXZWVrZGF5TnVtYmVyPixcbiAgICBkZWZhdWx0OiAwIGFzIGNvbnN0XG4gIH0sXG4gIGV2ZW50czoge1xuICAgIHR5cGU6IEFycmF5IGFzIFByb3BUeXBlPERhdGVFdmVudFtdPixcbiAgICBkZWZhdWx0OiBjb25zdEVtcHR5QXJyYXlcbiAgfSxcbiAgaW5kaWNhdG9yczoge1xuICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTwnZG90cycgfCAnYmFycyc+LFxuICAgIHJlcXVpcmVkOiB0cnVlIGFzIGNvbnN0XG4gIH0sXG4gIG1pbkRhdGU6IHtcbiAgICB0eXBlOiBEYXRlIGFzIFByb3BUeXBlPERhdGU+LFxuICAgIHJlcXVpcmVkOiBmYWxzZVxuICB9LFxuICBtYXhEYXRlOiB7XG4gICAgdHlwZTogRGF0ZSBhcyBQcm9wVHlwZTxEYXRlPixcbiAgICByZXF1aXJlZDogZmFsc2VcbiAgfSxcbiAgaXNEaXNhYmxlZDoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogZmFsc2VcbiAgfSxcbiAgdW5zZWxlY3RhYmxlRGF0ZXM6IHtcbiAgICB0eXBlOiBBcnJheSBhcyBQcm9wVHlwZTxEYXRlW10+LFxuICAgIGRlZmF1bHQ6IGNvbnN0RW1wdHlBcnJheVxuICB9LFxuICB1bnNlbGVjdGFibGVEYXlzT2ZXZWVrOiB7XG4gICAgdHlwZTogQXJyYXkgYXMgUHJvcFR5cGU8bnVtYmVyW10+LFxuICAgIGRlZmF1bHQ6IGNvbnN0RW1wdHlBcnJheVxuICB9LFxuICBzZWxlY3RhYmxlRGF0ZXM6IHtcbiAgICB0eXBlOiBPYmplY3QgYXMgUHJvcFR5cGU8RGF0ZVtdPlxuICB9LFxuICBzaG93V2Vla051bWJlcjoge1xuICAgIHR5cGU6IEJvb2xlYW4gYXMgUHJvcFR5cGU8Ym9vbGVhbj4sXG4gICAgZGVmYXVsdDogZmFsc2UgYXMgY29uc3RcbiAgfVxufTtcblxuZXhwb3J0IHR5cGUgQkRhdGVwaWNrZXJUYWJsZVByb3BzID0gRXh0cmFjdFByb3BUeXBlczx0eXBlb2YgQkRhdGVwaWNrZXJUYWJsZVByb3BzRGVmaW5pdGlvbj47XG5cbmludGVyZmFjZSBXZWVrRGF0YSB7XG4gIHdlZWs6IERhdGVbXTtcbiAgd2Vla051bWJlcjogbnVtYmVyO1xuICBldmVudHM6IERhdGVFdmVudFtdO1xufVxuXG5mdW5jdGlvbiBnZXRXZWVrc1dpdGhpbk1vbnRoKHByb3BzOiBCRGF0ZXBpY2tlclRhYmxlUHJvcHMpIHtcbiAgY29uc3Qgc3RhcnRPZk1vbnRoID0gZ2V0U3RhcnRPZk1vbnRoKG5ldyBEYXRlKHByb3BzLmRhdGVTZWxlY3Rpb25EYXRhLnllYXIsIHByb3BzLmRhdGVTZWxlY3Rpb25EYXRhLm1vbnRoICsgMSwgMCkpO1xuICBjb25zdCBlbmRPZkNhbGVuZGFyID0gZ2V0RW5kT2ZXZWVrKGdldEVuZE9mTW9udGgoc3RhcnRPZk1vbnRoKSk7XG4gIGNvbnN0IHdlZWtzOiBEYXRlW11bXSA9IFtdO1xuICBsZXQgZGF0ZSA9IGdldFN0YXJ0T2ZXZWVrKHN0YXJ0T2ZNb250aCk7XG5cbiAgd2hpbGUgKGlzT25PckJlZm9yZURhdGUoZGF0ZSwgZW5kT2ZDYWxlbmRhcikpIHtcbiAgICB3ZWVrcy5wdXNoKGdldERhdGVzSW5XZWVrKGRhdGUsIHByb3BzLmZpcnN0RGF5T2ZXZWVrKSk7XG4gICAgZGF0ZSA9IGFkZERheXMoZGF0ZSwgNyk7XG4gIH1cbiAgcmV0dXJuIHdlZWtzO1xufVxuXG5mdW5jdGlvbiBnZXRFdmVudHNXaXRoaW5XZWVrKHByb3BzOiBCRGF0ZXBpY2tlclRhYmxlUHJvcHMsIHdlZWs6IERhdGVbXSkge1xuICByZXR1cm4gcHJvcHMuZXZlbnRzLmZpbHRlcihldmVudCA9PiB7XG4gICAgY29uc3QgZXZlbnREYXRlID0gaXNEYXRlKGV2ZW50KSA/IGV2ZW50IDogZXZlbnQuZGF0ZTtcbiAgICByZXR1cm4gaXNXaXRoaW5XZWVrKHdlZWtbMF0sIGV2ZW50RGF0ZSwgcHJvcHMuZmlyc3REYXlPZldlZWspO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0V2Vla3MocHJvcHM6IEJEYXRlcGlja2VyVGFibGVQcm9wcykge1xuICByZXR1cm4gZ2V0V2Vla3NXaXRoaW5Nb250aChwcm9wcykubWFwKCh3ZWVrLCB3ZWVrTnVtYmVyKSA9PiAoe1xuICAgIHdlZWssXG4gICAgd2Vla051bWJlcixcbiAgICBldmVudHM6IGdldEV2ZW50c1dpdGhpbldlZWsocHJvcHMsIHdlZWspXG4gIH0pKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZUhlYWRlcihkYXlOYW1lczogc3RyaW5nW10pIHtcbiAgcmV0dXJuIGgoJ3RoZWFkJywgeyBjbGFzczogJ2RhdGVwaWNrZXItaGVhZGVyJyB9LCBbXG4gICAgaChcbiAgICAgICd0cicsXG4gICAgICBkYXlOYW1lcy5tYXAoZGF5ID0+IGgoJ3RoJywgeyBrZXk6IGRheSwgY2xhc3M6ICdkYXRlcGlja2VyLWNlbGwnIH0sIGRheSkpXG4gICAgKVxuICBdKTtcbn1cblxuZnVuY3Rpb24gZ2V0R2VuZXJhdGVUYWJsZVJvdyhwcm9wczogQkRhdGVwaWNrZXJUYWJsZVByb3BzLCBmb2N1c2VkRGF0ZTogUmVmPE9wdGlvbjxEYXRlPj4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdlbmVyYXRlVGFibGVSb3cod2Vla0RhdGE6IFdlZWtEYXRhKTogVk5vZGUge1xuICAgIHJldHVybiBoKEJEYXRlcGlja2VyVGFibGVSb3csIHtcbiAgICAgIGtleTogd2Vla0RhdGEud2Vla051bWJlcixcbiAgICAgIG1vZGVsVmFsdWU6IHByb3BzLm1vZGVsVmFsdWUsXG4gICAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IHByb3BzWydvblVwZGF0ZTptb2RlbFZhbHVlJ10sXG4gICAgICBmb2N1c2VkRGF0ZTogZm9jdXNlZERhdGUudmFsdWUsXG4gICAgICAnb25VcGRhdGU6Zm9jdXNlZERhdGUnOiAodmFsOiBPcHRpb248RGF0ZT4pID0+IHtcbiAgICAgICAgZm9jdXNlZERhdGUudmFsdWUgPSB2YWw7XG4gICAgICB9LFxuICAgICAgd2Vlazogd2Vla0RhdGEud2VlayxcbiAgICAgIHdlZWtOdW1iZXI6IHdlZWtEYXRhLndlZWtOdW1iZXIsXG4gICAgICBtb250aDogcHJvcHMuZGF0ZVNlbGVjdGlvbkRhdGEubW9udGgsXG4gICAgICBtaW5EYXRlOiBmcm9tTnVsbGFibGUocHJvcHMubWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiBmcm9tTnVsbGFibGUocHJvcHMubWF4RGF0ZSksXG4gICAgICB1bnNlbGVjdGFibGVEYXRlczogcHJvcHMudW5zZWxlY3RhYmxlRGF0ZXMsXG4gICAgICB1bnNlbGVjdGFibGVEYXlzT2ZXZWVrOiBwcm9wcy51bnNlbGVjdGFibGVEYXlzT2ZXZWVrLFxuICAgICAgc2VsZWN0YWJsZURhdGVzOiBmcm9tTnVsbGFibGUocHJvcHMuc2VsZWN0YWJsZURhdGVzKSxcbiAgICAgIGV2ZW50czogd2Vla0RhdGEuZXZlbnRzLFxuICAgICAgaW5kaWNhdG9yczogcHJvcHMuaW5kaWNhdG9yc1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVRhYmxlQm9keShwcm9wczogQkRhdGVwaWNrZXJUYWJsZVByb3BzLCBmb2N1c2VkRGF0ZTogUmVmPE9wdGlvbjxEYXRlPj4pOiBWTm9kZSB7XG4gIHJldHVybiBoKFxuICAgICd0Ym9keScsXG4gICAge1xuICAgICAgY2xhc3M6IFsnZGF0ZXBpY2tlci1ib2R5JywgeyAnaGFzLWV2ZW50cyc6ICFpc0VtcHR5KHByb3BzLmV2ZW50cykgfV1cbiAgICB9LFxuICAgIGdldFdlZWtzKHByb3BzKS5tYXAoZ2V0R2VuZXJhdGVUYWJsZVJvdyhwcm9wcywgZm9jdXNlZERhdGUpKVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnYi1kYXRlcGlja2VyLXRhYmxlJyxcbiAgcHJvcHM6IEJEYXRlcGlja2VyVGFibGVQcm9wc0RlZmluaXRpb24sXG4gIHNldHVwKHByb3BzKSB7XG4gICAgY29uc3QgZm9jdXNlZERhdGUgPSBjb21wdXRlZCh7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5mb2N1c2VkRGF0ZTtcbiAgICAgIH0sXG4gICAgICBzZXQoZGF0ZTogT3B0aW9uPERhdGU+KSB7XG4gICAgICAgIGlmIChpc05vbmUoZGF0ZSkpIHtcbiAgICAgICAgICBwcm9wc1snb25VcGRhdGU6Zm9jdXNlZERhdGUnXShkYXRlKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wcy5taW5EYXRlICYmIHByb3BzLm1heERhdGUpIHtcbiAgICAgICAgICBwcm9wc1snb25VcGRhdGU6Zm9jdXNlZERhdGUnXShcbiAgICAgICAgICAgIGlzT25PckFmdGVyRGF0ZShkYXRlLnZhbHVlLCBwcm9wcy5taW5EYXRlKSAmJiBpc09uT3JCZWZvcmVEYXRlKGRhdGUudmFsdWUsIHByb3BzLm1heERhdGUpID8gZGF0ZSA6IG5vbmVcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLm1pbkRhdGUpIHtcbiAgICAgICAgICBwcm9wc1snb25VcGRhdGU6Zm9jdXNlZERhdGUnXShpc09uT3JBZnRlckRhdGUoZGF0ZS52YWx1ZSwgcHJvcHMubWluRGF0ZSkgPyBkYXRlIDogbm9uZSk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMubWF4RGF0ZSkge1xuICAgICAgICAgIHByb3BzWydvblVwZGF0ZTpmb2N1c2VkRGF0ZSddKGlzT25PckJlZm9yZURhdGUoZGF0ZS52YWx1ZSwgcHJvcHMubWF4RGF0ZSkgPyBkYXRlIDogbm9uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbJ29uVXBkYXRlOmZvY3VzZWREYXRlJ10oZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGgoJ3RhYmxlJywgeyBjbGFzczogJ2RhdGVwaWNrZXItdGFibGUnIH0sIFtcbiAgICAgICAgZ2VuZXJhdGVUYWJsZUhlYWRlcihyb3RhdGUoLXByb3BzLmZpcnN0RGF5T2ZXZWVrKShwcm9wcy5kYXlOYW1lcykpLFxuICAgICAgICBnZW5lcmF0ZVRhYmxlQm9keShwcm9wcywgZm9jdXNlZERhdGUpXG4gICAgICBdKTtcbiAgICB9O1xuICB9XG59KTtcbiJdfQ==