import React, { Component } from "react";
import Like from "./Like";
import Table from "./Table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            label: "Title",
            content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title} </Link>,
        },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: (movie) => <Like liked={movie.liked} onHandleLike={() => this.props.onHandleLike(movie)} />,
        },
        {
            key: "delete",
            content: (movie) => (
                <button onClick={() => this.props.onHandleDelete(movie)} className="btn btn-danger btn-sm">
                    Delete
                </button>
            ),
        },
    ];

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return <Table sortColumn={sortColumn} onSort={onSort} data={movies} columns={this.columns} />;
    }
}

export default MoviesTable;
