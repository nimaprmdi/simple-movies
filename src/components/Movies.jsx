import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";

class Movies extends Component {
    state = {
        movies: getMovies(),
    };

    handleDelete = (movie) => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const indexOf = movies.indexOf(movie);
        movies[indexOf] = { ...movie };
        movies[indexOf].liked = !movies[indexOf].liked;
        this.setState({ movies });
    };

    render() {
        const { length: count } = this.state.movies;
        if (count === 0) return <p>No Movies</p>;

        return (
            <>
                <p>Showing {count} From DB</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.movies.map((movie, index) => {
                            return (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like
                                            liked={movie.liked}
                                            onHandleLike={() => this.handleLike(movie)}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.handleDelete(movie)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}

export default Movies;
