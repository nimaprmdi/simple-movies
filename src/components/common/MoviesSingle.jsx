import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MoviesSingle = () => {
    let { id } = useParams();
    let navigate = useNavigate();

    return (
        <>
            <div>MoviesSingle {id}</div>

            <button className="btn btn-primary bg-lg mt-4" onClick={() => navigate(-1)}>
                Save
            </button>
        </>
    );
};

export default MoviesSingle;
