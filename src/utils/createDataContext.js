import React, { useReducer, createContext } from 'react';

// method to automate custom context creation
// Params: (reducer: function, actions: any, initialState: any)
// Returns: (Context: function, Provider: function): object
const createDataContext = ({
  reducer,
  actions,
  initialState,
  displayName = 'Context',
}) => {
  const Context = createContext();
  // set a display name to debug Context easier
  Context.displayName = displayName;

  // provider is a HOF that provides the state and dispatcher to its children to set the state.
  const Provider = ({ children }) => {
    // state management with reducer called by dispatch
    const [state, dispatch] = useReducer(reducer, initialState);

    // GIVEN
    // actions === {actionPropName: actionFunc, ...}
    // actions === {actionPropName: (dispatch) => action, ...}
    // actions === {actionPropName: (dispatch) => doStuff() & dispatch({type, payload, ...}), ...}
    // -----------------------------------------------
    // WANT:
    // boundActions === actions
    // boundActions === {action1, action2, action3, ...}
    // boundActions === {actionPropName: doStuff() & dispatch({type, payload, ...}), ...}
    // -----------------------------------------------
    // HOW:
    // For each property in actions, get each property value (each value is actionFunc)
    // derive each action in each property by calling actionFunc with dispatch - actionFunc(dispatch)
    // now we have the action === actionFunc(dispatch)
    // now assign it to boundActions with its corresponding actionPropName
    // boundActions[actionPropName] = actionFunc(dispatch)

    // loop through actions and assign a 'dispatch' to each actionFunc
    const boundActions = {};
    for (let actionPropName in actions) {
      const actionFunc = actions[actionPropName]; // actionFunc === (dispatch) => action
      const boundAction = actionFunc(dispatch); // boundAction === action
      boundActions[actionPropName] = boundAction; // assign each bound action inside another object
    }

    // what the provider
    const passToChildren = { state, ...boundActions };

    // Context uses Provider to share data across its children.
    return (
      // so ach children can use the context hook to get context shipped provided state and actions
      // like: const {state, boundActions} = useContext(someContext)
      <Context.Provider value={passToChildren}>{children}</Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
