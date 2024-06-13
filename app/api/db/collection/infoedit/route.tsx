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
            console.log(data);
            const db = await client.db(data.dbName);

          
            const result = data.key.reduce((obj:any, key, index) => {
              obj[key] = data.labelName[index];
              return obj;
            }, {});
            const update = {
              ...result,
              description:data.description,
            }
            console.log(update);
            const col = await db.collection(data.collectionName).updateOne({key_index:0},{$set:update,$unset:{
              db5:""
            }})
            const colInfo = await db.collection(data.collectionName).findOne({key_index:0});
            console.log(colInfo)
            result.ok = true;
            result.msg = 'Update 되었습니다.'
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }