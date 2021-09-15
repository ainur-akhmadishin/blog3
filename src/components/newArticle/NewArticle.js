import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {useHistory  } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import classes from './NewArticle.module.scss';
import { postArticle } from '../../redux/actions';
import ArticleForm from '../articleForm'

const NewArticle = ({ postArticles, newArticle, loading }) => {
  NewArticle.defaultProps = {
    postArticles: () => {},
    newArticle: false,
    loading: false,

  };
	 const history = useHistory();
	useEffect(()=>{	if (newArticle){
	history.push('/')
	}}, [newArticle, history,])

		const spinner = loading ? <Spin size="large" /> : null;
	const block = loading ?<div className ={ classes['NewArticle--block']}/> :null

  return (
	  	 <div>
	   <div className={classes['NewArticle--spinner']}>{spinner}</div>
	 {block}
 
    <section className={classes.NewArticle}>	
      <h5 className={classes['NewArticle--title']}>Create new article</h5>
        <ArticleForm submit ={postArticles} />
    </section>
	  </div>
  );
};

NewArticle.propTypes = {
  postArticles: PropTypes.func,    
	newArticle: PropTypes.bool,
    loading: PropTypes.bool,

};

function mapStateToProps(state) {
  const { error } = state.user;
  const { newArticle } = state.article; 
	const { loading } = state.loading;
return { error, newArticle, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    postArticles: (article) => dispatch(postArticle(article)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
