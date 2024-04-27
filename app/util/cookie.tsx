import Cookies from 'js-cookie';
export function getCookie(target:string) {
    return Cookies.get(target);
}

export function deleteCookie(target:string) {
    console.log(target)
    return Cookies.set(target,'',{expires:new Date(0),path:"/"})
}

export function getDate (type?:string) {
    const time = new Date();
    const year = time.getFullYear();
    let month:string|number = time.getMonth() + 1;
    let day:string|number = time.getDate();
    let hour:string|number = time.getHours();
    let minutes:string|number = time.getMinutes();
    let seconds:string|number = time.getSeconds();
    let display;

    if (month < 10) month = `${ month }`;
    if (day < 10) day = `${ day }`;
    if (hour < 10) hour = `0${ hour }`;
    if (minutes < 10) minutes = `0${ minutes }`;
    if (seconds < 10) seconds = `0${ seconds }`;
    
    switch (type) {
        case 'display': display = `${month}.${day} ${hour}:${minutes}`
            break;
        default : display = `${ year }.${ month }.${ day } ${ hour }:${ minutes }:${ seconds }`;
            break;
    }

    return display;
}
