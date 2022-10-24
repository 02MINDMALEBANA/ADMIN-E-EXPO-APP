import logo from './logo.svg';
import './App.css';

import React, {useState,useEffect} from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {onSnapshot, collection} from 'firebase/firestore'
import Admin from './components/Admin';
import Editpage from './components/Editpage';
import AddInstitution from './components/AddInstitution';
import {db} from './config/firebase';

import{getDocs} from 'firebase/firestore'

import ResumeGuidelines from './components/resumeGuidelines';

function App() {

  
  return (

    <Router>
    <Routes>
        <Route  path='/' element={<Admin />}></Route>
    
        <Route  path='/addInstitution' element={<AddInstitution />}></Route>
        <Route  path='/edit/:id' element={<Editpage/>}></Route>
        <Route path='/resume' element={<ResumeGuidelines/>}></Route>
        

    </Routes>
</Router>
  );
}

export default App;
