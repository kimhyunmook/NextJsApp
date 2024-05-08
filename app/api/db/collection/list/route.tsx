"use server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg, dbExists } from "@/app/api/route";

export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let query:any = ''
    let result:ResultMsg ={
        ok:0,
        type:''
    }
      async function run() {
          try {
            const exists = await dbExists(client,data.dbName)
            if (!exists) {
              result.type = 'error';
              result.msg = 'db 오류';
              throw result;
            }
            const db = client.db(data.dbName);
            const collection = await db.collection(data.collectionName);
            const label =  await collection.findOne({key_index:0});
            console.log(label);
            const list = await collection.find({}).sort({key_index:-1}).limit(50).toArray();
            result.ok=1;
            result.type=`setting/list`;
            result.msg= {label, list};
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }