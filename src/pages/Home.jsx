import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setOrder } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const orderType = useSelector((state) => state.filter.order);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [orderType, setOrderType] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(1);
  const { searchValue, currentPage, setCurrentPage } = React.useContext(AppContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeOrder = () => {
    dispatch(setOrder(!orderType));
  };

  React.useEffect(() => {
    setIsLoading(true);
    const search = searchValue ? `&title=*${searchValue}` : '';

    fetch(
      `https://066bcc1325295add.mokky.dev/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${orderType ? '' : '-'}${sortType}${search}`,
    )
      .then((res) => res.json())
      .then((res) => {
        const arr = res.items;
        const meta = res.meta;
        setTotalPages(meta.total_pages);
        setItems(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <Sort orderValue={orderType} onChangeOrder={() => onChangeOrder(orderType)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} totalPages={totalPages} />
    </div>
  );
};

export default Home;
