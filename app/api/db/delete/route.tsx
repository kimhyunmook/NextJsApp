import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { ResultMsg } from "../../route";
 
export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let query:any = ''
    let result:ResultMsg ={
        ok:0,
        type:'deleteCollection'
    }
      async function run() {
          try {
            const db = client.db('dev');
            if (data.collectionName === 'users') throw result.ok = false; 
            await db.collection(data.collectionName).drop();
            
            result.ok = true;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }