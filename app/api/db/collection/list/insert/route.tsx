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
        type:'list/insert'
    }
      async function run() {
          try {
            const db = client.db(data.dbName);
            const collection = await db.collection(data.collectionName);
            const insertData = data.insertData;
            let index = await collection.find().toArray();
            await insertData.map(async (v:any,i:number)=>{
                v.key_index = index[index.length-1].key_index+(i+1); 
                v.create_date = new Date();
            })
            await collection.insertMany(insertData)
            result.ok = true;
            result.msg = 'insert Data'            
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }