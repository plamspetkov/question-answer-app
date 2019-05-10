import React, { Component } from 'react';
import { Link } from "react-router-dom";


class QuestionList extends Component {
    API_URL = process.env.REACT_APP_API;

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        console.log(this.API_URL);
       fetch(`${this.API_URL}/questions`)
           .then(res => res.json())
           .then((data) => {
               this.setState({ questions: data })
               console.log(this.state.questions)
           })
    }

    render() {
        return (
            <div>
                <h1 className="alert alert-info" role="alert">Question List</h1>
                <table className="table table-striped" style={{marginTop: 20}}>
                    {this.state.questions.map((questions) => (
                        <tbody>
                            <div className="media-body">
                                <h4 className="media-heading">
                                    <Link
                                    to={"/questions/" + questions._id}>{questions.title}
                                    </Link>
                                </h4>
                                <p>{questions.description}</p>
                            </div>
                        </tbody>
                    ))}
                </table>
            </div>
        );
    }
}

export default QuestionList

