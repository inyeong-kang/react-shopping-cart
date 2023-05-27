import type { CartItemType } from '../../../types';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { CartItem, CheckBox } from '../../../components';
import { cartState, selectedCartState } from '../../../recoil/state';
import { api } from '../../../api';

interface CartListProps {
  cartItems: CartItemType[];
}

export default function CartList({ cartItems }: CartListProps) {
  const [selectedCart, setSelectedCart] = useRecoilState(selectedCartState);
  const [cart, setCart] = useRecoilState(cartState);

  const removeSelectedCartItems = async (cartItems: CartItemType[]) => {
    const removePromises = cartItems.map((item) => api.deleteCartItem(item.id));
    await Promise.all(removePromises);
  };

  async function handleDeleteClick() {
    const selectedCartItems = cart.filter((item) => selectedCart.includes(item.product.id));
    const selectedCartIds = selectedCartItems.map((item) => item.id);
    const selectedCartProudctIds = selectedCartItems.map((item) => item.product.id);

    if (confirm('선택한 상품을 삭제하시겠습니까?')) {
      setSelectedCart(selectedCart.filter((id) => !selectedCartProudctIds.includes(id)));
      setCart(cart.filter((item) => !selectedCartIds.includes(item.id)));

      await removeSelectedCartItems(selectedCartItems);
    }
  }

  return (
    <S.Wrapper>
      <S.Title>배송 상품 ({cartItems.length}개)</S.Title>
      <S.Container>
        {cartItems.length === 0 && (
          <S.EmptyList>
            <img src="./baemin-empty.png" />
            <p>먼저 상품을 담아주세요!</p>
            <Link to="/">
              <button>담으러 가기</button>
            </Link>
          </S.EmptyList>
        )}
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item}></CartItem>
        ))}
      </S.Container>
      {cartItems.length !== 0 && (
        <S.CheckWrapper>
          <CheckBox id="all" />
          <S.Direction>
            전체선택 ({selectedCart.length}/{cartItems.length})
          </S.Direction>
          <S.CheckDeleteButton onClick={handleDeleteClick}>선택삭제</S.CheckDeleteButton>
        </S.CheckWrapper>
      )}
    </S.Wrapper>
  );
}

const Wrapper = styled.div`
  width: 740px;

  display: flex;
  flex-direction: column;
  jusify-content: start;
  gap: 20px;

  @media screen and (max-width: 767px) {
    width: 320px;
  }
`;

const Title = styled.div`
  font-size: 18px;

  padding: 20px 5px;

  border-bottom: 3px solid gray;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

const EmptyList = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  font-size: 20px;

  margin-top: 20px;
`;

const CheckWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
`;

const Direction = styled.p`
  font-size: 14px;
`;

const CheckDeleteButton = styled.button`
  background-color: white;
  border: 1px solid #bbbbbb;

  padding: 7px;
`;

const S = {
  Wrapper,
  Title,
  Container,
  EmptyList,
  CheckWrapper,
  Direction,
  CheckDeleteButton,
};
