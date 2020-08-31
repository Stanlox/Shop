import React, { Component } from 'react';
import axios from 'axios'; 

export class Update extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);

        this.state = {
            name: '',
            price: 0,
            isAvailable: true,
            id: 0,
            category: "",
            categoryId: 0
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Home/EditProduct/"+ id).then(product => {
            const responce = product.data;
            console.log(responce);
            this.setState({
                name: responce.name,
                price: responce.price,
                isAvailable: responce.isAvailable,
                id: responce.id,
                category: responce.category,
                categoryId: responce.categoryId
            })
        })
    }

    onUpdateCancel() {
        const { history } = this.props;
        history.push('/AllProducts');
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onChangeAvailable(e) {
        this.setState({
            isAvailable: e.target.checked
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;

        let product = {
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            isAvailable: this.state.isAvailable,
            category: this.state.category,
            categoryId: this.state.categoryId
        }

        axios.put("api/Home/SaveEditProduct/" + id, product).then(result => {
            history.push('/AllProducts');
        })
    }

    render() {
        return (
            <div>
                <h3>Редактирование {this.state.name}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Имя:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Цена: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>
                    <div className="form-check">
                        <label class="form-check-label"></label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={this.state.isAvailable}
                            onClick={this.onChangeAvailable}
                        />
                    </div>
                    <div className="form-group">
                        <button onClick={this.onUpdateCancel} className="btn btn-default">Назад</button>
                        <button type="submit" className="btn btn-success">Сохранить</button>
                    </div>
                </form>
            </div>
            )
    }
} 