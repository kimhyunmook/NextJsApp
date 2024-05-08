import axios from "axios";
import { UseDispatch, useDispatch } from "react-redux";
import TYPE from "@/lib/type";
import Btn from "@/app/component/button";
import { useRouter } from "next/navigation";

export default function DeleteLayout() {
    const dispatch = useDispatch();
    const router = useRouter();

    async function submit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const arr = (target:string) => Array.from(document.querySelectorAll(target));
        type values= {
            collectionName:string;
            dbName:string;
        }
        const values:values = arr('.bodyInfo input').reduce((a,c:any,i)=>{
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
        if(window.confirm('삭제하시겠습니까?')) {
            await axios.post(`/api/db/collection/delete`,body)
                .then(res=>{
                    if (res.data.ok) {
                        alert('삭제되었습니다.');
                        let body = {
                            bodyType:"collection",
                            dbName:values.dbName
                        }
                        dispatch({type:TYPE('admin_nav').REQUEST,...body});
                        router.push('/admin');
                    } else alert(res.data.msg)
                })
        }
    }
    return(
        <>
            <Btn onClick={submit}></Btn>
        </>
    )
}