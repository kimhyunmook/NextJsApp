import TYPE from "@/lib/type";
interface State {
  navDB?: navData | null;
  navCollection?: navData | null;
  datas?:Data | null;
  loading: boolean;
  error: string | null;
}

export interface navData {
    data:[]
}
export interface Data {
  data:[]
}

const initialState:State = {
  navDB: null,
  navCollection:null,
  datas:null,
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action: any): State => {
  const nav = TYPE('admin_nav')
  const nav_collection = TYPE('admin_nav_collection')
  const data = TYPE('admin_collection_target');

  switch (action.type) {
    //loading
    case nav.REQUEST || nav_collection.REQUEST || data.REQUEST:
      return {
        ...state,
        loading: true,
      };
    // navi
    case nav.SUCCESS:
      return {
        error:null,
        navDB: action.payload.msg,
        loading: false,
      };
    case nav.ERROR ||nav_collection.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
    case data.ERROR :
      return {
        ...state,
        loading:false,
        error:action.payload
      }
    default:
      return state;
  }
};

export default adminReducer;