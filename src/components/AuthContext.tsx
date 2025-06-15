import { createContext } from "react";
import { AuthContextType } from "../service/auth";

/* This is a React Context, which is basically a prop which is automatically sent to all the
** children of this component, whithout requiring "prop drilling".
** This React Context also triggers the React components to automatically update if the React
** Context changes.
** This React Context is used similar to a React component, and any of it's child components
** will receive it's data automatically, without "prop-drilling". */
export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: (token) => {}
});