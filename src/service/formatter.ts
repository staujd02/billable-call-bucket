export function formatPhoneNumber(phoneNumber: string): string {
    switch (phoneNumber.length) {
        case 10:
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
        case 7:
            return `(???) ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}`;
        default:
            return phoneNumber;
    }
}

export function formatHoursMinutesSeconds(totalSeconds: number): string {
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60.0) % 60;
    const hours = Math.floor(totalSeconds / (60.0 * 60.0));

    let formattedTimeString = seconds + "s";
    if (seconds < 10)
        formattedTimeString = "0" + formattedTimeString;

    if (minutes === 0)
        formattedTimeString = "00m " + formattedTimeString;
    else if (minutes < 10)
        formattedTimeString = "0" + minutes + "m " + formattedTimeString;
    else
        formattedTimeString = minutes + "m " + formattedTimeString;

    if (hours > 0)
        formattedTimeString = hours + "h " + formattedTimeString;
    return formattedTimeString;
}