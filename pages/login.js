import { useEffect,  useContext } from "react";
import { Button, HrefLink, InputField } from "../components/components";
import { postRequest } from "../utils";
import { Context } from "./_app";

export default function Login(props) {
    const context = useContext(Context);
    
    useEffect(()=>{
        document.title = "Login"
    },[])

    function submit(event) {
        event.preventDefault();
        context.showLoader();
        //Converts the form to and object
        let form = new FormData(event.target),
            formdata = {};

        form.forEach((value, key) => {
            formdata[key] = value;
        });

        postRequest("/login", formdata).then((res) => {
            context.hideLoader();
            if (res.data) {
                window.localStorage.setItem("sessionid", res.data);
                document.location = "/orders";
            } else {
                context.showSnackBar(res.err);
            }
        });
    }

    return (
        <div className="fullscreen">
            <div className="w-full h-full max-w-xs max-w-lg max-w-xl mt-12">
                <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <InputField required id="email" type="email" label="Email" placeholder="Enter Email" name="email" />
                    <InputField
                        required
                        id="password"
                        label="Password"
                        placeholder="Enter Password"
                        name="password"
                        type="password"
                    />
                    <div className="relative mb-4 h-5">
                        <HrefLink className="text-xs absolute right-0  top-0" href="/signup">
                            Forget password
                        </HrefLink>
                    </div>

                    <Button type="submit" style={{ width: "100%" }}>
                        Login
                    </Button>

                    <div className="mt-5 w-full flex items-center flex-grow ">
                        <HrefLink href="/signup">Or Create an account</HrefLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
