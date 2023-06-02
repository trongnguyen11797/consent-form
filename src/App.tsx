import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { URL_PAGE } from './common/constant';

import Header from './layout/Header';

import Home from './pages/Home';
import Consent from './pages/Consent';

import './assets/scss/app.scss';

function App() {
  return (
    <Router>
      <div className='container__wrapper'>
        <Header />
        <main className='content'>
          <Routes>
            <Route index element={<Home />} />
            <Route path={URL_PAGE.consent} element={<Consent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
