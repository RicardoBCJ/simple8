import React, {  useEffect } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import TodosContainer from "./components/TodosContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Pictures from './components/Pictures'


const App = () => {

  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/todos" exact={true} component={TodosContainer} />
          <Route path="/about" exact={true} component={About} />
          <Route path="/dashboard"  component={Dashboard} />
          <Route path="/pictures"  component={Pictures} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
