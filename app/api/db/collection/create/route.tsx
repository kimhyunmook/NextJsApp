import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { ResultMsg } from "@/app/api/route";
 
export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let query:any = ''
    let result:ResultMsg ={
        ok:false,
        type:'createCollection'
    }
      async function run() {
          try {
            const db = client.db('dev');
            const collections = await db.listCollections().toArray();
            const date = new Date();
            await collections.forEach((v:any)=>{
              if(v.name === data.collectionName) {
                result.msg = 'DB 중복'
                throw false
              }
            })

            type Schema = {
              key_index:number;
              [key:string]:any
            }
            let schema:Schema = {
              key_index:0,
              create_date:date
            }
            await db.createCollection(data.collectionName)
            data.schema.forEach((item:any)=>{
              schema[item.keyName] = item.keyLabel ;
            });
            const collection = await db.collection(data.collectionName);
            await collection.insertOne(schema);
            
            result.ok=true;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }