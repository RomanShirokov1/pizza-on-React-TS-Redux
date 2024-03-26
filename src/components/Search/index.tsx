import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: any) => {
      //any поменять
      dispatch(setSearchValue(str));
    }, 400),
    [],
  );

  const onInput = (event: any) => {
    //any поменять
    setValue(event.target.value);
    dispatch(setCurrentPage(1));
    updateSearchValue(event.target.value);
  };

  const onInputClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={() => onInputClear()}
          className={styles.clear}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
