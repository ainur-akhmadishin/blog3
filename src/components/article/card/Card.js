import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';
import Utilits from '../../../servise/Utilits';
import classes from './Card.module.scss';
import Api from '../../../servise/Api';

const api = new Api();

const Card = ({ article, userData }) => {
  Card.defaultProps = {
    article: {},
    userData: {},

  };
	
	

	const history = useHistory();
  const utilits = new Utilits();
  const { title, description, favoritesCount, author, tagList, updatedAt, body, slug } = article;
console.log(slug);
  const { username, image } = author;
console.log(userData.username)
  const tacg = tagList.length
    ? tagList.map((el) => (
        <li key={el} className={classes['Card--tag']}>
          {el}
        </li>
      ))
    : null;


	const onEdit = () => history.push({
		pathname:`/articles/${slug}/edit`, 
		state:{article}
	});
	
	const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
	api.deleteArticle(slug)
    setIsModalVisible(false);
	 history.push('/')
	  
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
	

	
	const showBtns = (userData.username === username) ? (		
		<div className = {classes['Card--btn-blog']}>
		  <button type = 'button' className = {classes.['Card--btn-delete']} onClick = {showModal}>Delete</button>
		  <button type = 'button' className = {classes.['Card--btn-edit']} onClick = {onEdit}>Edit</button>
			<Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        		<p>Are you sure to delete this article?</p>
      		</Modal>
		</div>) : null

  return (
	  <section className = {classes.Card}>
	  
    <div className={classes.['Card--header']}>
      <div className={classes['Card--article']}>
        <div>
          <span className={classes['Card--title']}>{title}</span>
          <input type="checkbox" id="ckeckbox" className={classes['Card--checkbox']} />
          <label htmlFor="ckeckbox">{favoritesCount}</label>
        </div>
        <ul className={classes['Card--tag-list']}>{tacg}</ul>
        <p className={classes['Card--description']}>{description}</p>
      </div>

	  <div>
		  <div className={classes['Card--info']}>
			<div className={classes['Card--user-info']}>
			  <div className={classes['Card--user']}>{username}</div>
			  <div className={classes['Card--date']}>{utilits.formatDate(updatedAt)} </div>
			</div>
			<img src={image} alt="User" className={classes['Card--img']} />
         </div>
{showBtns}

</div>
    </div>


	<div className = {classes['Card--body']}>{body}</div>
	</section>
  );
};

Card.propTypes = {
  article: PropTypes.instanceOf(Object),
  userData: PropTypes.instanceOf(Object),

};

function mapStateToProps(state) {
  const { userData } = state.user;
	console.log(userData)
return {userData}
}



export default connect(mapStateToProps, null)(Card);
