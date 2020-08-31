import React, { Component } from 'react';
import axios from 'axios';

export class Projector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Products: [],
            loading: false
        }
    }

    componentDidMount() {
        this.ProductsData();
    }

    functionChangeRout = () => {
        this.setState({ Products: [], loading: false });
        this.ProductsData();
    }

    ProductsData() {
        const url = `api/Home/Products?nameCategory=Projectors`;
        axios.get(url).then(result => {
            const response = result.data;
            console.log(response);
            this.setState({ Products: response, loading: false });
        })
    }

    renderAllProjectors(products) {
        return (
            <div className="row mt-5 mb-2">
                {
                    products.map(product =>
                        <div className="col-lg-4">
                            {product.isAvailable ? <img src={`/img/${product.id}.jpg`} width="300" height="300" />
                                : <img src="img/available.jpg" width="300" height="300" />}
                            <h2>{product.name}</h2>
                            <p>Цена: {product.price} руб</p>
                            <p>
                                <a className="btn btn-success">В корзину</a>
                            </p>
                        </div>
                    )
                }
            </div>
        );
    }

    render() {

        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (this.renderAllProjectors(this.state.Products))

        return (
            <div>
                <h1 align="center">Все товары</h1>
                {content}
            </div>
        );
    }
}