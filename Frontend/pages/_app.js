import App from 'next/app';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import baseURL from '../utils/baseURL';
import { redirectUser } from '../utils/authUser';
import Layout from '../components/Layout/Layout';
import 'semantic-ui-css/semantic.min.css';
import { Router } from 'next/router';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    //console.log(`This is the ctx: ${ctx}`);
    const { token } = parseCookies(ctx);

    let pageProps = {};

    const protectedRoutes =
      ctx.pathname === '/inventory' ||
      ctx.pathname === '/recipe-search' ||
      ctx.pathname === '/update-inventory';

    //console.log(`This is the 2nd token ${token}`);

    if (!token) {
      protectedRoutes && redirectUser(ctx, '/login');
    } else {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const res = await axios.get(`${baseURL}/api/v1/user/me`, {
          headers: { Authorization: token },
        });

        const { user } = res.data;

        pageProps.user = user;
      } catch (error) {
        destroyCookie(ctx, 'token');
        redirectUser(ctx, '/login');
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
