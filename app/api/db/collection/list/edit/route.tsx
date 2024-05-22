"use server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "@/app/api/route";

export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let query:any = ''
    let result:ResultMsg ={
        ok:false,
        type:'list/edit'
    }
      async function run() {
          try {
            const db = client.db(data.dbName);
            const collection = await db.collection(data.collectionName);
            const updateData = data.data;
            let index = await collection.find().toArray();
            await updateData.map(async (v:any,i:number)=>{
                v.key_index = data.key_index; 
                v.create_date = new Date();
            })
            console.log(updateData[0]);
            query = {key_index:data.key_index}
            await collection.updateOne(query,{$set:updateData[0]})
            result.ok = true;
            result.msg = '수정되었습니다.';
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }