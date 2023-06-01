import InputForm from './InputForm';
import RecordForm from './RecordForm';

const Home = () => {
  return (
    <div className='home'>
      <h1>Consent Form</h1>

      <div className='step'>
        {/* <InputForm /> */}
        <RecordForm />
      </div>
    </div>
  );
};

export default Home;
