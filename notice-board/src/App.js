import React from 'react';
import './App.css';
import RouterModule from './Utils/RouterModule';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Preloader from './Utils/Preloader';

function App() {
  return (
    <div className="App">
      <Preloader></Preloader>
      <RouterModule></RouterModule>
    </div>
  );
}

export default App;