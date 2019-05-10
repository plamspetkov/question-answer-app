import React, { Component } from 'react';

class AnswersList extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: String,
            answers: [],
            updated: false
        };
    }

    componentDidMount() {
        fetch(`${this.API_URL}/answers/`+ this.props.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ answers: data })
            })
    }

    onSubmit(e) {
        e.preventDefault();
        let button = e.target;
        let action;

        // eslint-disable-next-line
        if(button.innerHTML === 'LIKE') {
            action = 'like-answer';
        } else {
            action = 'dislike-answer';
        }
        fetch(`${this.API_URL}/answers/` + action + '/' + e.target.dataset.answerid, {
            method: 'POST',
            body: JSON.stringify({
                answerId: e.target.dataset.answerid
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        window.location.reload()
    }

    render() {
        return (
            <div>
                <h4 className="alert alert-light" role="alert">Answers:</h4>
                <div>
                    {this.state.answers.map((answer) => (
                        <div  className="media-body mb-4">
                            <p>{answer.text}</p>
                            <p id={'rating-'+answer._id}><b>Likes: </b>{answer.rating}</p>
                            <button className="btn btn-success mr-1" data-answerId={answer._id} onClick={this.onSubmit}>LIKE</button>
                            <button className="btn btn-danger" data-answerId={answer._id} onClick={this.onSubmit}>DISLIKE</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AnswersList

