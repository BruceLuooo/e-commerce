import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { RootState, AppThunk } from './store';
import { db } from '../firebase.config';

export interface productInformation {
	price?: number;
	productName?: string;
	brand?: string;
	quantity: number;
	id: string;
}

interface initalState {
	cart: productInformation[];
}

const initialState: initalState = {
	cart: [],
};

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		addToCheckout: (state, action) => {
			const findIndex = state.cart.findIndex(
				item => item.id === action.payload.id,
			);
			if (findIndex === -1) {
				state.cart.push(action.payload);
			} else {
				state.cart[findIndex].quantity += action.payload.quantity;
			}
		},
		addQuantity: (state, action) => {
			const index = state.cart.findIndex(item => item.id === action.payload);
			state.cart[index].quantity += 1;
		},
		removeQuantity: (state, action) => {
			const index = state.cart.findIndex(item => item.id === action.payload);
			state.cart[index].quantity -= 1;
		},
		removeItem: (state, action) => {
			state.cart = state.cart.filter(item => item.id !== action.payload);
		},
	},
});

export const { addQuantity, removeQuantity, removeItem, addToCheckout } =
	checkoutSlice.actions;

export const getCheckoutItems = (state: RootState) => state.checkout.cart;

export default checkoutSlice.reducer;
