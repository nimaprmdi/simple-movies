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
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RegisterForm from "./components/RegisterForm";
import jwtdecode from "jwt-decode";
import Logout from "./components/common/Logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
    state = {};

    constructor(props) {
        super(props);
        // this.state.counters[0].value = 5;
    }

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
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
        console.log(process.env);

        return (
            <>
                <ToastContainer />

                <main className="container">
                    <BrowserRouter>
                        <Navbar user={this.state.user} />
                        <Routes>
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/movies" element={<Movies user={this.state.user} />} />

                            <Route path="/movies/:id" element={<ProtectedRoute />}>
                                <Route path="/movies/:id" element={<MoviesSingle />} />
                            </Route>

                            <Route path="/movies/new" element={<ProtectedRoute />}>
                                <Route path="/movies/new" element={<NewMovie />} />
                            </Route>

                            <Route path="/rentals" element={<Rentals />} />

                            <Route path="/logout" element={<Logout />} />

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
