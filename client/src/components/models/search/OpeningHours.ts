export interface OpeningHours {
    open_now: boolean;
    periods: OnpeningHoursPerid[];
    weekday_text: string[];
}

interface OnpeningHoursPerid {
    close: { day: number, time: number};
    open: { day: number, time: number};
}