"use server";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt from 'bcrypt';

const saltRounds = 10;
export async function HASH (pw:string,compare?:string|undefined|null) {
    if(!!!compare)
      return bcrypt.hashSync(pw,saltRounds)
    else 
      return bcrypt.compareSync(pw,compare,)
}


export type ResultMsg = {
  ok:number;
  type:string|object|any[];
  msg?:string|object|any[];
}

export async function GET() {
  return NextResponse.json({
    hello:'world'
  })
}
