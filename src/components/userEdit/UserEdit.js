import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Spin, Modal } from 'antd';
import classes from './UserEdit.module.scss';
import { updateProfile } from '../../redux/actions';

const UserEdit = ({ error, userData, userUpdate, loading, isEdit }) => {
  UserEdit.defaultProps = {
    userUpdate: () => {},
    error: {},
	  loading:false,
	  isEdit:false,
    userData: {},
  };

  const schema = yup.object().shape({
    username: yup
      .mixed()
      .test(
        'Password must be empty or has length from 8 to 40 characters',
        (value) => value === '' || (value.length >= 3 && value.length <= 20)
      ),

    email: yup.string().email('Email is invalid'),

    password: yup
      .mixed()
      .test(
        'Password must be empty or has length from 8 to 40 characters',
        (value) => value === '' || (value.length >= 8 && value.length <= 40)
      ),

    image: yup.string().url(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const uuu = userData.username ? userData.username : '';
  const eee = userData.email || '';
  const [username, setUsername] = useState(uuu);
  const [email, setEmail] = useState(eee);
	
	
	function editProfile() {
  const modal = Modal.success({
    title: 'Successful editing',
    content: `Your data has been edited`,
  });
return modal
}	

  useEffect(() => {
    setUsername(uuu);
    setEmail(eee);
	  
	if (isEdit){
	editProfile()
	}  
  }, [uuu, eee, isEdit]);

  const updateUsername = (event) => {
    const {
      target: { value },
    } = event;
    setUsername(value);
  };

  const updateEmail = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  const testUpdate = (data) => {
    const obj = {};
    obj.username = username;
    obj.email = email;

    if (data.password !== '') {
      obj.password = data.password;
    }

    if (data.image !== '') {
      obj.image = data.image;
    }
    return userUpdate(obj);
  };
	
		const spinner = loading ? <Spin size="large" /> : null;
	const block = loading ?<div className ={ classes['UserEdit--block']}/> :null

  return (
	  
	  	 <div>
	   <div className={classes['UserEdit--spinner']}>{spinner}</div>
	 {block}
   
    <section className={classes.UserEdit}>
      <h5 className={classes['UserEdit--title']}>Edit Profile</h5>

      <form className={classes.Form} onSubmit={handleSubmit(testUpdate)}>
        <label htmlFor = 'username'  className = {classes['UserEdit--label']}>Username</label>
        <input
			className = {classes['UserEdit--input']} 
          type="text"
          placeholder="Username"
          {...register('username')}
          value={username}
          onChange={updateUsername}
		id = 'username'
         />
        <div className = {classes['UserEdit--error']}>{errors.username?.message || error.username}</div>

        <label htmlFor = 'email' className = {classes['UserEdit--label']}>Email address</label>
        <input type="text" className = {classes['UserEdit--input']} placeholder="Email address" {...register('email')} value={email} onChange={updateEmail} id = 'email'/>
        <div className = {classes['UserEdit--error']}>{errors.email?.message || error.email}</div>

        <label htmlFor = 'password' className = {classes['UserEdit--label']}>New password</label>
        <input type="password"  className = {classes['UserEdit--input']}  placeholder="New password" {...register('password')}  id = 'password'/>
        <div className = {classes['UserEdit--error']}>{errors.password?.message || error.password}</div>

        <label htmlFor = 'avatar' className = {classes['UserEdit--label']}>Avatar image (url)</label>
        <input  className = {classes['UserEdit--input']} placeholder="Avatar image" type="url" {...register('image')} id = 'avatar'/>
        <div className = {classes['UserEdit--error']}>{errors.image?.message}</div>

        <button type="submit"className = {classes['UserEdit--button']}  >Save</button>
      </form>
    </section>
</div>
  );
};

UserEdit.propTypes = {
  userUpdate: PropTypes.func,
  loading: PropTypes.bool,
  isEdit: PropTypes.bool,
  error: PropTypes.instanceOf(Object),
  userData: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  const { error, userData, isEdit } = state.user;
 const { loading } = state.loading;
  return { error, userData, loading,isEdit };
}

function mapDispatchToProps(dispatch) {
  return {
    userUpdate: (user) => dispatch(updateProfile(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
