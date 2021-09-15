import React, {useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Spin } from 'antd';
import classes from './SignIn.module.scss';
import { userAuthFetch } from '../../redux/actions';

const SignIn = ({ authentication, authError, loading, isAuth }) => {
  SignIn.defaultProps = {
    authentication: () => {},
    authError: '',
	  loading:false,
	  isAuth:false,
  };

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),

    password: yup
      .string()
      .required('Password is required')
      .min(8, 'не меньше 8 символов')
      .max(40, 'не больше 40 символов'),
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
	const block = loading ?<div className ={ classes['SignIn--block']}/> :null
	
	 const history = useHistory();
	
		useEffect(()=>{	if (isAuth){
	history.push('/')

	}}, [isAuth, history,])
	
  return (
	  	 <div>
	   <div className={classes['SignIn--spinner']}>{spinner}</div>
	 {block}
    <section className={classes.SignIn}>
      <h5 className={classes['SignIn--title']}>Вход</h5>
      <h5 className={classes['SignIn--auth-error']}>{authError}</h5>
      <form className={classes.Form} onSubmit={handleSubmit(authentication)}>
        <label htmlFor = 'email-login' className = {classes['SignIn--label']}>Email address</label>
        <input type="email"   className = {classes['SignIn--input']} placeholder="Email address" {...register('email')} id = 'email-login'/>
        <div className = {classes['Form--error']}>{errors.email?.message}</div>

        <label htmlFor = 'password' className = {classes['SignIn--label']}>Password</label>
        <input type="password" className = {classes['SignIn--input']}  placeholder="Password" {...register('password')} id = 'password'/>
        <div className = {classes['Form--error']}>{errors.password?.message}</div>

        <button type="submit" className = {classes['SignIn--button']}>Login</button>
      </form>
      <span className={classes['SignIn--have-account']}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </section>
		</div>
  );
};

SignIn.propTypes = {
  authentication: PropTypes.func,
  authError: PropTypes.string,
  loading: PropTypes.bool,
  isAuth: PropTypes.bool,
};

function mapStateToProps(state) {
  const { authError, isAuth } = state.user;
  const { loading } = state.loading;
  return { authError,loading, isAuth };
}

function mapDispatchToProps(dispatch) {
  return {
    authentication: (user) => dispatch(userAuthFetch(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
