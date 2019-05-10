import React, { Component } from 'react';
import {Link} from "react-router-dom";
import AnswersList from "./AnswersList";

export default class Question extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(match, props) {
        super(props);

        this.state = {
            title: String,
            description: String
        }
    }

    componentDidMount() {
        fetch(`${this.API_URL}/questions/`+ this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    title: data[0].title,
                    description: data[0].description,
                })
            })
    }

    render() {
        return (
            <div className="card bg-light mb-3">
                <h4 className="card-header text-info">Question:</h4>
                <div className="card-body text-dark">
                    <h4 className="media-heading">{this.state.title}</h4>
                    <p>{this.state.description}</p>
                    <Link to={"/answers/add-answer/" + this.props.match.params.id}><button class="btn btn-success btn-lg mr-1">Add answer</button></Link>
                </div>
                <AnswersList id={this.props.match.params.id}/>
            </div>
        );
    }
}