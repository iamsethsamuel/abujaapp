import { useState, useEffect } from "react";

const url = "https://bakingapi.herokuapp.com"

export const inProduction = true;


export async function postRequest(path, body ){
    const req = await fetch(inProduction ? `${url}${path}` : `http://localhost:8080${path}`, {
        method: "post",
        body: JSON.stringify(body),
        headers: { Authorization: window.localStorage.getItem("sessionid"), "Content-Type": "application/json" },
    })

    return req.json()
}

export async function getRequest(path){
    const req = await fetch(inProduction ? `${url}${path}` : `http://localhost:8080${path}`, {
        headers: { Authorization: window.localStorage.getItem("sessionid"), "Content-Type": "application/json" },
    })
    return req.json()

}

export function useRequest(path) {
    const [loading, setLoading] = useState(true),
        [data, setData] = useState(),
        [error, setError] = useState();

    useEffect(() => {
        fetch(inProduction ? `${url}${path}` : `http://localhost:8080${path}`, {
            headers: { Authorization: window.localStorage.getItem("sessionid"), "Content-Type": "application/json" },
        })  
            .then((d) =>
                d.json().then((res) => {
                    setLoading(false);
                    if (res.data) {
                        setData(res.data);
                    } else {
                        setError(res.error);
                    }
                })
            )
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError("Sorry an error occurred");
            });
    }, []);

    return [loading, data, error];
}
