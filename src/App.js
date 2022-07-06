import React, { Component } from "react";
import "./App.css";
import Teacher, { handleDegree } from "./teacher";
import Movies from "./components/Movies";
import Counter from "./components/Counter";
import Counters from "./components/Counters";
import Navbar from "./components/Navbar";

class App extends Component {
    state = {
        counters: [
            { id: 1, value: 4 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
        ],
    };

    constructor(props) {
        super(props);
        console.log("App - Constructed");
        this.state.counters[0].value = 5;
    }

    componentDidMount() {
        console.log("App - Mounted");
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
                <Navbar
                    totalCounters={this.state.counters.filter((c) => c.value > 0).length}
                />

                <main className="container">
                    {/* <Counters
                        counters={this.state.counters}
                        onReset={this.handleReset}
                        onIncrement={this.handleIncrement}
                        onDelete={this.handleDelete}
                    /> */}

                    <Movies />
                </main>
            </>
        );
    }
}

export default App;
