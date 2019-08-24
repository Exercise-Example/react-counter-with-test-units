export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export function onIncrement() {
  return {
    type: INCREMENT
  };
}

export function onDecrement() {
  return {
    type: DECREMENT
  };
}
