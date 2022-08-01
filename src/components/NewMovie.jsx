import React from "react";
import Joi from "joi";
import { saveMovie, getMovie } from "../services/moviesService";
import { getGenres } from "../services/genreService";
import Form from "./common/Form";
import { useParams, useNavigate } from "react-router-dom";

export const NewMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <NewMoviePage movieId={id} navigate={navigate} />;
};

class NewMoviePage extends Form {
    state = {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        genres: [],
        errors: {},
    };

    schema = Joi.object({
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(5).label("Rate"),
        movies: Joi.array(),
    });

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.movieId;
            console.log(this.props);

            if (movieId === undefined) return;

            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
            // this.props.navigate(-1);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) console.log(ex.response);
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    }

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.navigate("/movies");
    };

    render() {
        return (
            <>
                <h1>New Movie</h1>
                <form className="px-3" onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock", "number")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </>
        );
    }
}

export default NewMovie;
