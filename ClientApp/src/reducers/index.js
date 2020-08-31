import { combineReducers } from 'redux';
import ProductsReducers from './ProductsReducers';

const rootReducer = combineReducers({
    products: ProductsReducers
});

export default rootReducer;