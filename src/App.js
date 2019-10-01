import React, {Component} from 'react';
import './App.css';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import Http from './http.service';

class App extends Component {
  constructor() {
    super()
    this.state = {prefectures: [], selectedPrefectures: [], populationData: [], graphData: []};
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
  }
  getPopulation (prefCode, prefName) {
    return Http.send('getPopulation', {}, {prefCode, cityCode: '-'})
    .then((res) => {
      if (!res.result) return Promise.reject()
      const data = this.state.populationData
      data.push({prefCode, prefName, data: res.result.data[0].data, color: randomColor()})
      this.setState({populationData: data})
    })
    .catch((err) => {
      console.log(err)
    })
  }
  makeGraphData() {
    const data = []
    this.state.populationData.map(prefData => {
      prefData.data.map(d => {
        let year = data.find(y => y.year === d.year)
        if (!year) {
          data.push({year: d.year, [prefData.prefCode]: d.value})
        } else {
          year[prefData.prefCode] = d.value
        }
      })
    })
    this.setState({graphData: data})
  }
  async prefChange(e) {
    if (e.value) {
      let res = await this.getPopulation(e.prefCode, e.prefName);
    } else {
      const data = this.state.populationData
      this.setState({populationData: data.filter(d => d.prefCode !== e.prefCode)})
    }
    this.makeGraphData()
  }
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <Box m={5} >
            <Prefecture prefectures={this.state.prefectures} onEventCallBack={this.prefChange.bind(this)}/>
          </Box>
          <Graph graphData={this.state.graphData} populationData={this.state.populationData} />
        </header>
      </div>
    );
  }
}

class Prefecture extends Component {
  constructor(props) {
    super(props);
  }
  onCheckboxChange(e) {
    this.props.onEventCallBack({prefCode: Number(e.target.value.split('+')[1]), prefName: e.target.value.split('+')[0], value: e.target.checked })
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
              color="primary"
              value={prefecture.prefName + '+' + prefecture.prefCode}
              inputProps={{ 'aria-label': 'Checkbox' + prefecture.prefCode }}
              onChange={this.onCheckboxChange.bind(this)}
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
  }
  getPrefName(code) {
    const pref = this.props.populationData.find(e => e.prefCode === code)
    return !pref ? '' : pref.prefName
  }
  render() {
    return (
      <LineChart
        width={800}
        height={400}
        data={this.props.graphData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={{fontSize: 15}} dataKey="year" />
        <YAxis tick={{fontSize: 15}}/>
        <Tooltip />
        <Legend tick={{fontSize: 15}}/>
        {!this.props.populationData ? null : this.props.populationData.map(d => {
          return (
            <Line 
              type="monotone"
              key={d.prefCode}
              name={this.getPrefName(d.prefCode)}
              dataKey={d.prefCode} stroke={d.color} activeDot={{ r: 8 }} />
          )
        })}
      </LineChart>
    )
  }
}

function randomColor() {
  var randomColor = "#";
  for(var i = 0; i < 6; i++) {
      randomColor += (16*Math.random() | 0).toString(16);
  }
  return randomColor
}

export default App;
