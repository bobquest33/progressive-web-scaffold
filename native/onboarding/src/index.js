import React from 'react'
import ReactDOM from 'react-dom'
import Onboarding from './components/Onboarding'
import './index.scss'

// This timeout is a side-effect of Android's issues with 
// touchStart not working 
setTimeout(function() { 
  ReactDOM.render(
    <Onboarding />,
    document.getElementById('root')
  );
}, 0);
