import React, { Component } from 'react';


class SymbolViewer extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const symbol = this.props.symbol;

        return (
            <div className="SymbolViewer">
                <svg><use xlinkHref={'#' + symbol.id} /></svg>
                <h2>{symbol.title}</h2>
                <p>{symbol.description}</p>
                <p>#{symbol.id}</p>
            </div>
        );
    }
}

export default SymbolViewer;
