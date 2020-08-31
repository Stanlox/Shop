import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/ProductsActions';


export class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: props.location?.state ? props.location.state : [],
            loading: false
        }
    }

    componentDidMount() {
        if (this.props.location?.state) return;
        this.ProductsData();
    }

    ProductsData() {
        const url = `api/Home/Products/`;
        axios.get(url).then(result => {
            const response = result.data;
            this.setState({ products: response, loading: false });
        })
    }


    componentDidUpdate(props) {
        if (props.location.state !== this.props.location.state) {
            if (this.props.location.state) this.setState({ products: this.props.location.state })
            else this.ProductsData();
        }
    }

    renderAllProducts(products) {
        return (
            <div className="row mt-5 mb-2">
                {
                    products.map(product =>
                        <div className="col-lg-4">
                            {product.isAvailable ? <img src={`/img/${product.id}.jpg`} width="300" height="300" />
                                : <img src="img/available.jpg" width="300" height="300"/>}
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
        let title;
        if (this.props.location?.state) {
            title = "Возможно вы искали";
        }
        else {
            title = "Все товары";
        }
        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (this.renderAllProducts(this.state.products))

        return (
            <div>
                <h1 align="center">{title}</h1>
                {content}
            </div>
        );
    }
}

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps, { getAllProducts })(Products);