import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Curddata from './Curddata';
import Empedit from './Empedit';
import Empcreate from './Empcreate';
import LoginPage from './LoginPage';

function App() {
  const isAuthenticated = () => {
    const loggedInUser = localStorage.getItem('user'); 
    return loggedInUser ? true : false;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Curddata />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/empdata/:empid" element={<Empedit />} />
          <Route path="/empadd" element={<Empcreate />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
