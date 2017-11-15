import React, { Component } from 'react';
import ReactDraggable from 'react-draggable';

class Note extends Component {
    state = {
        editing: false,
        style: {},
    };

    componentWillMount() {
        const style = {
            ...this.state.style,
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
        };

        this.setState({ style });
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.newText.focus();
            this.newText.select();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.children !== nextProps.children ||
            this.state !== nextState
        );
    }

    randomBetween = (x, y, unit) => {
        return x + Math.ceil(Math.random() * (y - x)) + unit;
    };

    edit = () => {
        this.setState({ editing: true });
    };

    save = () => {
        const val = this.newText.value;
        this.props.onChange(val, this.props.id);
        this.setState({ editing: false });
    };

    remove = () => {
        this.props.onRemove(this.props.id);
    };

    renderForm = () => {
        return (
            <div className="note" style={this.state.style}>
                <textarea
                    ref={ref => {
                        this.newText = ref;
                    }}
                    defaultValue={this.props.children}
                />
                <button onClick={this.save}>Save</button>
            </div>
        );
    };

    renderDisplay = () => {
        return (
            <div className="note" style={this.state.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>Edit</button>
                    <button onClick={this.remove}>X</button>
                </span>
            </div>
        );
    };

    render() {
        const render = this.state.editing
            ? this.renderForm()
            : this.renderDisplay();

        return <ReactDraggable>{render}</ReactDraggable>;
    }
}

export default Note;
