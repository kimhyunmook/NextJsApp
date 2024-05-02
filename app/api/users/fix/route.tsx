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
        type:'user_fix'
    }
      async function run() {
          try {
            const db = client.db('dev');
            const users = db.collection('users');
            query = {userId:data.userId}
            if(data.key ==='userPw') {
              const user = await users.findOne(query);
              if(!!!user) throw 'no user';
              const oldPw = await HASH(data.value, user.userPw)
              if (!oldPw) {
                const newPw = await HASH(data.value)
                await users.updateOne(query,{$set:{
                  [data.key]: newPw,
                  l_token: ""
                }})
                const cookieValue = `l_token="";Max-Age=0; Path=/`
                await headers.append('Set-Cookie',cookieValue);
                result.type = "user_fix_pw";
              } else {
                result.type = "user_fix_samePw";
              }
            } else {
              await users.updateOne(query,{$set:{
                  [data.key]:data.value
              }});
            }
            const user:any = await users.findOne(query);
            delete user.l_token;
            delete user._id;
            result.ok=1;
            result.msg=user
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result,{
        status:200,
        headers,
      })
  }