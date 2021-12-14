import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { REMOVE_TOKEN } from '../reducers/tokenReducers';

const NavBar = () => {
  const activePage = useSelector(state => state.activePage);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(REMOVE_TOKEN());
  };

  return(
    <Menu>
      <Menu.Item
        name='home'
        as={Link}
        active={activePage === 'home'}
        to='/'
      >
        Home
      </Menu.Item>
      <Menu.Item
        name='items'
        as={Link}
        to='/items/'
        active={activePage === 'items'}
      >
        Items
      </Menu.Item>
      <Menu.Item
        name='itemsStar'
        as={Link}
        to='/itemsStar/'
        active={activePage === 'itemsStar'}
      >
        Star-Items
      </Menu.Item>
      <Menu.Item
        name='dofs'
        as={Link}
        to='/dofs/'
        active={activePage === 'dofs'}
      >
        Dofs
      </Menu.Item>
      <Menu.Item
        name='personnel'
        as={Link}
        to='/personnel/'
        active={activePage === 'personnel'}
      >
        Personnel
      </Menu.Item>
      <Menu.Item
        name='group'
        as={Link}
        to='/group/'
        active={activePage === 'group'}
      >
        Group
      </Menu.Item>
      <Menu.Item
        name='omset'
        as={Link}
        to='/omset/'
        active={activePage === 'omset'}
      >
        Omset
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={() => handleLogout()}
        >
          logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;