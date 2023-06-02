import { NavLink } from 'react-router-dom';

import { URL_PAGE } from 'src/common/constant';

const Header = () => {
  return (
    <header className='header d-flex flex-gap-2 flex-end'>
      <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={URL_PAGE.home}>
        Home
      </NavLink>

      <NavLink to={URL_PAGE.consent}>Consents</NavLink>
    </header>
  );
};

export default Header;
