"use client"
import Layout from "@/app/component/layoutControl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { flex_center } from "../util/style";
import Link from "next/link";

export default function AdminLayout ({children}:{
    children:React.ReactElement
}) {
    const params = useParams();
    const user = useSelector((state:any)=>state.user.user)
    const [admin,setAdmin] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        if (user && user.role === 0) {
            setAdmin(true);
        } else setAdmin(false);
    },[user,params])
    return(
        <Layout all={admin}>
            { 
                admin ? 
                children : 
                <div className={`noscroll w-full h-full text-center flex-wrap ${flex_center} text-3xl`} >
                    <div>
                        <h2 className="w-full font-black">
                            어드민 로그인 필요 
                        </h2>
                        <Link href={'#'} onClick={()=>{
                            router.back();
                        }} className="w-full text-blue-300 text-xl">
                            뒤로가기
                        </Link>
                    </div>
                </div> 
            }
        </Layout>
    )
}