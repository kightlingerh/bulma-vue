import { Ord } from 'fp-ts/lib/Ord';
export interface BTableColumn<T = any> extends BTableColumnData<T> {
    isVisible: boolean;
    position: BTableColumnPosition;
    isSortColumn: boolean;
    isSortable: boolean;
}
export declare type SortType = 'Ascending' | 'Descending';
export interface BTableColumnData<T = any> {
    label: string;
    detail?: string;
    slotName?: string;
    value: string | ((val: T) => any);
    isSortable?: boolean;
    meta?: any;
    isVisible?: boolean;
    ord?: Ord<T>;
    position?: BTableColumnPosition;
    width?: string | number;
    classes?: string | string[];
    isSticky?: boolean;
}
export declare type BTableColumnPosition = 'is-left' | 'is-centered' | 'is-right';
export interface BTableRow extends BTableRowData {
    index: number;
    isSelectable: boolean;
    isCheckable: boolean;
    isSelected: boolean;
    isChecked: boolean;
    isDraggable: boolean;
    isDroppable: boolean;
}
export interface BTableRowData {
    id: string;
    isDroppable?: boolean;
    isDraggable?: boolean;
    isSelectable?: boolean;
    isCheckable?: boolean;
    classes?: string | string[];
    data: object;
}
