import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/App.css';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import WelcomePage from './components/Common/WelcomePage';
import Login from './components/Common/Login';
import Signup from './components/Common/Signup';
import PrivateUserRoutes from './components/Hooks/PrivateUserRoutes';
import PrivateAdminRoutes from './components/Hooks/PrivateAdminRoutes';
import AdminHome from './components/Admin/AdminHome';
import AdminSignup from './components/Admin/AdminSignup';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateUserRoutes />}>
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/about" element={<About />} />
          </Route>
          <Route element={<PrivateAdminRoutes />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;