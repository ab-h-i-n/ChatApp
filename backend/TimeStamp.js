const getTimeStamp = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    let hour = date.getHours();
    const am_pm = hour >= 12 ? 'PM' : 'AM'; 
    hour = hour % 12 || 12; 
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const timeStamp = `${day}/${month}/${year}-${hour}:${minute}:${second}-${am_pm}`;
    return timeStamp;
};

export default getTimeStamp;
