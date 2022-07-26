import React from "react";

const Search = ({ search, onHandleSearch }) => {
    return (
        <form className="form-inline mb-4 w-100">
            <input
                name="search"
                onChange={(e) => onHandleSearch(e)}
                className="form-control mr-sm-2 w-100"
                type="search"
                placeholder="Search"
                aria-label="Search"
            />
        </form>
    );
};

export default Search;
