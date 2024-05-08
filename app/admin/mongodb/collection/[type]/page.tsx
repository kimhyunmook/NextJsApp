"use client"

import { Li } from "@/app/login/page";
import { title } from "@/app/util/style";
import util from "@/app/util/utils";
import { useEffect, useState } from "react";
import CreateLayout from "./create";
import DeleteLayout from "./delete";
import FormLayout from "@/app/component/form";
import { useSelector } from "react-redux";

type Props = {
    params:{
        type:string;
    }
}
export default function CollectionLayout (props:Props) {
    const type = props.params?.type;
    const utils = util()
    const btnStyle = `max-w-[50px] mr-2 text- p-0`;
    const db = useSelector((state:any)=>state.admin.navDB)
    const[html,setHtml] = useState<any>([]);
    const [dbList,setDbList] = useState([]);

    useEffect(()=>{
        switch(type) {
            case 'create':
                setHtml(
                    <CreateLayout btnStyle={btnStyle}></CreateLayout>
                )
                break;
            case 'delete':
                setHtml(
                    <DeleteLayout />
                )
        }
    },[])
    useEffect(()=>{
        if (!!db) setDbList(db);
    },[db])

    return(
        <FormLayout title={'Collection '+utils.firstUppercase(type)} id="collectionForm" onClick={null}>
            <ul className="bodyInfo mb-4">
                <Li name="dbName" overflow={false} className="relative selectBox" label="Select the DB you want to create a collection on">
                    {/* <div className="selectBoxUnder w-full flex flex-wrap max-w-[300px] absolute top-[105%] left-0 bg-zinc-500">
                        {
                            dbList.map((v:any,i)=>{
                                return (
                                    <div key={ v.name } 
                                    className={'p-2 pr-4 pl-4 w-1/2'}>
                                        {v.name}
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </Li>
                <Li name="collectionName" label="Collection name"></Li>
            </ul>
            { html }
        </FormLayout>
    )
}

