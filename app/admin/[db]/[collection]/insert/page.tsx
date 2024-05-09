"use client"
import FormDefault from "@/app/form/page";
import util from "@/app/util/utils";
import { useEffect, useState } from "react";
import { adminDatainertApi, adminListApi } from "@/lib/api/adminApi";
import Loading from "@/app/loadingg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
type Props = {
    params:{
        db:string;
        collection: string | any;
    }
}
export default function Insert (props:Props) {
    const params = props.params;
    const [keys,setKeys] = useState<any>([])
    const [labels,setLabels] = useState<any>([])
    const uitls = util();
    const datas = useSelector((state:any)=>state.admin.datas);
    const [obj ,setObj] = useState<any>(null);
    const router = useRouter();

    useEffect(()=>{
        if (!!datas) {
            setObj(datas.label)
        }
    },[datas])

    useEffect(()=>{
        if(!! obj) {
            delete obj.create_date
            delete obj._id;
            const _keys:any = [];
            const _values:any = [];
            Object.keys(obj).filter((x,i)=> {
                if(!x.includes('index')) {
                    _keys.push(x)
                    _values.push(Object.values(obj)[i]);
                }
            });
            setKeys(_keys);
            setLabels(_values);
        }
    },[obj])

    return(
        <Loading loading={null} default={500}>
            <></>
            {
                !! obj ?
                <FormDefault 
                    title={uitls.firstUppercase(params.collection)} 
                    data={{collectionName:params.collection,dbName:params.db,keys,labels}} 
                    submit={adminDatainertApi}>
                </FormDefault> :
                null
            }
        </Loading>
    )
}