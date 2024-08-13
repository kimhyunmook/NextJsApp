type NavTextKeys = 
    | 'setting_title'
    | 'connect'
    | 'disconnect'
    | 'db_create'
    | 'db_delete'
    | 'collection_create'
    | 'collection_delete'
    | 'homepage_setting'
type NavText = Record<NavTextKeys,string>;
const text:NavText = {
   setting_title :'Setting',
   connect:'MongoDB 연걸',
   disconnect:'MongoDB 해제',
   db_create:'DB 생성',
   db_delete:'DB 삭제',
   collection_create:'Collection 생성',
   collection_delete:'Collection 삭제',
   homepage_setting: '홈페이지 설정'
}
const link:NavText = {
    setting_title :'',
    connect:'',
    disconnect:'',
    db_create:'',
    db_delete:'',
    collection_create:'',
    collection_delete:'',
    homepage_setting: ''
}
export default text;
export { link }