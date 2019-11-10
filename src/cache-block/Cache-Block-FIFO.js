import React from 'react';
import './Cache-Block.css';
import {  delay } from 'q';

export class CacheBlockFIFO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hit: 0,
            capacityMiss: 0,
            compulsoryMiss: 0
        }
    }
    async componentWillReceiveProps(nextProps) {
        console.debug(nextProps);
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
            await delay(() => {} , 500);
            console.debug('tick');
            if (typeof numbersCached.find(n => n === currentNumber) !== 'undefined') {
                await this.setState({ hit: this.state.hit + 1 });
                continue;
            }
            if (typeof numbersAccessed.find(n => n === currentNumber) !== 'undefined') {
                await this.setState({ capacityMiss: this.state.capacityMiss + 1 });
                numbersCached[currentLine] = currentNumber;
                this.addToTable(currentLine, currentNumber);
                currentLine = this.getNextLine(currentLine, numberOfLines);
                continue;
            }
            await this.setState({ compulsoryMiss: this.state.compulsoryMiss + 1 });
            numbersCached[currentLine] = currentNumber;
            this.addToTable(currentLine, currentNumber);
            currentLine = this.getNextLine(currentLine, numberOfLines);
            numbersAccessed.push(currentNumber);
    }
        console.debug(JSON.stringify(numbersCached));
        console.debug('H:' + this.state.hit);
        console.debug('CAP:' + this.state.capacityMiss);
        console.debug('COMP:' + this.state.compulsoryMiss);
    }

    getNextLine(currentLine, numberOfLines) {
        if (currentLine + 1 === numberOfLines) {
            return 0;
        }
        return currentLine + 1;
    }

    addToTable(line, value) {
        document.getElementById(line).innerHTML = value;
    }


    render() {
        let rows = [];
        for (let i = 0; i < this.props.numberOfLines; i++) {
            rows.push(<tr key={i} id={i}><td>a</td></tr>);
        }

        return (
            <div>
                {this.props.numberOfLines}
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <span>Hit:</span> {this.state.hit}
                <span>Capacity Miss:</span> {this.state.capacityMiss}
                <span>Compulsory Miss:</span> {this.state.compulsoryMiss}
            </div>
        );
    }
}

export default CacheBlockFIFO;
