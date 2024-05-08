import axios from "axios";

export async function mongoConnect (body:any) {
    const res = await axios.post('/api',body).then(res=>res.data);
    return res;
}

export async function adminNavApi (body:any) {
    const res = await axios.post('/api/db/nav',body).then(res=>res.data)
    return res;
}

export async function adminListApi(body:any) {
    const res = await axios.post('/api/db/collection/list',body).then(res=>res.data);
    return res;
}

export async function adminDataDeleteApi(body:any) {
    const res = await axios.post('/api/db/collection/list/delete',body);
    return res;
}

export async  function adminDatainertApi(body:any) {
    const res = await axios.post('/api/db/collection/list/insert',body).then(res=>res.data);
    return res;
}

export async function adminDBInfoApi(body:any) {
    const res = await axios.post('/api/db/info',body)
    .then(res=>res.data);
    return res;
}