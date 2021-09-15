import { REGISTRATION_ERROR, AUTH_ERROR, USER_DATA, USER_REG, IS_AUTH, IS_EDIT} from './types';

const initState = {
  error: [],
  authError: '',
  userData: {},
 userRegistration:false, 
 isAuth:false, 
 isEdit:false, 
};

const articleReduser = (state = initState, action) => {
  switch (action.type) {
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };

    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };    
	  
	  case USER_REG:
      return {
        ...state,
        userRegistration: action.payload,
      };	 
	  
	  case IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };	 
	  
	  case IS_EDIT:
      return {
        ...state,
        isEdit: action.payload,
      };

    default:
      return state;
  }
};

export default articleReduser;
