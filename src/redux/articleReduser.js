import { GET_ARTICLE, NEW_ARTICLE, EDIT_ARTICLE,FAVORITE_LIKE } from './types';

const initState = {
  singleArticle: [],
  newArticle:false,
	editArticle:false,
	favorite:false,
};

const articleReduser = (state = initState, action) => {
  switch (action.type) {
    case GET_ARTICLE: {
      return {
        ...state,
        singleArticle: action.payload,
      };
    }    
	  
	  case NEW_ARTICLE: {
      return {
        ...state,
        newArticle: action.payload,
      };
    }	 
	  
	  case EDIT_ARTICLE: {
      return {
        ...state,
        editArticle: action.payload,
      };
    }	 
	  
	  case FAVORITE_LIKE: {
      return {
        ...state,
        favorite: action.payload,
      };
    }

    default:
      return state;
  }
};

export default articleReduser;
