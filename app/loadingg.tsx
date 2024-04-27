"use client"

import { useState } from "react"

interface Props {
    children:any
}
export default function Loading(props:Props) {
    const [loading,setLoading] = useState(false)

    return(
        <div className="loading">
            {loading ?
                "로딩중" : props.children
            }
        </div>
    )
}