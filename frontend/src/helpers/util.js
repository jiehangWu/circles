const MINUTE_LENGTH = 1000 * 60;
const HOUR_LENGTH = 1000 * 60 * 60;
const DAY_LENGTH = 1000 * 60 * 60 * 24;

/*  take the string date as a parameter, return a better formatted date */
export const displayDate = (date) => {
    const postDate = Date.parse(date);
    const currDate = new Date();
    const diff = currDate - postDate;
    if (diff < MINUTE_LENGTH) {
        return "< 1 minute";
    } else if (diff < HOUR_LENGTH) {
        return Math.ceil(diff / MINUTE_LENGTH) + " mins ago";
    } else if (diff < DAY_LENGTH) {
        return Math.ceil(diff / HOUR_LENGTH) + " hours ago";
    } else {
        return date.slice(0, 10);
    }
};

export const greetUser = () => {
    const currDate = new Date();
    const hrs = currDate.getHours();
    let greet;
    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
    return greet;
};

export const location = {
    PROFILE: 'profile',
    HOME: 'home',
    SEARCH: 'search',
};


