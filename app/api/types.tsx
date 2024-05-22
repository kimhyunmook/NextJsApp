export type UserType = {
    userId:string;
    userPw:string;
    userName:string;
    userPhoneNumber:string;
    key_index:number;
    singUpDate:Date;
    l_token:string;
    role:number;
}

export type DBinfo = {
    database_name:string;
    db_description:string;
    create_date:Date;
}