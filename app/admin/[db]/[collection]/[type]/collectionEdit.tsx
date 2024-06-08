'use client'

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateLayout from "@/app/admin/mongodb/collection/[type]/create";

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
    const [label,setLabels] = useState({});

    const noRending = ['key_index','create_date','_id'];

    useEffect(()=>{
        const value = Object.values(datas.values);
        // const confrim  = Object.keys(datas.label).reduce((a,c,i)=>{
        //     let norend=noRending.some(x=>x===c)
        //     if(!norend) {
        //     //     a ={
        //     //         ...a,
        //     //         // [c]:value[i]
        //     //     }
        //     }
        //     return a;
        // },{})
        // setLabels(datas.label)
    },[datas])
    // console.log(confirm);
    // console.log(label);


    return (
        <></>
        // <div className="md:max-w-[1200px] m-auto p-10 pt-4 pb-4">
        //     <CreateLayout btnStyle="max-w-[50px] mr-2 text- p-0" title={`Collection Edit: ${params.db}`} 
        //     />
        // </div>
    )
}