import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getMovie } from "../../services/fakeMovieService";
import { handleSubmit, renderInput, renderButton, renderSelect } from "./Form";
import { saveMovie, getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";

const MoviesSingle = () => {
    let navigate = useNavigate();
    let { id } = useParams();

    const [genres, setGenres] = useState(getGenres());

    const [movie, setMovie] = useState(getMovie(id));
    const [allMovie, setAllMovie] = useState(getMovies());

    /* After Validate */

    const [data, setData] = useState({
        _id: id,
        title: movie.title,
        numberInStock: movie.numberInStock,
        rate: movie.dailyRentalRate,
        genre: movie.genre,
    });

    const [allErrors, setAllErrors] = useState({});

    const schema = Joi.object({
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genre: Joi.object().label("Genres"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
        rate: Joi.number().required().min(0).max(5).label("Rate"),
    });

    const doSubmit = (e) => {
        e.preventDefault();

        const newMovie = {
            _id: data._id,
            title: data.title,
            genre: data.genre,
            numberInStock: data.numberInStock,
            dailyRentalRate: data.rate,
            liked: false,
        };

        saveMovie(newMovie);

        navigate(-1);
    };

    if (!movie) return <Navigate to="/404" replace={true} />;

    return (
        <>
            <h1>Single</h1>
            <form className="px-3" onSubmit={(e) => handleSubmit(e, data, setAllErrors, () => doSubmit(e), schema)}>
                {renderInput("title", "Title", data, setData, allErrors, setAllErrors, schema)}

                {renderSelect("genre", "Genre", data, setData, allErrors, setAllErrors, genres, schema, data.genre)}

                {renderInput("numberInStock", "Number In Stock", data, setData, allErrors, setAllErrors, schema)}

                {renderInput("rate", "Rate", data, setData, allErrors, setAllErrors, schema)}

                {renderButton(data, schema, "Submit")}
            </form>
        </>
    );
};

export default MoviesSingle;
