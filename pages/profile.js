import { useContext, useState, useEffect } from "react";
import { HrefLink, Loader } from "../components/components";
import { getRequest } from "../utils";
import { Context } from "./_app";

export default function Profile(props) {
    const context = useContext(Context),
        [user, setUser] = useState(context.user);

    useEffect(() => {
        if (!user) {
            getRequest("/user").then((res) => {
                if (res.data) {
                    setUser(res.data);
                } else {
                    context.showSnackBar(res.err);
                }
            });
        }
    }, [user]);

    if (!user) {
        return <Loader />;
    }
    document.title = user.name;

    return (
        <div className="flex items-center w-full justify-between items-center ">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 m-5 bg-white w-full justify m-4 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg rounded" src={user.picture} alt="user image" />
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {user.name}
                        </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        <span className="text-md font-bold text-gray-900 dark:text-white">
                            {user.email}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <HrefLink href={`/updateprofile`} contained>
                            Update Profile
                        </HrefLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
