import React from 'react';
import './Cache-Block.css';
import { delay } from 'q';

export class CacheBlockRNG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hit: 0,
            capacityMiss: 0,
            compulsoryMiss: 0,
            currentNumber: null
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.simulating) {
            await this.FIFO(nextProps.numbers, nextProps.numberOfLines);
        }
    }

    async FIFO(numbers, numberOfLines) {
        const numbersAccessed = [];
        const numbersCached = [];
        let currentLine = 0;
        for (let i = 0; i < numbers.length; i++) {
            const currentNumber = numbers[i];
            await delay(() => { }, this.props.delay);
            await this.setState({ currentNumber: currentNumber });
            if (typeof numbersCached.find(n => n === currentNumber) !== 'undefined') {
                await this.setState({ hit: this.state.hit + 1 });
                continue;
            }
            if (typeof numbersAccessed.find(n => n === currentNumber) !== 'undefined') {
                await this.setState({ capacityMiss: this.state.capacityMiss + 1 });
                numbersCached[currentLine] = currentNumber;
                this.addToTable(currentLine, currentNumber);
                currentLine = this.getNextLine(numbersCached.length, numberOfLines);
                continue;
            }
            await this.setState({ compulsoryMiss: this.state.compulsoryMiss + 1 });
            numbersCached[currentLine] = currentNumber;
            this.addToTable(currentLine, currentNumber);
            currentLine = this.getNextLine(numbersCached.length, numberOfLines);
            numbersAccessed.push(currentNumber);
        }
    }

    getNextLine(linesUsed, numberOfLines) {
        console.debug(linesUsed);
        console.debug(numberOfLines);
        return linesUsed < numberOfLines
            ? linesUsed
            : Math.floor(Math.random() * (numberOfLines - 1));
    }

    addToTable(line, value) {
        const element = document.getElementById(`rng-${line}`);
        if (element.innerHTML === '-') {
            element.innerHTML = value;
            return;
        }
        element.innerHTML += `, ${value}`;
    }


    render() {
        let rows = [];
        for (let i = 0; i < this.props.numberOfLines; i++) {
            rows.push(<tr key={i}><td id={`rng-${i}`}>-</td></tr>);
        }

        return (
            <div>
                <span>RNG</span>

                {this.state.currentNumber}
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <span>Hit: {this.state.hit}</span>
                <span>Capacity Miss: {this.state.capacityMiss}</span>
                <span>Compulsory Miss: {this.state.compulsoryMiss}</span>
            </div>
        );
    }
}

export default CacheBlockRNG;
