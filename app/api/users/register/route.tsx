"use server"
import { NextResponse } from "next/server";
import {MongoClient} from 'mongodb';
import { uri, usercollection, userdb } from "../../env";
import { ResultMsg, HASH } from "../../route";



export async function POST(request:Request){
    const data = await request.json();
    let query:any = ''
    const client = new MongoClient(uri);
    let result:ResultMsg = {
        ok:0,
        type:'register'
    };
    async function run () {
        try {
            const db = client.db(userdb);
            const users = db.collection(usercollection);

            const overlapId = await users.findOne({
                userId:data.userId,
            })
            const key_index = await (await users.find({}).toArray()).length + 1;
            // const overlapPN = await users.findOne({
            //     userPhoneNumber:data.userPhoneNumber
            // })
            if (!!!overlapId) {
                data.userPw = await HASH(data.userPw);
                query = {...data, key_index, l_token:"", role:1};
                await users.insertOne(query)
                result.ok=1;
            } else {
                result.ok=0;
                result.msg='overlap'
            }
        } finally {
            await client.close();
        }
    }
    await run().catch(console.dir)
   
    return NextResponse.json(result)
}