(this.webpackJsonpcache=this.webpackJsonpcache||[]).push([[0],{15:function(e,t,n){e.exports=n(25)},20:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(14),u=n.n(s),i=(n(20),n(3)),c=n(4),l=n(6),o=n(5),p=n(7),f=n(1),m=n.n(f),d=n(2),h=(n(9),n(8)),b=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={hit:0,capacityMiss:0,compulsoryMiss:0,currentNumber:null},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(){var e=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.simulating){e.next=3;break}return e.next=3,this.FIFO(t.numbers,t.numberOfLines);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"FIFO",value:function(){var e=Object(d.a)(m.a.mark((function e(t,n){var a,r,s,u,i,c=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],r=[],s=0,u=m.a.mark((function e(u){var i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t[u],e.next=3,Object(h.delay)((function(){}),c.props.delay);case 3:return e.next=5,c.setState({currentNumber:i});case 5:if("undefined"===typeof r.find((function(e){return e===i}))){e.next=9;break}return e.next=8,c.setState({hit:c.state.hit+1});case 8:return e.abrupt("return","continue");case 9:if("undefined"===typeof a.find((function(e){return e===i}))){e.next=16;break}return e.next=12,c.setState({capacityMiss:c.state.capacityMiss+1});case 12:return r[s]=i,c.addToTable(s,i),s=c.getNextLine(s,n),e.abrupt("return","continue");case 16:return e.next=18,c.setState({compulsoryMiss:c.state.compulsoryMiss+1});case 18:r[s]=i,c.addToTable(s,i),s=c.getNextLine(s,n),a.push(i);case 22:case"end":return e.stop()}}),e)})),i=0;case 5:if(!(i<t.length)){e.next=13;break}return e.delegateYield(u(i),"t0",7);case 7:if("continue"!==e.t0){e.next=10;break}return e.abrupt("continue",10);case 10:i++,e.next=5;break;case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getNextLine",value:function(e,t){return e+1===t?0:e+1}},{key:"addToTable",value:function(e,t){var n=document.getElementById("fifo-".concat(e));"-"!==n.innerHTML?n.innerHTML+=", ".concat(t):n.innerHTML=t}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.numberOfLines;t++)e.push(r.a.createElement("tr",{key:t},r.a.createElement("td",{id:"fifo-".concat(t)},"-")));return r.a.createElement("div",null,r.a.createElement("span",null,"FIFO"),this.state.currentNumber,r.a.createElement("table",null,r.a.createElement("tbody",null,e)),r.a.createElement("span",null,"Hit: ",this.state.hit),r.a.createElement("span",null,"Capacity Miss: ",this.state.capacityMiss),r.a.createElement("span",null,"Compulsory Miss: ",this.state.compulsoryMiss))}}]),t}(r.a.Component),y=n(10),v=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={hit:0,capacityMiss:0,compulsoryMiss:0,currentNumber:null},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(){var e=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.simulating){e.next=3;break}return e.next=3,this.LFU(t.numbers,t.numberOfLines);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setupFrequencyOfAcess",value:function(e){for(var t=[],n=0;n<e;n++)t.push(0);return t}},{key:"getLeastFrequentlyUsedIndex",value:function(e){var t=Math.min.apply(Math,Object(y.a)(e));return e.indexOf(t)}},{key:"LFU",value:function(){var e=Object(d.a)(m.a.mark((function e(t,n){var a,r,s,u,i,c=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],r=[],s=this.setupFrequencyOfAcess(n),u=m.a.mark((function e(u){var i,l,o,p,f;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t[u],e.next=3,Object(h.delay)((function(){}),c.props.delay);case 3:return e.next=5,c.setState({currentNumber:i});case 5:if("undefined"===typeof r.find((function(e){return e===i}))){e.next=11;break}return e.next=8,c.setState({hit:c.state.hit+1});case 8:return l=r.indexOf(i),s[l]+=1,e.abrupt("return","continue");case 11:if("undefined"===typeof a.find((function(e){return e===i}))){e.next=19;break}return e.next=14,c.setState({capacityMiss:c.state.capacityMiss+1});case 14:return o=c.getLeastFrequentlyUsedIndex(s),r[o]=i,s[o]=0,c.addToTable(o,i),e.abrupt("return","continue");case 19:return e.next=21,c.setState({compulsoryMiss:c.state.compulsoryMiss+1});case 21:if(r.length!==n){e.next=28;break}return p=c.getLeastFrequentlyUsedIndex(s),r[p]=i,s[p]=0,c.addToTable(p,i),a.push(i),e.abrupt("return","continue");case 28:f=r.length,r[f]=i,s[f]=0,c.addToTable(f,i),a.push(i);case 33:case"end":return e.stop()}}),e)})),i=0;case 5:if(!(i<t.length)){e.next=13;break}return e.delegateYield(u(i),"t0",7);case 7:if("continue"!==e.t0){e.next=10;break}return e.abrupt("continue",10);case 10:i++,e.next=5;break;case 13:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"addToTable",value:function(e,t){var n=document.getElementById("lfu-".concat(e));"-"!==n.innerHTML?n.innerHTML+=", ".concat(t):n.innerHTML=t}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.numberOfLines;t++)e.push(r.a.createElement("tr",{key:t},r.a.createElement("td",{id:"lfu-".concat(t)},"-")));return r.a.createElement("div",null,r.a.createElement("span",null,"LFU"),this.state.currentNumber,r.a.createElement("table",null,r.a.createElement("tbody",null,e)),r.a.createElement("span",null,"Hit: ",this.state.hit),r.a.createElement("span",null,"Capacity Miss: ",this.state.capacityMiss),r.a.createElement("span",null,"Compulsory Miss: ",this.state.compulsoryMiss))}}]),t}(r.a.Component),x=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={hit:0,capacityMiss:0,compulsoryMiss:0,currentNumber:null},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(){var e=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.simulating){e.next=3;break}return e.next=3,this.LRU(t.numbers,t.numberOfLines);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setupFrequencyOfAcess",value:function(e){for(var t=[],n=0;n<e;n++)t.push(0);return t}},{key:"getLeastRecentlyUsedIndex",value:function(e){var t=Math.max.apply(Math,Object(y.a)(e));return e.indexOf(t)}},{key:"getIncrementedFrequency",value:function(e){return e.map((function(e){return++e}))}},{key:"LRU",value:function(){var e=Object(d.a)(m.a.mark((function e(t,n){var a,r,s,u,i,c=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],r=[],s=[],u=m.a.mark((function e(u){var i,l,o,p,f;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t[u],e.next=3,Object(h.delay)((function(){}),c.props.delay);case 3:return e.next=5,c.setState({currentNumber:i});case 5:if("undefined"===typeof r.find((function(e){return e===i}))){e.next=12;break}return e.next=8,c.setState({hit:c.state.hit+1});case 8:return l=r.indexOf(i),(s=c.getIncrementedFrequency(s))[l]=0,e.abrupt("return","continue");case 12:if("undefined"===typeof a.find((function(e){return e===i}))){e.next=21;break}return e.next=15,c.setState({capacityMiss:c.state.capacityMiss+1});case 15:return o=c.getLeastRecentlyUsedIndex(s),r[o]=i,(s=c.getIncrementedFrequency(s))[o]=0,c.addToTable(o,i),e.abrupt("return","continue");case 21:return e.next=23,c.setState({compulsoryMiss:c.state.compulsoryMiss+1});case 23:if(r.length!==n){e.next=31;break}return p=c.getLeastRecentlyUsedIndex(s),r[p]=i,(s=c.getIncrementedFrequency(s))[p]=0,c.addToTable(p,i),a.push(i),e.abrupt("return","continue");case 31:f=r.length,r[f]=i,(s=c.getIncrementedFrequency(s))[f]=0,c.addToTable(f,i),a.push(i);case 37:case"end":return e.stop()}}),e)})),i=0;case 5:if(!(i<t.length)){e.next=13;break}return e.delegateYield(u(i),"t0",7);case 7:if("continue"!==e.t0){e.next=10;break}return e.abrupt("continue",10);case 10:i++,e.next=5;break;case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"addToTable",value:function(e,t){var n=document.getElementById("lru-".concat(e));"-"!==n.innerHTML?n.innerHTML+=", ".concat(t):n.innerHTML=t}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.numberOfLines;t++)e.push(r.a.createElement("tr",{key:t},r.a.createElement("td",{id:"lru-".concat(t)},"-")));return r.a.createElement("div",null,r.a.createElement("span",null,"LRU"),this.state.currentNumber,r.a.createElement("table",null,r.a.createElement("tbody",null,e)),r.a.createElement("span",null,"Hit: ",this.state.hit),r.a.createElement("span",null,"Capacity Miss: ",this.state.capacityMiss),r.a.createElement("span",null,"Compulsory Miss: ",this.state.compulsoryMiss))}}]),t}(r.a.Component),k=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(o.a)(t).call(this,e))).state={hit:0,capacityMiss:0,compulsoryMiss:0,currentNumber:null},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(){var e=Object(d.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.simulating){e.next=3;break}return e.next=3,this.FIFO(t.numbers,t.numberOfLines);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"FIFO",value:function(){var e=Object(d.a)(m.a.mark((function e(t,n){var a,r,s,u,i,c=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],r=[],s=0,u=m.a.mark((function e(u){var i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t[u],e.next=3,Object(h.delay)((function(){}),c.props.delay);case 3:return e.next=5,c.setState({currentNumber:i});case 5:if("undefined"===typeof r.find((function(e){return e===i}))){e.next=9;break}return e.next=8,c.setState({hit:c.state.hit+1});case 8:return e.abrupt("return","continue");case 9:if("undefined"===typeof a.find((function(e){return e===i}))){e.next=16;break}return e.next=12,c.setState({capacityMiss:c.state.capacityMiss+1});case 12:return r[s]=i,c.addToTable(s,i),s=c.getNextLine(r.length,n),e.abrupt("return","continue");case 16:return e.next=18,c.setState({compulsoryMiss:c.state.compulsoryMiss+1});case 18:r[s]=i,c.addToTable(s,i),s=c.getNextLine(r.length,n),a.push(i);case 22:case"end":return e.stop()}}),e)})),i=0;case 5:if(!(i<t.length)){e.next=13;break}return e.delegateYield(u(i),"t0",7);case 7:if("continue"!==e.t0){e.next=10;break}return e.abrupt("continue",10);case 10:i++,e.next=5;break;case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"getNextLine",value:function(e,t){return console.debug(e),console.debug(t),e<t?e:Math.floor(Math.random()*(t-1))}},{key:"addToTable",value:function(e,t){var n=document.getElementById("rng-".concat(e));"-"!==n.innerHTML?n.innerHTML+=", ".concat(t):n.innerHTML=t}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.numberOfLines;t++)e.push(r.a.createElement("tr",{key:t},r.a.createElement("td",{id:"rng-".concat(t)},"-")));return r.a.createElement("div",null,r.a.createElement("span",null,"RNG"),this.state.currentNumber,r.a.createElement("table",null,r.a.createElement("tbody",null,e)),r.a.createElement("span",null,"Hit: ",this.state.hit),r.a.createElement("span",null,"Capacity Miss: ",this.state.capacityMiss),r.a.createElement("span",null,"Compulsory Miss: ",this.state.compulsoryMiss))}}]),t}(r.a.Component),O=(n(24),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(o.a)(t).call(this,e))).handleSimulationChange=function(e){n.state.numberOfLines&&n.state.numbers.length&&n.setState({simulating:e})},n.handleNumbersChange=function(e){return n.setState({numbers:e})},n.handleNumberOfLinesChange=function(e){return n.setState({numberOfLines:e.target.value})},n.state={numberOfLines:4,delay:250,numbers:[],simulating:!1},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"getNumbers",value:function(){var e=this,t=document.getElementById("file-input").files[0],n=new FileReader;n.addEventListener("load",(function(){return e.handleNumbersChange(n.result.split(","))})),n.readAsText(t)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"app"},r.a.createElement("label",null,"How many lines are in the cache?",r.a.createElement("input",{id:"lines-input",type:"number",min:"1",defaultValue:"4",onChange:function(t){return e.handleNumberOfLinesChange(t)}})),r.a.createElement("label",null,"Upload the csv here:",r.a.createElement("input",{id:"file-input",type:"file",onChange:function(){return e.getNumbers()}})),r.a.createElement("input",{type:"button",onClick:function(){return e.handleSimulationChange(!0)},value:"Go"}),r.a.createElement("div",{className:"cache-container"},r.a.createElement(b,{delay:this.state.delay,numberOfLines:this.state.numberOfLines,numbers:this.state.numbers,simulating:this.state.simulating}),r.a.createElement(v,{delay:this.state.delay,numberOfLines:this.state.numberOfLines,numbers:this.state.numbers,simulating:this.state.simulating}),r.a.createElement(x,{delay:this.state.delay,numberOfLines:this.state.numberOfLines,numbers:this.state.numbers,simulating:this.state.simulating}),r.a.createElement(k,{delay:this.state.delay,numberOfLines:this.state.numberOfLines,numbers:this.state.numbers,simulating:this.state.simulating})))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){}},[[15,1,2]]]);
//# sourceMappingURL=main.b7e9da01.chunk.js.map