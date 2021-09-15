import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Api from '../../servise/Api';
import Utilits from '../../servise/Utilits';
import classes from './Card.module.scss';

const Card = ({ article }) => {
  Card.defaultProps = {
    article: {},

  };
const api = new Api();
  const utilits = new Utilits();
  const { title, description, favoritesCount, author, tagList, updatedAt, slug, favorited } = article;

  const { username, image } = author;
	

 const [favoretedData, setFavoritedData] = useState({
    favorited,
    favoritesCount,

  });
	
		  


  const tacg = tagList.length
    ? tagList.map((el) => (
        <li key={el} className={classes['Card--tag']}>
          {el}
        </li>
      ))
    : null;
	
	const classFavorited = favoretedData.favorited ? classes['Card--like']: classes['Card--dislike']
	
const onClick =(id) =>{
	if (!favoretedData.favorited){
	 api.favoriteCount(id)
		.then(json =>
				setFavoritedData({
                favorited: json.article.favorited,
                favoritesCount: json.article.favoritesCount,
                err: false,
              })
			 )
	}
	
	api.delFavoriteCount(id)
			.then(json =>
				setFavoritedData({
                favorited: json.article.favorited,
                favoritesCount: json.article.favoritesCount,
                err: false,
              })
			 )
} 

  return (
    <section className={classes.Card}>
      <div className={classes['Card--article']}>
        <div>
          <span className={classes['Card--title']}>
            <Link to={`/article/${slug}`}>{title}</Link>
          </span>
          <button  className={classFavorited}  type = 'button' onClick = {() =>onClick(slug)}> </button>
          <span> {favoretedData.favoritesCount}</span>
        </div>
        <ul className={classes['Card--tag-list']}>{tacg}</ul>
        <p className={classes['Card--description']}>{description}</p>
      </div>

      <div className={classes['Card--info']}>
        <div className={classes['Card--user-info']}>
          <div className={classes['Card--user']}>{username}</div>
          <div className={classes['Card--date']}>{utilits.formatDate(updatedAt)} </div>
        </div>
        <img src={image} alt="User" className={classes['Card--img']} />
      </div>
    </section>
  );
};

Card.propTypes = {
  article: PropTypes.instanceOf(Object),

};


export default Card;
