import { eq, eqString } from 'fp-ts/lib/Eq';
import { toggleListItem } from '../../utils/helpers';
export const eqBTableRow = eq.contramap(eqString, row => row.id);
export const eqBTableRowData = eqBTableRow;
export const eqColumnTableData = eq.contramap(eqString, column => column.label);
export const toggleBTableRow = toggleListItem(eqBTableRow);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdGFibGUvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQU0sUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWhELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQWdEckQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFrQixFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQXNCLFdBQWdDLENBQUM7QUFDbkYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQThCLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNHLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlcSwgRXEsIGVxU3RyaW5nIH0gZnJvbSAnZnAtdHMvbGliL0VxJztcbmltcG9ydCB7IE9yZCB9IGZyb20gJ2ZwLXRzL2xpYi9PcmQnO1xuaW1wb3J0IHsgdG9nZ2xlTGlzdEl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7IENsYXNzZXMgfSBmcm9tICcuLi8uLi91dGlscy9tZXJnZUNsYXNzZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJUYWJsZUNvbHVtbjxUID0gYW55PiBleHRlbmRzIEJUYWJsZUNvbHVtbkRhdGE8VD4ge1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIHBvc2l0aW9uOiBCVGFibGVDb2x1bW5Qb3NpdGlvbjtcbiAgaXNTb3J0Q29sdW1uOiBib29sZWFuO1xuICBpc1NvcnRhYmxlOiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBTb3J0VHlwZSA9ICdBc2NlbmRpbmcnIHwgJ0Rlc2NlbmRpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJUYWJsZUNvbHVtbkRhdGE8VCA9IGFueT4ge1xuICBsYWJlbDogc3RyaW5nO1xuICBkZXRhaWw/OiBzdHJpbmc7XG4gIHNsb3ROYW1lPzogc3RyaW5nO1xuICB2YWx1ZT86IHN0cmluZyB8ICgodmFsOiBUKSA9PiBhbnkpO1xuICBhc0h0bWw/OiBib29sZWFuO1xuICBpc1NvcnRhYmxlPzogYm9vbGVhbjtcbiAgbWV0YT86IGFueTtcbiAgaXNWaXNpYmxlPzogYm9vbGVhbjtcbiAgb3JkPzogT3JkPFQ+O1xuICBwb3NpdGlvbj86IEJUYWJsZUNvbHVtblBvc2l0aW9uO1xuICB3aWR0aD86IHN0cmluZyB8IG51bWJlcjtcbiAgY2xhc3Nlcz86IENsYXNzZXM7XG4gIGlzU3RpY2t5PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgQlRhYmxlQ29sdW1uUG9zaXRpb24gPSAnaXMtbGVmdCcgfCAnaXMtY2VudGVyZWQnIHwgJ2lzLXJpZ2h0JztcblxuZXhwb3J0IGludGVyZmFjZSBCVGFibGVSb3cgZXh0ZW5kcyBCVGFibGVSb3dEYXRhIHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgaXNTZWxlY3RhYmxlOiBib29sZWFuO1xuICBpc0NoZWNrYWJsZTogYm9vbGVhbjtcbiAgaXNEcmFnZ2FibGU6IGJvb2xlYW47XG4gIGlzRHJvcHBhYmxlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJUYWJsZVJvd0RhdGEge1xuICBpZDogc3RyaW5nO1xuICBpc0Ryb3BwYWJsZT86IGJvb2xlYW47XG4gIGlzRHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgaXNTZWxlY3RhYmxlPzogYm9vbGVhbjtcbiAgaXNDaGVja2FibGU/OiBib29sZWFuO1xuICBjbGFzc2VzPzogQ2xhc3NlcztcbiAgZGF0YTogb2JqZWN0O1xufVxuXG5leHBvcnQgY29uc3QgZXFCVGFibGVSb3c6IEVxPEJUYWJsZVJvdz4gPSBlcS5jb250cmFtYXAoZXFTdHJpbmcsIHJvdyA9PiByb3cuaWQpO1xuZXhwb3J0IGNvbnN0IGVxQlRhYmxlUm93RGF0YTogRXE8QlRhYmxlUm93RGF0YT4gPSBlcUJUYWJsZVJvdyBhcyBFcTxCVGFibGVSb3dEYXRhPjtcbmV4cG9ydCBjb25zdCBlcUNvbHVtblRhYmxlRGF0YTogRXE8QlRhYmxlQ29sdW1uRGF0YTxhbnk+PiA9IGVxLmNvbnRyYW1hcChlcVN0cmluZywgY29sdW1uID0+IGNvbHVtbi5sYWJlbCk7XG5leHBvcnQgY29uc3QgdG9nZ2xlQlRhYmxlUm93ID0gdG9nZ2xlTGlzdEl0ZW0oZXFCVGFibGVSb3cpO1xuIl19