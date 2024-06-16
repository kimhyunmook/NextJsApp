"use client"
import FormLayout from "@/app/component/form";
import { Li } from "@/app/login/page";
import { mongoConnect } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";
import { AdminReducer } from "@/lib/store/reducers/adminReducer";

type Props = {
    children?:React.ReactElement;
}
export default function DeleteLayout (props:Props) {
    const db = useSelector<any>((state):AdminReducer=>state.admin.navDB);
    const [dbList, setDb] = useState<any>([]);
    const dispatch =useDispatch();
    const router = useRouter();
    useEffect(()=>{
        if (!!db) setDb(db)
    },[db])
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
                    if (window.confirm('database내에 모든 정보가 삭제됩니다. 삭제하시겠습니까?')) {
                        alert(res.msg)
                        if(res.ok) {
                            let body2 ={
                                bodyType:'db'
                            }
                            dispatch({type:TYPE('admin_nav').REQUEST,...body2});
                            router.push('/admin');
                        }
                    }
                } 
        }) 
    }
    if (!! process.env.NEXT_PUBLIC_MONGO)
        return(
            <FormLayout title={'DATABASE 삭제'} onClick={submit} id={'dbDelete'}>
                <Li name={"dbName"} label={"DB Delete Name"} type="select" selectOption={dbList}/> 
            </FormLayout>
        )
}