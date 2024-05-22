"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "@/app/api/route";
import { DatabaseType, UserType } from "@/app/api/types";
import { dbinfo } from "@/app/api/env";

export async function POST(request:Request){
//   const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'setting/init'
  }
    async function run() {
        try {
            await client.connect()
            const adminDb = client.db('admin');
            const dbList = (await adminDb.admin().listDatabases()).databases;
            const settingList = ['dev','users']
            //초기 비밀번호 1234
            let userData:UserType = {
                userId:"admin",
                userPw:"$2b$10$01XPNRJ3/bAdNOWD232Yge.eGF.QRKAwT0Jm1rNrXPVbl2GX/Hi8K",
                userName:"admin",
                userPhoneNumber:"",
                singUpDate:new Date(),
                l_token:"",
                key_index:0,
                role:0,
            } 

            await settingList.map(async(name:string,i)=>{
                const dbList2 = await dbList.filter((db,i)=>db.name === name); 
                if (dbList2.length <= 0) {
                    const client2 = new MongoClient(uri)
                    client2.connect();
                    const db = await client2.db(name);
                    const date = new Date();
                    let info:DatabaseType = {
                        database_name:name,
                        db_description:'',
                        create_date:date,
                    }
                    let DBINFO = await db.collection(dbinfo).find().toArray();
                    console.log(DBINFO.length);
                    if (DBINFO.length === 0) {
                        let createDBINFO = await db.createCollection(dbinfo);
                        await createDBINFO.insertOne(info);
                    }

                    // add admin
                    if (name === 'users') {
                        const list = await db.createCollection('list');
                        const admin = await db.collection('list').find().toArray();
                        if (admin.length <=0)
                            await list.insertOne(userData)
                    }
                    
                    await client2.close();
                }
            })
            result.ok = true;
            result.msg = {
            };
        } 
        catch(error:any) {
            if (error.message.includes('not authorized on admin to execute command')) {
                console.log('권한 없음');
            } else {
                console.error('오류 발생: \n', error);
            }
        } finally {
          await client.close();
        }
    }
    await run();

    return NextResponse.json(result);
}