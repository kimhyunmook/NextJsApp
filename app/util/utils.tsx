import { ChangeEvent } from "react"

export default function util() {
    return {
        firstUppercase: (target:string)=>{
            const t =  target 
            return t.charAt(0).toUpperCase()+t.slice(1)
        },
        phoneNumber: (e:ChangeEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            const phoneNumber = value.replace(/[^0-9]/g, ''); 

            let formattedPhoneNumber = phoneNumber;
            if (phoneNumber.length >= 3) {
                formattedPhoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
            }
            if (phoneNumber.length >= 7) {
                formattedPhoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7)}`;
            }
        
            e.currentTarget.value = formattedPhoneNumber;
            return formattedPhoneNumber;
          },
        getDate: (t:string, type?:string) => {
            type = type?.toUpperCase();
            const time = new Date(t);
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
                case 'MM-DD' : display =`${month}.${day} ${hour}:${minutes}`;
                    break;
                default : display = `${ year }.${ month }.${ day } ${ hour }:${ minutes }:${ seconds }`;
                    break;
            }

            return display;
        },
        arr: (t:string) => {
            const result = Array.from(document.querySelectorAll(t));
            return result;
        }
      
    }
}