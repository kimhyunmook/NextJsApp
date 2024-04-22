import Cookies from 'js-cookie';
export function getCookie(target:string) {
    return Cookies.get(target);
}

export function deleteCookie(target:string) {
    console.log(target)
    return Cookies.set(target,'',{expires:new Date(0),path:"/"})
}