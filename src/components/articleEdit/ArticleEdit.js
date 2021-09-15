import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useParams,useHistory  } from "react-router-dom";
import { Spin } from 'antd';
import classes from './ArticleEdit.module.scss';
import { updateArticle } from '../../redux/actions';
import ArticleForm from '../articleForm'


const ArticleEdit = ({ updateArticles, newArticle, loading  }) => {
  ArticleEdit.defaultProps = {
    updateArticles: () => {},
	 newArticle: false,
    loading: false,
  };
	
 const location = useLocation();
  const { slug } = useParams();	
   const history = useHistory();
	useEffect(()=>{	if (newArticle){
	history.push(`/article/${slug}`)
	}}, [newArticle, history,slug])

			const spinner = loading ? <Spin size="large" /> : null;
	const block = loading ?<div className ={ classes['ArticleEdit--block']}/> :null
	
  return (
	  	  	 <div>
	   <div className={classes['ArticleEdit--spinner']}>{spinner}</div>
	 {block}
 
    <section className={classes.ArticleEdit}>	
      <h5 className={classes['ArticleEdit--title']}>Edit article</h5>
        <ArticleForm article = {location.state.article} submit = {updateArticles} slug = {slug}/>
    </section>
	  </div>
  );
};

ArticleEdit.propTypes = {
  updateArticles: PropTypes.func,
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
    updateArticles: ( article, slug) => dispatch(updateArticle(article, slug)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
