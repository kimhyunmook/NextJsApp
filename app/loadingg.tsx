"use client"

import { useEffect, useState } from "react"

interface Props {
    children?:any;
    loading:boolean | null| undefined | unknown;
    default?:number
}
export default function Loading(props:Props) {
    const [loading,setLoading] = useState<boolean|unknown>(null);
    useEffect(()=>{
        if (!!props.default) setTimeout(()=>{
            setLoading(false); 
        }, props.default)
        else {
            setLoading(props.loading); 
        }
        // 최대 로딩 4초;
        setTimeout(()=>{
            setLoading(false);
        },4000)
    },[props.loading]);
    return(
        <div className="loading h-full">
            {
                !!loading ?
                    <div className="loading-page min-h-[200px]">
                        <div className="spinner"></div>
                        <div className="loading-text">Loading...</div>
                    </div>
                    :  props.children
            }
        </div>
    )
}