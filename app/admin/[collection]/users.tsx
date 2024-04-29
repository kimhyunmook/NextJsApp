"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminUsers (){
    const datas = useSelector<any>((state)=>state.admin.datas);
    return datas
}