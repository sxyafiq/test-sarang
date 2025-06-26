"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerIfNull = exports.generateCustomerPortalLink = exports.createCheckoutLink = exports.hasSubscription = exports.stripe = void 0;
var stripe_1 = __importDefault(require("stripe"));
var headers_1 = require("next/headers");
var payload_utils_1 = require("../lib/payload-utils");
var get_payload_1 = require("../get-payload");
function handleValidUpgradeMonthly(category) {
    if (category === "venues") {
        return "price_1OdzDHJFw5rSN4LFiA948CVR";
    }
    else if (category === "agents") {
        return "price_1OdzDHJFw5rSN4LFiA948CVR";
    }
    else if (category === "bridals") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "photovideo") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "catering") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "decor") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "henna") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "mua") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "emcees") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "honeymoon") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else if (category === "misc") {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
    else {
        return "price_1OdzD2JFw5rSN4LF1CQjpORa";
    }
}
exports.stripe = new stripe_1.default((_a = process.env.STRIPE_SECRET_KEY) !== null && _a !== void 0 ? _a : "", {
    apiVersion: "2023-10-16",
    typescript: true,
});
function hasSubscription() {
    return __awaiter(this, void 0, void 0, function () {
        var nextCookies, user, payload, subscriptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextCookies = (0, headers_1.cookies)();
                    return [4 /*yield*/, (0, payload_utils_1.getServerSideUser)(nextCookies)];
                case 1:
                    user = (_a.sent()).user;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 2:
                    payload = _a.sent();
                    if (!user) return [3 /*break*/, 8];
                    return [4 /*yield*/, exports.stripe.subscriptions.list({
                            customer: String(user === null || user === void 0 ? void 0 : user.stripe_customer_id),
                        })];
                case 3:
                    subscriptions = _a.sent();
                    if (!(subscriptions.data.length > 0 && user.role === "vendor")) return [3 /*break*/, 5];
                    return [4 /*yield*/, payload.update({
                            collection: "users",
                            data: {
                                role: "supervendor",
                            },
                            where: {
                                id: {
                                    equals: user.id,
                                },
                            },
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!(subscriptions.data.length === 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, payload.update({
                            collection: "users",
                            data: {
                                role: "vendor",
                            },
                            where: {
                                id: {
                                    equals: user.id,
                                },
                            },
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, subscriptions.data.length > 0];
                case 8: return [2 /*return*/, false];
            }
        });
    });
}
exports.hasSubscription = hasSubscription;
function createCheckoutLink(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var nextCookies, user, payload, vendor, checkout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextCookies = (0, headers_1.cookies)();
                    return [4 /*yield*/, (0, payload_utils_1.getServerSideUser)(nextCookies)];
                case 1:
                    user = (_a.sent()).user;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 2:
                    payload = _a.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "vendors",
                            where: {
                                venduserid: { equals: userId },
                            },
                        })];
                case 3:
                    vendor = _a.sent();
                    if (!(user === null || user === void 0 ? void 0 : user.stripe_customer_id)) return [3 /*break*/, 5];
                    return [4 /*yield*/, exports.stripe.checkout.sessions.create({
                            success_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/status"),
                            cancel_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/status"),
                            payment_method_types: ["card"],
                            customer: user.stripe_customer_id,
                            line_items: [
                                {
                                    price: handleValidUpgradeMonthly(vendor.docs[0].category),
                                    quantity: 1,
                                },
                            ],
                            mode: "subscription",
                        })];
                case 4:
                    checkout = _a.sent();
                    return [2 /*return*/, checkout.url];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createCheckoutLink = createCheckoutLink;
function generateCustomerPortalLink(customerId) {
    return __awaiter(this, void 0, void 0, function () {
        var portalSession, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exports.stripe.billingPortal.sessions.create({
                            customer: customerId,
                            return_url: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/status"),
                        })];
                case 1:
                    portalSession = _a.sent();
                    console.log();
                    return [2 /*return*/, portalSession.url];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, undefined];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.generateCustomerPortalLink = generateCustomerPortalLink;
function createCustomerIfNull() {
    return __awaiter(this, void 0, void 0, function () {
        var nextCookies, user, payload, customer, validUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextCookies = (0, headers_1.cookies)();
                    return [4 /*yield*/, (0, payload_utils_1.getServerSideUser)(nextCookies)];
                case 1:
                    user = (_a.sent()).user;
                    return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 2:
                    payload = _a.sent();
                    if (!!(user === null || user === void 0 ? void 0 : user.stripe_customer_id)) return [3 /*break*/, 6];
                    return [4 /*yield*/, exports.stripe.customers.create({
                            email: user === null || user === void 0 ? void 0 : user.email,
                        })];
                case 3:
                    customer = _a.sent();
                    return [4 /*yield*/, payload.update({
                            collection: "users",
                            where: {
                                id: { equals: user === null || user === void 0 ? void 0 : user.id },
                            },
                            data: {
                                stripe_customer_id: customer.id,
                            },
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "users",
                            where: {
                                email: { equals: user === null || user === void 0 ? void 0 : user.email },
                            },
                        })];
                case 5:
                    validUser = _a.sent();
                    return [2 /*return*/, validUser === null || validUser === void 0 ? void 0 : validUser.docs[0].stripe_customer_id];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.createCustomerIfNull = createCustomerIfNull;
