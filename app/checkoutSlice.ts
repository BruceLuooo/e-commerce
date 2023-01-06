import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { RootState, AppThunk } from './store';
import { db } from '../firebase.config';
import Cookies from 'js-cookie';

export interface productInformation {
	price?: number;
	productName?: string;
	brand?: string;
	quantity: number;
	id: string;
	imgUrl: string;
}

interface initalState {
	cart: productInformation[];
}

const initialState: initalState = {
	cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [],
};

const inHalfADay = 0.5;

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		addToCheckout: (state, action) => {
			const findIndex = state.cart.findIndex(
				item => item.id === action.payload.id,
			);
			if (findIndex === -1) {
				Cookies.set('cart', JSON.stringify([...state.cart, action.payload]), {
					expires: inHalfADay,
				});
				state.cart.push(action.payload);
			} else {
				state.cart[findIndex].quantity += action.payload.quantity;
				Cookies.set('cart', JSON.stringify([...state.cart]), {
					expires: inHalfADay,
				});
			}
		},
		addQuantity: (state, action) => {
			const index = state.cart.findIndex(item => item.id === action.payload);
			state.cart[index].quantity += 1;
			Cookies.set('cart', JSON.stringify([...state.cart]), {
				expires: inHalfADay,
			});
		},
		removeQuantity: (state, action) => {
			const index = state.cart.findIndex(item => item.id === action.payload);
			state.cart[index].quantity -= 1;
			Cookies.set('cart', JSON.stringify([...state.cart]), {
				expires: inHalfADay,
			});
		},
		removeItem: (state, action) => {
			state.cart = state.cart.filter(item => item.id !== action.payload);
			Cookies.set('cart', JSON.stringify([...state.cart]), {
				expires: inHalfADay,
			});
		},
	},
});

export const { addQuantity, removeQuantity, removeItem, addToCheckout } =
	checkoutSlice.actions;

export const getCheckoutItems = (state: RootState) => state.checkout.cart;

export default checkoutSlice.reducer;
