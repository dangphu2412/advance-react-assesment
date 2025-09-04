import React, { useReducer, createContext, useContext, type ReactNode } from "react";

type UsernameAction = { type: "SET_USERNAME"; payload: string };
function usernameReducer(state: string, action: UsernameAction): string {
  switch (action.type) {
    case "SET_USERNAME":
      return action.payload;
    default:
      return state;
  }
}
const UsernameStateContext = createContext<string>(""); 
const UsernameDispatchContext = createContext<React.Dispatch<UsernameAction>>(
  () => {}
);

function UsernameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(usernameReducer, "");
  return (
    <UsernameStateContext.Provider value={state}>
      <UsernameDispatchContext.Provider value={dispatch}>
        {children}
      </UsernameDispatchContext.Provider>
    </UsernameStateContext.Provider>
  );
}

function useUsername() {
  return useContext(UsernameStateContext);
}
function useSetUsername() {
  return useContext(UsernameDispatchContext);
}


type PasswordAction = { type: "SET_PASSWORD"; payload: string };
function passwordReducer(state: string, action: PasswordAction): string {
  switch (action.type) {
    case "SET_PASSWORD":
      return action.payload;
    default:
      return state;
  }
}
const PasswordStateContext = createContext<string>(""); 
const PasswordDispatchContext = createContext<React.Dispatch<PasswordAction>>(
  () => {}
);

function PasswordProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(passwordReducer, "");
  return (
    <PasswordStateContext.Provider value={state}>
      <PasswordDispatchContext.Provider value={dispatch}>
        {children}
      </PasswordDispatchContext.Provider>
    </PasswordStateContext.Provider>
  );
}

function usePassword() {
  return useContext(PasswordStateContext);
}
function useSetPassword() {
  return useContext(PasswordDispatchContext);
}

// ---------- Inputs ----------
function UsernameInput() {
  const username = useUsername();
  const dispatch = useSetUsername();
  console.log("Render UsernameInput");
  return (
    <>
      <label htmlFor="username">Username</label>
      <input
        className="border border-solid"
        id="username"
        value={username}
        onChange={(e) =>
          dispatch({ type: "SET_USERNAME", payload: e.target.value })
        }
      />
    </>
  );
}

function PasswordInput() {
  const password = usePassword();
  const dispatch = useSetPassword();
  console.log("Render PasswordInput");
  return (
    <>
      <label htmlFor="password">Password</label>
      <input
        className="border border-solid"
        id="password"
        type="password"
        value={password}
        onChange={(e) =>
          dispatch({ type: "SET_PASSWORD", payload: e.target.value })
        }
      />
    </>
  );
}

// ---------- FormLogin3 ----------
export function FormLogin3() {
  const username = useUsername();
  const password = usePassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Username: ${username}, Password: ${password}`);
  };

  return (
    <UsernameProvider>
      <PasswordProvider>
        <form
          className="w-[600px] border border-gray-300 p-4 mx-auto mt-12"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-xl mb-4">
            Solution 3 - Use Context and Reducer for State Management
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <UsernameInput />
            <PasswordInput />
            <button className="border rounded col-span-2 cursor-pointer p-2">
              Login
            </button>
          </div>
        </form>
      </PasswordProvider>
    </UsernameProvider>
  );
}
