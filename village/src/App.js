import React, {Component} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import NavBar from './components/NavBar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        this.setState({smurfs: res.data});
      })
      .catch(err => console.log(err));
  }

  addSmurf = smurf => {
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        console.log(res);
        this.setState({smurfs: res.data});
      })
      .catch(err => console.log(err));
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({smurfs: res.data});
      })
      .catch(err => console.log(err));
  };

  editSmurf = smurf => {
    //const smurf = this.state.smurfs.find(s => s.id == smurf.id);
    axios
      .put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
      .then(res => {
        //console.log(res);
        this.setState({smurfs: res.data});
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />}
        />

        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
            />
          )}
        />
        <Route
          path="/smurf/:id"
          render={props => (
            <SmurfForm
              {...props}
              editSmurf={this.editSmurf}
              smurfs={this.state.smurfs}
              edit
            />
          )}
        />
      </div>
    );
  }
}

export default App;
