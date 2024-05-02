import TYPE from "@/lib/type";
interface State {
  nav?: Data | null;
  datas?:Data | null;
  loading: boolean;
  error: string | null;
}

export interface Data {
    data:[]
}

const initialState:State = {
  nav: null,
  datas:null,
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action: any): State => {
  const nav = TYPE('admin_nav')
  const data = TYPE('admin_collection_target');

  switch (action.type) {
    // navi
    case nav.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case nav.SUCCESS:
      return {
        error:null,
        nav: action.payload.msg,
        loading: false,
      };
    case nav.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // data
    case data.REQUEST:
        return {
          ...state,
          loading:true,
        }   
    case data.SUCCESS:
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