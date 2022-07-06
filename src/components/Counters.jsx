import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
    render() {
        const { onReset, counters, onDelete, onIncrement } = this.props;
        return (
            <div>
                <button onClick={onReset} className="btn btn-primary btn-sm m-2">
                    Reset
                </button>
                {counters.map((counter, index) => {
                    return (
                        <Counter
                            key={index}
                            onIncrement={onIncrement}
                            counter={counter}
                            onDelete={onDelete}
                        >
                            <h4>Counter #{counter.id}</h4>
                        </Counter>
                    );
                })}
            </div>
        );
    }
}

export default Counters;
