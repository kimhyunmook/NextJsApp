"use client"
import axios from "axios";
import { useDispatch } from "react-redux";
import TYPE from "@/lib/type";
import Btn from "@/app/component/button";
import { useRouter } from "next/navigation";
import { adminCollectionDelete, collectionInit } from "@/lib/api/adminApi";

export function CollectionDelete (data:collectionInit, callback?:()=>void) {
    if (window.confirm('삭제하시겠습니까?')) {
        adminCollectionDelete(data)
            .then(res => {
                if (res.ok) {
                    alert('삭제되었습니다.');
                    if (callback) callback()
                  
                } else return alert(res.msg)
            })
    }
}

export default function DeleteLayout() {
    const dispatch = useDispatch();
    const router = useRouter();

    async function submit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const arr = (target:string) => Array.from(document.querySelectorAll(target));
  
        const values:collectionInit = arr('.bodyInfo input').reduce((a,c:any,i)=>{
            a = {
                ...a,
                [c.id]:c.value
            }
            return a;
        },{
            dbName:'',
            collectionName:''
        });
        let body = {
            ...values
        }
        CollectionDelete(body,()=>{
            let body2 = {
                bodyType:"collection",
                dbName:values.dbName
            }
            dispatch({type:TYPE('admin_nav').REQUEST,...body2});
            router.push('/admin');
        });
    }
    return(
        <>
            <Btn onClick={submit}></Btn>
        </>
    )
}


