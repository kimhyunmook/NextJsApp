"use client"
import TYPE from "@/lib/type";
interface UserState {
  login:boolean|null,
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface User {
  _Id: string;
  _Name: string;
  _PhoneNumber:string;
}

const initialState: UserState = {
  login: false,
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  const user = TYPE('user')
  const logout = TYPE('logout');
  const fix = TYPE('user_fix');
  switch (action.type) {
    case user.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case user.SUCCESS:
      return {
        error:null,
        login: !!action.payload.ok ? true : false,
        user: action.payload.msg,
        loading: false,
      };
    case user.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case logout.REQUEST:
      return {
        ...state,
        loading:true,
        error:null,
      };
    case logout.SUCCESS:
      return {
        ...state,
        loading:false,
        login: !! action.payload.ok ? false :true,
        user:null,
      };
    case logout.ERROR:
      return {
        ...state,
        loading:false,
        error:action.payload
      }
    case fix.REQUEST:
      return {
        ...state,
        loading:true,
        error:null,
      }
    case fix.SUCCESS:
      if (action.payload.type=== 'user_fix_samePw') {
        alert ('이전 비밀번호와 같습니다.')
        window.location.reload();
        return {...state}  ;
      }
      return {
        ...state,
        loading:false,
        login:action.payload.type==='user_fix_pw' ? false : true,
        user: action.payload.msg
      }
    case fix.ERROR:
      return {
        ...state,
        loading:false,
        error:action.payload
      }
    default:
      return state;
  }
};

export default userReducer;