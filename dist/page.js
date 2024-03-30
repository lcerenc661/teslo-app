"use strict";
exports.__esModule = true;
// https://tailwindcomponents.com/component/hoverable-table
var components_1 = require("@/components");
var link_1 = require("next/link");
var io5_1 = require("react-icons/io5");
function Orders() {
    return (React.createElement(React.Fragment, null,
        React.createElement(components_1.Title, { title: "Orders" }),
        React.createElement("div", { className: "mb-10" },
            React.createElement("table", { className: "min-w-full" },
                React.createElement("thead", { className: "bg-gray-200 border-b" },
                    React.createElement("tr", null,
                        React.createElement("th", { scope: "col", className: "text-sm font-medium text-gray-900 px-6 py-4 text-left" }, "#ID"),
                        React.createElement("th", { scope: "col", className: "text-sm font-medium text-gray-900 px-6 py-4 text-left" }, "Nombre completo"),
                        React.createElement("th", { scope: "col", className: "text-sm font-medium text-gray-900 px-6 py-4 text-left" }, "Estado"),
                        React.createElement("th", { scope: "col", className: "text-sm font-medium text-gray-900 px-6 py-4 text-left" }, "Opciones"))),
                React.createElement("tbody", null,
                    React.createElement("tr", { className: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" },
                        React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, "1"),
                        React.createElement("td", { className: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, "Mark"),
                        React.createElement("td", { className: "flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap" },
                            React.createElement(io5_1.IoCardOutline, { className: "text-green-800" }),
                            React.createElement("span", { className: 'mx-2 text-green-800' }, "Pagada")),
                        React.createElement("td", { className: "text-sm text-gray-900 font-light px-6 " },
                            React.createElement(link_1["default"], { href: "/orders/123", className: "hover:underline" }, "Ver orden"))),
                    React.createElement("tr", { className: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" },
                        React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, "1"),
                        React.createElement("td", { className: "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" }, "Mark"),
                        React.createElement("td", { className: "flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap" },
                            React.createElement(io5_1.IoCardOutline, { className: "text-red-800" }),
                            React.createElement("span", { className: 'mx-2 text-red-800' }, "No Pagada")),
                        React.createElement("td", { className: "text-sm text-gray-900 font-light px-6 " },
                            React.createElement(link_1["default"], { href: "/orders/123", className: "hover:underline" }, "Ver orden"))))))));
}
exports["default"] = Orders;
