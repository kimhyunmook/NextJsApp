import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { ResultMsg, dbExists } from "@/app/api/route";
import { collectionReName } from "@/lib/api/adminApi";
 
export async function POST(request:Request){
    const data:collectionReName = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let result:ResultMsg ={
        ok:false,
        type:'collection rename'
    }
      async function run() {
          try {
            await client.connect();

            const db = client.db(data.dbName); // 데이터베이스 이름
            const collectionName = data.collectionName; // 기존 컬렉션 이름
            const newCollectionName = data.newCollectionName; // 새 컬렉션 이름
        
            // 컬렉션 이름 변경
            await db.collection(collectionName).rename(newCollectionName);
            result.ok = true;
            result.msg = 'Collection 이름이 변경되었습니다.';
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }