import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setOrder, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const orderType = useSelector((state) => state.filter.order);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(1);
  const { searchValue } = React.useContext(AppContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeOrder = () => {
    dispatch(setOrder(!orderType));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const search = searchValue ? `&title=*${searchValue}` : '';

    axios
      .get(
        `https://066bcc1325295add.mokky.dev/items?page=${currentPage}&limit=4${
          categoryId > 0 ? `&category=${categoryId}` : ''
        }&sortBy=${orderType ? '' : '-'}${sortType}${search}`,
      )
      .then((res) => {
        const arr = res.data.items;
        const meta = res.data.meta;
        setTotalPages(meta.total_pages);
        setItems(arr);
        setIsLoading(false);
      });
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: orderType ? '' + sortType : '-' + sortType,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, orderType, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
      <Pagination onChangePage={onChangePage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
