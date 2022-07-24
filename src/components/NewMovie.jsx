import React, { useState } from "react";
import Joi from "joi";
import { handleSubmit, renderInput, renderButton } from "./common/Form";

const NewMovie = () => {
    const [data, setData] = useState({
        title: "",
        password: "",
    });

    const [allErrors, setAllErrors] = useState({});

    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        password: Joi.string().required().min(4).label("Password"),
    });

    const doSubmit = () => {
        console.log("Submit");
    };

    return (
        <form className="px-3" onSubmit={(e) => handleSubmit(e, data, setAllErrors, doSubmit, schema)}>
            {renderInput("title", "Title", data, setData, allErrors, setAllErrors, schema)}
            {renderInput("password", "Password", data, setData, allErrors, setAllErrors, schema, "password")}

            {renderButton(data, schema, "Submit")}
        </form>
    );
};

export default NewMovie;
