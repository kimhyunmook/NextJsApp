"use server";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt from 'bcrypt';
import { MongoClient } from "mongodb";
import fs from 'fs'

const saltRounds = 10;
export async function HASH (pw:string,compare?:string|undefined|null) {
    if(!!!compare)
      return bcrypt.hashSync(pw,saltRounds)
    else 
      return bcrypt.compareSync(pw,compare,)
}

export async function dbExists (client:MongoClient,dbName:string) {
  const list = await client.db().admin().listDatabases();
  const exists = await list.databases.some(db=>db.name === dbName);
  return exists;
}


export type ResultMsg = {
  ok:number|boolean;
  type:string|object|any[];
  msg?:string|object|any[];
  data?:any;
}

export async function POST(request:Request){
  const data = await request.json();
  const uri:any = process.env.NEXT_PUBLIC_MONGO;
  let client;

  let query:any = ''
  let result:ResultMsg ={
      ok:false,
      type:'Connect to MongoDB'
  }
  switch(data.type) {
    case 'connect':
      try {
        const client = new MongoClient(data.uri);
        await client.connect();
        const db = client.db('admin');
        if(!!!uri) {
          console.log(uri)
          let text = `NEXT_PUBLIC_MONGO = "${data.uri}"`
          fs.writeFileSync('.env',text);
        }
        result.msg = 'MongoDB 연결'
        result.ok = true;
      } catch (error) {
          console.error('Failed to connect to MongoDB:', error);
          result.msg = 'URI를 다시 한번 확인 해주세요.';
      }
      break;
    case 'disconnect' :
      fs.writeFileSync('.env','');
      result.msg ='MongoDB 연결 해제';
      result.type = 'Disconnect to MongoDB';
      result.ok = true;
      break;
    case 'create' :
      if(!!!uri) {
        result = {
          ok:false,
          type:'Create to Database',
          msg:'uri Error'
        }
        return result
      }
      client = new MongoClient(uri);
      try {
          await client.connect();
          const exists = await dbExists(client,data.dbName);
          
          if (exists) {
            result.msg = '데이타베이스 이름 중복';
            throw result;
          }
          const target = await client.db(data.dbName);
          const date = new Date();
          const infos =  {
            database_name:data.dbName,
            db_description:data.description,
            create_date:date,
          }
          const dbInfo = await target.createCollection('DB_Info');
          await dbInfo.insertOne(infos)
          console.log('데이터베이스가 성공적으로 생성되었습니다.');
          result = {
            ok:true,
            type:'Create to Database Success',
            msg:'Database가 생성되었습니다.'
          }
      } catch (error) {
          console.error('데이터베이스 생성 실패:', error);
      } finally {
          await client.close();
      }
      break;
    case 'delete' :
      client = new MongoClient(uri);
      try {
        const noRemove = ['dev,local','admin'];
        await noRemove.map((v,i)=>{
          if (data.dbName === v ) {
            result.msg ='제거할 수 없습니다.';
            throw result
          } 
        })

        await client.connect();
        const db = client.db(data.dbName);
        await db.dropDatabase();
        console.log(`${data.dbName} 데이터베이스 제거 성공`)
        result = {
          ok:true,
          type:'Delete to Database Success',
          msg:'Database가 제거되었습니다.'
        }
      } catch(error) {
        console.error(error);
      } finally {
        client.close()
      }

      break;
  }
  return NextResponse.json(result)
}