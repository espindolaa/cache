import React from 'react';
import './Cache-Block.css';

export class CacheBlockLFU extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hit: 0,
            capacityMiss: 0,
            compulsoryMiss: 0,
            currentNumber: null,
            numbersAccessed: [],
            numbersCached: [],
            numberOfLines: 0,
            frequencyOfAccess: []
        }
    }
    async componentWillReceiveProps(nextProps) {
        if(nextProps.numberOfLines !== this.state.numberOfLines) {
            this.setupFrequencyOfAccess(nextProps.numberOfLines);
            await this.setState({ numberOfLines: nextProps.numberOfLines });
        }
        nextProps.number$.subscribe(n => this.addToCache(n));
    }
    
    async addToCache(number) {
        this.state.numbersCached.includes(number)
            ? await this.registerHit(number)
            : await this.registerMiss(number)
    }

    async registerHit(number) {
        await this.setState({ hit: this.state.hit + 1 });
        const position = this.state.numbersCached.indexOf(number);
        await this.incrementFrequencyOfAccess(position);
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
        const position = this.getLeastFrequentlyUsedIndex(this.state.frequencyOfAccess);
        await this.updateNumbersCached(number, position);
        await this.resetFrequencyOfAccess(position);
        this.addToTable(position, number);
    }

    async registerCompulsoryMiss(number) {
        await this.setState({ compulsoryMiss: this.state.compulsoryMiss + 1 });
        const position = this.getLeastFrequentlyUsedIndex(this.state.frequencyOfAccess);
        await this.updateNumbersCached(number, position);
        await this.resetFrequencyOfAccess(position);
        await this.updateNumbersAccessed(number);
        this.addToTable(position, number);
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

    async resetFrequencyOfAccess(line) {
        const frequencyOfAccess = this.state.frequencyOfAccess;
        frequencyOfAccess[line] = 0;
        this.setState({ frequencyOfAccess: frequencyOfAccess });
    }

    async incrementFrequencyOfAccess(line) {
        const frequencyOfAccess = this.state.frequencyOfAccess;
        frequencyOfAccess[line] += 1;
        this.setState({ frequencyOfAccess: frequencyOfAccess });
    }

    setupFrequencyOfAccess(numberOfLines) {
        const frequencyOfAccess = [];
        for (let i = 0; i < numberOfLines; i++) {
            frequencyOfAccess.push(0);
        }
        this.setState({ frequencyOfAccess: frequencyOfAccess });
    }

    getLeastFrequentlyUsedIndex(frequencyOfAccess) {
        if (this.state.numbersAccessed.length < this.state.numberOfLines) {
            return this.state.numbersAccessed.length;
        }
        const min = Math.min(...frequencyOfAccess);
        return frequencyOfAccess.indexOf(min);
    }

    addToTable(line, value) {
        const element = document.getElementById(`lfu-${line}`);
        if (element.innerHTML === '-') {
            element.innerHTML = value;
            return;
        }
        element.innerHTML += `, ${value}`;
    }

    render() {
        let rows = [];
        for (let i = 0; i < this.props.numberOfLines; i++) {
            rows.push(<tr key={i}><td id={`lfu-${i}`}>-</td></tr>);
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
                <span>Hit: {this.state.hit}</span>
                <span>Capacity Miss: {this.state.capacityMiss}</span>
                <span>Compulsory Miss: {this.state.compulsoryMiss}</span>
            </div>
        );
    }
}

export default CacheBlockLFU;