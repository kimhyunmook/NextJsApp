export const uri:any =process.env.NEXT_PUBLIC_MONGO;
export const dbinfo = 'DB_Info';

// user
export const userdb = process.env.NEXT_PUBIC_USER_DB;
export const usercollection:string = !!process.env.NEXT_PUBIC_USER_COLLECTION ? process.env.NEXT_PUBIC_USER_COLLECTION : "";