import React, { Component } from 'react';

import DropTarget from './components/DropTarget';
import Menubar from './components/Menubar';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Menubar />
                <div className="Content">
                    <DropTarget />
                </div>
            </div>
        );
    }
}

export default App;
