"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "../../route";


export async function POST(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:''
  }
    async function run() {
        try {
          const db = client.db(data.dbName)
          const info = await db.collection('DB_Info').findOne({database_name:data.dbName});
          if (info) {
            result.msg = info;
            result.ok = true;
            result.type = `setting/dbinfo`;
          } else {
            result.msg = 'no info';
          }
        } finally {
          await client.close();
        }
    }
    await run().catch(console.dir);
    return NextResponse.json(result);
}