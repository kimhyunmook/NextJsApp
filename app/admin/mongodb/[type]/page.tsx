"use client";
import { useEffect, useState } from "react";
import ConnectLayout from "./connect";
import DisconnectLayout from "./disconnect";
import CreateLayout from "./create";
import DeleteLayout from "./delete";
type Props = {
    // children?:React.ReactElement;
    params:{
        type:string
    };
}
export default function DBLayout (props:Props) {
    const [html,setHtml] = useState(<></>)
    const type = props.params.type;
    useEffect(()=>{
        switch(type) {
            case 'connect':
                setHtml(<ConnectLayout></ConnectLayout>)
                break;
            case 'disconnect':
                setHtml(<DisconnectLayout></DisconnectLayout>);
                break;
            case 'create':
                setHtml(<CreateLayout></CreateLayout>)
                break;
            case 'delete':
                setHtml(<DeleteLayout></DeleteLayout>)
                break;
        }
    },[type])
    return(
        <> 
            { html }
        </>
    )
}