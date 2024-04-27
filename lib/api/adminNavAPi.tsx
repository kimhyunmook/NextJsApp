import axios from "axios";

export async function adminNavApi (body:any) {
    const res = await axios.post('/api',body).then(res=>res.data)
    return res;
}

export async function adminApi(body:any) {
    const res = await axios.post('/api',body).then(res=>res.data);
    return res;
}