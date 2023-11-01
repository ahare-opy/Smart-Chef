import axios from 'axios';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';
import baseURL from './baseURL';

export const registerUser = async (
  myUser,
  myprofilePicUrl,
  setError,
  setLoading
) => {
  //setLoading(true);
  console.log(myUser);

  const user = myUser;
  const profilePicUrl = myprofilePicUrl;

  try {
    const res = await axios.post(`${baseURL}/api/v1/signup`, {
      user,
      profilePicUrl,
    });

    console.log(res);
    cookie.set('token', res.data, { path: '/' });
    Router.push('/');
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async (user, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/v1/login`, { user });

    cookie.set('token', res.data, { path: '/' });

    Router.push('/');
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const logoutUser = (email) => {
  cookie.set('userEmail', email);
  cookie.remove('token');
  Router.push('/');
  Router.reload();
};
