"use client"
import FormDefault from "@/app/component/form/page";
import util from "@/app/util/utils";
import { ReactElement, useEffect, useState } from "react";
import { adminDataInertApi, adminDataEditApi } from "@/lib/api/adminApi";
import Loading from "@/app/loadingg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CollectionEdit from "./infoedit";
type Props = {
    params:{
        db:string;
        collection: string | any;
        type:string;
    },
    searchParams:{
        index:number|string;
    };
}
export default function CollectionType (props:Props) {
    const params = props.params;
    const [keys,setKeys] = useState<any>([])
    const [labels,setLabels] = useState<any>([])
    const uitls = util();
    const datas = useSelector((state:any)=>state.admin.datas);
    const [obj ,setObj] = useState<any>(null);
    const [values,setValues] = useState<any>(null);
    const [addBtn,setAddBtn] = useState(false);
    const [html,setHtml] = useState<ReactElement>(<></>);
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

            switch(params.type) {
                case 'insert': 
                    setAddBtn(true);
                    setHtml(
                        <FormDefault 
                        title={uitls.firstUppercase(params.collection)+`:${uitls.firstUppercase(params.type)}`} 
                        data={{collectionName:params.collection,dbName:params.db,keys,labels}}
                        addBtn={addBtn}
                        submit={adminDataInertApi}
                        valueData={!!values ? values : null}
                        >
                        </FormDefault>
                    )
                    break;
                case 'edit' :
                    setValues(datas.list.filter((x:any)=>x.key_index.toString() === props.searchParams.index)[0]);
                    setHtml(
                        <FormDefault 
                        title={uitls.firstUppercase(params.collection)+`:${uitls.firstUppercase(params.type)}`} 
                        data={{collectionName:params.collection,dbName:params.db,keys,labels}}
                        addBtn={addBtn}
                        submit={adminDataEditApi}
                        valueData={!!values ? values : null}
                        >
                        </FormDefault>
                    )
                    break;
                case 'infoedit' :
                    setHtml(<CollectionEdit params={params} obj={obj} />)
                    break;
                    
            }
        }
    },[obj])
    return(
        <Loading loading={null} default={500}>
            {
                !! obj ?
                html
                // <FormDefault 
                //     title={uitls.firstUppercase(params.collection)+`:${uitls.firstUppercase(params.type)}`} 
                //     data={{collectionName:params.collection,dbName:params.db,keys,labels}}
                //     addBtn={addBtn}
                //     submit={params.type ==='insert'? adminDataInertApi : adminDataEditApi}
                //     valueData={!!values ? values : null}
                // >
                // </FormDefault> 
                : null
            }
        </Loading>
    )
}