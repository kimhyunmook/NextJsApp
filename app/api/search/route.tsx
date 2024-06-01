"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { ResultMsg } from "@/app/api/route";
import { dbinfo } from "../env";


export async function POST(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  const client = new MongoClient(uri);
  const searchData:any[] = [];
  const keyword = data.keyword;

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'search'
  }
  function searchCompare (t:{name:string}[],type:string,href:string) {
    if (t.filter(x=>x.name === keyword).length > 0) {
      searchData.push({
        type,
        href:`${href}/${keyword}`
      })
   }
  }
    async function run() {
        try {
          await client.connect();
          const adminDB = client.db('admin');
          const dbList = await adminDB.admin().listDatabases();
          // search db
          searchCompare(dbList.databases,'db','/admin')
         
          // searchc collection
          const noList = ['sample_mflix','local','admin'];
          const collectionList = await dbList.databases.filter((db) => !noList.some(nodb => db.name===nodb)).map(async (db,i)=>{
            const client2 = new MongoClient(uri);
            await client2.connect();
            const _db = await client2.db(db.name);
            const collections = await _db.listCollections().toArray();
            // console.log(dbName,collections)
            await client2.close();
            searchCompare(collections,'collection',`/admin/${db.name}`)
            return {dbName:db.name,collections}
          })
          const collections = await Promise.all(collectionList);
          
          //search data searchKeyword 추가 전 까지 중단
          const findData = await collections.map(async(c,i)=>{
            const collection = await c.collections.map(async(c2,i2)=>{
              const clinet2 = new MongoClient(uri);
              await clinet2.connect();
              const _db = await clinet2.db(c.dbName);
              if (c2.name !== dbinfo) {
                const target  = await _db.collection(c2.name).find().toArray();
                return target;
              }
            });

            const p = await Promise.all(collection)
            return p.flat();
          })
          let datas:any = await Promise.all(findData)
          // datas = datas[1];
          console.log(datas);
          result.msg = searchData;
          result.ok = true;
        } finally {
          await client.close();
        }
    }
    await run().catch(console.dir);
    return NextResponse.json(result);
}


