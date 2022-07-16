import React from "react";
import Like from "./Like";

const Moviestable = ({ movies, onHandleLike, onHandleDelete, onSort }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => onSort("title")}>Title</th>
                    <th onClick={() => onSort("gernre.name")}>Genre</th>
                    <th onClick={() => onSort("numberInStock")}>Stock</th>
                    <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
                    <th />
                    <th />
                </tr>
            </thead>

            <tbody>
                {movies.map((movie) => {
                    return (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onHandleLike={() => onHandleLike(movie)} />
                            </td>
                            <td>
                                <button onClick={() => onHandleDelete(movie)} className="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Moviestable;
