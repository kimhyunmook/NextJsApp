import axios from "axios";
import { UseDispatch, useDispatch } from "react-redux";
import TYPE from "@/lib/type";
import Btn from "@/app/component/button";

export default function DeleteLayout() {
    const dispatch = useDispatch()
    async function submit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const collectionName = document.querySelector('#collectionName') as HTMLInputElement;
        let body = {
            collectionName:collectionName.value,
        }
        if(window.confirm('삭제하시겠습니까?')) {
            await axios.post(`/api/db/delete`,body)
                .then(res=>{
                    if (res.data.ok) {
                        alert('삭제되었습니다.');
                        let body = {
                            bodyType:"collection"
                        }
                        dispatch({type:TYPE('admin_nav').REQUEST,...body})
                        window.location.reload();
                    } else alert('삭제할 수 없는 Collection입니다.')
                })
        }
    }
    return(
        <>
            <Btn onClick={submit}></Btn>
        </>
    )
}