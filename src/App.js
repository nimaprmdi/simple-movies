import React, { Component } from "react";
import "./App.css";
import Teacher, { handleDegree } from "./teacher";
import Counter from "./components/Counter";
import Counters from "./components/Counters";
import Movies from "./components/Movies";
import Navbar from "./components/common/Navbar";
import Rentals from "./components/common/Rentals";
import MoviesSingle from "./components/common/MoviesSingle";
import LoginForm from "./components/LoginForm";
import NewMovie from "./components/NewMovie";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class App extends Component {
    state = {
        counters: [
            { id: 1, value: 4 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
        ],
        movieId: "",
    };

    constructor(props) {
        super(props);
        // console.log("App - Constructed");
        this.state.counters[0].value = 5;
    }

    componentDidMount() {
        // console.log("App - Mounted");
    }

    handleDelete = (counterId) => {
        const counters = this.state.counters.filter((c) => c.id !== counterId);
        this.setState({ counters });
    };

    handleReset = () => {
        const counters = this.state.counters.map((c) => {
            c.value = 0;
            return c;
        });

        this.setState({ counters });
    };

    handleIncrement = (counter) => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({ counters });
    };

    render() {
        return (
            <>
                <ToastContainer />

                <main className="container">
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/movies/:id/" element={<MoviesSingle id={this.state.movieId} />} />
                            <Route path="/movies/new" element={<NewMovie />} />

                            <Route path="/rentals" element={<Rentals />} />

                            <Route path="/" element={<Navigate replace to="/movies" />} />

                            <Route path="/404" element={<NotFound />} />
                            <Route path="*" element={<Navigate replace to="/404" />} />
                        </Routes>
                    </BrowserRouter>
                </main>
            </>
        );
    }
}

export default App;
