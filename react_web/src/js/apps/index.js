// var React = require('react');
// var ReactDOM = require('react-dom');
import React from 'react'
import { render as Render } from 'react-dom'
//var MainComp = require('../components/index.jsx');
import MainComp from '../components/index.jsx';
Render(
    <MainComp />,
    document.getElementById('root')
);
