import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_ERROR
} from '../actions/ProductsActions';

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    data: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type)
    {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload
            };
        case GET_ALL_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                data: action.payload
            };

        default:
            return state;
    }
}