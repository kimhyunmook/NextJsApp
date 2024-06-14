type CollectionTextKeys = 
    | 'create_title'
    | 'create_1_1'
    | 'create_1_2'
    | 'create_1_3'
    | 'create_2_1'
    | 'create_2_2'
    | 'description_null_1'
    | 'create_des'
    | 'create_submit'
type Collectiontext = Record<CollectionTextKeys,string>;
const text:Collectiontext = {
    create_title:'Collection 만들기',
    create_des: 'Description',
    create_1_1:'Collection을 생성할 DB',
    create_1_2:'Collection 이름',
    create_1_3:'Collection 설명',
    create_2_1:'DB Label 이름',
    create_2_2:'Label 이름',
    description_null_1:'없음',
    create_submit:'확인'

}
export default text;