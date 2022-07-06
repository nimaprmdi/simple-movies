import React from "react";

const Like = ({ onHandleLike, liked }) => {
    return (
        <i
            onClick={() => onHandleLike()}
            className={`${liked ? "fa fa-heart" : "fa fa-heart-o"}`}
            style={{ cursor: "pointer" }}
        ></i>
    );
};

export default Like;
