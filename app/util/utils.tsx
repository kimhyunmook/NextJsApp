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
      
    }
}