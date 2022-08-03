import React from "react";
import Form from "./Form";
import Joi from "joi";
import { useParams, useNavigate } from "react-router-dom";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/moviesService";

export const MoviesSingle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <MoviesSinglePage movieId={id} navigate={navigate} />;
};

class MoviesSinglePage extends Form {
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
        _id: Joi.string(),
        title: Joi.string().min(5).required().label("Haji"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(5).label("Rate"),
    });

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.movieId;
            console.log(this.props);

            // if (movieId === "new") return;

            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) this.props.navigate("/404");
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
            <form className="px-3" onSubmit={this.handleSubmit}>
                {this.renderInput("title", "Title")}
                {this.renderSelect("genreId", "Genre", this.state.genres)}
                {this.renderInput("numberInStock", "Number in Stock", "number")}
                {this.renderInput("dailyRentalRate", "Rate")}
                {this.renderButton("Save")}
            </form>
        );
    }
}

export default MoviesSingle;
