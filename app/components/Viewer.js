import React, { Component } from 'react';


class Viewer extends Component {

    constructor(props, context) {
        super(props, context);

        this.getSymbols = this.getSymbols.bind(this);
    }

    getSymbols() {
        const symbols = this.props.symbols.join('');
        return {
            __html: symbols
        };
    }

    render() {

        return (
            <div className="Viewer">
                <svg>
                    <defs dangerouslySetInnerHTML={this.getSymbols()}>
                    </defs>
                </svg>
            </div>
        );
    }
}

export default Viewer;
