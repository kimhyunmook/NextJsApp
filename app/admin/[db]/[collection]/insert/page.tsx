"use client"
import FormDefault from "@/app/form/page";
import util from "@/app/util/utils";
import { useEffect, useState } from "react";
import { adminDatainertApi, adminListApi } from "@/lib/api/adminApi";
import Loading from "@/app/loadingg";
type Props = {
    params:{
        collection: string | any;
    }
}
export default function Insert (props:Props) {
    const target = props.params.collection;
    const [keys,setKeys] = useState<any>([])
    const [labels,setLabels] = useState<any>([])
    const uitls = util();

    useEffect(()=>{
        let body = {
            bodyType:'collection_target',
            target,
        }   
        adminListApi(body)
            .then(res => {
                const obj = res.data[res.data.length-1];
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
            });
    },[])

    return(
        <Loading loading={null} default={500}>
            <FormDefault title={uitls.firstUppercase(target)} data={{collection:target,keys,labels}} submit={adminDatainertApi}>

            </FormDefault>
        </Loading>
    )
}