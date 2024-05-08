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
export default function CreateLayout (props:Props) {
    const router = useRouter();
    const dispatch =useDispatch();
    useEffect(()=>{
        
    },[])
    async function submit (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const input:any = document.querySelectorAll('#dbCreate input');
        const values = [...input].reduce((a,c,i)=>{
            c as HTMLInputElement
            a = {
                ...a,
                [c.id]:c.value
            }
            return a
        },{})
        let body ={
            type:'create',
            ...values
        }
        await mongoConnect({...body})
            .then(res=>{
                if (res) alert(res.msg)
                if (res.ok) {
                    body ={
                        bodyType:'db'
                    }
                    dispatch({type:TYPE('admin_nav').REQUEST,...body});
                    router.push('/admin')
                } 
        }) 
    }
    if (!! process.env.NEXT_PUBLIC_MONGO)
        return(
            <FormLayout id="dbCreate" title={'DATABASE 만들기'} onClick={submit}>
                <Li name={"dbName"} label={"DB Create Name"} /> 
                <Li name={"description"} label={"DB Description"} /> 
            </FormLayout>
        )
}