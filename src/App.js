import React from 'react';
import CacheBlockFIFO from './cache-block/Cache-Block-FIFO';
import CacheBlockLFU from './cache-block/Cache-Block-LFU';
import CacheBlockLRU from './cache-block/Cache-Block-LRU';
import CacheBlockRNG from './cache-block/Cache-Block-RNG';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLines: 4,
      delay: 250,
      numbers: [],
      simulating: false
    }
  }

  getNumbers() {
    const file = document.getElementById("file-input").files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => this.handleNumbersChange(reader.result.split(',')));
    reader.readAsText(file);
  }

  handleSimulationChange = value => {
    if (this.state.numberOfLines && this.state.numbers.length) {
      this.setState({ simulating: value });
      return;
    }
  };

  handleNumbersChange = value => this.setState({ numbers: value });

  handleNumberOfLinesChange = e => this.setState({ numberOfLines: e.target.value });

  render() {
    return (
      <div className="app">
        <label>How many lines are in the cache?
          <input id='lines-input' type="number" min='1' defaultValue='4' onChange={(e) => this.handleNumberOfLinesChange(e)} />
        </label>
        <label>Upload the csv here:
          <input id='file-input' type="file" onChange={() => this.getNumbers()} />
        </label>
        
        <input type='button' onClick={() => this.handleSimulationChange(true)} value='Go' />

        <div className='cache-container'>
          <CacheBlockFIFO delay={this.state.delay} numberOfLines={this.state.numberOfLines} numbers={this.state.numbers} simulating={this.state.simulating}></CacheBlockFIFO>
          <CacheBlockLFU delay={this.state.delay} numberOfLines={this.state.numberOfLines} numbers={this.state.numbers} simulating={this.state.simulating}></CacheBlockLFU>
          <CacheBlockLRU delay={this.state.delay} numberOfLines={this.state.numberOfLines} numbers={this.state.numbers} simulating={this.state.simulating}></CacheBlockLRU>
          <CacheBlockRNG delay={this.state.delay} numberOfLines={this.state.numberOfLines} numbers={this.state.numbers} simulating={this.state.simulating}></CacheBlockRNG>
        </div>
      </div>
    );
  }
}

export default App;
