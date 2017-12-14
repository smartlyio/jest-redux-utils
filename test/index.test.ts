import reducer, {setA, setB } from "./reducer";
import reducerTest from "../src/index";

describe("reducer", reducerTest(reducer)(function () {
  this.expectInitialState({ a: "a", d: 0 });
  this.snapshotAction(setA("other a"));
  this.snapshotActionSequence(setB({ c: true }), setA("some other"));
}));