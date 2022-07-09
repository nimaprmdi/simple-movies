import React from "react";
import _ from "lodash";

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize); // Change to small integer
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1); // Increase (1) because Array start from 0 => (start , end)

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page, index) => {
                    return (
                        <li
                            key={index}
                            className={
                                page === currentPage
                                    ? "page-item active"
                                    : "page-item"
                            }
                        >
                            <a
                                onClick={() => onPageChange(page)}
                                className="page-link"
                            >
                                {page}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
