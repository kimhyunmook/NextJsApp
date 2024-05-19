"use client"
import Layout from "@/app/component/layoutControl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout ({children}:{
    children:React.ReactElement
}) {
    const params = useParams();
    const user = useSelector((state:any)=>state.user.user)
    const [admin,setAdmin] = useState(false);
    useEffect(()=>{
        if (user && user.key_index===0) {
            setAdmin(true);
        } else setAdmin(false);
    },[user,params])
    return(
        <Layout all={true}>
            { 
                admin ? 
                children : 
                <div className="">
                    어드민 로그인 필요
                </div> 
            }
        </Layout>
    )
}