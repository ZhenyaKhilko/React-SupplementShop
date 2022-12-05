import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../redux/cart/types';
import { selectCartItemById } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';

type SupplementBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  weights: number[];
};

export const SupplementBlock: React.FC<SupplementBlockProps> = ({
  id,
  imageUrl,
  title,
  price,
  types,
  weights,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const [activeFlavour, setActiveFlavour] = React.useState(types[0]);
  const [activeWeight, setActiveWeight] = React.useState(0);

  const flavours = ['Chocolate', 'Fruits', 'Unflavoured'];

  const onClickAdd = () => {
    const supplement: CartItem = {
      id,
      imageUrl,
      title,
      price,
      flavour: flavours[activeFlavour],
      weight: weights[activeWeight],
      count: 0,
    };
    dispatch(addItem(supplement));
  };

  return (
    <div className="supplement-block-wrapper">
      <div className="supplement-block">
        <Link to={`/React-SupplementShop/supplement/${id}`}>
          <img className="supplement-block__image" src={imageUrl} alt="Supplement" />
        </Link>
        <h4 className="supplement-block__title">{title}</h4>
        <div className="supplement-block__selector">
          <ul>
            {types.map((type, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveFlavour(type)}
                  className={activeFlavour === type ? 'active' : ''}
                >
                  {flavours[type]}
                </li>
              );
            })}
          </ul>
          <ul>
            {weights.map((weight, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setActiveWeight(index)}
                  className={activeWeight === index ? 'active' : ''}
                >
                  {weight} kg
                </li>
              );
            })}
          </ul>
        </div>
        <div className="supplement-block__bottom">
          <div className="supplement-block__price">от {price} $</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {cartItem && <i>{cartItem.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
