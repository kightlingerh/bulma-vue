import { Ord } from 'fp-ts/lib/Ord';
export declare function isDate(value: any): value is Date;
export declare function getStartOfDay(date: Date): Date;
export declare function getEndOfDay(date: Date): Date;
export declare function isSameDay(x: Date, y: Date): boolean;
export declare function isBeforeDay(date: Date, isBefore: Date): boolean;
export declare function isAfterDay(date: Date, isAfter: Date): Boolean;
export declare function isSameMonth(x: Date, y: Date): boolean;
export declare const serialDateOrd: Ord<Date>;
export declare const isOnOrAfterDate: (x: Date, y: Date) => boolean;
export declare const isOnOrBeforeDate: (x: Date, y: Date) => boolean;
export declare const elemSerialDate: (a: Date, as: Date[]) => boolean;
export declare type WeekdayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare function getStartOfMonth(date: Date): Date;
export declare function getEndOfMonth(date: Date): Date;
export declare function isWithinWeek(date: Date, secondDate: Date, weekStartsOn?: WeekdayNumber): boolean;
export declare function getStartOfWeek(date: Date, weekStartsOn?: WeekdayNumber): Date;
export declare function getEndOfWeek(date: Date, weekStartsOn?: WeekdayNumber): Date;
export declare function getDaysInMonth(date: Date): number;
export declare function addDays(date: Date, days: number): Date;
export declare function getDatesInWeek(date: Date, weekStartsOn?: WeekdayNumber): Date[];
export declare function addMonths(date: Date, months: number): Date;
