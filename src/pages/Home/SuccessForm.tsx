import { Link } from 'react-router-dom';

import { URL_PAGE } from 'src/common/constant';

const SuccessForm = () => {
  return (
    <div className='success__form'>
      <div className='btn__common flex-center m-auto'>
        <i className='fa-solid fa-check'></i>
      </div>
      <h3 className='title'>
        Thank you, your consent has been
        <br />
        successfully saved!
      </h3>

      <Link to={URL_PAGE.consent} className='link__to'>
        View all consents
      </Link>
    </div>
  );
};

export default SuccessForm;
