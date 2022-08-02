import React, { Component } from "react";
import _ from "lodash";
import ListGroup from "./common/ListGroup";
import Moviestable from "./common/Moviestable";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/moviesService";
import { Link } from "react-router-dom";
import Search from "./common/Search";
import { toast } from "react-toastify";

class Movies extends Component {
    state = {
        genres: [],
        movies: [],
        currentPage: 1,
        pageSize: 3,
        sortColumn: { path: "title", order: "asc" },
        search: "",
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{ name: "All genres" }, ...data];
        const { data: movies } = await getMovies();
        this.setState({ movies, genres });
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter((m) => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                toast.error("This Movie Has Been Deleted");
            }

            this.setState({ movies: originalMovies });
        }
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
        const { user } = this.props;
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
                    {user && (
                        <Link className="btn btn-primary mb-3" to="/movies/new">
                            New Movie
                        </Link>
                    )}

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
