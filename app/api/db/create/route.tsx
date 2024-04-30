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
        type:'createCollection'
    }
      async function run() {
          try {
            const db = client.db('dev');
            const collections = await db.listCollections().toArray();
            console.log(data.schema);
            const overlap = (await collections).forEach((v:any)=>{
              if(v.name === data.collectionName) {
                result.msg = 'overlap'
                throw false
              }
            })

            let schema:any = {}
            await db.createCollection(data.collectionName)
            data.schema.forEach((item:any)=>{
              schema[item.keyName] = '';
            });
            console.log(schema)
            const collection = await db.collection(data.collectionName);
            await collection.insertOne(schema);
            
            result.ok=1;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }