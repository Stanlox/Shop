import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllProducts } from '../../actions/ProductsActions';
import { Products } from '../Products/All';

export class AllProducts extends Component {
    constructor(props) {
        super(props);


        this.onProductUpdate = this.onProductUpdate.bind(this);
        this.onProductDelete = this.onProductDelete.bind(this);

        this.state = {
            products: props.location?.state ? props.location.state : [],
            loading: false,
            failed: false,
            error: ''
        }
    }

    componentDidMount() {
        if (this.props.location?.state) return;
        this.props.getAllProducts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.products.data != this.props.products.data) {
            this.setState({ products: this.props.products.data });
        }
    }

    onProductUpdate(id) {
        const { history } = this.props;
        history.push('/update/'+ id);
    }

    onProductDelete(id) {
        const { history } = this.props;
        history.push('/delete/' + id);
    }

   

    renderAllProducts(products) {
        return (
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Имя</th>
                        <th>Категория</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => 
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.category.categoryName}</td>
                                <td>{product.price}</td>
                                <td>
                                    <div className="form-group">
                                        <button onClick={() => this.onProductUpdate(product.id)} className="btn btn-success">
                                            Изменить
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <button onClick={() => this.onProductDelete(product.id)} className="btn btn-danger">
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }

    render() {

        let content = this.props.products.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                this.state.products.length && this.renderAllProducts(this.state.products) 
            );

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps, { getAllProducts })(AllProducts);