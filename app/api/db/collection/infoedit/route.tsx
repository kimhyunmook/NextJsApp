import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { ResultMsg, dbExists } from "@/app/api/route";
import { collectionInfoEdit } from "@/lib/api/adminApi";
 
export async function PUT(request:Request){
    const data:collectionInfoEdit = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let result:ResultMsg ={
        ok:false,
        type:'collection info edit'
    }
      async function run() {
          try {
            const db = await client.db(data.dbName);
          
            const resultContent = data.labelName.reduce((obj:any, key, index) => {
              obj[`content_${index+1}`] = data.labelName[index];
              return obj;
            }, {});
            const update = {
              ...resultContent,
              description:data.description,
            }
            
          
            const colInfo:any = await db.collection(data.collectionName).findOne({key_index:0});
            delete colInfo?._id;
            delete colInfo?.key_index;
            delete colInfo?.description;
            delete colInfo?.create_date;
            delete colInfo?.fix_date;
            console.log(data);
            console.log(colInfo)
            const dataUpdate:any = {}
            const arrCol = Object.keys(colInfo); 
            if(arrCol.length < data.labelName.length) {
              for(let i = arrCol.length ; i < data.labelName.length; i++) {
                dataUpdate[`content_${i+1}`] = 'null'
              }
            }
            const unset = await Object.keys(colInfo).reduce((obj:any, key, index)=>{
              const some = Object.keys(resultContent).some(x=> x===key)
              const value = Object.values(colInfo)

              if (!some) {
                obj[`content_${index+1}`] = ''
                // dataUpdate[`content_${index+1}`] = 'null'
              }
              return obj ;
            },{})

            const col = await db.collection(data.collectionName).updateOne({key_index:0},{$set:update,$unset:unset})
            delete update.description;
            delete update.fix_date;
            console.log(unset,dataUpdate)
            // update
            await db.collection(data.collectionName).updateMany({key_index:{$ne:0}},{$set:dataUpdate})
            // remove
            await db.collection(data.collectionName).updateMany({key_index:{$ne:0}},{$unset:unset})
            result.ok = true;
            result.msg = 'Update 되었습니다.'
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }