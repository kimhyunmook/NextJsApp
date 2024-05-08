"use client"
import Loading from "@/app/loadingg";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
    children:any;
}
export default function DBtableLayout (props:Props) {
    const loading = useSelector((state:any)=>state.admin.loading);
    useEffect(()=>{
        console.log(loading);
    },[loading])
    return (
        <Loading loading={loading} default={500}>
            {props.children}
        </Loading>
    )
}