"use client"
import { mongoConnect } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type Props = {
    children?:React.ReactElement;
}
export default function DisconnectLayout (props:Props) {
    const router = useRouter();
    useEffect(()=>{
        if (!!process.env.NEXT_PUBLIC_MONGO)
            if (window.confirm('연결을 해제하겠습니까?')) {
                let body = {
                    type:'disconnect',
                }
                const res = mongoConnect({...body})
                .then(async res=>{
                    if (res.ok) {
                        alert(res.msg)
                    }
                })
        
            } else {
                router.push('/admin');
            }
        else router.push('/admin')
    },[process.env.NEXT_PUBLIC_MONGO])
   
    return(
      <></>
    )
}