import React,{useEffect} from 'react';
import { Link,useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Spin,Modal } from 'antd';
import classes from './SignUp.module.scss';
import { userPostFetch } from '../../redux/actions';

const SignUp = ({ registration, error, loading,userRegistration }) => {
  SignUp.defaultProps = {
    registration: () => {},
    error: {},
	loading:false,
	userRegistration:false,
  };
	
	 const history = useHistory();
	
	
	function countDown() {
  const modal = Modal.success({
    title: 'Successful registration',
    content: `Enter your username and password to log in to the blog.`,
  });
return modal
}	
	useEffect(()=>{	if (userRegistration){
	history.push('/sign-in')
	countDown()
	}}, [userRegistration, history,])


  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'не меньше 3 символов')
      .max(20, 'не больше 20 символов'),

    email: yup.string().required('Email is required').email('Email is invalid'),

    password: yup
      .string()
      .required('Password is required')
      .min(8, 'не меньше 8 символов')
      .max(40, 'не больше 40 символов'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: yup.bool().oneOf([true], 'Accept is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
	
	const spinner = loading ? <Spin size="large" /> : null;
	const block = loading ?<div className ={ classes['SignUp--block']}/> :null

  return (
	 <div>
	   <div className={classes['SignUp--spinner']}>{spinner}</div>
	 {block}
    <section className={classes.SignUp}>
	  
      <h5 className={classes['SignUp--title']}>Create new account</h5>

      <form className={classes.Form} onSubmit={handleSubmit(registration)}>
        <label htmlFor = 'username' className = {classes['SignUp--label']} >Username</label>
        <input type="text" className = {classes['SignUp--input']} placeholder="Username" {...register('username')} id = 'username'/>
        <div className = {classes['Form--error']}>{errors.username?.message || error.username}</div>

       <label htmlFor = 'email' className = {classes['SignUp--label']}>Email address</label>
        <input type="text" className = {classes['SignUp--input']}  placeholder="Email address" {...register('email')} id = 'email'/>
        <div className = {classes['Form--error']}>{errors.email?.message || error.email}</div>

       <label htmlFor = 'password' className = {classes['SignUp--label']}>Password</label>
        <input type="password" className = {classes['SignUp--input']}  placeholder="Password" {...register('password')} id = 'password'/>
        <div className = {classes['Form--error']}>{errors.password?.message || error.password}</div>

        <label  htmlFor = 'confirmPassword' className = {classes['SignUp--label']}>Repeat Password</label>
        <input type="password" className = {classes['SignUp--input']}  placeholder="Repeat Password" {...register('confirmPassword')} id = 'confirmPassword'/>
        <div className = {classes['Form--error']}>{errors.confirmPassword?.message || error.password}</div>

        <input type="checkbox" id="checkbox" {...register('acceptTerms')} className = {classes['SignUp--checkbox']} />
        <label htmlFor="checkbox"> I agree to the processing of my personal information</label>
        <div className = {classes['Form--error']}>{errors.acceptTerms?.message}</div>

        <button type="submit" className = {classes['SignUp--button']} >Login</button>
      </form>
      <span className={classes['SignUp--have-account']}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </span>
    </section>
		</div> 
  );
};

SignUp.propTypes = {
  registration: PropTypes.func,
  loading: PropTypes.bool,
  userRegistration: PropTypes.bool,
  error: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  const { error, userRegistration } = state.user;
  const { loading } = state.loading;

  return { error, loading, userRegistration };
}

function mapDispatchToProps(dispatch) {
  return {
    registration: (user) => dispatch(userPostFetch(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
