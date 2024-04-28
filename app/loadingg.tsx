"use client"

import { useEffect, useState } from "react"

interface Props {
    children:any;
    loading:boolean | null| undefined | unknown;
}
export default function Loading(props:Props) {
    const [loading,setLoading] = useState<any>(true);
    useEffect(()=>{
        console.log(props.loading)
        setLoading(props.loading); 
    },[])
    return(
        <div className="loading">
            {loading ?
                "로딩중" : props.children
            }
        </div>
    )
}