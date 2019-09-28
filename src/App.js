import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Test from './test';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Http from './http.service';
let tmp = process.env.REACT_APP_RESAS_KEY;
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
const renderLineChart = (
  <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
  </LineChart>
);

class App extends Component {
  constructor() {
    super()
    this.state = {prefectures: []};
    (() => {
      Http.send('getPrefectures', {}, {})
      .then((res) => {
        if (!res.result) return Promise.reject()
        this.setState({prefectures: res.result})
      })
      .catch((err) => {
        console.log(err)
      })
    })()
  }
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <Box
            m={5}
          >
            <Prefecture prefectures={this.state.prefectures}/>
          </Box>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>
            {tmp}
          </p>
          <p>
            {this.state.hoge}
          </p>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <Graph />
          <div>
            {renderLineChart}
          </div>
        </header>
      </div>
    );
  }
}

class Prefecture extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    return (<div>
      <FormGroup row>
        {this.props.prefectures.map((prefecture, index) => (
          <FormControlLabel
           label={prefecture.prefName}
           control={
            <Checkbox
             value="tmp"
              inputProps={{ 'aria-label': 'Checkbox A' }}
            />
           }
          >
          </FormControlLabel>
        ))}
      </FormGroup>
    </div>);
  }
}
class Graph extends Component {
  render() {
    return (
      <div>
        hoge
      </div>
    )
  }

}

export default App;
