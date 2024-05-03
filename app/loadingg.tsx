"use client"

import { useEffect, useState } from "react"

interface Props {
    children:any;
    loading:boolean | null| undefined | unknown;
    default?:number
}
export default function Loading(props:Props) {
    const [loading,setLoading] = useState<any>(true);
    useEffect(()=>{
        if (!!props.default) setTimeout(()=>{
            setLoading(false); 
        }, props.default)
        else setLoading(props.loading); 
    },[props.loading])
    return(
        <div className="loading h-full">
            {
                loading ?
                    <div className="loading-page">
                        <div className="spinner"></div>
                        <div className="loading-text">Loading...</div>
                    </div>
                    : props.children
            }
            {/* {props.children} */}
        </div>
    )
}