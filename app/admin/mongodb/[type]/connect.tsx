"use client"
import FormLayout from "@/app/component/form";
import { Li } from "@/app/login/page";
import { mongoConnect } from "@/lib/api/adminApi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
    children?:React.ReactElement;
}
export default function ConnectLayout (props:Props) {
    const router = useRouter();
    useEffect(()=>{
        if (!!process.env.NEXT_PUBLIC_MONGO) 
            router.push('/');
    },[process.env.NEXT_PUBLIC_MONGO])
    async function submit (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const input = document.querySelector('#mongouri') as HTMLInputElement;
        const uri = input.value;
        let body ={
            type:'connect',
            uri,
        }
        await mongoConnect({...body})
            .then(async res=>{
                if (res.ok) alert(res.msg)
        }) 
    }
    if (!!! process.env.NEXT_PUBLIC_MONGO)
        return(
            <FormLayout title={'MongoDB 연결하기'} onClick={submit} id={'dbConnect'}>
                <Li name={"mongouri"} label={"MongoDB URI"} /> 
            </FormLayout>
        )
}