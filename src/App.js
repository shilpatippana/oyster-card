import React, {
  Component
} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.strtJourney = this.strtJourney.bind(this);
    this.destJourney = this.destJourney.bind(this);
    this.finalFareCalculation = this.finalFareCalculation.bind(this);
    this.tubeJourneyFareCalculation = this.tubeJourneyFareCalculation.bind(this);
    this.state = {
      startJourney: null,
      destinationJourney: null,
    };
  }
  strtJourney = (value) => {
    alert('Journey started');
    this.setState({
      startJourney: this.state.startJourney === null ? value.target.value : this.state.startJourney
    })
  }
  destJourney = (value) => {
    setInterval(
      this.setState({
        destinationJourney: value.target.value
      }), 1000
    )
    let tempDestJorney = value.target.value;
    let tempStrtJorney = this.state.startJourney;
    alert('calculating the Fare');
    if (tempStrtJorney === 'x' && tempDestJorney === 'x') {
      tempDestJorney = '2';
      tempStrtJorney = '2';
    } else if (tempStrtJorney === 'x' || tempDestJorney === 'x') {
      if (tempStrtJorney === 'x') {
        if (tempDestJorney === '1') {
          tempStrtJorney = '1';
        } else {
          tempStrtJorney = '2';
        }
      } else {
        if (tempStrtJorney === '1') {
          tempDestJorney = '1';
        } else {
          tempDestJorney = '2';
        }
      }
    }
    this.finalFareCalculation(tempStrtJorney, tempDestJorney);
  }
  finalFareCalculation = (strtJrny, dstJrny) => {
    let fare = 3.20;
    let count = strtJrny - dstJrny;
    if (count === 2 || count === -2) {
      fare = 3.20;
    } else if (count === 1 || count === -1) {
      if (strtJrny === '1' || dstJrny === '1') {
        fare = 3.00;
      } else {
        fare = 2.25;
      }
    } else if (count === 0) {
      if (strtJrny === '1') {
        fare = 2.50;
      } else {
        fare = 2.00;
      }
    }
    alert('Fare :' + fare);
    alert('destination reached');
    this.setState({
      startJourney: null,
      destinationJourney: null
    });
  }
  tubeJourneyFareCalculation(value) {
    this.state.startJourney === null ? this.strtJourney(value) : this.destJourney(value);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Oyster Card</h1>
        </div>
        <p><h3>Loading the amount to card</h3></p>
        <p className="App-intro">
          <ul>
               <li><button value={1} onClick={this.tubeJourneyFareCalculation}>Holborn</button></li>
               <li><button value='x' onClick={this.tubeJourneyFareCalculation}>Earl's Court</button></li>
               <li><button value={3} onClick={this.tubeJourneyFareCalculation}>Wimbledon</button></li>
               <li><button value={2} onClick={this.tubeJourneyFareCalculation}>Hammersmith</button></li>
               <li><button value='Bus' onClick={()=>alert('Bus Journey fare:1.80')}>Bus Journey</button></li>
          </ul>
        </p>
       </div>
    );
  }
}

export default App;