import React, { Component } from "react";
import Like from "./common/Like";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
class Movies extends Component {
    state = {
        genres: [],
        movies: [],
        currentPage: 1,
        pageSize: 3,
    };

    componentDidMount() {
        this.setState({ movies: getMovies(), genres: getGenres() });
    }

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

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = (genre) => {
        console.log(genre);

        this.setState({ selectedGenre: genre });
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies, selectedGenre } = this.state;
        if (count === 0) return <p>No Movies</p>;

        const filtered = selectedGenre ? allMovies.filter((m) => m.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {filtered.length} From DB</p>
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
                            {movies.map((movie, index) => {
                                return (
                                    <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td>
                                            <Like liked={movie.liked} onHandleLike={() => this.handleLike(movie)} />
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

                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
