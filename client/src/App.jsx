import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HuntsPage from './pages/HuntsPage';
import HintsPage from './pages/HintsPage';
import QrcodesPage from './pages/QrcodesPage';
import UsersPage from './pages/UsersPage';
import HomePage from './pages/HomePage';
import NotfoundPage from './pages/NotfoundPage';
import { util } from './utils/util';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './utils/customTheme';
import Login from './components/Login';
import Registration from './components/Registration';

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function PrivateRoute({ children }) {
  const isAuthenticated = util.isAuthenticated();
  const location = useLocation(); 
  return (
    isAuthenticated ?
      ( children )
    : ( <Navigate to={{ pathname: "/authentication", state: { from: location } }} /> )
  );
}

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authentication" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/users"
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            }
          />
          <Route path="/hunts"
            element={
              <PrivateRoute>
                <HuntsPage />
              </PrivateRoute>
            }
          />
          <Route path="/hints"
            element={
              <PrivateRoute>
                <HintsPage />
              </PrivateRoute>
            }
          />
          <Route path="/hints/:id"
            element={
              <PrivateRoute>
                <HintsPage />
              </PrivateRoute>
            }
          />
          <Route path="/hints/:id/:number"
            element={
              <PrivateRoute>
                <HintsPage />
              </PrivateRoute>
            }
          />
          <Route path="/qrcodes"
            element={
              <PrivateRoute>
                <QrcodesPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}