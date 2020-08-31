import axios from 'axios';

export const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_ERROR = 'GET_ALL_PRODUCTS_ERROR';

const getAllProductsSuccess = payload => ({
    type: GET_ALL_PRODUCTS_SUCCESS,
    payload
});

const getAllProductsError = payload => ({
    type: GET_ALL_PRODUCTS_ERROR,
    payload
});


export const getAllProducts = () => dispatch => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
    return axios.get('api/Home/Products/').then(result => {
        const responce = result.data;
        dispatch(getAllProductsSuccess(responce));
    }).catch(error => {
        dispatch(getAllProductsError(error.responce));
        return Promise.reject({});
    })
}