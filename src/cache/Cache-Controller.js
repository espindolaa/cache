import React from 'react';

import CacheBlockFIFO from './cache-block/Cache-Block-FIFO';
import CacheBlockLFU from './cache-block/Cache-Block-LFU';
import CacheBlockLRU from './cache-block/Cache-Block-LRU';
import CacheBlockRNG from './cache-block/Cache-Block-RNG';

import { delay } from 'q';
import { Subject } from 'rxjs';

import './Cache-Controller.css';

export default class CacheController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 250
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.state.number$ = new Subject();
        if (nextProps.simulating) {
            await this.loopThroughNumbers(nextProps.numbers);
        }
    }

    async loopThroughNumbers(numbers) {
        for(let i = 0; i < numbers.length; i++ ) {
            await delay(() => { }, this.state.delay);
            this.state.number$.next(numbers[i]);
        }
    }




    render() {
        return (
            <div className='cache-container'>
                <CacheBlockFIFO number$={this.state.number$} numberOfLines={this.props.numberOfLines}></CacheBlockFIFO>
                <CacheBlockLFU number$={this.state.number$} numberOfLines={this.props.numberOfLines}></CacheBlockLFU>
                <CacheBlockLRU number$={this.state.number$} numberOfLines={this.props.numberOfLines}></CacheBlockLRU>
                <CacheBlockRNG number$={this.state.number$} numberOfLines={this.props.numberOfLines}></CacheBlockRNG> */}
            </div>)
    };
}