"use server";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt from 'bcrypt';
import { MongoClient } from "mongodb";

const saltRounds = 10;
export async function HASH (pw:string,compare?:string|undefined|null) {
    if(!!!compare)
      return bcrypt.hashSync(pw,saltRounds)
    else 
      return bcrypt.compareSync(pw,compare,)
}


export type ResultMsg = {
  ok:number|boolean;
  type:string|object|any[];
  msg?:string|object|any[];
  data?:any;
}

export async function GET() {
  return NextResponse.json({
    hello:'world'
  })
}

export async function POST(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:0,
      type:''
  }
    async function run() {
        try {
          const devdb = client.db('dev');
          const db = client.db(data.dbName)
          switch(data.bodyType) {
            case 'db':
              const adminDb = client.db('admin');
              const dbList = await adminDb.admin().listDatabases();
              result.msg = dbList.databases;
              break;
            case 'collection':
              const colletionList = await db.listCollections().toArray()
              result.msg = colletionList;
              break;
            case 'collection_target':
              const targetdb = await devdb.collection(data.target);
              const target = await targetdb.find({}).sort({userIndex:-1}).limit(50).toArray();

              result.msg = target
              break;
          }
          result.ok=1;
          result.type=`setting/${data.bodyType}`;
        } finally {
          await client.close();
        }
    }
    await run().catch(console.dir);
   
    return NextResponse.json(result)
}