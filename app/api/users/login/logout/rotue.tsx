import { NextRequest, NextResponse } from "next/server";
import {MongoClient} from 'mongodb';
import { HASH, ResultMsg } from "../../../route";
 
export async function POST (request:NextRequest) {
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
        } finally {
            await client.close();
        }
    }
    await run().catch(console.dir);

    NextResponse.json(result);
}