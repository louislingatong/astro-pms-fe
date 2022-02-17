import React from 'react';
import {Pagination as BsPagination} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Meta from '../core/models/Meta';

CustomPagination.propTypes = {
  meta: PropTypes.instanceOf(Meta),
  onPageChange: PropTypes.func,
};

function CustomPagination({meta, onPageChange}) {
  const {
    total: totalElements,
    current_page: activePage,
    last_page: lastPage,
    per_page: pageSize,
  } = meta;
  const totalPages = Math.ceil(totalElements / pageSize);
  const firstFourPages = (activePage - 1) < 3;
  const lastFourPages = totalPages - (activePage - 1) < 4;

  const handleOnChange = (e) => {
    onPageChange(parseInt(e.target.innerText, 10));
  }

  const renderLinks = () => {
    let links = [];

    if (totalPages < 10) {
      links = getIntermediate(0, totalPages);
    } else {
      if (firstFourPages) {
        links = links.concat(getIntermediate(0, 5));
        links.push(
          <BsPagination.Ellipsis key="page_none" />
        );
        links.push(
          <BsPagination.Item
            key={`page_${lastPage}`}
            active={lastPage === (activePage - 1)}
            activeLabel=""
            onClick={handleOnChange}>
            {lastPage}
          </BsPagination.Item>,
        );
      } else if (lastFourPages) {
        links.push(
          <BsPagination.Item
            key="page_0"
            active={(activePage - 1) === 0}
            activeLabel=""
            onClick={handleOnChange}>
            1
          </BsPagination.Item>,
        );
        links.push(
          <BsPagination.Ellipsis key="page_none" />,
        );
        links = links.concat(getIntermediate(totalPages - 5, totalPages));
      } else {
        links.push(
          <BsPagination.Item
            key="page_0"
            active={(activePage - 1) === 0}
            activeLabel=""
            onClick={handleOnChange}>
            1
          </BsPagination.Item>,
        );
        links.push(
          <BsPagination.Ellipsis key="page_none" />,
        );
        links = links.concat(getIntermediate((activePage - 1) - 1, (activePage - 1) + 2));
        links.push(
          <BsPagination.Ellipsis key="page_none_1" />,
        );
        links.push(
          <BsPagination.Item
            key={`page_${lastPage}`}
            active={lastPage === (activePage - 1)}
            activeLabel=""
            onClick={handleOnChange}>
            {lastPage}
          </BsPagination.Item>,
        );
      }
    }
    return links.map((item)=>item);
  };

  const getIntermediate = (from, to) => {
    const links = [];
    for (let i = from; i < to; ++i) {
      links.push(
        <BsPagination.Item
          key={`page_${i}`}
          active={i === (activePage - 1)}
          activeLabel=""
          onClick={handleOnChange}
        >
          {i + 1}
        </BsPagination.Item>
      )
    }
    return links;
  };

  return (
    <BsPagination size="sm" className="no-margin">
      <BsPagination.Item
        disabled={(activePage - 1) === 0}
        onClick={() => onPageChange((activePage - 1) - 1)}
      >
        «
      </BsPagination.Item>
      {renderLinks()}
      <BsPagination.Item
        disabled={lastPage === (activePage - 1)}
        onClick={() => onPageChange((activePage - 1) + 1)}
      >
        »
      </BsPagination.Item>
    </BsPagination>
  )
}

export default CustomPagination;
