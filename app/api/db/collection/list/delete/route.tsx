"use server";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { ResultMsg } from "@/app/api/route";

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
            const db = client.db('dev');
            const collection = await db.collection(data.collectionName);
            const mongoId = new ObjectId(data.mongoid)
            await collection.deleteOne({_id:mongoId})
            const user = await collection.findOne({_id:mongoId})
            result.ok = true;
            result.msg = `delete user ${data.mongoid}`;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }