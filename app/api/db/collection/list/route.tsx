"use server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "../../route";

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
            const db = client.db('dev');
            const targetdb = await db.collection(data.target);
            const target = await targetdb.find({}).sort({key_index:-1}).limit(50).toArray();
            result.ok=1;
            result.type=`setting/list`;
            result.msg= target;
            result.data = target;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }