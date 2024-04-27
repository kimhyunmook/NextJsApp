import TYPE from "@/lib/type";
interface State {
  nav?: Data | null;
  userList?:Data | null;
  loading: boolean;
  error: string | null;
}

export interface Data {
    data:[]
}

const initialState:State = {
  nav: null,
  userList:null,
  loading: false,
  error: null,
};

const adminReducer = (state = initialState, action: any): State => {
  const nav = TYPE('admin_nav')
  const userList = TYPE('admin_user');

  switch (action.type) {
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
    case userList.REQUEST:
        return {
            ...state,
            loading:true,
        }   
    case userList.SUCCESS:
        return {
            ...state,
            loading:false,
            userList:action.payload.msg
        }
    case userList.ERROR :
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