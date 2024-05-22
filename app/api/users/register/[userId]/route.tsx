import { NextResponse } from "next/server";
import {MongoClient} from 'mongodb';
import { uri, usercollection, userdb } from "../../../env";
import { ResultMsg } from "../../../route";

export async function POST(request:Request,context:any){
    // const data = await request.json();
    const {params} = context;
    let query:any = ''
    const client = new MongoClient(uri);
    let result:ResultMsg = {
        ok:0,
        type:'register/chkId'
    };
    async function run () {
        try {
            const db = client.db(userdb);
            const users = db.collection(usercollection);
            query = params;
            const userId = await users.findOne(query);
            if(!!userId) {
                result.ok=0;
                result.msg='overlap'
            } 
            else result.ok = 1;
        } finally {
            await client.close();
        }
    }
    await run().catch(console.dir)
   
    return NextResponse.json(result)
}