import { computed } from 'vue';
import { getUseModelPropsDefinition, useModel } from '../model';
export const UsePaginationPropsDefinition = {
    ...getUseModelPropsDefinition(),
    modelValue: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    perPage: {
        type: Number,
        default: 25
    }
};
export function usePagination(props) {
    const model = useModel(props);
    const current = computed(() => Math.max(model.modelValue.value, 1));
    const numberOfPages = computed(() => Math.ceil(props.total / props.perPage));
    const after = computed(() => Math.max((model.modelValue.value - 1) * props.perPage, 0));
    const nextPage = computed(() => Math.min(numberOfPages.value, model.modelValue.value + 1));
    const hasNext = computed(() => props.perPage + after.value < props.total);
    const previousPage = computed(() => Math.max(0, model.modelValue.value - 1));
    const hasPrevious = computed(() => after.value > 0 && props.total > 0);
    function next(e) {
        e.preventDefault();
        if (hasNext.value) {
            model.set(nextPage.value);
        }
    }
    function previous(e) {
        e.preventDefault();
        if (hasPrevious.value) {
            model.set(previousPage.value);
        }
    }
    function first() {
        model.set(1);
    }
    function last() {
        model.set(numberOfPages.value);
    }
    function set(num) {
        if (num >= 1 && num <= numberOfPages.value) {
            model.set(num);
        }
    }
    return {
        current,
        numberOfPages,
        after,
        nextPage,
        hasNext,
        previousPage,
        hasPrevious,
        next,
        previous,
        first,
        last,
        set
    };
}
export function extractPaginationState(pagination) {
    return {
        current: pagination.current.value,
        numberOfPages: pagination.numberOfPages.value,
        after: pagination.after.value,
        nextPage: pagination.nextPage.value,
        hasNext: pagination.hasNext.value,
        previousPage: pagination.previousPage.value,
        hasPrevious: pagination.hasPrevious.value,
        next: pagination.next,
        previous: pagination.previous,
        first: pagination.first,
        last: pagination.last,
        set: pagination.set
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb3NhYmxlcy9wYWdpbmF0aW9uL3VzZVBhZ2luYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUE4QixRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0QsT0FBTyxFQUFFLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVoRSxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRztJQUMxQyxHQUFHLDBCQUEwQixFQUFVO0lBQ3ZDLFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxNQUEwQjtRQUNoQyxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQTBCO1FBQ2hDLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBMEI7UUFDaEMsT0FBTyxFQUFFLEVBQUU7S0FDWjtDQUNGLENBQUM7QUFJRixNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQXlCO0lBQ3JELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBQyxLQUFnQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFnQixH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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BUeXBlLCBFeHRyYWN0UHJvcFR5cGVzLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgeyBnZXRVc2VNb2RlbFByb3BzRGVmaW5pdGlvbiwgdXNlTW9kZWwgfSBmcm9tICcuLi9tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBVc2VQYWdpbmF0aW9uUHJvcHNEZWZpbml0aW9uID0ge1xuICAuLi5nZXRVc2VNb2RlbFByb3BzRGVmaW5pdGlvbjxudW1iZXI+KCksXG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBOdW1iZXIgYXMgUHJvcFR5cGU8bnVtYmVyPixcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG4gIHRvdGFsOiB7XG4gICAgdHlwZTogTnVtYmVyIGFzIFByb3BUeXBlPG51bWJlcj4sXG4gICAgcmVxdWlyZWQ6IHRydWVcbiAgfSxcbiAgcGVyUGFnZToge1xuICAgIHR5cGU6IE51bWJlciBhcyBQcm9wVHlwZTxudW1iZXI+LFxuICAgIGRlZmF1bHQ6IDI1XG4gIH1cbn07XG5cbmV4cG9ydCB0eXBlIFVzZVBhZ2luYXRpb25Qcm9wcyA9IEV4dHJhY3RQcm9wVHlwZXM8dHlwZW9mIFVzZVBhZ2luYXRpb25Qcm9wc0RlZmluaXRpb24+O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUGFnaW5hdGlvbihwcm9wczogVXNlUGFnaW5hdGlvblByb3BzKSB7XG4gIGNvbnN0IG1vZGVsID0gdXNlTW9kZWwocHJvcHMpO1xuICBjb25zdCBjdXJyZW50ID0gY29tcHV0ZWQoKCkgPT4gTWF0aC5tYXgobW9kZWwubW9kZWxWYWx1ZS52YWx1ZSBhcyBudW1iZXIsIDEpKTtcbiAgY29uc3QgbnVtYmVyT2ZQYWdlcyA9IGNvbXB1dGVkKCgpID0+IE1hdGguY2VpbCgocHJvcHMudG90YWwgYXMgbnVtYmVyKSAvIHByb3BzLnBlclBhZ2UpKTtcbiAgY29uc3QgYWZ0ZXIgPSBjb21wdXRlZCgoKSA9PiBNYXRoLm1heCgoKG1vZGVsLm1vZGVsVmFsdWUudmFsdWUgYXMgbnVtYmVyKSAtIDEpICogcHJvcHMucGVyUGFnZSwgMCkpO1xuICBjb25zdCBuZXh0UGFnZSA9IGNvbXB1dGVkKCgpID0+IE1hdGgubWluKG51bWJlck9mUGFnZXMudmFsdWUsIChtb2RlbC5tb2RlbFZhbHVlLnZhbHVlIGFzIG51bWJlcikgKyAxKSk7XG4gIGNvbnN0IGhhc05leHQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5wZXJQYWdlICsgYWZ0ZXIudmFsdWUgPCAocHJvcHMudG90YWwgYXMgbnVtYmVyKSk7XG4gIGNvbnN0IHByZXZpb3VzUGFnZSA9IGNvbXB1dGVkKCgpID0+IE1hdGgubWF4KDAsIChtb2RlbC5tb2RlbFZhbHVlLnZhbHVlIGFzIG51bWJlcikgLSAxKSk7XG4gIGNvbnN0IGhhc1ByZXZpb3VzID0gY29tcHV0ZWQoKCkgPT4gYWZ0ZXIudmFsdWUgPiAwICYmIChwcm9wcy50b3RhbCBhcyBudW1iZXIpID4gMCk7XG4gIGZ1bmN0aW9uIG5leHQoZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGhhc05leHQudmFsdWUpIHtcbiAgICAgIG1vZGVsLnNldChuZXh0UGFnZS52YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHByZXZpb3VzKGU6IEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChoYXNQcmV2aW91cy52YWx1ZSkge1xuICAgICAgbW9kZWwuc2V0KHByZXZpb3VzUGFnZS52YWx1ZSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGZpcnN0KCkge1xuICAgIG1vZGVsLnNldCgxKTtcbiAgfVxuICBmdW5jdGlvbiBsYXN0KCkge1xuICAgIG1vZGVsLnNldChudW1iZXJPZlBhZ2VzLnZhbHVlKTtcbiAgfVxuICBmdW5jdGlvbiBzZXQobnVtOiBudW1iZXIpIHtcbiAgICBpZiAobnVtID49IDEgJiYgbnVtIDw9IG51bWJlck9mUGFnZXMudmFsdWUpIHtcbiAgICAgIG1vZGVsLnNldChudW0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGN1cnJlbnQsXG4gICAgbnVtYmVyT2ZQYWdlcyxcbiAgICBhZnRlcixcbiAgICBuZXh0UGFnZSxcbiAgICBoYXNOZXh0LFxuICAgIHByZXZpb3VzUGFnZSxcbiAgICBoYXNQcmV2aW91cyxcbiAgICBuZXh0LFxuICAgIHByZXZpb3VzLFxuICAgIGZpcnN0LFxuICAgIGxhc3QsXG4gICAgc2V0XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2luYXRpb24gPSBSZXR1cm5UeXBlPHR5cGVvZiB1c2VQYWdpbmF0aW9uPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RQYWdpbmF0aW9uU3RhdGUocGFnaW5hdGlvbjogUGFnaW5hdGlvbikge1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnQ6IHBhZ2luYXRpb24uY3VycmVudC52YWx1ZSxcbiAgICBudW1iZXJPZlBhZ2VzOiBwYWdpbmF0aW9uLm51bWJlck9mUGFnZXMudmFsdWUsXG4gICAgYWZ0ZXI6IHBhZ2luYXRpb24uYWZ0ZXIudmFsdWUsXG4gICAgbmV4dFBhZ2U6IHBhZ2luYXRpb24ubmV4dFBhZ2UudmFsdWUsXG4gICAgaGFzTmV4dDogcGFnaW5hdGlvbi5oYXNOZXh0LnZhbHVlLFxuICAgIHByZXZpb3VzUGFnZTogcGFnaW5hdGlvbi5wcmV2aW91c1BhZ2UudmFsdWUsXG4gICAgaGFzUHJldmlvdXM6IHBhZ2luYXRpb24uaGFzUHJldmlvdXMudmFsdWUsXG4gICAgbmV4dDogcGFnaW5hdGlvbi5uZXh0LFxuICAgIHByZXZpb3VzOiBwYWdpbmF0aW9uLnByZXZpb3VzLFxuICAgIGZpcnN0OiBwYWdpbmF0aW9uLmZpcnN0LFxuICAgIGxhc3Q6IHBhZ2luYXRpb24ubGFzdCxcbiAgICBzZXQ6IHBhZ2luYXRpb24uc2V0XG4gIH07XG59XG4iXX0=