import { useEffect, useState, useContext } from "react";
import { Button, HrefLink, InputField } from "../components/components";
import { postRequest } from "../utils";
import { Context } from "./_app";

export default function UpdateProfile(props) {
    const context = useContext(Context),
        user = context.user??{},
        [resMessage, setResMessage] = useState(""),
        [passwordConfirmed, setPasswordConfirm] = useState(false),
        [message, setMessage] = useState("Password must contain an upper and lowercase letter, number and a symbol");

    useEffect(()=>{
        document.title = "Update Profile"
    },[])
    
    function submit(event) {
        event.preventDefault();
        setResMessage("");
        context.showLoader();
        //Converts the form to and object
        let form = new FormData(event.target),
            formdata = {};

        form.forEach((value, key) => {
            formdata[key] = value;
        });

        postRequest("/updateprofile", formdata).then((res) => {
            context.hideLoader();
            if (res.data) {
                document.location = "/profile";
            } else {
                setResMessage(res.err);
            }
        });
    }

    return (
        <div className="fullscreen">
            <div className="w-full h-full max-w-xs max-w-lg max-w-xl mt-12">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                    <p className="text-md mb-8 text-red-500 ">{resMessage}</p>

                    <InputField
                        defaultValue={user.email}
                        id="email"
                        required
                        type="email"
                        label="Email"
                        placeholder="Enter Email"
                        name="email"
                    />
                    <InputField
                        defaultValue={user.name}
                        required
                        id="name"
                        type="name"
                        label="First and Last name"
                        placeholder="Enter First and Last name"
                        name="name"
                    />

                    <InputField
                        required
                        defaultValue={user.picture}
                        id="picture"
                        type="url"
                        label="Picture URL"
                        placeholder="Enter a URL of your picture"
                        name="picture"
                    />

                    <InputField
                        id="password"
                        label="Password"
                        placeholder="Enter Password"
                        name="password"
                        type="password"
                        onChange={(event) => {
                            const password = event.target.value;
                            if (password.length >= 1 && password.length < 8) {
                                setMessage("Password is too short");
                                return;
                            } else {
                                setMessage(null);
                            }
                            // ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$
                            if (!password.match(/^(?=.*\d)/)) {
                                setMessage("Password must contain number");
                                return;
                            } else {
                                setMessage(null);
                            }
                            if (!password.match(/(?=.*[A-Z])/)) {
                                setMessage("Password must contain an Uppercase character");
                                return;
                            } else {
                                setMessage(null);
                            }
                            if (!password.match(/(?=.*[a-z])/)) {
                                setMessage("Password must contain an lowercase character");
                                return;
                            } else {
                                setMessage(null);
                            }
                            if (!password.match(/(?=.*[_,!,$,_,*,(,),-,&,%,=,+])/)) {
                                setMessage("Password must contain a symbol");
                                return;
                            } else {
                                setMessage(null);
                            }
                        }}
                        info={message}
                    />

                    <InputField
                        id="confirmpassword"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(event) => {
                            if (document.getElementById("password").value === event.target.value) {
                                setPasswordConfirm(true);
                            } else {
                                setPasswordConfirm(false);
                            }
                        }}
                    />

                    <Button type="submit" style={{ width: "100%" }}>
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
}
