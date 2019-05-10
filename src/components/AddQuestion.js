import React, {Component} from 'react';

export default class AddAnswer extends Component {
    API_URL = process.env.REACT_APP_API;


    constructor(props) {
        super(props);

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: String,
            description: String
        }
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        fetch(`${this.API_URL}/questions/add-question/`, {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description
            }),
            headers: {"Content-Type": "application/json"}
        }).then(res => console.log(res.data));
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <h3>Ask a question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h1 className="alert alert-info" role="alert">Question title:</h1>
                        <input  type="text"
                                name="title"
                                className="form-control  mb-2"
                                placeholder="Title of your question..."
                                onChange={this.onTitleChange}
                                required
                        />
                        <label><h6 className={"m-0"}>Question description:</h6></label>
                        <input  type="text"
                                name="description"
                                className="form-control  mb-2"
                                placeholder="Description..."
                                onChange={this.onDescriptionChange}
                                required
                        />
                        <input type='submit' class="btn btn-primary mt-5" value='Confirm'/>
                    </div>
                </form>
            </div>
        )
    }

}