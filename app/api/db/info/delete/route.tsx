"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { ResultMsg } from "@/app/api/route";


export async function DELETE(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'DB drop'
  }
    async function run() {
        try {
          await client.connect();
          const db = client.db(data.dbName);

          await db.dropDatabase();
          
          result = {
            ...result,
            ok:true,
            msg:`${data.dbName} DB가 삭제되었습니다.`
          }
        } finally {
          await client.close();
        }
    }
    await run().catch(console.dir);
    return NextResponse.json(result);
}