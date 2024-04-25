import { NextResponse } from "next/server";
import {MongoClient} from 'mongodb';
import { ResultMsg } from "../../route";
 
export async function POST(request:Request){
    const data = await request.json();
    const uri:any = process.env.NEXT_PUBLIC_MONGO;
    const client = new MongoClient(uri);
  
    let query:any = ''
    let result:ResultMsg ={
        ok:0,
        type:'user_fix'
    }
      async function run() {
          try {
            const db = client.db('dev');
            const users = db.collection('users');
            console.log(data);
            query = {userId:data.userId}
            users.updateOne(query,{$set:{
                [data.key]:data.value
            }})
            const user:any = await users.findOne(query);

            delete user.userPw;
            delete user.l_token;
            delete user._id;
            
            result.ok=1;
            result.msg=user
          } finally {
            await client.close();
          }
      }
      await run().catch(console.dir);
     
      return NextResponse.json(result)
  }