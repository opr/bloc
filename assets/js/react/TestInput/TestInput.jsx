import React from 'react';

export default class TestInput extends React.Component {

    constructor(props) {
        super();
        this.state = {...props, value: 'test'};
    }

    render() {
        if (process.env.NODE_ENV === 'production') {
            var testVarBananas = 'BANANAS';
            console.log(testVarBananas);
        }
        return (
            <div className="hello">test hello ok does this work?{process.env.NODE_ENV}
        <input type={'text'} value={this.state.value} onChange={e => this.setState({value: e.target.value})} /></div>
        );
    }
}