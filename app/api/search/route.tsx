"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "@/app/api/route";


export async function POST(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'setting/dbinfo'
  }
    async function run() {
        try {
          await client.connect();
          const adminDB = client.db('admin');
          const dbList = await adminDB.admin().listDatabases();
          console.log(dbList);
          result.msg = '';
          result.ok = true;
        } finally {
          await client.close();
        }
    }
    await run().catch(console.dir);
    return NextResponse.json(result);
}