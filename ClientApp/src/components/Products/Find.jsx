import React, { Component } from 'react';
import { withRouter } from "react-router";
import axios from 'axios';

class _Find extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.get("api/Search/Index/" + this.state.value).then(product => {
            const responce = product.data;
            const { history } = this.props;
            history.push({ pathname: '/Products', state: responce });
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} class="form-inline my-2 my-lg-0">
                    <label>
                    <input class="form-control mr-sm-2" type="text" value={this.state.value} placeholder="Search" onChange={this.handleChange} aria-label="Search" name="nameProduct" />
                        </label>
                        <input class="btn btn-outline-success my-2 my-sm-0" value="Search" type="submit" />
                </form>
            </div>
        )
    }
}


export const Find =  withRouter(_Find);