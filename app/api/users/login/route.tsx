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
      type:'login'
  }
  async function run() {
      try {
        const db = client.db('dev');
        const users = db.collection('users');
        console.log(data);
        query = {userId:data.userId};
        const user:any = await users.findOne(query);
        const failResult = {
          ok:0,
          type:'login/fail',
          msg:'ID or Password가 틀립니다.'
        }
        if(!!!user)  {
          throw result=failResult;
        }
        
        const Hash = await HASH(data.userPw,user.userPw)
        if(Hash) {
          if(!!user.l_token) {
            await users.updateOne(query,{$set:{l_token:""}});
            const cookieValue = 'l_token=' + '' + '; Max-Age=0; Path=/';      
            await headers.append('Set-Cookie', cookieValue);
            return result ={
              ok:0,
              type:'login/logining',
              msg:'이미 로그인 중입니다.'
            } 
          } else {
            const token =await HASH(query.userId+Math.floor(Math.random()*100000).toString());
            const cookieValue = 'l_token=' + token + '; Max-Age=3600; Path=/';      
            await users.updateOne(query,{$set:{l_token:token}})
            await headers.append('Set-Cookie', cookieValue);
  
            delete user.userPw;
            delete user.l_token;
            delete user._id;
            result.ok=1;
            result.msg=user
          }

        } else throw result=failResult;
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