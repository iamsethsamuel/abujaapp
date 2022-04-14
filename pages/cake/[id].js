import { useEffect, useState, useContext } from "react";
import { Button, Card, InputField, Loader } from "../../components/components";
import { getRequest, postRequest } from "../../utils";
import { Context } from "../_app";
import * as moment from "moment";

const colors = [
    { color: "white", price: 10 },
    { color: "red", price: 20 },
    { color: "blue", price: 30 },
    { color: "brown", price: 40 },
];
const sizes = [
    { size: "XL", price: 10 },
    { size: "MD", price: 20 },
    { size: "SM", price: 30 },
];

export default function Cake(props) {
    const context = useContext(Context),
        [cake, setCake] = useState(),
        [selectedSize, setSize] = useState({ size: "XL", price: 10 }),
        [selectedColor, setColor] = useState({ color: "brown", price: 40 }),
        [deliveryDate, setDeliveryDate] = useState(moment().add(1, "days"));

    useEffect(() => {
        getRequest(document.location.pathname)
            .then((res) => {
                document.title = res.data.name
                setCake(res.data);
            })
            .catch((error) => {
                console.log(error);
                context.showSnackBar("Sorry an error occurred");
            });
    }, [context]);

    function submit(event) {
        event.preventDefault();
        if (document.getElementById("cardnumber").value.length !== 16) {
            context.showSnackBar("Invalid card number");
            return;
        }

        if (document.getElementById("cvc").value.length !== 3) {
            context.showSnackBar("Invalid CVC");
            return;
        }

        context.showLoader();
        //Converts the form to and object
        let form = new FormData(event.target),
            formdata = {
                size: selectedSize,
                color: selectedColor,
                date: deliveryDate.toDate(),
                price: selectedColor.price + selectedSize.price + cake.price,
                cake: cake._id
            };

        form.forEach((value, key) => {
            formdata[key] = value;
        });

        postRequest("/order", formdata).then((res) => {
            context.hideLoader();
            if (res.data) {
                document.location = "/order/" + res.data;
            } else {
                context.showSnackBar(res.err);
            }
        });
    }

    if (!cake) {
        return <Loader />;
    }

    return (
        <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
                <Card cake={cake} />
            </div>
            <div>
                <div className="w-full h-full max-w-xs max-w-lg max-w-xl p-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className="bold text-xl">
                        Total Order price is: {selectedColor.price + selectedSize.price + cake.price} NGN and will be
                        delivered
                        {" " + deliveryDate.fromNow()}
                    </p>
                    <div className="grid grid-cols-4 p-5">
                        {colors.map((color) => (
                            <Button
                                key={color.color}   
                                text
                                style={{
                                    color: selectedColor.color != color.color ? "grey" : "",
                                }}
                                onClick={() => {
                                    setColor(color);
                                    setDeliveryDate(moment().add((color.price + selectedSize.price) / 10, "days"));
                                }}>
                                {color.color.toUpperCase()}
                            </Button>
                        ))}
                    </div>

                    <div className="grid grid-cols-4 p-5">
                        {sizes.map((size) => (
                            <Button
                                key={size.size}
                                text
                                style={{ color: selectedSize.size !== size.size ? "grey" : "" }}
                                onClick={() => {
                                    setSize(size);
                                    setDeliveryDate(moment().add((size.price + selectedColor.price) / 10, "days"));
                                }}>
                                {size.size}
                            </Button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="">
                        <InputField id="name" label="Name" placeholder="Name" name="name" />
                        <InputField id="phone" label="Phone number" placeholder="Phone" name="phone" type="tel" />
                        <InputField
                            id="address"
                            type="address"
                            label="Delivery Address"
                            placeholder="Address"
                            name="address"
                        />
                        <InputField
                            id="inscription"
                            label="Inscription"
                            placeholder="Inscription on cake"
                            name="inscription"
                        />
                        <InputField
                            id="cardnumber"
                            label="Card Number"
                            placeholder="Card Number"
                            name="cardnumber"
                            type="number"
                        />
                        <InputField
                            id="cvc"
                            label="CVC"
                            placeholder="CVC"
                            name="cvc"
                            type="number"
                            info="The 3 digit number and the back of your card"
                        />
                        <Button type="submit" style={{ width: "100%" }}>
                            Place Order
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
