import React from 'react';

function Sort({ value, onChangeSort, orderValue, onChangeOrder }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const list = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onSelect = (i) => {
    onChangeSort(i);
    setIsVisible(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <button
          onClick={() => onChangeOrder(!orderValue)}
          className={orderValue ? 'sort__reverse' : 'sort__reverse rotated'}>
          ↑↑
        </button>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onSelect(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
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
