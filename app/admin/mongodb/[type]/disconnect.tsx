"use client"
import { mongoConnect } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { absolute_center, absolute_x_center, absolute_y_center, title } from "@/app/util/style";
type Props = {
    children?:React.ReactElement;
}
export default function DisconnectLayout (props:Props) {
    const router = useRouter();
    function ClickHandle (e:React.MouseEvent) {
        e.preventDefault();
        if (!!process.env.NEXT_PUBLIC_MONGO)
            if (window.confirm('연결을 해제하겠습니까?')) {
                let body = {
                    type:'disconnect',
                }
                mongoConnect({...body})
                .then(async res=>{
                    if (res.ok) {
                        alert(res.msg)
                        router.push('/admin')
                    }
                })
            } else {
                router.push('/admin');
            }
        else router.push('/admin')

    }
    // useEffect(()=>{
    // },[])
   
    return(
        <div className="container relative full-h">
            <div className={`${absolute_x_center} top-[30%] w-full max-w-[600px]`}>
                <h2 className={title+' text-center'}>
                    MongoDB 연결을 해제하시겠습니까?
                </h2>
                <p></p>
                <button 
                onClick={ClickHandle}
                className="bg-green-500 rounded-lg text-3xl m-auto block p-2 pr-4 pl-4 font-bold hover:bg-green-600 hover:text-blue-200">
                    Yes
                </button>
            </div>

        </div>
    )
}