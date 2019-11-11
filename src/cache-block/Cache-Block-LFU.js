import React from 'react';
import './Cache-Block.css';
import { delay } from 'q';

export class CacheBlockLFU extends React.Component {
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
            await this.LFU(nextProps.numbers, nextProps.numberOfLines);
        }
    }

    setupFrequencyOfAcess(numberOfLines) {
        const frequencyOfAccess = [];
        for (let i = 0; i < numberOfLines; i++) {
            frequencyOfAccess.push(0);
        }
        return frequencyOfAccess;
    }

    getLeastFrequentlyUsedIndex(frequencyOfAccess) {
        const min = Math.min(...frequencyOfAccess);
        return frequencyOfAccess.indexOf(min);
    }

    async LFU(numbers, numberOfLines) {
        const numbersAccessed = [];
        const numbersCached = [];
        const frequencyOfAccess = this.setupFrequencyOfAcess(numberOfLines);
        for (let i = 0; i < numbers.length; i++) {
            const currentNumber = numbers[i];
            await delay(() => { }, 500);
            await this.setState({ currentNumber: currentNumber });
            console.debug('tick');
            if (typeof numbersCached.find(n => n === currentNumber) !== 'undefined') {
                await this.setState({ hit: this.state.hit + 1 });
                const position = numbersCached.indexOf(currentNumber);
                frequencyOfAccess[position] += 1;
                continue;
            }
            if (typeof numbersAccessed.find(n => n === currentNumber) !== 'undefined') {
                await this.setState({ capacityMiss: this.state.capacityMiss + 1 });
                const position = this.getLeastFrequentlyUsedIndex(frequencyOfAccess);
                numbersCached[position] = currentNumber;
                frequencyOfAccess[position] = 0;
                this.addToTable(position, currentNumber);
                continue;
            }
            await this.setState({ compulsoryMiss: this.state.compulsoryMiss + 1 });
            if (numbersCached.length === numberOfLines) {
                const position = this.getLeastFrequentlyUsedIndex(frequencyOfAccess);
                numbersCached[position] = currentNumber;
                frequencyOfAccess[position] = 0;
                this.addToTable(position, currentNumber);
                numbersAccessed.push(currentNumber);
                continue;
            }
            const position = numbersCached.length;
            numbersCached[position] = currentNumber;
            frequencyOfAccess[position] = 0;
            this.addToTable(position, currentNumber);
            numbersAccessed.push(currentNumber);
        }
        console.debug(JSON.stringify(numbersCached));
        console.debug('H:' + this.state.hit);
        console.debug('CAP:' + this.state.capacityMiss);
        console.debug('COMP:' + this.state.compulsoryMiss);
    }

    addToTable(line, value) {
        document.getElementById(`lfu-${line}`).innerHTML = value;
    }


    render() {
        let rows = [];
        for (let i = 0; i < this.props.numberOfLines; i++) {
            rows.push(<tr key={i} id={`lfu-${i}`}><td>-</td></tr>);
        }

        return (
            <div>
                <span>LFU</span>
                {this.state.currentNumber}
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <span>Hit: {this.state.hit} </span>
                <span>Capacity Miss: {this.state.capacityMiss} </span>
                <span>Compulsory Miss: {this.state.compulsoryMiss} </span>
            </div>
        );
    }
}

export default CacheBlockLFU;
