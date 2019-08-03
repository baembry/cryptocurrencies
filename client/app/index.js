import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

//utilities
import http from '../utils/http/http';

import { Line } from 'react-chartjs-2';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpi: [],
    };
  }
  async componentDidMount() {
    const data = await http.getHistory();
    await this.setState({ bpi: data.bpi });
  }

  render() {
    const data = {
      labels: Object.keys(this.state.bpi),
      datasets: [
        {
          label: 'Bitcoin Price in USD',
          //   backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: Object.values(this.state.bpi),
          xAxidID: 'USD',
        },
      ],
    };
    const options = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'USD',
            },
          },
        ],
      },
    };
    return (
      <div>
        <Line data={data} options={options} />
        <p>Powered by CoinDesk</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
