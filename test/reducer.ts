import { Dispatch } from "redux";

export interface State {
  a: string;
  b?: {
    c: boolean;
  };
  d: number;
}

const DEFAULT_STATE = {
  a: "a",
  d: 0
}

type Action = { type: "SET_A", payload: State["a"] } | { type: "SET_B", payload: State["b"] } | { type: "SET_D", payload: State["d"] };

export default function reducer(state: State = DEFAULT_STATE, action: Action): State {
  switch (action.type) {
    case "SET_A":
      return { ...state, a: action.payload };
    case "SET_B":
      return { ...state, b: action.payload };
    case "SET_D":
      return { ...state, d: action.payload };
  }
}

export const setA = (a: State["a"]) => ({ type: "SET_A", payload: a });
export const setB = (b: State["b"]) => ({ type: "SET_B", payload: b });