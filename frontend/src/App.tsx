import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import ResponsiveAppBar from './components/Menu';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      
      <Routes>
        {routes.map((r, index) => (
          <Route key = {index} path={r.path} element={r.component()} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
