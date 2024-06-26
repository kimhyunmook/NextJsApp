"use server";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { ResultMsg, dbExists } from "@/app/api/route";

export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let query:any = ''
    let result:ResultMsg ={
        ok:false,
        type:data.type
    }
      async function run() {
          try {
            const db = client.db(data.dbName);
            let exists = await dbExists(client,data.dbName);
            if (!exists) {
              result.msg ='DB가 존재하지 않습니다.';
              throw result;
            }
            const collection = await db.collection(data.collectionName);
            const mongoId = new ObjectId(data.mongoid)
            await collection.deleteOne({_id:mongoId})
            result.ok = true;
            result.msg = `삭제되었습니다. key : {${data.mongoid}}`;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }