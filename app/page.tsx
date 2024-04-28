"use client";

import React, { useEffect, useState } from "react";
import Btn from "./component/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";

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
interface RootState {
  counter:number
}
export default function Home() {
  function test (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      const res = axios.post('/api').then(res=>res.data);
  }
  useEffect(()=>{

  },[])

  return (
    <div className="onepage" >
      <div className="box-container pr-10 pl-10 pb-4 pt-4 grid grid-cols-1 gap-4" >
        <div className="box sample h-[300px] border rounded-md">1234554654654654654645654654645654</div>
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
        <div className="box sample h-[300px] border rounded-md"></div>
      </div>
      <ul className="bottom-tool max-w-[300px] max-h-[50px] fixed bottom-0 right-0">
        <ListLink href="/form" className="mb-3 mt-3">
          <Btn className="text-right bottom-3 right-5" onClick={test}>
            테스트
          </Btn>
        </ListLink>
      </ul>
    </div>
  );
}
