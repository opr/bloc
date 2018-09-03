import React from 'react';

export default class TestInput extends React.Component {

    constructor(props) {
        super();
        this.state = {...props, value: 'test'};
    }

    render() {
        return (
            <div className="test-input">
        <input type={'text'} value={this.state.value} onChange={e => this.setState({value: e.target.value})} /></div>
        );
    }
}
