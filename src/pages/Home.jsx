import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [orderType, setOrderType] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `&title=*${searchValue}` : '';

    fetch(
      `https://066bcc1325295add.mokky.dev/items?page=${currentPage}&limit=4${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${orderType ? '' : '-'}${sortType.sortProperty}${search}`,
    )
      .then((res) => res.json())
      .then((res) => {
        const arr = res.items;
        const meta = res.meta;
        setTotalPages(meta.total_pages);
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  console.log(currentPage);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          value={sortType}
          onChangeSort={(id) => setSortType(id)}
          orderValue={orderType}
          onChangeOrder={() => setOrderType(!orderType)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} totalPages={totalPages} />
    </div>
  );
};

export default Home;
