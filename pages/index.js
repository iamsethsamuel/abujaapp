import { useEffect, useState, useContext } from "react";
import { Card, Loader } from "../components/components";
import { getRequest, useRequest } from "../utils";
import { Context } from "./_app";

export default function HomePage(props) {
    const context = useContext(Context),
        [cakes, setCakes] = useState();

    useEffect(() => {
        document.title = "Mo Bakes. Delicious Cakes for you 🎂🍥🌮🍕"
        getRequest("/cakes")
            .then((res) => {
                setCakes(res.data)
            })
            .catch((error) => {
                console.log(error);
                context.showSnackBar("Sorry an error occurred");        
            });
    }, []);

    
    if (!cakes) {
        return <Loader />;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cakes.map((cake, index) => (
                <Card key={cake._id} cake={cake} />
            ))}
        </div>
    );
}
