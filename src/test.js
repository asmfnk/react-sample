import React, { Component } from 'react';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefectures: [],
      name: ''
    };
  }
  render() {
    const { prefectures } = this.state;
    
    return (<div>
      <input type="text" />
      <button>登録</button>
      <ul>
        {prefectures.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
    </div>);
  }
}