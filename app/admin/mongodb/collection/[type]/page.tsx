"use client"

import { Li } from "@/app/login/page";
import { title } from "@/app/util/style";
import util from "@/app/util/utils";
import { useEffect, useState } from "react";
import CreateLayout from "./create";
import DeleteLayout from "./delete";
import FormLayout from "@/app/component/form";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import text from "@/app/language/ko-kr/collection";

type Props = {
    params:{
        type:string;
    }
    context:string;
}
export default function CollectionLayout (props:Props) {
    const type = props.params?.type;
    const params = useSearchParams();
    const utils = util()
    const btnStyle = `max-w-[50px] mr-2 text- p-0`;
    const db = useSelector((state:any)=>state.admin.navDB)
    const[html,setHtml] = useState<any>([]);
    const [dbList,setDbList] = useState([]);
    const target = params.get('target')
    const [errorMsg,setErrorMsg] = useState(true);

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
    function onlyEnglish (e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        const input = e.currentTarget;
        if (input) {
            if (!utils.only(input.value)) {
                setErrorMsg(false);
                e.currentTarget.value = input.value.slice(0,-1) 
            } else {
                setErrorMsg(true);
            }
        }
    }

    return(
        <FormLayout title={'Collection '+utils.firstUppercase(type)} id="collectionForm" onClick={null}>
            <ul className="bodyInfo mb-6">
                <Li name="dbName" 
                overflow={false} 
                className="relative selectBox" 
                value={!! target ? target: ''}
                label={text.create_1_1}>
                </Li>

                <Li name="collectionName" label={text.create_1_2} overflow={false} onChange={onlyEnglish}>
                    {
                        errorMsg ? null:
                        <ErrorMsg text="영어만 입력해주세요" />
                    }
                </Li>
                <Li name="collectionDescription" label={text.create_1_3} overflow={false}></Li>
            </ul>
            { html }
        </FormLayout>
    )
}

export function ErrorMsg ({text}:{text:string}) {
    return (
        <h3 className="absolute top-full left-0 mt-1 text-sm text-red-400">
            {text} 
        </h3>
    )
}