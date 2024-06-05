'use client';

import { useEffect, useRef } from "react";

export type tooltipProps = {
    text:string;
}
export default function Tooltip(props:tooltipProps) {
    const tooltipRef = useRef(null);
    useEffect(()=>{
        if (tooltipRef.current) {
            const tooltip = tooltipRef.current as HTMLElement;
            const parent  = tooltip.parentElement as HTMLElement;
            parent.style.position = 'relative';
            parent.addEventListener(('mouseover'),()=>{
                tooltip.style.display='block';
            })
            parent.addEventListener(('mouseout'),()=>{
                tooltip.style.display='none';
            })
        }
    },[])
    return (
        <div ref={tooltipRef} className="tooltip-basic">
            { props.text }
        </div>
    )
}