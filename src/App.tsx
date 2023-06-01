import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/scss/app.scss';
import Header from './layout/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className='container__wrapper'>
        <Header />
        <main className='content'>
          <Routes>
            <Route index element={<Home />} />
            {/* <Route path={LINK_CONSTANT.blogDetail} element={<BlogDetail />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
