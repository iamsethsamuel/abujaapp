import { useState, useEffect, useContext } from "react";
import { HrefLink } from "../components/components";
import { Loader, Reciept } from "../components/components";
import { getRequest } from "../utils";
import { Context } from "./_app";

export default function Order(props) {
    const context = useContext(Context),
        [orders, setOrder] = useState();

    useEffect(() => {
        document.title = "Orders"
        getRequest(document.location.pathname).then((res) => {
            if (res.data) {
                setOrder(res.data);
            } else {
                context.showSnackBar(res.err);
            }
        });
    }, []);

    if (!orders || !context.user) {
        return (
            <div className="fullscreen">
                <HrefLink contained href="/login">
                    Login to view Orders
                </HrefLink>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 p-2">
            {orders.map((order) => (
                <Reciept key={order._id} order={order} />
            ))}
        </div>
    );
}
