import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { ResultMsg } from "../../route";
 
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
            console.log(data.schema);
            await collections.forEach((v:any)=>{
              if(v.name === data.collectionName) {
                result.msg = 'overlap'
                throw false
              }
            })
            ///내일은 여기 fiter로 변경해서 하기
            type Schema = {
              key_index:number;
              [key:string]:any
            }
            let schema:Schema = {
              key_index:0
            }
            await db.createCollection(data.collectionName)
            data.schema.forEach((item:any)=>{
              schema[item.keyName] = item.keyType ;
            });
            console.log(schema)
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