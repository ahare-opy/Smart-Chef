import React from 'react';
import { Container, List, Icon, Button, Label } from 'semantic-ui-react';
import Router, { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import Link from 'next/link';

import { logoutUser } from '../../utils/authUser';

function SideMenu({ user }) {
  const router = useRouter();

  const isActive = (router) => router.pathname === route;

  const handleHome = (e) => {
    e.preventDefault();
    Router.push('/');
    setTimeout(() => {
      Router.reload();
    }, 2500);
  };

  const handleInv = (e) => {
    e.preventDefault();
    Router.push('/set-inventory');
    setTimeout(() => {
      Router.reload();
    }, 2500);
  };

  const handleInvChng = (e) => {
    e.preventDefault();
    Router.push('/update-inventory');
    setTimeout(() => {
      Router.reload();
    }, 2500);
  };

  const handleRecSearch = (e) => {
    e.preventDefault();
    Router.push('/recipe-search');
    setTimeout(() => {
      Router.reload();
    }, 2500);
  };

  return (
    <Container>
      <List
        style={{ paddingTop: '1rem' }}
        size="big"
        verticalAlign="middle"
        selection
      >
        <List.Item>
          <Button
            as="div"
            color="teal"
            onClick={handleHome}
            fluid
            basic
            labelPosition="right"
          >
            <Button basic fluid>
              <Icon name="home" color="teal" />
            </Button>
            <Label as="a" basic color="teal" pointing="left" fluid>
              Home
            </Label>
          </Button>
        </List.Item>

        <br />

        <List.Item>
          <Button
            as="div"
            color="red"
            onClick={handleInv}
            fluid
            basic
            labelPosition="right"
          >
            <Button basic>
              <Icon name="envelope outline" color="red" />
            </Button>
            <Label as="a" basic color="red" pointing="left" fluid>
              Set Inventory
            </Label>
          </Button>
        </List.Item>

        <br />

        <List.Item>
          <Button
            as="div"
            color="pink"
            onClick={handleInvChng}
            fluid
            basic
            labelPosition="right"
          >
            <Button basic>
              <Icon name="envelope outline" color="pink" />
            </Button>
            <Label as="a" basic color="pink" pointing="left" fluid>
              Update Inventory
            </Label>
          </Button>
        </List.Item>

        <br />

        <List.Item>
          <Button
            as="div"
            color="blue"
            onClick={handleRecSearch}
            fluid
            basic
            labelPosition="right"
          >
            <Button basic>
              <Icon name="find" color="blue" />
            </Button>
            <Label as="a" basic color="blue" pointing="left" fluid>
              Recipe Search
            </Label>
          </Button>
        </List.Item>

        <br />

        <List.Item>
          <Button
            as="div"
            onClick={() => logoutUser(user.email)}
            fluid
            basic
            labelPosition="right"
          >
            <Button basic>
              <Icon name="log out" />
            </Button>
            <Label as="a" basic pointing="left" fluid>
              Log Out
            </Label>
          </Button>
        </List.Item>
      </List>
    </Container>
  );
}

export default SideMenu;
