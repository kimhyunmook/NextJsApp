import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { ResultMsg, dbExists } from "@/app/api/route";
 
export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let result:ResultMsg ={
        ok:false,
        type:'deleteCollection'
    }
      async function run() {
          try {
            let exists = await dbExists(client,data.dbName);
            if (!exists) {
              result.msg ='DB가 존재하지 않습니다.';
              throw result;
            }
            const db = client.db(data.dbName);
            if (data.collectionName === 'users'||data.collectionName ==='DB_Info') {
              result.msg = '삭제 할 수 없는 collection입니다.';
              throw result; 
            } 
            await db.collection(data.collectionName).drop();
            
            result.ok = true;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }