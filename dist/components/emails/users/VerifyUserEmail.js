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
exports.VerifyUserEmailHtml = exports.VerifyUserEmail = void 0;
var components_1 = require("@react-email/components");
var React = __importStar(require("react"));
var VerifyUserEmail = function (_a) {
    var name = _a.name, href = _a.href;
    return (React.createElement(components_1.Html, null,
        React.createElement(components_1.Head, null),
        React.createElement(components_1.Preview, null, "Verify your account with Sarang Sayang!"),
        React.createElement(components_1.Body, { style: main },
            React.createElement(components_1.Container, { style: container },
                React.createElement(components_1.Section, { style: box },
                    React.createElement(components_1.Img, { src: "https://www.sarangsayang.com/logopng.png", width: "60", height: "60", alt: "SarangSayang" }),
                    React.createElement(components_1.Hr, { style: hr }),
                    React.createElement(components_1.Text, { style: paragraph },
                        "Hi ",
                        name,
                        "!"),
                    React.createElement(components_1.Text, { style: paragraph }, "Welcome to Sarang Sayang, Singapore's Largest Malay Wedding Directory! We know you're excited, but before you join our Sarang Sayang family, we'll have to verify your account so go on and click the link below and let's get your started."),
                    React.createElement(components_1.Button, { style: button, href: href }, "Verify Your Account"),
                    React.createElement(components_1.Hr, { style: hr }),
                    React.createElement(components_1.Text, { style: paragraph },
                        "Love, ",
                        React.createElement("br", null),
                        " The Sarang Sayang team"))))));
};
exports.VerifyUserEmail = VerifyUserEmail;
exports.default = exports.VerifyUserEmail;
var VerifyUserEmailHtml = function (props) {
    return (0, components_1.render)(React.createElement(exports.VerifyUserEmail, __assign({}, props)), { pretty: true });
};
exports.VerifyUserEmailHtml = VerifyUserEmailHtml;
var main = {
    backgroundColor: "#C8E9F3",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
var container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};
var box = {
    padding: "0 48px",
};
var hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};
var paragraph = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left",
};
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
