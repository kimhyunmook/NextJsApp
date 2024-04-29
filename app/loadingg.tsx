"use client"

import { useEffect, useState } from "react"

interface Props {
    children:any;
    loading:boolean | null| undefined | unknown;
}
export default function Loading(props:Props) {
    const [loading,setLoading] = useState<any>(true);
    useEffect(()=>{
        setLoading(props.loading); 
    },[props])
    return(
        <div className="loading h-full">
            {loading ?
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