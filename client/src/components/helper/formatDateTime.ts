export const getFormatDate = (input: string) => {
    if (!input) return;
    const dateTime = input.split("T")[0];
    const [ year, month, day ] = dateTime.split("-");
    return `${day}.${month}.${year}`
}