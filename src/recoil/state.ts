import type { CartItemType } from '../types';
import { atom, selector } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';

export const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.cart) ?? '[]'),
});

export const cartCountState = selector<number>({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});
