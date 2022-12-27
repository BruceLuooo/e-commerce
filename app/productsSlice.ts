import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { RootState, AppThunk } from '../app/store';
import { db } from '../firebase.config';

export interface productInformation {
	description?: string;
	price?: number;
	productType?: string;
	productName?: string;
	brand?: string;
}

let initialState: productInformation[] = [];

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProducts: (state, action) => {
			return action.payload;
		},
	},
});

export const { addProducts } = productSlice.actions;

export const getAllProducts = (state: RootState) => state.products;

export default productSlice.reducer;
