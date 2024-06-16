import TYPE from "@/lib/type";
export interface AdminReducer {
  navDB?: navData | null;
  navCollection?: navData | null;
  datas?:adminListDatas | null | any;
  loading: boolean;
  error: string | null;
}

export interface navData {
  data:[]
}
export interface adminListDatas {
  list: []
  label: {}
}

const initialState:AdminReducer = {
  navDB: null,
  navCollection:null,
  datas:null,
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action: any): AdminReducer => {
  const nav = TYPE('admin_nav')
  const nav_collection = TYPE('admin_nav_collection')
  const data = TYPE('admin_collection_target');
  switch (action.type) {
    //loading
    case nav.REQUEST || nav_collection.REQUEST || data.REQUEST :
      return {
        ...state,
        datas:{
          list:[],
          label:{}
        },
        loading: true,
      };
    // navi
    case nav.SUCCESS:
      return {
        ...state,
        error:null,
        navDB: action.payload.msg,
        loading: false,
      };
  
    // collection
    case nav_collection.SUCCESS :
      return {
        ...state,
        loading:false,
        navCollection:action.payload.msg
      }
    // data
    case data.SUCCESS :
      return {
        ...state,
        loading:false,
        datas:action.payload.msg
      }

    // error
    case nav.ERROR ||nav_collection.ERROR || data.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;