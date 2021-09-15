import { GET_ARTICLES, PAGE, LOADING, GET_ARTICLE, REGISTRATION_ERROR, 
		AUTH_ERROR, USER_DATA, USER_REG, IS_AUTH, IS_EDIT, NEW_ARTICLE, FAVORITE_LIKE } from './types';

import Api from '../servise/Api';

const api = new Api();

export function getArticles(page) {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const articles = await api.getArticles(page);
    dispatch({ type: GET_ARTICLES, payload: articles });
    dispatch({ type: LOADING, payload: false });
  };
}

export function getSingleArticle(slug) {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const article = await api.getArticle(slug);	
    dispatch({ type: GET_ARTICLE, payload: article });
    dispatch({ type: LOADING, payload: false });
  };
}

export function updatePage(page) {
  return { type: PAGE, payload: page };
}

export function onLoaded(flag) {
  return { type: LOADING, payload: flag };
}

export function userPostFetch(val) {

  const obj = {
    user: {
      username: val.username,
      email: val.email,
      password: val.password,
    },
  };
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    dispatch({ type: REGISTRATION_ERROR, payload: {} });
    const res = await api.userRegistration(obj);
    const json = await res.json();
    if (!res.ok) {
	
		 dispatch({ type: LOADING, payload: false });
      dispatch({ type: REGISTRATION_ERROR, payload: json.errors });
		
    } 
	  
	  else{
		   dispatch({ type: LOADING, payload: false });
		  dispatch({ type: USER_REG, payload: true})  
		  
	  }  
     dispatch({ type: USER_REG, payload: false}) 
  };
}

export function userAuthFetch(val) {
  const obj = {
    user: {
      email: val.email,
      password: val.password,
    },
  };
  return async (dispatch) => {
	  dispatch({ type: LOADING, payload: true });
    dispatch({ type: AUTH_ERROR, payload: null });
    const res = await api.userAuthentication(obj);
    const json = await res.json();

    if (!res.ok) {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
    } else {
      dispatch({ type: USER_DATA, payload: json.user });
      dispatch({ type: IS_AUTH, payload: true });
      localStorage.setItem('token', json.user.token);
    }

    dispatch({ type: LOADING, payload: false });
    dispatch({ type: IS_AUTH, payload: false });
  };
}

export function postArticle(article) {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const res = await api.postArticleFetch(article);

    if (res.ok) {
   		 dispatch({ type: NEW_ARTICLE, payload: true });
    } 
    dispatch({ type: LOADING, payload: false });
	   dispatch({ type: NEW_ARTICLE, payload: false });
  };
}



export function updateProfile(obj) {
  const newProfile = { user: { ...obj } };
  return async (dispatch) => {
    dispatch({ type: AUTH_ERROR, payload: null });
    dispatch({ type: LOADING, payload: true });
    const res = await api.userUpdate(newProfile);
    const json = await res.json();
	  if (!res.ok) {
      dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
    } else {
      dispatch({ type: USER_DATA, payload: json.user });
      dispatch({ type: IS_EDIT, payload: true });
    }

    dispatch({ type: LOADING, payload: false });
	   dispatch({ type: IS_EDIT, payload: false });
  };
}

export function getProfile() {
  return async (dispatch) => {
    const res = await api.getProfileFetch();
    if (!res.ok) {
      return;
    }
    const json = await res.json();
    if (json.message) {
      localStorage.removeItem('token');
    } else {
      dispatch({ type: USER_DATA, payload: json.user });
    }
  };
}

export function logOut() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: USER_DATA, payload: {} });
  };
}


export function updateArticle(article, slug) {
	
  return async (dispatch) => {
	    dispatch({ type: LOADING, payload: true });
	  const res = await api.updateArticle(article, slug)
	  if(res.ok){
		   dispatch({ type: NEW_ARTICLE, payload: true });
	  }
	  dispatch({ type: NEW_ARTICLE, payload: false });
     dispatch({ type: LOADING, payload: false });
  };
}

export function favoriteLike( slug) {

  return async (dispatch) => {
	   const res = await api.favoriteCount(slug)
	   const json = await res.json()

     dispatch({ type: FAVORITE_LIKE, payload: json.article.favorited});


  };
}
