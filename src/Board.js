import React, { Component } from 'react';
import Note from './Note';

class Board extends Component {
    state = {
        notes: [],
        uniqueId: 0,
    };

    componentWillMount() {
        if (this.props.count) {
            const url = `http://api.icndb.com/jokes/random/${this.props.count}`;

            fetch(url)
                .then(data => data.json())
                .then(res => {
                    res.value.forEach(joke => {
                        this.add(joke.joke);
                    });
                });
        }
    }

    remove = id => {
        const notes = this.state.notes.filter(note => note.id !== id);

        this.setState({ notes });
    };

    nextId = () => {
        this.setState({ uniqueId: this.state.uniqueId + 1 });
        const { uniqueId } = this.state;
        return uniqueId;
    };

    add = text => {
        const notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text,
            },
        ];

        console.log(notes);

        this.setState({ notes });
    };

    update = (newText, id) => {
        const notes = this.state.notes.map(
            note => (note.id !== id ? note : { ...note, note: newText }),
        );

        this.setState({ notes });
    };

    eachNote = note => {
        return (
            <Note
                key={note.id}
                id={note.id}
                onChange={this.update}
                onRemove={this.remove}
            >
                {note.note}
            </Note>
        );
    };

    render() {
        return (
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button
                    onClick={() => {
                        this.add();
                    }}
                >
                    +
                </button>
            </div>
        );
    }
}

export default Board;
