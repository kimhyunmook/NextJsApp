import { NextResponse } from "next/server";
import {MongoClient} from 'mongodb';
import { HASH, ResultMsg } from "../../route";
 
export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
    const headers = new Headers();
  
    let query:any = ''
    let result:ResultMsg ={
        ok:0,
        type:'logout'
    }
      async function run() {
          try {
            const db = client.db('dev');
            const users = db.collection('users');
            query = {userId:data.userId}
            if(!!!users) throw result.msg ='logout error no exist userInfo '
            const cookieValue = `l_token="";Max-Age=0; Path=/`
            await headers.append('Set-Cookie',cookieValue);
            await users.updateOne(query,{$set:{l_token:""}});
            result.ok=1;
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result,{
        status: 200,
        headers: headers,
      })
  }