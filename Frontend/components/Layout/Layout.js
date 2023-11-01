import React, { createRef, useLayoutEffect } from 'react';
import { withRouter } from 'next/router';
import HeadTags from './HeadTags';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Menu,
  Image,
  Segment,
  Rail,
} from 'semantic-ui-react';
import _ from 'lodash';
import nProgress from 'nprogress';
import Router from 'next/router';

function Layout({ children, user, ctx }) {
  const contextRef = createRef();

  Router.onRouteChangeStart = () => nProgress.start();
  Router.onRouteChangeComplete = () => nProgress.done();
  Router.onRouteChangeError = () => nProgress.done();

  /*return(
    <Container>
      <HeadTags />

      {user ? (
      <Container style = {{ marginLeft: '1rem', marginRight: '1rem' }}>
        <Menu fluid borderless>
          <Image src='https://i.postimg.cc/XY1ZhFft/Logo-Makr-9sa-SO5.png' size='tiny' />
          <Container text position="center">
                <Menu.Item as="h1" color="violet">
                  Welcome to BD Cuisine, {user.name}
                </Menu.Item>
          </Container>
        </Menu>

        <Ref innerRef={contextRef}>
          <Grid centered columns={2}>
            <Grid.Column width={2}>
              <Rail position='left'>
                <Sticky context={contextRef}>
                  <SideMenu />
                </Sticky>
              </Rail>
            </Grid.Column>

            <Grid.Column width={13}>
              <Visibility context={contextRef}>{children}</Visibility>
            </Grid.Column>
          </Grid>
        </Ref>
      </Container>) : (<Container></Container>)}
    </Container>
  )*/

  return (
    <>
      <HeadTags />

      {user ? (
        <>
          <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
            <Menu fluid borderless>
              <Image
                src="https://i.postimg.cc/XY1ZhFft/Logo-Makr-9sa-SO5.png"
                size="tiny"
              />
              <Container text position="center">
                <Menu.Item as="h1" color="violet">
                  Welcome to BD Cuisine, {user.name}
                </Menu.Item>
              </Container>
            </Menu>

            <Ref innerRef={contextRef}>
              <Grid>
                <Grid.Column floated="left" width={2}>
                  <Sticky context={contextRef}>
                    <SideMenu user />
                  </Sticky>
                </Grid.Column>

                <Grid.Column floated="center" width={13}>
                  <Visibility context={contextRef}>{children}</Visibility>
                </Grid.Column>
              </Grid>
            </Ref>
          </div>
        </>
      ) : (
        <>
          {' '}
          <Navbar />
          <Grid>
            <Grid.Column width={1} floated="left"></Grid.Column>

            <Grid.Column width={15}>{children}</Grid.Column>

            <Grid.Column width={1} floated="right"></Grid.Column>
          </Grid>{' '}
        </>
      )}
    </>
  );
}

export default Layout;
