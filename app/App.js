import React, { Component } from 'react';

import DropTarget from './components/DropTarget';
import Menubar from './components/Menubar';
import Viewer from './components/Viewer';


class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            symbols: []
        };

        this.addSymbols = this.addSymbols.bind(this);
    }

    addSymbols(newSymbols) {
        console.log('Adding ' + newSymbols.length + ' symbols');
        this.setState({
            symbols: this.state.symbols.concat(newSymbols)
        });
    }

    render() {
        const { symbols } = this.state;
        console.log(`Previewing ${symbols.length} symbols...`);

        return (
            <div className="App">
                <Menubar />
                <div className="Content">
                    <DropTarget onAdd={this.addSymbols}>
                        <Viewer symbols={symbols} />
                    </DropTarget>
                </div>
            </div>
        );
    }
}

export default App;
