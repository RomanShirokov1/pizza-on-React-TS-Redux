import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

export const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort({ value, onChangeSort, orderValue, onChangeOrder }) {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = React.useRef();

  const [isVisible, setIsVisible] = React.useState(false);

  const onSelect = (obj) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <button
          onClick={() => onChangeOrder(!orderValue)}
          className={orderValue ? 'sort__reverse' : 'sort__reverse rotated'}>
          ↑↑
        </button>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onSelect(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
