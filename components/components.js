import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Context } from "../pages/_app";
import * as moment from "moment";

export function Button(props) {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
            type={props.type}
            style={props.style}
            className={
                props.text
                    ? "text-green-600 font-bold hover:text-green-500"
                    : "disabled:bg-green-300 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }>
            {props.children}
        </button>
    );
}

export function InputField(props) {
    return (
        <div className={"mb-4 " + props.className}>
            {props.label && (
                <label className="block text-gray-700 text-sm font-bold-md mb-2" htmlFor={props.id}>
                    {props.label}
                </label>
            )}

            <input
                id={props.id}
                required={props.required}
                onChange={props.onChange}
                defaultValue={props.defaultValue}
                className={
                    "shadow appearance-none border rounded w-full py-3 text-gray-700 leading-tight pl-2 focus:outline-none focus-shawdow-outline " +
                    props.inputClassName
                }
                placeholder={props.placeholder}
                name={props.name}
                autoComplete="on"
                type={props.type}
            />
            {props.info && <p className={"text-grey-100 text-xs italic mt-4 " + props.infoClassName}>{props.info}</p>}
        </div>
    );
}

export function NavBar(props) {
    const context = useContext(Context),
        [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        window.addEventListener("click", (event) => {
            if (event.path[0].tagName === "MAIN") {
                setOpenMenu(false);
            }
        });
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setOpenMenu(false);
            }
        });
    }, []);

    return (
        <nav className="flex items-center sticky top-0 justify-between shadow flex-wrap bg-white p-6">
            <div className="flex items-center flex-shrink-0  mr-6">
                <img
                    className="fill-current w-8 mr-2"
                    width={44}
                    height={44}
                    src="https://i.pinimg.com/564x/4d/6c/6f/4d6c6fd17be46afd19db1d7c63983691.jpg"
                />
                <HrefLink className="text-xl" href="/">
                    Mo Bakes
                </HrefLink>
            </div>

            {props.children && (
                <div
                    className={
                        !openMenu
                            ? "hidden"
                            : "origin-top-right absolute right-1 top-16 mt-2  rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    }
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1">
                    <div className="text-sm lg:flex-grow">{props.children}</div>
                </div>
            )}

            <div className="block">
                <button
                    id="menu"
                    onClick={() => setOpenMenu(!openMenu)}
                    className={
                        context.user
                            ? ""
                            : "flex items-center px-3 py-2 border rounded text-green border-green hover:text-green-500 "
                    }>
                    {context.user ? (
                        <img src={context.user.picture} className="w-10 h-10 rounded-full" />
                    ) : (
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
}

export function NavBarItem(props) {
    return (
        <a
            href={props.href}
            onClick={props.onClick}
            className={"block px-4 mr-1 py-2 w-60 text-sm text-gray-700 " + props.className}
            role="menuitem"
            tabIndex="-1">
            {props.children}
        </a>
    );
}

export function HrefLink(props) {
    return (
        <Link href={props.href}>
            <a
                className={
                    props.contained
                        ? "disabled:bg-green-300 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        : `font-semibold text-green text-green-700 hover:text-green-500 tracking-right  ` +
                          props.className
                }>
                {props.children}
            </a>
        </Link>
    );
}

export function Loader(props) {
    const context = useContext(Context);
    if (context.isLoading) {
        return (
            <div
                className="fullscreen"
                style={{ position: "fixed", height: "100vh", width: "100vw", backgroundColor: "white" }}>
                <svg viewBox="0 0 100 100">
                    <path
                        fill="green"
                        d="M31.6 3.5C5.9 13.6-6.6 42.7 3.5 68.4c10.1 25.7 39.2 38.3 64.9 28.1l-3.1-7.9C44 97 19.9 86.6 11.5 65.3c-8.4-21.3 2-45.4 23.3-53.8l-3.2-8z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="2s"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite"
                        />
                    </path>
                    <path
                        fill="green"
                        d="M42.3 39.6c5.7-4.3 13.9-3.1 18.1 2.7 4.3 5.7 3.1 13.9-2.7 18.1l4.1 5.5c8.8-6.5 10.6-19 4.1-27.7-6.5-8.8-19-10.6-27.7-4.1l4.1 5.5z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="1s"
                            from="0 50 50"
                            to="-360 50 50"
                            repeatCount="indefinite"
                        />
                    </path>
                    <path
                        fill="green"
                        d="M82 35.7C74.1 18 53.4 10.1 35.7 18S10.1 46.6 18 64.3l7.6-3.4c-6-13.5 0-29.3 13.5-35.3s29.3 0 35.3 13.5l7.6-3.4z">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="2s"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite"
                        />
                    </path>
                </svg>
            </div>
        );
    } else {
        return <></>;
    }
}

export function SnackBar(props) {
    const [open, setOpen] = useState(true);
    if (!open) {
        return <></>;
    }
    return (
        <div className="fixed shadow justify-between rounded items-center flex w-fit p-4 bg-grey-600 w-30 bottom-3 right-0 left-0">
            {props.children}
            <button className="ml-5 rounded text-green-600 font-bold" onClick={() => setOpen(false)}>
                X
            </button>
        </div>
    );
}

export function Card(props) {
    const cake = props.cake;

    return (
        <div className="max-w-sm bg-white m-4 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href={`/cake/${cake._id}`}>
                <img className="rounded-t-lg" src={cake.picture} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{cake.name}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                    {cake.stars.map((e) => (
                        <svg
                            key={e}
                            className="w-5 h-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    ))}

                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        {cake.stars.length}.0
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{cake.price}</span>
                    <HrefLink href={`/cake/${cake._id}`} contained>
                        Order Cake
                    </HrefLink>
                </div>
            </div>
        </div>
    );
}

export function Reciept(props) {
    const order = props.order;

    return (
        <Link href={"/cake/" + order.cake}>
            <a>
                <div className="w-100 p-4 bg-white m-4 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className=" mt-2.5 mb-5">
                        <p className="mb-1">Owner name: {order.name}</p>
                        <p className="mb-1">Color: {order.color.color}</p>
                        <p className="mb-1">Size: {order.size.size}</p>
                        <p className="mb-1">Due {moment(order.date).fromNow()}</p>
                        <p className="mb-1"> {"Owner\'s contact"}: {order.phone}</p>
                        <p className="mb-1"> Delivery address: {order.address}</p>
                        <p className="mb-1">Inscription on cake: {order.inscription}</p>
                        <p className="mb-1">ID: {order._id}</p>
                        <p className="mb-1 text-green-500 text-bold text-xl ">Price: {order.price} NGN</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}
