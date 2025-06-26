"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUpdateFromUserEmail = void 0;
var components_1 = require("@react-email/components");
var React = __importStar(require("react"));
var MessageUpdateFromUserEmail = function (_a) {
    var vendorName = _a.vendorName, userName = _a.userName;
    return (React.createElement(components_1.Html, null,
        React.createElement(components_1.Head, null),
        React.createElement(components_1.Preview, null,
            "Reply ",
            userName,
            " on Sarang Sayang now!"),
        React.createElement(components_1.Body, { style: main },
            React.createElement(components_1.Container, { style: container },
                React.createElement(components_1.Section, { style: box },
                    React.createElement(components_1.Img, { src: "https://www.sarangsayang.com/logopng.png", width: "60", height: "60", alt: "SarangSayang" }),
                    React.createElement(components_1.Hr, { style: hr }),
                    React.createElement(components_1.Section, { style: { paddingBottom: "20px" } },
                        React.createElement(components_1.Text, { style: paragraph },
                            "Hi ",
                            vendorName,
                            "!"),
                        React.createElement(components_1.Text, { style: heading },
                            "You got a message from ",
                            userName,
                            ", here's what they said!")),
                    React.createElement(components_1.Section, { style: { paddingBottom: "20px" } },
                        React.createElement(components_1.Button, { style: button, href: "https://www.sarangsayang.com/" }, "View Message on Sarang Sayang")),
                    React.createElement(components_1.Hr, { style: hr }),
                    React.createElement(components_1.Text, { style: footer }, "This is an automated e-mail. Please use our chat function on Sarang Sayang to send messages directly to users."))))));
};
exports.MessageUpdateFromUserEmail = MessageUpdateFromUserEmail;
exports.MessageUpdateFromUserEmail.PreviewProps = {
    userName: "Hairi",
    vendorName: "Fatimah Mokhsin",
};
exports.default = exports.MessageUpdateFromUserEmail;
var main = {
    backgroundColor: "#C8E9F3",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
var box = {
    padding: "0 48px",
};
var container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};
var userImage = {
    margin: "0 auto",
    marginBottom: "16px",
    borderRadius: "50%",
};
var heading = {
    fontSize: "20px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
};
var paragraph = {
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
};
var review = __assign(__assign({}, paragraph), { padding: "24px", backgroundColor: "#f2f3f3", borderRadius: "4px" });
var button = {
    backgroundColor: "rgb(59 130 246)",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "100%",
    padding: "10px",
};
var link = __assign(__assign({}, paragraph), { color: "#ff5a5f", display: "block" });
var reportLink = {
    fontSize: "14px",
    color: "#9ca299",
    textDecoration: "underline",
};
var hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};
var footer = {
    color: "#9ca299",
    fontSize: "14px",
    marginBottom: "10px",
};
