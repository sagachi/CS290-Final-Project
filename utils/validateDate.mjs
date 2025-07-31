export function isDateValid(date) {
    const format = /^\d{2}-\d{2}-\d{2}$/;
    return format.test(date);
}