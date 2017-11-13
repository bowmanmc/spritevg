import React, { Component } from 'react';

import SymbolViewer from './SymbolViewer';


class Viewer extends Component {

    constructor(props, context) {
        super(props, context);

        this.getSymbols = this.getSymbols.bind(this);
    }

    getSymbols() {
        let els = [];
        this.props.symbols.forEach(symbol => {
            els.push(symbol.content);
        });

        return {
            __html: els.join('')
        };
    }

    render() {

        return (
            <div className="Viewer">
                <svg style={{display:'none'}}>
                    <defs dangerouslySetInnerHTML={this.getSymbols()}>
                    </defs>
                </svg>
                {this.props.symbols.map((symbol, i) => {
                    return <SymbolViewer key={i} symbol={symbol} />
                })}
            </div>
        );
    }
}

export default Viewer;
