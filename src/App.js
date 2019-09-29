import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Test from './test';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Http from './http.service';
let tmp = process.env.REACT_APP_RESAS_KEY;

class App extends Component {
  constructor() {
    super()
    this.state = {prefectures: [], selectedPrefectures: [], graphData: []};
    (() => {
      Http.send('getPrefectures', {}, null)
      .then((res) => {
        if (!res.result) return Promise.reject()
        this.setState({prefectures: res.result})
      })
      .catch((err) => {
        console.log(err)
      })
    })()
    this.setGraphData()
    this.getPopulation(13)
  }
  getPopulation (prefCode) {
    Http.send('getPopulation', {}, {prefCode, cityCode: '-'})
    .then((res) => {
      if (!res.result) return Promise.reject()
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  setGraphData() {
    this.setState({graphData: [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 500, pv: 2500, amt: 2500}]})
  }
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <Box m={5} >
            <Prefecture prefectures={this.state.prefectures}/>
          </Box>
          <Graph />
          {/* <div>
            <LineChart width={400} height={400} data={this.state.graphData}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </div> */}
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
           key={prefecture.prefCode}
           control={
            <Checkbox
             value="tmp"
              inputProps={{ 'aria-label': 'Checkbox' + prefecture.prefCode }}
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
  constructor() {
    super()
    this.state = {graphData: [
      {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
      },
      {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
      },
      {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
      },
      {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
      },
      {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
      },
      {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
      },
      {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
      },
    ]};
  }
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={this.state.graphData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    )
  }

}

export default App;
