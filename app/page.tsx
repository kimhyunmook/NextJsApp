"use client";

import React, { useEffect, useState } from "react";
import Btn from "./component/button";
import Link from "next/link";
import { useSelector } from "react-redux";

type listLink = {
  href: string;
  children?: React.ReactNode;
  className?: string
}
function ListLink(props: listLink): React.ReactElement {
  return (
    <li className="">
      <Link className={`text-center block ${props.className}`} href={props.href}>
        {props.children}
      </Link>
    </li>
  )
}
export default function Home() {
  const store = useSelector(state=>state)
  console.log(store);
  const fetchData = async () => {
    try {
      const res = await fetch("/api", {
        headers: {
          Accept: "application/json",
          method: "GET"
        }
      })

      if (res) {
        const data = await res.json();
        console.log(data);
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{

  },[])

  return (
    <div className="main" >
      <div className="box-container pr-10 pl-10 pb-4 pt-4 grid grid-cols-1 gap-4" >
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
      </div>
      <ul className="bottom-tool">
        <ListLink href="/form" className="mb-3 mt-3">
          <Btn className="text-right" onClick={fetchData}>
            글쓰기
          </Btn>
        </ListLink>
      </ul>
    </div>
  );
}
