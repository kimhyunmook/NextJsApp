import axios from "axios";

/** /api/db/home/setting */
export async function init() {
    const res = await axios.post('/api/db/home/setting').then(res=>res.data);
    return res;
}

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

// data
export async function adminDataDeleteApi(body:any) {
    console.log('123',body)
    const res = await axios.post('/api/db/collection/list/delete',body);
    return res;
}

export async  function adminDataInertApi(body:any) {
    const res = await axios.post('/api/db/collection/list/insert',body).then(res=>res.data);
    return res;
}
export async function adminDataEditApi(body:any) {
    const res = await axios.post('/api/db/collection/list/edit',body).then(res=>res.data);
    return res;
}

//db
export async function adminDBInfoApi(body:any) {
    const res = await axios.post('/api/db/info',body)
    .then(res=>res.data);
    return res;
}

export async function adminDBInfoEditApi(body:any) {
    const res = await axios.post('/api/db/info/edit',body)
     .then(res=>res.data);
     return res;
}

export async function adminHomeApi (body?:any) {
    const res = await axios.post('/api/db/home',body)
        .then(res=>res.data);
    return res;
}

export type collectionInit = {
    collectionName:string;
    dbName:string;
}
export async function adminCollectionDelete (body:collectionInit) {
    const res = await axios.post(`/api/db/collection/delete`,body)
        .then(res=>res.data);
    return res;

}
export type collectionReName = collectionInit & {
    newCollectionName:string;
} 
export async function adminCollectionRename (body:collectionInit) {
    const res = await axios.post(`/api/db/collection/rename`,body)
        .then(res=>res.data);
    return res;
}
export type collectionInfoEdit = {
    dbName:string,
    collectionName:string,
    description:string,
    // key:string[],
    labelName:string[],
}
/** 
 * /api/db/collection/infoeidt
*/
export async function adminCollectionInfoEdit (body:collectionInfoEdit) {
    const res = await axios.put(`/api/db/collection/infoedit`,body)
        .then(res=>res.data)
    return res;
}