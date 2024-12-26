import { FC, ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Container, Input } from '@/components';
import { APP_NAVIGATIONS } from '@/constants';
import { cn } from '@/utils';

import './style.css';

const Header: FC = (): ReactElement => {
  return (
    <header className="header">
      <Container>
        <div className="header-container">
          <div className="header-navigations">
            <Link to="/">
              <img className="logo" src="/logo.svg" alt="site logo" />
            </Link>
            <nav>
              {APP_NAVIGATIONS.map((navigation) => {
                return (
                  <NavLink
                    key={navigation.path}
                    to={navigation.path}
                    className={({ isActive }) => {
                      return cn('nav-link', { active: isActive });
                    }}
                  >
                    {navigation.text}
                  </NavLink>
                );
              })}
            </nav>
          </div>
          <div className="header-input-container">
            <Input
              variant="white-bordered"
              placeholder="Search News"
              className="header-input"
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
