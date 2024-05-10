"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { ResultMsg } from "@/app/api/route";


export async function POST(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'DB Infomation Update'
  }
    async function run() {
        try {
          await client.connect();
          const db = client.db(data.dbName)
          query = {
            ...data,
            create_date:new Date()
          }
          const _id = new ObjectId(data._id)
          const update = await db.collection('DB_Info').updateOne({_id:_id},{$set:query})
          console.log(_id,query);
          result = {
            ...result,
            ok:true,
            msg:`${update.matchedCount} 수정되었습니다.`
          }
        } finally {
          await client.close();
        }
    }
    await run().catch(console.dir);
    return NextResponse.json(result);
}