import React from 'react';
import './Cache-Block.css';
import { delay } from 'q';

export class CacheBlockFIFO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hit: 0,
            capacityMiss: 0,
            compulsoryMiss: 0,
            currentNumber: null,
            numbersAccessed: [],
            numbersCached: [],
            currentLine: 0,
            numberOfLines: 0
        }
    }
    async componentWillReceiveProps(nextProps) {
        await this.setState({ numberOfLines: nextProps.numberOfLines });
        nextProps.number$.subscribe(n => this.addToCache(n));
    }

    async addToCache(number) {
        this.state.numbersCached.includes(number)
            ? await this.registerHit()
            : await this.registerMiss(number)
    }

    async registerHit() {
        await this.setState({ hit: this.state.hit + 1 });
    }

    async registerMiss(number) {
        const missType = this.getMissType(number);
        switch (missType) {
            case 'CAPACITY':
                await this.registerCapacityMiss(number);
                break;
            case 'COMPULSORY':
                await this.registerCompulsoryMiss(number);
                break;
        }
    }

    getMissType(number) {
        return this.state.numbersAccessed.includes(number)
            ? 'CAPACITY'
            : 'COMPULSORY';
    }

    async registerCapacityMiss(number) {
        await this.setState({ capacityMiss: this.state.capacityMiss + 1 });
        await this.updateNumbersCached(number, this.state.currentLine);
        this.addToTable(number, this.state.currentLine);
        await this.updateNextLine(this.state.currentLine, this.state.numberOfLines);
    }

    async registerCompulsoryMiss(number) {
        await this.setState({ compulsoryMiss: this.state.compulsoryMiss + 1 });
        await this.updateNumbersCached(number, this.state.currentLine);
        this.addToTable(number, this.state.currentLine);
        await this.updateNextLine(this.state.currentLine, this.state.numberOfLines);
        await this.updateNumbersAccessed(number);
    }

    async updateNumbersAccessed(number) {
        const numbersAccessed = this.state.numbersAccessed;
        numbersAccessed.push(number);
        await this.setState({ numbersAccessed: numbersAccessed });
    }

    async updateNumbersCached(number, line) {
        const numbersCached = this.state.numbersCached;
        numbersCached[line] = number;
        await this.setState({ numbersCached: numbersCached });
    }

    async updateNextLine(currentLine, numberOfLines) {
        const nextLine = this.getNextLine(currentLine, numberOfLines);
        await this.setState({ currentLine: nextLine });
    }

    getNextLine(currentLine, numberOfLines) {
        if (currentLine + 1 === numberOfLines) {
            return 0;
        }
        return currentLine + 1;
    }

    addToTable(value, line) {
        const element = document.getElementById(`fifo-${line}`);
        if (element.innerHTML === '-') {
            element.innerHTML = value;
            return;
        }
        element.innerHTML += `, ${value}`;
    }


    render() {
        let rows = [];
        for (let i = 0; i < this.props.numberOfLines; i++) {
            rows.push(<tr key={i}><td id={`fifo-${i}`}>-</td></tr>);
        }

        return (
            <div className="cacheWrapper">
                <span>FIFO</span>

                {this.state.currentNumber}
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="hitsMisses">
                  <div className="info">
                    <div className="info-name">Hit:</div><div>{this.state.hit}</div>
                  </div>

                  <div className="info">
                    <div className="info-name">Capacity Miss:</div><div>{this.state.capacityMiss}</div>
                  </div>

                  <div className="info">
                    <div className="info-name">Compulsory Miss:</div><div>{this.state.compulsoryMiss}</div>
                  </div>
                </div>
            </div>
        );
    }
}

export default CacheBlockFIFO;
