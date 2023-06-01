import { Link } from 'react-router-dom';
import { URL_PAGE } from 'src/common/constant';

const Header = () => {
  return (
    <header className='header'>
      <Link className='active' to={URL_PAGE.home}>
        Home
      </Link>

      <Link to={URL_PAGE.consent}>Consents</Link>
    </header>
  );
};

export default Header;
