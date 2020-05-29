import './dropdown.sass';
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { useWindowSize } from '../../composables/windowSize';
import { defineComponent, shallowRef, resolveDirective, computed, h, withDirectives } from 'vue';
import ClickOutside from '../../directives/clickOutside';
import { isString } from '../../utils/helpers';
import { DropdownThemeMap } from './theme';
export const BDropdownPropsDefinition = {
    ...getUseThemePropsDefinition(DropdownThemeMap),
    ...getUseTogglePropsDefinition('isExpanded'),
    ...FadeTransitionPropsDefinition,
    id: String,
    isDisabled: {
        type: Boolean,
        default: false
    },
    isHoverable: {
        type: Boolean,
        default: false
    },
    isInline: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        validator: (value) => {
            return isString(value) && ['is-top-right', 'is-top-left', 'is-bottom-left'].includes(value);
        }
    },
    isMobileModal: {
        type: Boolean,
        default: true
    },
    menuTag: {
        type: String,
        default: 'ul'
    }
};
let id = 0;
function generateTrigger(toggle, id, triggerRef, slots) {
    return h('div', {
        ref: triggerRef,
        staticClass: 'dropdown-trigger',
        role: 'button',
        'aria-owns': id,
        'aria-haspopup': 'listbox',
        'aria-expanded': `${toggle.isOn.value}`,
        onClick: toggle.toggle
    }, slots.trigger());
}
function generateTransition(transition, children) {
    return h('transition', transition, children);
}
function getCloseConditional(toggle, isInWhiteList) {
    return (e) => {
        const target = e.target;
        return toggle.isOn.value && isInWhiteList(target);
    };
}
function generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots) {
    return h(menuTag, {
        class: ['dropdown-content', ...themeClasses],
        role: 'menu',
        id: computedId,
        'aria-hidden': toggle.isOff.value
    }, slots.default({ toggle }));
}
function generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, vShow, clickOutsideBindingArgs, dropdownMenuRef, useTransition = true) {
    const menu = withDirectives(h('div', {
        ref: dropdownMenuRef,
        class: 'dropdown-menu'
    }, [generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots)]), [
        [vShow, toggle.isOn.value],
        [ClickOutside, toggle.setOff, clickOutsideBindingArgs]
    ]);
    return useTransition ? generateTransition(transition, [menu]) : menu;
}
function generateMobileBackground(menuTag, toggle, computedId, themeClasses, transition, slots, vShow, clickOutsideBindingArgs, dropdownMenuRef) {
    return generateTransition(transition, [
        withDirectives(h('div', {
            class: 'background',
            'aria-hidden': toggle.isOff.value
        }, [
            generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, vShow, clickOutsideBindingArgs, dropdownMenuRef, false)
        ]), [[vShow, toggle.isOn.value]])
    ]);
}
function generateChildren(menuTag, isInline, toggle, computedId, transition, themeClasses, shouldDisplayMobileBackground, slots, vShow, clickOutsideBindingArgs, triggerRef, dropdownMenuRef) {
    const children = [];
    if (!isInline) {
        children.push(generateTrigger(toggle, computedId, triggerRef, slots));
    }
    if (shouldDisplayMobileBackground) {
        children.push(generateMobileBackground(menuTag, toggle, computedId, themeClasses, transition, slots, vShow, clickOutsideBindingArgs, dropdownMenuRef));
    }
    else {
        children.push(generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, vShow, clickOutsideBindingArgs, dropdownMenuRef));
    }
    return children;
}
export default defineComponent({
    name: 'b-dropdown',
    props: BDropdownPropsDefinition,
    setup(props, { slots }) {
        const windowSize = useWindowSize();
        const toggle = useToggle(props, 'isExpanded');
        const { themeClasses } = useTheme(props);
        const transition = useTransition(props);
        const root = shallowRef(null);
        const trigger = shallowRef(null);
        const dropdownMenu = shallowRef(null);
        const vShow = resolveDirective('show');
        const computedId = computed(() => `dropdown-menu-${props.id ?? id++}`);
        const rootClasses = computed(() => [
            props.position,
            {
                'is-expanded': toggle.isOn.value,
                'is-disabled': props.isDisabled,
                'is-hoverable': props.isHoverable,
                'is-inline': props.isInline,
                'is-active': toggle.isOn.value || props.isInline,
                'is-mobile-modal': props.isMobileModal
            }
        ]);
        const displayMenu = computed(() => (!props.isDisabled && (toggle.isOn.value || props.isHoverable)) || props.isInline);
        const isMobileModal = computed(() => props.isMobileModal && !props.isInline && !props.isHoverable);
        const displayMobileBackground = computed(() => isMobileModal.value && windowSize.value.isTouch);
        function getDependentElements() {
            return Array.from(dropdownMenu.value.querySelectorAll('*'));
        }
        function isInDropdown(el) {
            return dropdownMenu.value !== undefined && dropdownMenu.value.contains(el);
        }
        function isInWhiteList(el) {
            if (el === root.value)
                return true;
            if (el === dropdownMenu.value)
                return true;
            if (el === trigger.value)
                return true;
            return isInDropdown(el) || isInTrigger(el);
        }
        function isInTrigger(el) {
            return trigger.value !== undefined && trigger.value.contains(el);
        }
        const menuToggle = {
            ...toggle,
            isOn: displayMenu,
            isOff: computed(() => !displayMenu.value)
        };
        const closeConditional = getCloseConditional(menuToggle, isInWhiteList);
        const clickOutsideArgs = {
            include: getDependentElements,
            closeConditional
        };
        return () => {
            return h('div', { ref: root, class: ['dropdown', ...rootClasses.value] }, generateChildren(props.menuTag, props.isInline, menuToggle, computedId.value, transition.value, themeClasses.value, displayMobileBackground.value, slots, vShow, clickOutsideArgs, trigger, dropdownMenu));
        };
    }
});
//# sourceMappingURL=BDropdown.js.map