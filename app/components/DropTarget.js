import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import FileProcessor from './FileProcessor';


const SVG_MIME_TYPE = 'image/svg+xml';

class DropTarget extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dropzoneActive: false
        };

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        const f = [{
            path: '/Users/michael/projects/spritevg/app/test/sprite.svg'
        }, {
            path: '/Users/michael/projects/spritevg/app/test/pencil.svg'
        }];
        this.onDrop(f);
    }

    onDragEnter() {
        console.log('onDragEnter');
        this.setState({dropzoneActive: true});
    }

    onDragLeave() {
        this.setState({dropzoneActive: false});
    }

    onDrop(files) {
        let symbols = [];
        files.forEach(file => {
            symbols = symbols.concat(FileProcessor.processFile(file.path));
        });
        this.props.onAdd(symbols);
        this.setState({dropzoneActive: false});
    }

    render() {
        const { dropzoneActive } = this.state;
        const overlayStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
            color: '#fff'
        };

        return (
            <Dropzone disableClick={true}
                accept={SVG_MIME_TYPE}
                className="DropTarget"
                onDrop={this.onDrop}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}>
                { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
                {this.props.children}
            </Dropzone>
        );
    }
}

export default DropTarget;
