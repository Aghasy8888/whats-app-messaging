import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useNotification from './hooks/useNotification';
import { AuthRoute } from './components';
import { Login } from './components/pages/login';
import { Home } from './components/pages/main';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useNotification();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoute type="private" />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<AuthRoute type="public" />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
