
export const getToday = () => {
    let today = new Date();
    const date = ('0' + today.getDate());
    const month = ('0' + (today.getMonth() + 1));
    const year = today.getFullYear();

    let dateToday = date + month + year;

    return dateToday;
};