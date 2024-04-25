import axios from "axios";

async function commonApi (uri:string, body:any) {
    const res = await axios.post(uri,body)
        .then(res=>res.data)
    return res
}

export async function fetchUserApi(body:any){
    return commonApi('/api/users/login',body)
}

export async function logoutAPi(body:any){
   return commonApi('/api/users/logout',body);
}

export async function fixUserAPi(body:any) {
    return commonApi('/api/users/fix',body);
}