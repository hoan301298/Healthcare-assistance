export interface OpeningHours {
    open_now?: boolean;
    periods?: OnpeningHoursPeriod[];
    weekday_text?: string[];
}

interface OnpeningHoursPeriod {
    close: { day: number, time: number};
    open: { day: number, time: number};
}