import React from "react";

class Counter extends React.Component {
  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button type="button" onClick={onIncrement}>
            +
          </button>
          <p>{value}</p>
          <button type="button" onClick={onDecrement}>
            -
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
