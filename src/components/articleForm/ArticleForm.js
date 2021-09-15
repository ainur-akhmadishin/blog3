import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import classes from './ArticleForm.module.scss';

const ArticleForm = ({submit, article, slug}) =>{

	  ArticleForm.defaultProps = {
    submit: () => {},
    slug: '',
    article: {},

  };
	
	const title = slug ? article.title:null
	const description = slug ? article.description:null
	const body = slug ? article.body:null
	

  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Title is required'), 
description: yup
      .string()
      .required('Short description is required'),
body: yup
      .string()
      .required('Text is required'),
	  
    
  });
	
	  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
	 
  });
	 
		
	



 const [fields, setFields] = useState([{value:null, id:100}]);

	

		useEffect(()=>{
			if (slug && article.tagList){
	const	ttt = article.tagList.map(el=>({value:el, id:Math.floor(Math.random() * 1e6)}))
			setFields(ttt)}
	}, [setFields, slug,article])
	
	const onSubmit = (data) =>{
	let arr = [];
	
	if (fields.length){
	arr = fields.map(el=>el.value)		
	}
	
const obj =  {
  article: {
   title: data.title,
   description: data.description,
   body: data.body,
   tagList: arr
  }
}


submit(obj,slug)	
	
}

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  function handleAdd() {
	 const idx = Math.floor(Math.random() * 1e6)
    const values = [...fields];
    values.push({ value: null, id:idx });
    setFields(values);
	  
  }

  function handleRemove(id) {

    const idx = fields.findIndex((el) => el.id === id);
 setFields([...fields.slice(0, idx), ...fields.slice(idx + 1)]);
 
  }

return(  
      <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
	  
        <div>Title</div>
        <input className = {classes['Form--input-text']}type="text" placeholder="Title" {...register('title')} 
		defaultValue = {title}/>
        <div className = {classes['Form--error']}>{errors.title?.message}</div>

        <div>Short description</div>
        <input type="text"  className = {classes['Form--input-text']}placeholder="Short description" {...register('description')} defaultValue = {description}/>
        <div className = {classes['Form--error']}>{errors.description?.message}</div>     

		<div>Text</div>
        <textarea  className = {['Form--textarea'] }  placeholder="Text"   {...register('body')} defaultValue = {body}/>
        <div className = {classes['Form--error']}>{errors.body?.message}</div>
		<div>Tags</div>
		<section className = {classes.['Form--tags']}>		
	
<ul>
         {fields.map((field, idx) =>(
          <li key={field.id}>
            <input
              type="text"
              placeholder="Tag"
              onChange={event => handleChange(idx, event)}
				 defaultValue = {field.value}
 
				  className = {classes['Form--tag']}
            />
            <button type="button" onClick={() => handleRemove(field.id)}  className = {classes['Form--btn-remove']}>
            Delete
            </button>
          </li>
        )
      )}	
	</ul>
<button type="button" onClick={() => handleAdd()} className = {classes['Form--btn-tag']} > Add tag</button>
		</section>
        <button type="submit" className  = {classes['Form--button']}>Send</button>
      </form>

)

}



ArticleForm.propTypes = {
  submit: PropTypes.func,
  slug: PropTypes.string,
  article: PropTypes.instanceOf(Object),

};


export default connect(null, null)(ArticleForm);
