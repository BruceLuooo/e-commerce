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

let initialState: productInformation[] = [
	{
		productName: 'Facial Cleanser Special',
		price: 14,
		brand: 'Corsx',
		quantity: 3,
		id: '123',
	},
	{
		productName: 'Dragon Cleanser',
		price: 20,
		brand: 'Goku',
		quantity: 2,
		id: '456',
	},
];

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		addToCheckout: (state, action) => {
			state.push(action.payload);
		},
		addQuantity: (state, action) => {
			const index = state.findIndex(item => item.id === action.payload);
			state[index].quantity += 1;
		},
		removeQuantity: (state, action) => {
			const index = state.findIndex(item => item.id === action.payload);
			state[index].quantity -= 1;
		},
		removeItem: (state, action) => {
			return state.filter(item => item.id !== action.payload);
		},
	},
});

export const { addQuantity, removeQuantity, removeItem, addToCheckout } =
	checkoutSlice.actions;

export const getCheckoutItems = (state: RootState) => state.checkout;

export default checkoutSlice.reducer;
