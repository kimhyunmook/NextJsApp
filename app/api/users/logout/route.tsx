import { NextResponse } from "next/server";
import {MongoClient} from 'mongodb';
import { HASH, ResultMsg } from "../../route";
import { usercollection, userdb } from "../../env";
 
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
            const db = client.db(userdb);
            const users = db.collection(usercollection);
            query = {userId:data.userId}
            console.log(query)
            if(!!!users) throw result = {
              ok: 0,
              type:'logout/error',
              msg :'logout error no exist userInfo '
            } 
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