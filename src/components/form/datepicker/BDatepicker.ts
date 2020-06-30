import './datepicker.sass';
import { IO } from 'fp-ts/es6/IO';
import { useDisable, UseDisablePropsDefinition } from '../../../composables/disable';
import { useFieldData } from '../../../composables/fieldData';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { Model, useModel } from '../../../composables/model';
import { UseToggleProps } from '../../../composables/toggle';
import { DateSelectionData, EventIndicator, MonthNumber } from './shared';
import { isDate, serialDateOrd } from './utils';
import { BInput } from '../input/BInput';
import { isEnterEvent, isEscEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { head, range } from 'fp-ts/lib/Array';
import { constant, FunctionN } from 'fp-ts/lib/function';
import { alt, chain, fromNullable, getOrElse, isSome, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import BDropdown, { BDropdownPropsDefinition } from '../../dropdown/BDropdown';
import BDatepickerTable, { BDatepickerTablePropsDefinition } from './BDatepickerTable';
import BField from '../field/BField';
import { BSelect, SelectItem } from '../select/BSelect';
import {
  onUnmounted,
  onMounted,
  PropType,
  VNode,
  defineAsyncComponent,
  defineComponent,
  h,
  Component,
  ExtractPropTypes,
  shallowRef,
  SetupContext,
  Ref,
  shallowReactive,
  watch
} from 'vue';
import { isString, toggleListItem } from '../../../utils/helpers';

function defaultDateFormatter(date: Date | Date[], isMultiple: boolean): string {
  const targetDates = Array.isArray(date) ? date : [date];
  const dates = targetDates.map(date => {
    const yyyyMMdd = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    const d = new Date(yyyyMMdd);
    return d.toLocaleDateString();
  });
  return !isMultiple ? dates.join(' - ') : dates.join(', ');
}

function defaultDateParser(date: string): Date | null {
  if (date) {
    const s = date.split('/');
    const year = s[0].length === 4 ? s[0] : s[1];
    const month = s[0].length === 2 ? s[0] : s[1];
    if (year && month) {
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }
  return null;
}

export type DatepickerPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';

export interface DatepickerIcons {
  next: Component;
  previous: Component;
  calendar: Component;
}

const DEFAULT_DATEPICKER_ICONS: DatepickerIcons = {
  previous: defineAsyncComponent(() => import('../../icons/angleLeft')),
  next: defineAsyncComponent(() => import('../../icons/angleRight')),
  calendar: defineAsyncComponent(() => import('../../icons/calendar'))
};

export function getDatepickerIcons(icons: Partial<DatepickerIcons>): DatepickerIcons {
  return {
    ...DEFAULT_DATEPICKER_ICONS,
    ...icons
  };
}

const BDatepickerPropsDefinition = {
  ...BDropdownPropsDefinition,
  ...BDatepickerTablePropsDefinition,
  ...UseDisablePropsDefinition,
  ...getUseInputPropsDefinition<Date | Date[]>(),
  placeholder: {
    type: String as PropType<string>
  },
  initiallyFocusedDate: {
    type: Date as PropType<Date>,
    default: () => new Date()
  },
  dateFormatter: {
    type: Function as PropType<FunctionN<[Date | Date[], boolean], string>>,
    default: constant(defaultDateFormatter)
  },
  dateParser: {
    type: Function as PropType<FunctionN<[string], Date | null>>,
    default: constant(defaultDateParser)
  },
  useMobileNative: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<DatepickerPosition>
  },
  indicators: {
    type: String as PropType<EventIndicator>,
    default: 'bars' as const
  },
  yearsRange: {
    type: (Array as unknown) as PropType<[number, number]>,
    default: constant([-5, 3] as const)
  },
  closeOnSelect: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  isMultiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  openOnFocus: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  icons: {
    type: Object as PropType<DatepickerIcons>,
    default: constant(DEFAULT_DATEPICKER_ICONS)
  }
};

export type BDatepickerProps = ExtractPropTypes<typeof BDatepickerPropsDefinition>;

function useNative(props: BDatepickerProps) {
  return props.useMobileNative && !props.isInline;
}

function formatDateInput(props: BDatepickerProps, value: Date | Date[] | null): string | null {
  if (Array.isArray(value)) {
    return value.every(isDate) ? props.dateFormatter(value, props.isMultiple) : null;
  } else {
    return isDate(value) ? props.dateFormatter(value, props.isMultiple) : null;
  }
}

function formatYYYYMMDD(value: any) {
  const date = new Date(value);
  if (value && isDate(date)) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
  }
  return '';
}

function getUpdateValue(
  props: BDatepickerProps,
  model: Model<Date | Date[]>,
  dateSelectionData: Ref<DateSelectionData>
) {
  return (value: Date | Date[] | null | undefined) => {
    if (value === null || value === undefined) {
      return;
    } else if (Array.isArray(value)) {
      model.modelValue.value = value;
      const currentDate = value.length ? value[0] : props.dateCreator();
      dateSelectionData.value = {
        month: currentDate.getMonth() as MonthNumber,
        year: currentDate.getFullYear()
      };
    } else {
      if (props.isMultiple) {
        const currentValue = model.modelValue.value;
        const existingDates = Array.isArray(currentValue) ? currentValue : [currentValue].filter(isDate);
        const newDates = toggleDate(value, existingDates);
        model.modelValue.value = newDates;
        const currentDate = newDates.length ? newDates[0] : props.dateCreator();
        dateSelectionData.value = {
          month: currentDate.getMonth() as MonthNumber,
          year: currentDate.getFullYear()
        };
      } else {
        model.modelValue.value = value;
        dateSelectionData.value = {
          month: value.getMonth() as MonthNumber,
          year: value.getFullYear()
        };
      }
    }
  };
}

type UpdateValue = ReturnType<typeof getUpdateValue>;

function getOnNativeInput(updateValue: UpdateValue) {
  return function onNativeInput(event: any) {
    const value = event.target.value;
    const date = new Date(value + 'T00:00:00');
    updateValue(isDate(date) ? date : null);
  };
}

type OnNativeInput = ReturnType<typeof getOnNativeInput>;

function getOnInput(props: BDatepickerProps, updateValue: UpdateValue) {
  return function onInput(value: string) {
    const date = props.dateParser(value);
    if (isDate(date)) {
      updateValue(date);
    } else {
      updateValue(null);
    }
  };
}

type OnInput = ReturnType<typeof getOnInput>;

function generateInput(
  props: BDatepickerProps,
  context: SetupContext,
  model: Model<Date | Date[]>,
  dropdownProps: BDatepickerData
): VNode {
  const isMobile = useNative(props);
  return h(BInput, {
    ...(isMobile
      ? context.attrs
      : { ...context.attrs, max: formatYYYYMMDD(props.maxDate), min: formatYYYYMMDD(props.minDate) }),
    autocomplete: 'off',
    type: isMobile ? 'date' : 'text',
    value: formatDateInput(props, model.modelValue.value as any),
    placeholder: props.placeholder,
    size: props.size,
    icon: props.icons.calendar,
    isRounded: props.isRounded,
    isDisabled: props.isDisabled,
    isReadonly: props.isReadonly,
    isLoading: props.isLoading,
    useNativeValidation: props.useNativeValidation,
    onFocus: () => {
      if (!isMobile && props.openOnFocus) {
        dropdownProps.open();
      }
    },
    ...(isMobile
      ? {
          onChange: dropdownProps.onNativeInput
        }
      : {
          onKeyup: (e: KeyboardEvent) => {
            if (isEscEvent(e)) {
              dropdownProps.close();
            }
          },
          onInput: dropdownProps.onInput
        })
  });
}

function generateButton(props: BDatepickerProps, data: BDatepickerData, isNext: boolean): VNode {
  return h(
    'button',
    {
      class: isNext ? 'pagination-next datepicker-next' : 'pagination-previous datepicker-previous',
      disabled: data.isDisabled,
      onClick: isNext ? data.nextMonth : data.previousMonth,
      onKeydown: (e: KeyboardEvent) => {
        if (isEnterEvent(e) || isSpaceEvent(e)) {
          e.preventDefault();
          isNext ? data.nextMonth() : data.previousMonth();
        }
      }
    },
    [
      h(isNext ? props.icons.next : props.icons.previous, {
        props: { variant: 'is-link', isThemeable: false }
      })
    ]
  );
}

function generateYearSelect(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h(BSelect, {
    items: data.years,
    value: data.dateSelectionData.year,
    isDisabled: data.isDisabled,
    size: props.size,
    onInput: data.setYear
  });
}

function generateMonthSelect(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h(BSelect, {
    items: data.months,
    isDisabled: data.isDisabled,
    size: props.size,
    value: data.dateSelectionData.month,
    onInput: data.setMonth
  });
}

function generateSelects(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h('div', { class: 'pagination-list' }, [
    h(BField, [generateMonthSelect(props, data), generateYearSelect(props, data)])
  ]);
}

function generateDefaultHeaderContents(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h('div', { class: ['pagination field is-centered', props.size] }, [
    generateButton(props, data, false),
    generateSelects(props, data),
    generateButton(props, data, true)
  ]);
}

function generateHeader(props: BDatepickerProps, context: SetupContext, data: BDatepickerData): VNode {
  return h(
    'header',
    { class: 'datepicker-header' },
    context.slots.header ? context.slots.header(data) : [generateDefaultHeaderContents(props, data)]
  );
}

function generateDatepickerTable(
  props: BDatepickerProps,
  context: SetupContext,
  model: Model<Date | Date[]>,
  data: BDatepickerData
): VNode {
  return h(BDatepickerTable, {
    value: model.modelValue.value as Date | Date[],
    dayNames: props.dayNames,
    monthNames: props.monthNames,
    firstDayOfWeek: props.firstDayOfWeek,
    minDate: props.minDate,
    maxDate: props.maxDate,
    dateSelectionData: data.dateSelectionData,
    isDisabled: data.isDisabled,
    unselectableDates: props.unselectableDates,
    unselectableDaysOfWeek: props.unselectableDaysOfWeek,
    selectableDates: props.selectableDates,
    events: props.events,
    indicators: props.indicators,
    dateCreator: props.dateCreator,
    showWeekNumber: props.showWeekNumber,
    isMultiple: props.isMultiple,
    focusedDate: data.focusedDate,
    onInput: model.set,
    onFocus: data.setFocusedDate
  });
}

function generateFooter(context: SetupContext): VNode {
  return h('footer', { class: 'datepicker-footer' }, context.slots.footer!());
}

function generateCalendar(
  props: BDatepickerProps,
  context: SetupContext,
  model: Model<Date | Date[]>,
  data: BDatepickerData
): VNode {
  return h(
    'section',
    {
      class: 'datepicker-content',
      'aria-label': 'Datepicker calendar'
    },
    [generateDatepickerTable(props, context, model, data)]
  );
}

function generateDatepickerBody(
  props: BDatepickerProps,
  context: SetupContext,
  model: Model<Date | Date[]>,
  data: BDatepickerData
): VNode {
  const nodes = [generateHeader(props, context, data), generateCalendar(props, context, model, data)];
  if (context.slots.footer) {
    nodes.push(generateFooter(context));
  }
  return h('div', nodes);
}

function generateDropdown(
  props: BDatepickerProps,
  context: SetupContext,
  model: Model<Date | Date[]>,
  data: BDatepickerData
): VNode {
  return h(BDropdown, {
    ...data.toggleProps,
    position: props.position,
    isDisabled: props.isDisabled,
    isInline: props.isInline,
    slots: {
      trigger: () => generateInput(props, context, model, data),
      default: () => generateDatepickerBody(props, context, model, data)
    }
  });
}

const toggleDate = toggleListItem(serialDateOrd);

interface BDatepickerData {
  toggleProps: UseToggleProps<'isExpanded'>;
  dateSelectionData: DateSelectionData;
  nextMonth: IO<void>;
  previousMonth: IO<void>;
  setYear: FunctionN<[string | number], void>;
  setMonth: FunctionN<[string | number], void>;
  onInput: OnInput;
  onNativeInput: OnNativeInput;
  open: IO<void>;
  close: IO<void>;
  months: SelectItem<number>[];
  years: SelectItem<number>[];
  isDisabled: boolean;
  focusedDate: Option<Date>;
  setFocusedDate: FunctionN<[Option<Date>], void>;
}

function getMonths(props: BDatepickerProps, dateSelectionData: DateSelectionData): SelectItem<number>[] {
  return props.monthNames.map((month: string, index: number) => ({
    value: index,
    text: month,
    isDisabled: false,
    isSelected: dateSelectionData.month === index
  }));
}

function getYears(props: BDatepickerProps, dateSelectionData: DateSelectionData): SelectItem<number>[] {
  const currentYear = props.dateCreator().getFullYear();
  return range(props.yearsRange[0], props.yearsRange[1])
    .map(inc => currentYear + inc)
    .map(year => ({
      value: year,
      text: year.toString(),
      isDisabled: false,
      isSelected: dateSelectionData.year === year
    }));
}

function getStartDate(props: BDatepickerProps) {
  return pipe(
    fromNullable(props.value),
    chain(val => (Array.isArray(val) ? head(val) : some(val))),
    alt(constant(fromNullable(props.initiallyFocusedDate))),
    getOrElse(props.dateCreator)
  );
}

function getDateSelectionData(date: Date): DateSelectionData {
  return {
    month: date.getMonth() as MonthNumber,
    year: date.getFullYear()
  };
}

function getInitialDateSelectionData(props: BDatepickerProps) {
  return getDateSelectionData(getStartDate(props));
}

function getSetPreviousMonth(props: BDatepickerProps, dateSelectionData: Ref<DateSelectionData>) {
  return (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (!props.isDisabled) {
      if (dateSelectionData.value.month > 0) {
        dateSelectionData.value = {
          month: (dateSelectionData.value.month - 1) as MonthNumber,
          year: dateSelectionData.value.year
        };
      } else {
        dateSelectionData.value = {
          month: 11,
          year: dateSelectionData.value.year - 1
        };
      }
    }
  };
}

function getSetNextMonth(props: BDatepickerProps, dateSelectionData: Ref<DateSelectionData>) {
  return (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (!props.isDisabled) {
      if (dateSelectionData.value.month < 11) {
        dateSelectionData.value = {
          month: (dateSelectionData.value.month + 1) as MonthNumber,
          year: dateSelectionData.value.year
        };
      } else {
        dateSelectionData.value = {
          month: 0,
          year: dateSelectionData.value.year + 1
        };
      }
    }
  };
}

function getSetMonth(dateSelectionData: Ref<DateSelectionData>) {
  return (month: number | string) => {
    if (isString(month)) {
      const newVal = fromNullable(parseInt(month, 10));
      if (isSome(newVal)) {
        dateSelectionData.value = {
          month: newVal.value as MonthNumber,
          year: dateSelectionData.value.year
        };
      }
    } else {
      dateSelectionData.value = {
        month: month as MonthNumber,
        year: dateSelectionData.value.year
      };
    }
  };
}

function getSetYear(dateSelectionData: Ref<DateSelectionData>) {
  return (year: number | string) => {
    if (isString(year)) {
      const newVal = fromNullable(parseInt(year, 10));
      if (isSome(newVal)) {
        dateSelectionData.value = {
          month: dateSelectionData.value.month,
          year: newVal.value
        };
      }
    } else {
      dateSelectionData.value = {
        month: dateSelectionData.value.month,
        year
      };
    }
  };
}

function getSetFocusedDate(focusedDate: Ref<Option<Date>>) {
  return (date: Option<Date>) => {
    focusedDate.value = date;
  };
}

export default defineComponent({
  name: 'b-datepicker',
  props: BDatepickerPropsDefinition,
  setup(props, context) {
    const fieldData = useFieldData();
    const isDisabled = useDisable(props);
    const model = useModel(props);
    const toggleProps = shallowReactive({ isExpanded: false, hasPopup: true });
    const open = () => {
      toggleProps.isExpanded = false;
    };
    const close = () => {
      toggleProps.isExpanded = true;
    };
    const focusedDate = shallowRef(fromNullable(props.initiallyFocusedDate));
    const dateSelectionData = shallowRef(getInitialDateSelectionData(props));

    const updateValue = getUpdateValue(props, model, dateSelectionData);
    const onInput = getOnInput(props, updateValue);
    const onNativeInput = getOnNativeInput(updateValue);

    const setFocusedDate = getSetFocusedDate(focusedDate);
    const nextMonth = getSetNextMonth(props, dateSelectionData);
    const previousMonth = getSetPreviousMonth(props, dateSelectionData);
    const setMonth = getSetMonth(dateSelectionData);
    const setYear = getSetYear(dateSelectionData);
    function onEscape(e: KeyboardEvent) {
      if (isEscEvent(e)) {
        close();
      }
    }

    onMounted(() => {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', onEscape);
      }
    });

    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', onEscape);
      }
    });

    watch(focusedDate, newVal => {
      if (isSome(newVal.value)) {
        dateSelectionData.value = getDateSelectionData(newVal.value.value);
      }
    });

    return () => {
      const data: BDatepickerData = {
        toggleProps,
        isDisabled: isDisabled.value,
        open,
        close,
        focusedDate: focusedDate.value,
        onInput,
        onNativeInput,
        dateSelectionData: dateSelectionData.value,
        setFocusedDate,
        nextMonth,
        previousMonth,
        setMonth,
        setYear,
        months: getMonths(props, dateSelectionData.value),
        years: getYears(props, dateSelectionData.value)
      };
      return h(
        'article',
        {
          class: [
            'b-datepicker control',
            props.size,
            { 'is-expanded': props.isExpanded || fieldData.attrs.isExpanded.value }
          ]
        },
        [useNative(props) ? generateInput(props, context, model, data) : generateDropdown(props, context, model, data)]
      );
    };
  }
});
