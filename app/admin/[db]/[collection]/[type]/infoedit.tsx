'use client'

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Li } from "@/app/login/page";
import CreateLayout from "@/app/admin/mongodb/collection/[type]/create";
import text from "@/app/language/ko-kr/collection";
import { adminCollectionInfoEdit, collectionInfoEdit } from "@/lib/api/adminApi";

type collectionEditType ={
    params:{
        db:string;
        collection:string;
    },
    obj:{}
}
export default function CollectionEdit(props:collectionEditType) {
    const params = props.params;
    const datas = useSelector((state:any)=>state.admin.datas);
    const [label,setLabel] = useState({});
    const [description,setDes] = useState(datas.label.description);

    useEffect(()=>{
        delete datas.label.key_index;
        delete datas.label._id;
        delete datas.label.create_date;
        setDes(datas.label.description);
        delete datas.label.description;
        setLabel(datas.label)
   
    },[datas])
    async function editSubmit (e:React.MouseEvent) {
        e.preventDefault();
     
        let body:collectionInfoEdit = {
            dbName:params.db,
            collectionName:params.collection,
            description:description,
            key:[],
            labelName: []
        }
        const labelName = await document.querySelectorAll('.labelName').forEach((v)=>{
            if (v instanceof HTMLInputElement) {
                body.labelName.push(v.value)
            }
        });
        const key = await document.querySelectorAll('.key').forEach((v,i:number)=>{
            if (v instanceof HTMLInputElement) {
                body.key.push(v.value)
            }
        });
        // await 
        console.log(body);

        await adminCollectionInfoEdit(body);
    }

    return (
        <div className="md:max-w-[600px] m-auto p-10 pt-4 pb-4">
            <Li name="description" overflow={false} className="" value={description} label={text.create_des} />
            <CreateLayout 
                btnStyle="max-w-[50px] mr-2 text- p-0" 
                title={`Collection Edit: ${params.db}`} 
                data={label}
                submit={editSubmit}
            />
        </div>
    )
}