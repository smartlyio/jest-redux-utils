import { Reducer, Store, createStore } from "redux";

export type Action = {
  type: any,
  payload: any
}

export class ReducerTestContext<S> {
  constructor(
    private readonly reducer: Reducer<S>,
    private readonly defaultState: S
  ) {}

  public makeStore(state?: S): Store<S> {
    if (state !== undefined) {
      return createStore(this.reducer, state);
    } else {
      return createStore(this.reducer);
    }
  }

  public snapshotAction(action: Action, payloadName?: string): void {
    const actionName = `${action.type}(${payloadName ||
      JSON.stringify(action.payload)})`;
    describe(actionName, () => {
      it("matches snapshot", async () => {
        const store = this.makeStore(this.defaultState);
        await Promise.resolve(store.dispatch(action));
        expect(store.getState()).toMatchSnapshot();
      });
    });
  }

  public snapshotActionSequence(...actions: Array<Action>) {
    const store = this.makeStore(this.defaultState);
    const states = actions.map(action => {
      store.dispatch(action);
      return store.getState();
    });
    it("matches snapshot", () => {
      expect(states).toMatchSnapshot();
    });
  }

  public expectInitialState(expected: S): void {
    it("has correct initial state", () => {
      expect(this.makeStore().getState()).toEqual(expected);
    });
  }

  public snapshotDefaultState(): void {
    it("has unchanged default state", () => {
      expect(this.defaultState).toMatchSnapshot();
    });
  }
}

export default function reducerTest<S>(
  reducer: Reducer<S | undefined>,
  defaultState?: S
) {
  return (executor: (this: ReducerTestContext<S>) => void) => {
    const ctx = new ReducerTestContext(reducer, defaultState);
    return () => {
      if (defaultState) {
        ctx.snapshotDefaultState();
      }
      executor.apply(ctx);
    };
  };
}
