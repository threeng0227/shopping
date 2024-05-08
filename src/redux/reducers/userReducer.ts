import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserInfor } from 'domain/entities/user_entity';
interface Cart {
    description: string,
    price: number,
    title: string,
    isChoose: boolean,
    tax: number,
    id: number,
    quantity: number
}
interface User {
    user: UserInfor | null | undefined,
    carts: Cart[] | null | undefined,
    orders: {
        data: Cart[] | null | undefined,
        discount: number
    }
}
const initialState: User = {
    user: {
        name: '',
        birthday: '',
        phone: '',
        email: '',
        address: '',
    },
    carts: null,
    orders: {
        data: null,
        discount: 0
    },
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfor: (state, action: {
            payload: UserInfor | null | undefined
        }) => {
            state.user = action.payload;
        },
        setCartInfor: (state, action: {
            payload: Cart[] | null | undefined
        }) => {
            state.carts = action.payload;
        },
        setOrdersInfor: (state, action: {
            payload: any
        }) => {
            state.orders.data = action.payload?.data;
            state.orders.discount = action.payload?.discount;
        },
    }
})

export const { setUserInfor, setCartInfor, setOrdersInfor } = userReducer.actions;

export const selectUserInfor = (state: RootState) => state.user.user;
export const selectCartInfor = (state: RootState) => state.user.carts;
export const selectOrdersInfor = (state: RootState) => state.user.orders?.data;
export const selectDiscountOrder = (state: RootState) => state.user.orders?.discount;

export default userReducer.reducer;