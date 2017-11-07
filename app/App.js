import React, { Component } from 'react';

import Menubar from './components/Menubar';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Menubar />
                <div className="Content">

                </div>
            </div>
        );
    }
}

export default App;
