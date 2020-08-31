import React, { Component } from 'react';
import axios from 'axios';

export class Delele extends Component {
    constructor(props) {
        super(props);

        this.onConfirmation = this.onConfirmation.bind(this);

        this.state = {
            name: "",
            price: 0,
            isAvailable: true
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Home/EditProduct/" + id).then(product => {
            const responce = product.data;
            this.setState({
                name: responce.name,
                price: responce.price,
                isAvailable: responce.isAvailable
            })
        })
    }

    onConfirmation(e) {
        const { id } = this.props.match.params;
        const { history } = this.props;

        axios.delete("api/Home/DeleteProduct/" + id).then(result => {
            history.push('/products');
        })
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <div style={{ marginTop: 10 }}>
                <h2 align="center">Подтвержения удаления товара</h2>
                <div className="card">
                    <div className="card">
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Название</th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Наличие</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td>{this.state.name}</td>
                                    <td>{this.state.price}</td>
                                    <td>{this.state.isAvailable ? "Есть" : "Нету"}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <img src={`/img/${id}.jpg`} width="300" height="300" />
                        <a href='javascript:history.go(-1)' class="btn btn-secondary">Назад</a>
                        <button onClick={this.onConfirmation} className="btn btn-danger">Подтвердить</button>
                    </div>
                </div>
            </div>
            )
    }
}