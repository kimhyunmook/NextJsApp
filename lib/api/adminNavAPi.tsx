import axios from "axios";

export async function adminNavApi (body:any) {
    const res = await axios.post('/api',body).then(res=>res.data)
    return res;
}

export async function adminListApi(body:any) {
    const res = await axios.post('/api/db/list',body).then(res=>res.data);
    return res;
}

export async function adminDataDeleteApi(body:any) {
    const res = await axios.post('/api/db/list/delete',body);
    return res;
}

export async  function adminDatainertApi(body:any) {
    const res = await axios.post('/api/db/list/insert',body).then(res=>res.data);
    return res;
}