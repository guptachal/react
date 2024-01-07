import React, { Children, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
    all_products: [],
    filtered_products: [],
    grid_view: false,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
    }
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products } = useProductsContext();

    useEffect(() => {
        dispatch({ type: LOAD_PRODUCTS, payload: products });
    }, [products]);

    useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS })
        dispatch({ type: SORT_PRODUCTS, payload: state.sort })
    }, [products, state.sort, state.filters])

    const setListView = () => {
        dispatch({ type: SET_LISTVIEW });
    };

    const setGridView = () => {
        dispatch({ type: SET_GRIDVIEW });
    };

    const updateSort = (e) => {
        const value = e.target.value;
        dispatch({ type: UPDATE_SORT, payload: value });
    };

    const updateFilter = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === 'category') {
            value = e.target.textContent
        }
        if (name === 'color') {
            value = e.target.dataset.color
        }
        if (name === 'price') {
            value = Number(value)
            
        }
        if(name === 'shipping'){
            value = e.target.checked
        }
        console.log("name :"+name)
        console.log("value: "+value)
        dispatch({
            type: UPDATE_FILTERS,
            payload: {
                name: name,
                value: value
            }
        })
    }

    const clearFilters = () => {
        console.log("Clear Filter")
        dispatch({type:CLEAR_FILTERS})
    }

    return (
        <FilterContext.Provider value={{ ...state, setListView, setGridView, updateSort, clearFilters, updateFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
