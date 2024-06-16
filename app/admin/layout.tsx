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
                        {
                            !! user ?
                            <>
                                <h2 className="w-full font-black text-4xl mb-1">
                                    어드민 권한 필요 (권한 없음)
                                </h2>
                                <Link href={'/'} className="w-full text-blue-300 text-2xl hover:border-b-2 hover:text-blue-500 border-blue-500 pb-[1px]">
                                    To Home
                                </Link>
                            </>
                            :
                            <>
                                <h2 className="w-full font-black text-4xl mb-1">
                                    어드민 로그인 필요 
                                </h2>
                                <Link href={'/login'} className="w-full text-blue-300 text-2xl hover:border-b-2 hover:text-blue-500 border-blue-500 pb-[1px]">
                                    To Login
                                </Link>
                            </>
                        }
                    </div>
                </div> 
            }
        </Layout>
    )
}