"use client"

import { Li } from "@/app/login/page";
import { title } from "@/app/util/style";
import util from "@/app/util/utils";
import { useEffect, useState } from "react";
import CreateLayout from "./create";

type Props = {
    params:{
        type:string;
    }
}
export default function DB (props:Props) {
    const type = props.params?.type;
    const utils = util({})
    const btnStyle = `max-w-[50px] mr-2 text- p-0`;
    const[html,setHtml] = useState<any>([]);
    useEffect(()=>{
        switch(type) {
            case 'create':
                setHtml(
                    <CreateLayout btnStyle={btnStyle}></CreateLayout>
                )
                break;
        }
    },[])

    return(
        <form className={`p-4 m-auto max-w-[600px]`}>
            <h2 className={title}>
                {
                    utils.firstUppercase(type)     
                }
            </h2>
            <ul className="mb-4">
                <Li name="collectionName" label="Collection name"></Li>
            </ul>
            { html }
        </form>
    )
}

