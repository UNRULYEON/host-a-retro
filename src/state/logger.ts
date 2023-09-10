import { RetroState } from ".";
import { StateCreator, StoreMutatorIdentifier } from "zustand";

const diff = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
  if (!obj2 || Object.prototype.toString.call(obj2) !== "[object Object]") {
    return obj1;
  }

  const diffs: Record<string, unknown> = {};
  let key: string;

  const arraysMatch = (arr1: unknown[], arr2: unknown[]) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  const compare = (
    item1: Record<string, unknown>,
    item2: Record<string, unknown>,
    key: string,
  ) => {
    const type1 = Object.prototype.toString.call(item1);
    const type2 = Object.prototype.toString.call(item2);

    if (type2 === "[object Undefined]") {
      diffs[key] = null;
      return;
    }

    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    if (type1 === "[object Object]") {
      const objDiff = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    if (type1 === "[object Array]") {
      if (
        !arraysMatch(
          item1 as unknown as unknown[],
          item2 as unknown as unknown[],
        )
      ) {
        diffs[key] = item2;
      }
      return;
    }

    if (type1 === "[object Function]") {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };

  for (key in obj1) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj1.hasOwnProperty(key)) {
      compare(
        obj1[key] as unknown as Record<string, unknown>,
        obj2[key] as unknown as Record<string, unknown>,
        key,
      );
    }
  }

  for (key in obj2) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  return diffs;
};

const getDivideState = (state: RetroState) => {
  const keys = Object.keys(state);

  const divided = Object.values(state).reduce<{
    values: { key: string; value: unknown }[];
    actions: { key: string; value: unknown }[];
  }>(
    (acc, v, i) => {
      if (typeof v === "function") {
        return {
          ...acc,
          actions: [...acc.actions, { key: keys[i], value: v }],
        };
      } else {
        return { ...acc, values: [...acc.values, { key: keys[i], value: v }] };
      }
    },
    { values: [], actions: [] },
  );
  const values = divided.values.reduce<Record<string, unknown>>(
    (acc, { key, value }) => ({ ...acc, [key]: value }),
    {},
  );
  const actions = divided.actions.reduce<Record<string, unknown>>(
    (acc, { key, value }) => ({ ...acc, [key]: value }),
    {},
  );

  return { values, actions };
};

const getAction = (action: unknown, actions: Record<string, unknown>) => {
  const keys = Object.keys(actions);
  const actionString = String(action);

  const filteredActions = Object.values(actions)
    .map((v, i) => {
      const stateActionString = String(v);

      if (stateActionString.includes(actionString))
        return { key: keys[i], value: v };

      return null;
    })
    .filter((v) => v);

  if (filteredActions.length === 0) return null;

  return filteredActions[0];
};

type LoggerOptions = {
  name?: string;
  enabled?: boolean;
};

type Logger = <
  T extends RetroState,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<T, Mps, Mcs>,
  options?: LoggerOptions,
) => StateCreator<T, Mps, Mcs>;

type LoggerImplementation = <T extends RetroState>(
  f: StateCreator<T, [], []>,
  options?: LoggerOptions,
) => StateCreator<T, [], []>;

const loggerDefaultOptions: Required<LoggerOptions> = {
  name: "zustand",
  enabled: false,
};

const logger: LoggerImplementation = (f, options) => (set, get, store) => {
  type T = ReturnType<typeof f>;
  const { name, enabled } = { ...loggerDefaultOptions, ...options };

  const loggedSet: typeof set = (...a) => {
    if (!enabled) {
      set(...a);
      return;
    }

    const prevState: T = get();

    set(...a);

    const states = {
      prevState: getDivideState(prevState),
      nextState: getDivideState(get()),
    };

    const action = getAction(a[0], states.prevState.actions);

    if (!action) throw new Error("zustand - Action not found");

    const stateDiff = diff(states.prevState.values, states.nextState.values);

    console.groupCollapsed(
      `%c● %c${name} %c${action.key} %c@ ${new Date().toLocaleTimeString()}`,
      `color: ${Object.keys(stateDiff).length > 0 ? "#0090E3" : "#FFC117"};`,
      "color: #808080;",
      "color: #BDC6CF;",
      "color: #808080;",
    );
    console.log("diff", stateDiff);
    console.log("action", action);
    console.log("Previous state", {
      ...states.prevState.values,
      ...states.prevState.actions,
    });
    console.log("Next state", {
      ...states.nextState.values,
      ...states.nextState.actions,
    });
    console.groupEnd();
  };

  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export default logger as unknown as Logger;
