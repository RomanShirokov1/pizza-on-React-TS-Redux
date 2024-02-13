import React from 'react';
import ReactPagination from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage, totalPages }) => {
  return (
    <ReactPagination
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
