import React from 'react'
import ReactDOM from 'react-dom'
import Onboarding from './components/Onboarding'
import './index.scss'

setTimeout(function() { 
  ReactDOM.render(
    <Onboarding />,
    document.getElementById('root')
  );
}, 0);
