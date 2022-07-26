import React, { useState, useEffect } from "react";
import Joi from "joi";
import { handleSubmit, renderInput, renderButton, renderSelect } from "./common/Form";
import { getGenres, getGenreById } from "../services/fakeGenreService";
import { getMovies, saveMovie } from "../services/fakeMovieService";
import { useNavigate } from "react-router-dom";

const NewMovie = () => {
    let navigate = useNavigate();
    const [genres, setGenres] = useState(getGenres());

    const [data, setData] = useState({
        title: "",
        numberInStock: "",
        rate: "",
        genre: "",
        movies: [],
    });

    const [allErrors, setAllErrors] = useState({});

    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        genre: Joi.object().label("Genres"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number In Stock"),
        rate: Joi.number().required().min(0).max(5).label("Rate"),
        movies: Joi.array(),
    });

    const doSubmit = (e) => {
        e.preventDefault();

        const newMovie = {
            title: data.title,
            numberInStock: data.numberInStock,
            dailyRentalRate: data.rate,
            genre: data.genre,
            liked: false,
        };

        saveMovie(newMovie);

        navigate(-1);
    };

    useEffect(() => {
        setData({ ...data, movies: getMovies() });
    }, []);

    return (
        <>
            <h1>New Movie</h1>
            <form className="px-3" onSubmit={(e) => handleSubmit(e, data, setAllErrors, () => doSubmit(e), schema)}>
                {renderInput("title", "Title", data, setData, allErrors, setAllErrors, schema)}

                {renderSelect("genre", "Genre", data, setData, allErrors, setAllErrors, genres, schema)}

                {renderInput("numberInStock", "Number In Stock", data, setData, allErrors, setAllErrors, schema)}

                {renderInput("rate", "Rate", data, setData, allErrors, setAllErrors, schema)}

                {renderButton(data, schema, "Submit")}
            </form>
        </>
    );
};

export default NewMovie;
