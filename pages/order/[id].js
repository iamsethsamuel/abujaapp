import { useState, useEffect, useContext } from "react";
import { Loader, Reciept } from "../../components/components";
import { getRequest } from "../../utils";
import { Context } from "../_app";

export default function Order(props) {
    const context = useContext(Context),
        [order, setOrder] = useState();

    useEffect(() => {
        getRequest(document.location.pathname).then((res) => {
            if (res.data) {
                setOrder(res.data);
            } else {
                context.showSnackBar(res.err);
            }
        });
    }, []);

    if (!order) {
        return <Loader />;
    }

    document.title = order.inscription

    return (
        <div className="bg-white rounder m-5 p-2">
            <Reciept order={order} />
        </div>
    );
}
