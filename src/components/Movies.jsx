import React, { Component } from "react";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Moviestable from "./common/Moviestable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Search from "./common/Search";

class Movies extends Component {
    state = {
        genres: [],
        movies: [],
        currentPage: 1,
        pageSize: 3,
        sortColumn: { path: "title", order: "asc" },
        search: "",
    };

    componentDidMount() {
        const genres = [{ name: "All genres" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies });

        deleteMovie(movie._id);

        console.log("All movies", getMovies());
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
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;

        const searched = allMovies.filter((m) => m.title.toLowerCase().includes(this.state.search));

        const filtered =
            selectedGenre && selectedGenre._id ? allMovies.filter((m) => m.genre._id === selectedGenre._id) : allMovies;

        let sorted = _.orderBy(searched ? searched : filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: sorted.length, data: movies };
    };

    addMovie = () => {};

    onSearch = ({ currentTarget: input }) => {
        const dataClone = { ...this.state };
        dataClone[input.name] = input.value;
        dataClone.currentPage = 1;
        this.setState({ ...dataClone });
    };

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;
        if (count === 0) return <p>No Movies</p>;

        const { totalCount, data: movies } = this.getPagedData();

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
                    <Link className="btn btn-primary mb-3" to="/movies/new">
                        New Movie
                    </Link>

                    <p>Showing {totalCount} From DB</p>

                    <Search search={this.state.search} onHandleSearch={(e) => this.onSearch(e)} />

                    <Moviestable
                        movies={movies}
                        sortColumn={sortColumn}
                        onHandleLike={(e) => this.handleLike(e)}
                        onHandleDelete={(e) => this.handleDelete(e)}
                        onSort={this.handleSort}
                    />

                    <Pagination
                        itemsCount={totalCount}
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
