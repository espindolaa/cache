import React from 'react';
import CacheController from '../cache/Cache-Controller';
import './Main-Page.css';

export class MainPage extends React.Component {
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
        <section>
          <div id="inputs">
            <p>  
              How many lines are in the cache?
              <input id='lines-input' type="number" min='1' defaultValue='4' onChange={(e) => this.handleNumberOfLinesChange(e)} />
            </p>
            <p>
              Upload the csv here:
              <input id='file-input' type="file" onChange={() => this.getNumbers()} />
            </p>
            <p>
              <input type='button' onClick={() => this.handleSimulationChange(true)} value='Go' />
            </p>
          </div>
        <div className='cache-container'>
          <CacheController simulating={this.state.simulating} numberOfLines={this.state.numberOfLines} numbers={this.state.numbers}></CacheController>
        </div>
        </section>
      </div>
    );
  }
}

export default MainPage;
