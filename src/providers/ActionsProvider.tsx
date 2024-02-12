import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from "react";

type State = {
  remove: boolean;
  add: boolean;
  load: boolean;
  reload: boolean;
};

type Action = "add" | "remove" | "load" | "reload";

type ActionsContextType = {
  toggleAction: (action: Action) => void;
  state: State;
};

export const ActionsContext = createContext<ActionsContextType>(
  {} as ActionsContextType
);

type Props = {
  children: ReactNode;
};

function reducer(state: State, action: Action) {
  if (action === "add") {
    return {
      ...state,
      add: !state.add,
    };
  }
  if (action === "remove") {
    return {
      ...state,
      remove: !state.remove,
    };
  }
  if (action === "load") {
    return {
      ...state,
      load: !state.load,
    };
  }
  if (action === "reload") {
    return {
      ...state,
      reload: !state.reload,
    };
  }
  throw Error("Unknown action.");
}

export default function ActionsContextProvider({
  children,
}: Readonly<Props>): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, {
    remove: false,
    add: false,
    load: false,
    reload: false,
  });

  const toggleAction = (action: Action) => dispatch(action);

  const contextValues = useMemo(() => ({ toggleAction, state }), [state]);

  return (
    <ActionsContext.Provider value={contextValues}>
      {children}
    </ActionsContext.Provider>
  );
}

export const useActions = () => useContext(ActionsContext);
