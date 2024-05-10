'use client'
import Loading from "@/app/loadingg"
import { mobile_box, title } from "@/app/util/style"
import util from "@/app/util/utils";
import { DBInfoList } from "../page";
import Btn from "@/app/component/button";
import { adminDBInfoEditApi } from "@/lib/api/adminApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import TYPE from "@/lib/type";

export default function dbEdit ({params}:{params:{
    db:string;
}}) {
    const utils = util();
    const router = useRouter();
    const dispatch = useDispatch();

    function submit (e:React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const inputs = utils.arr('#dbEdit input')
        const value = inputs.reduce<Record<string,any>>((a,c,i)=>{
            if (c instanceof HTMLInputElement)
                a[c.name] = c.value
            return a
        },{}) 
        
        let body:any = {
            ...value,
            dbName:params.db
        }
        adminDBInfoEditApi(body)
            .then(res=>{
                if (res.ok) {
                    alert(res.msg);
                    dispatch({type:TYPE('admin_nav').REQUEST,bodyType:'db'});
                    router.back()
                } else alert('수정에 실패했습니다.');
            });
    }
    return(
        <Loading loading={null}>
            <form action="" id="dbEdit">
                <ul className={mobile_box+' pt-4'}>
                    <li>
                        <h2 className={title}>
                            {utils.firstUppercase(params.db)}
                        </h2>
                    </li>
                    <DBInfoList dbName={params.db} type={'edit'}></DBInfoList>
                    <li>
                        <Btn className="mt-4" onClick={submit}>
                            수정
                        </Btn>
                    </li>
                </ul>
            </form>
        </Loading>
    )
}