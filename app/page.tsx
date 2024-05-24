"use client";

import React, { useEffect, useState } from "react";
import Btn from "./component/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "./component/layoutControl";
import { useRouter } from "next/navigation";
import SearchForm from "./component/searchForm";
import style from "./util/style";


interface RootState {
  counter:number
}
export default function Home() {
  const router = useRouter()
  function test (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      const res = axios.post('/api').then(res=>res.data);
  }
  useEffect(()=>{
    // router.push('/admin');
  },[])

  return (
    <Layout all={true}>
      <div className={`${style.absolute_center(5)} w-full`}>
        <SearchForm />
      </div>
    </Layout>
  );
}
