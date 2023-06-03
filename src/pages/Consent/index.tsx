import { Link } from 'react-router-dom';

import { LOCAL_STORAGE_KEY, URL_PAGE } from 'src/common/constant';

import ConsentItem from 'src/components/ConsentItem';

import { DataType } from 'src/models/home.model';

const Consent = () => {
  const consentLists: DataType[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.consent_form) || '[]');

  return (
    <>
      <h1>All Consents</h1>

      <div className='consent'>
        <div className='consent__header d-flex flex-between'>
          <p>Details</p>
          <p>Consent Given</p>
        </div>

        <div className='consent__wrapper d-flex flex-column flex-gap-2'>
          {consentLists.length > 0 ? (
            consentLists.map((m) => <ConsentItem key={m.id} data={m} />)
          ) : (
            <>
              <div>
                <p className='text-center'>No Consents</p>
                <img className='no__data' src='https://www.edgecrm.app/images/no-data.gif' alt='consent ai' />
              </div>

              <Link className='link__to__home text-center' to={URL_PAGE.home}>
                Create consent
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Consent;
