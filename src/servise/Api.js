export default class Api {
  BASEURL = 'https://conduit.productionready.io/api/';

  finalUrl = (endUrl, param = '') => `${this.BASEURL}${endUrl}?${param}`;

  async request(url, method, value = null) {
    const res = await fetch(url, this.getOptions(method, value));
    return res;
  }

  getOptions = (method, value) => {
    if (method === 'POST') {
      return {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(value),
      };
    }

    if (method === 'PUT') {
      return {
        method,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(value),
      };
    }

    if (localStorage.getItem('token')) {
      return {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      };
    }
    return {
      method,
    };
  };

  async getArticles(page = 1) {
    const offset = (page - 1) * 20;
    const endUrl = this.finalUrl('articles', `offset=${offset}`);
    const res = await this.request(endUrl);
    const json = await res.json();
    return json;
  }

  async getArticle(slug = '') {
    const endUrl = this.finalUrl(`articles/${slug}`);
    const res = await this.request(endUrl);
    const json = await res.json();
    return json;
  }

  async userRegistration(user) {
    const url = this.finalUrl('users');

    const res = await this.request(url, 'POST', user);
    return res;
  }  


async postArticleFetch(article) {
    const url = this.finalUrl('articles');
    const res = await await fetch(url, 
		{
        method:'POST',
        headers: {
		Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(article),
      });
    return res;
  }

async deleteArticle(slug) {
    const url = this.finalUrl(`articles/${slug}`);
    const res = await await fetch(url, 
		{
        method:'DELETE',
        headers: {
		Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
	  return res;
  }

async updateArticle(article, slug) {
    const url = this.finalUrl(`articles/${slug}`);
    const res = await await fetch(url, 
		{
        method:'PUT',
        headers: {
		Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
		body: JSON.stringify(article),
      });
	  return res;
  }

  async userAuthentication(user) {
    const url = this.finalUrl('users/login');
    const res = await this.request(url, 'POST', user);
    return res;
  }

  async userUpdate(user) {
    const url = this.finalUrl('user');
    const res = await this.request(url, 'PUT', user);
    return res;
  }

  async getProfileFetch() {
    if (localStorage.getItem('token')) {
      const url = this.finalUrl('user');
      const res = await this.request(url);
      return res;
    }
    return 0;
  }

 async favoriteCount (slug) {

  const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  `Token ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(url, options);
  const json = await res.json();
return json
};

 async delFavoriteCount (slug) {
  const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:  `Token ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(url, options);
  const body = await res.json();
  return body;
};


}
