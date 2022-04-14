import React, { useEffect, useState } from "react";
import { Loader, NavBar, NavBarItem, SnackBar } from "../components/components";
import "../styles/globals.css";
import { postRequest, useRequest } from "../utils";

export const Context = React.createContext();
const Provider = Context.Provider;

function MyApp({ Component, pageProps }) {
    const [sessionid, setSessionId] = useState(),
        [isLoading, setIsLoading] = useState(false),
        [loading, data, error] = useRequest("/user"),
        [user, setUser] = useState(data),
        [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        setSessionId(window.localStorage.getItem("sessionid"));
    }, []);

    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Provider
            value={{
                isLoading: isLoading,
                showLoader: () => setIsLoading(true),
                hideLoader: () => setIsLoading(false),
                showSnackBar: (message) => setSnackbarMessage(message),
                user: user,
            }}>
            <Loader />
            {snackbarMessage && <SnackBar> {snackbarMessage} </SnackBar>}

            <NavBar>
                {!user && <NavBarItem href="/login">Login</NavBarItem>}
                 <NavBarItem href="/orders">View Orders</NavBarItem>
                
                {user && <NavBarItem href="/profile">{user.name}</NavBarItem>}
                {user && (
                    <NavBarItem
                        className="text-red-500"
                        onClick={(event) => {
                            event.preventDefault();
                            setIsLoading(true);
                            postRequest("/logout", { sessionId: sessionid }).then((res) => {
                                setIsLoading(false);
                                if (res.data) {
                                    window.localStorage.clear();
                                    document.location = "/login";
                                } else {
                                    setSnackbarMessage(res.err);
                                }
                            });
                        }}
                        href="#">
                        Logout
                    </NavBarItem>
                )}
            </NavBar>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
