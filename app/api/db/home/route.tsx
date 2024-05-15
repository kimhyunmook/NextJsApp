"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "../../route";


export async function POST(request:Request){
//   const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'setting/home'
  }
    async function run() {
        try {
        //   const db = client.db(data.dbName)
          const adminDb = client.db('admin');
          const dbList = await adminDb.admin().listDatabases();
          const noList = ['local','sample_mflix','admin']
          let { newDB, newCollection,newUser}:any = {
            newDB :[],
            newCollection:[],
            newUser:[]
          }
          
        //   database
          const dbList2 = await dbList.databases.sort().filter((db,i)=> 
            !noList.some(noDb => noDb === db.name)
          );
          const InfoPromises = await dbList2.map(async (c,i:number)=>{
            const client2 = new MongoClient(uri);
            await client2.connect();
            const db2 = client2.db(c.name);
            const data = await db2.collection('DB_Info').findOne({database_name:c.name});

            //collection
            let collection = await db2.listCollections().toArray();
            let collInfo = collection.map(async (v,i2)=>{
                const name = v.name;
                if (name=== 'users' || name ==='DB_Info') return;

                const client3 = new MongoClient(uri);
                await client2.connect();
                const db3 = client3.db(c.name)
                const find = await db3.collection(name).findOne({key_index:0});
                await client3.close();
                return {
                    type:'collection',
                    parent:c.name,
                    collection_name:name,
                    create_date:find?.create_date
                }
            })
            await client2.close();
            
            let collPromise = await (await Promise.all(collInfo)).filter((x:any) => !!x)

            if (!!data) return {
                data,
                collection:collPromise,
            };
        })

          let Info = await Promise.all(InfoPromises);
          Info.map((v:any,i)=>{
            newDB.push(v.data);
            newCollection.push(v.collection);
          })

        newDB = newDB.sort((a:any , b:any) => b.create_date - a.create_date);
        newCollection = newCollection[0].sort((a:any , b:any) => b.create_date - a.create_date);

          result.ok = true;
          result.msg = {
            newDB,
            newCollection,
            newUser
          };
        } 
        catch(error:any) {
            if (error.message.includes('not authorized on admin to execute command')) {
                // const dbName
                console.log('권한 없음');
            } else {
                console.error('오류 발생: \n', error);
            }
        } finally {
          await client.close();
        }
    }
    await  run();
    // await run().catch(console.dir);
    return NextResponse.json(result);
}