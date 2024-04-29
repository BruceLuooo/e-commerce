import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import checkoutReducer from '../app/checkoutSlice';

export const store = configureStore({
	reducer: {
		checkout: checkoutReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
