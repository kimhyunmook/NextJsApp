"use client"
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TYPE from "@/lib/type";

type Props = {
    children:any;
}
export default function DBtableLayout (props:Props) {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        let body:any ={
            type:TYPE('admin_nav_collection').REQUEST,
            bodyType:'collection',
            dbName: params.db
        }
        dispatch({...body})
        body = {
            bodyType:'collection_target',
            dbName:params.db,
            collectionName:params.collection,
        }   
        dispatch({type:TYPE(`admin_collection_target`).REQUEST,...body})     
    },[params])
    return (
        <>
            {props.children}
        </>
    )
}