"use client"

import { useEffect, useRef } from "react"
import { flex_center } from "../util/style";

interface Props {
    children:React.ReactNode
}
export default function Container (props:Props) {
    const containerRef =useRef<HTMLDivElement>(null);
    useEffect(()=>{
        // if(containerRef.current && window.outerHeight > (containerRef.current.clientHeight)) {
        //     containerRef.current.classList.value+=` h-[60vw] ${flex_center}`
        // }
    },[containerRef])
 
    return(
        <div 
        ref={containerRef} 
        className="_container ">
            {props.children}
        </div>
    )
}