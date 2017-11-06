import React, { Component } from 'react';

import Menubar from './components/Menubar';
import Plots from './components/Plots';
import Viewer from './components/Viewer';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Menubar />
                <div className="Content">
                    <Viewer />
                    <Plots />
                </div>
            </div>
        );
    }
}

export default App;
