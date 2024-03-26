import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSort, setSort, setOrder } from '../redux/slices/filterSlice';

type ListItem = {
  name: string;
  sortProperty: string;
}

export const list: ListItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const orderType = useSelector((state: any) => state.filter.order);  //any поменять позже
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState(false);

  const onSelect = (obj: ListItem) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {  //any поменять позже
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onChangeOrder = (orderType: boolean) => {
    dispatch(setOrder(!orderType));
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <button
          onClick={() => onChangeOrder(orderType)}
          className={orderType ? 'sort__reverse' : 'sort__reverse rotated'}>
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
