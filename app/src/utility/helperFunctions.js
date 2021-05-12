export const millisecondsToStr = (milliseconds) => {
    // function numberEnding(number) {
    // 	return number > 1 ? "s" : "";
    // }
    const millies = new Date() - milliseconds;
    let temp = Math.floor(millies / 1000);
    const months = Math.floor(temp / 2592000);
    if (months) {
        return months + "mo";
    }
    const weeks = Math.floor((temp %= 2592000) / 604800);
    if (weeks) {
        return weeks + "w";
    }
    const days = Math.floor((temp %= 604800) / 86400);
    if (days) {
        return days + "d";
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + "h";
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + "m";
    }
    const seconds = temp % 60;
    if (seconds) {
        return seconds + "sec";
    }
    return "Just Now";
}
