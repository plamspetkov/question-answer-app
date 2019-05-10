import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import QuestionsList from './components/QuestionsList';
import AddAnswer from './components/AddAnswer';
import Question from './components/Question';
import AddQuestion from "./components/AddQuestion";


class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-info rounded">
              <Link to="/" className="navbar-brand text-light">Question & Answers App</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="btn btn-secondary btn-lg mr-1">Questions</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/questions/add-question" className="btn btn-secondary btn-lg">Ask a Question</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
            <Switch>
              <Route exact path="/answers/add-answer/:id" component={AddAnswer}/>
              <Route exact path="/questions/add-question" component={AddQuestion}/>
              <Route exact path="/questions/:id" component={Question}/>
              <Route exact path="/" component={QuestionsList}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;