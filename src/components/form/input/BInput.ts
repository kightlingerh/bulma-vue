import '../sass/form.sass';
import { getUseInputPropsDefinition, Input, useInput } from '../../../composables/input/useInput';
import { Toggle, useToggle } from '../../../composables/toggle';
import { ColorVariant } from '../../../types/ColorVariants';
import { SizeVariant } from '../../../types/SizeVariants';
import { isNumber, isString } from '../../../utils/helpers';
import { constant } from 'fp-ts/lib/function';
import { VNode } from 'vue';
import { DEFAULT_INPUT_ICONS, InputIcons } from '../shared/types';
import { Component, defineComponent, PropType, shallowRef, h, Ref, computed } from 'vue';

export function getBInputPropsDefinition<T>() {
  return {
    ...getUseInputPropsDefinition<T>(),
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    hasCounter: {
      type: Boolean,
      default: true
    },
    customInputClass: {
      type: String,
      default: ''
    },
    inputIcons: {
      type: Object as PropType<InputIcons>,
      required: false,
      default: constant(DEFAULT_INPUT_ICONS)
    },
    icon: {
      type: Function as PropType<Component>,
      required: true
    }
  };
}

function getIconPosition(leftIcon: Component | undefined, rightIcon: Component | undefined): string {
  if (leftIcon && rightIcon) {
    return 'has-icons-left has-icons-right';
  } else if (rightIcon) {
    return 'has-icons-right';
  } else if (leftIcon) {
    return 'has-icons-left';
  } else {
    return '';
  }
}

function getRightIcon(
  icons: InputIcons,
  variant: ColorVariant,
  usePasswordReveal: boolean,
  passwordIsVisible: boolean
) {
  if (usePasswordReveal) {
    return passwordIsVisible ? icons.passwordVisible : icons.passwordInvisible;
  } else {
    switch (variant) {
      case 'is-danger':
        return icons.isDanger;
      case 'is-info':
        return icons.isInfo;
      case 'is-success':
        return icons.isSuccess;
      case 'is-warning':
        return icons.isWarning;
      default:
        return undefined;
    }
  }
}

function generateLeftIcon(icon: Component, size: SizeVariant): VNode {
  return h(icon, {
    class: 'is-left',
    size
  });
}

function generateRightIcon(
  icon: Component,
  size: SizeVariant,
  variant: ColorVariant,
  usePasswordReveal: boolean,
  passwordToggle: Toggle
): VNode {
  return h(icon, {
    staticClass: 'is-right',
    class: ['is-right', { 'is-clickable': usePasswordReveal }],
    variant,
    size,
    ...passwordToggle.attrs.value,
    ...passwordToggle.listeners
  });
}

function generateCounter(isFocused: boolean, valueLength: number, maxLength: number | string): VNode {
  return h(
    'small',
    {
      class: ['help counter', { 'is-invisible': !isFocused }]
    },
    `${valueLength} / ${maxLength}`
  );
}

function getAutocomplete(autocomplete: undefined | Ref<string | undefined>, type: string | undefined) {
  if (autocomplete && autocomplete.value) {
    return autocomplete.value;
  } else {
    switch (type) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      default:
        return undefined;
    }
  }
}

function generateNonTextInput(
  inputRef: Ref<HTMLInputElement>,
  inputData: Input,
  isLoading: boolean,
  rightIcon: Component | undefined
): VNode {
  const hasMessage = !!inputData.message.value;
  const type = inputData.type ? inputData.type.value : inputData.usePasswordReveal.value ? 'password' : undefined;
  return h('input', {
    ref: inputRef,
    class: [
      'input',
      ...getInputClasses(
        inputData.iconSize.value,
        inputData.isExpanded.value,
        isLoading,
        hasMessage,
        inputData.icon && inputData.icon.value,
        rightIcon
      )
    ],
    type: inputData.type ? inputData.type.value : undefined,
    autocomplete: getAutocomplete(inputData.autocomplete, type),
    maxlength: inputData.maxlength && inputData.maxlength.value,
    placeholder: inputData.placeholder && inputData.placeholder.value,
    onBlur: inputData.onBlur,
    onFocus: inputData.onFocus,
    onInput: inputData.onInput,
    required: inputData.isRequired.value,
    readonly: inputData.isReadonly.value,
    disabled: inputData.isDisabled.value,
    tabindex: inputData.isDisabled.value ? 0 : -1,
    id: inputData.id.value
  });
}

function generateTextarea(
  inputRef: Ref<HTMLInputElement>,
  inputData: Input,
  isLoading: boolean,
  rightIcon: Component | undefined
): VNode {
  const hasMessage = !!inputData.message.value;
  return h('textarea', {
    ref: inputRef,
    class: [
      'textarea',
      ...getInputClasses(
        inputData.iconSize.value,
        inputData.isExpanded.value,
        isLoading,
        hasMessage,
        inputData.icon && inputData.icon.value,
        rightIcon
      )
    ],
    value: inputData.value.value,
    maxlength: inputData.maxlength && inputData.maxlength.value,
    placeholder: inputData.placeholder && inputData.placeholder.value,
    onBlur: inputData.onBlur,
    onFocus: inputData.onFocus,
    onInput: inputData.onInput,
    required: inputData.isRequired.value,
    readonly: inputData.isReadonly.value,
    disabled: inputData.isDisabled.value,
    tabindex: inputData.isDisabled.value ? 0 : -1,
    id: inputData.id.value
  });
}

function generateInput(
  inputRef: Ref<HTMLInputElement>,
  inputData: Input,
  isLoading: boolean,
  rightIcon: Component | undefined
): VNode {
  const type = inputData.type && inputData.type.value;
  return type === 'textarea'
    ? generateTextarea(inputRef, inputData, isLoading, rightIcon)
    : generateNonTextInput(inputRef, inputData, isLoading, rightIcon);
}

function getValueLength(modelValue: unknown) {
  if (isString(modelValue)) {
    return modelValue.length;
  } else if (isNumber(modelValue)) {
    return modelValue.toString().length;
  }
  return 0;
}

function getInputClasses(
  size: string,
  isExpanded: boolean,
  isLoading: boolean,
  hasMessage: boolean,
  leftIcon: Component | undefined,
  rightIcon: Component | undefined
) {
  return [
    getIconPosition(leftIcon, rightIcon),
    size,
    {
      'is-expanded': isExpanded,
      'is-loading': isLoading,
      'is-clearfix': !hasMessage
    }
  ];
}

export function defineInput<T>() {
  return defineComponent({
    name: 'b-input',
    props: getBInputPropsDefinition<T>(),
    setup(props) {
      const inputRef = shallowRef((null as unknown) as HTMLInputElement);
      const inputData = useInput(props, inputRef);
      const passwordToggle = useToggle({ isVisible: false, hasPopup: false }, 'isVisible');
      const rightIcon = computed(() =>
        getRightIcon(
          props.inputIcons,
          inputData.messageVariant.value,
          props.usePasswordReveal,
          passwordToggle.isOn.value
        )
      );
      const useCounter = computed(
        () =>
          (inputData.type === undefined || (inputData.value && inputData.value.value !== 'number')) &&
          !!inputData.maxlength &&
          props.hasCounter
      );

      return () => {
        const nodes: VNode[] = [generateInput(inputRef, inputData, props.isLoading, inputData)];
        if (inputData.icon && inputData.icon.value) {
          nodes.push(generateLeftIcon(inputData.icon.value, inputData.iconSize.value));
        }
        if (rightIcon.value) {
          nodes.push(
            generateRightIcon(
              rightIcon.value,
              inputData.iconSize.value,
              inputData.messageVariant.value,
              props.usePasswordReveal,
              passwordToggle
            )
          );
        }
        if (useCounter.value && inputData.maxlength && inputData.maxlength.value !== undefined) {
          nodes.push(
            generateCounter(inputData.isFocused.value, getValueLength(inputData.value.value), inputData.maxlength.value)
          );
        }
        return h(
          'div',
          {
            class: [
              'control',
              getInputClasses(
                props.size,
                inputData.isExpanded.value,
                props.isLoading,
                !!inputData.message.value,
                inputData.icon && inputData.icon.value,
                rightIcon.value
              )
            ]
          },
          nodes
        );
      };
    }
  });
}

export const BInput = defineInput<any>()
