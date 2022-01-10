import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header';
import '../../styles/app.css';
import Landing from '../landing';
import Footer from '../footer';
import Welcome from '../welcome';
import Login from '../login';
import Signup from '../signUp';
import ErrorPage from '../errorPage';
import ForgetPassword from '../forgetPassword';
import {IconContext } from 'react-icons'


function App() {
  return (
    <Router>
      <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
      <Header />
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/welcome" component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route component={ErrorPage}/>
        </Switch>
        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
