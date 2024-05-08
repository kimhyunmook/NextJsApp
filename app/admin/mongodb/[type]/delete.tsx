"use client"
import FormLayout from "@/app/component/form";
import { Li } from "@/app/login/page";
import { mongoConnect } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TYPE from "@/lib/type";

type Props = {
    children?:React.ReactElement;
}
export default function DeleteLayout (props:Props) {
    const dispatch =useDispatch();
    const router = useRouter();
    useEffect(()=>{
        
    },[])
    async function submit (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const input = document.querySelector('#dbName') as HTMLInputElement;
        const dbName = input.value;
        let body ={
            type:'delete',
            dbName,
        }
        await mongoConnect({...body})
            .then(async res=>{
                if (res) {
                    alert(res.msg)
                    if(res.ok) {
                        let body2 ={
                            bodyType:'db'
                        }
                        dispatch({type:TYPE('admin_nav').REQUEST,...body2});
                        router.push('/admin');
                    }
                } 
        }) 
    }
    if (!! process.env.NEXT_PUBLIC_MONGO)
        return(
            <FormLayout title={'DATABASE 삭제'} onClick={submit} id={'dbDelete'}>
                <Li name={"dbName"} label={"DB Delete Name"} /> 
            </FormLayout>
        )
}