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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var zod_1 = require("zod");
var query_validator_1 = require("../lib/validators/query-validator");
var get_payload_1 = require("../get-payload");
var auth_router_1 = require("./auth-router");
var trpc_1 = require("./trpc");
function formatWithLeadingZero(num) {
    return num < 10 ? "0" + num : num;
}
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    // getCategorizedVendors: publicProcedure.query(async () => {
    //   const payload = await getPayloadClient();
    //   var results = [];
    //   for (let x = 0; x < VENDOR_CATEGORIES.length; x++) {
    //     const { docs: vendorInCat } = await payload.find({
    //       collection: "vendors",
    //       pagination: false,
    //       sort: "",
    //     });
    //   }
    // }),
    getPackageTable: trpc_1.publicProcedure
        .input(zod_1.z.object({
        packageId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, PackageList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "ExPackages",
                                pagination: false,
                                where: {
                                    vendor: { equals: input.packageId },
                                },
                                sort: "order",
                            })];
                    case 2:
                        PackageList = (_b.sent()).docs;
                        return [2 /*return*/, PackageList];
                }
            });
        });
    }),
    getAllCoupons: trpc_1.publicProcedure.query(function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, AllCoupons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _a.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "coupons",
                            pagination: false,
                            sort: "expiry",
                        })];
                case 2:
                    AllCoupons = (_a.sent()).docs;
                    return [2 /*return*/, AllCoupons];
            }
        });
    }); }),
    transition: trpc_1.publicProcedure.mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, AllLikes, x, currentUser, UserLikes, y, newVendor, z_1, comparison;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        console.log("Getting all likes..");
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                pagination: false,
                            })];
                    case 2:
                        AllLikes = (_b.sent()).docs;
                        console.log("Found all likes");
                        x = 0;
                        _b.label = 3;
                    case 3:
                        if (!(x < AllLikes.length)) return [3 /*break*/, 11];
                        currentUser = AllLikes[x].user;
                        console.log("Working on " + currentUser.email);
                        console.log("Getting all likes by " + currentUser.email);
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                where: {
                                    user: { equals: currentUser.id },
                                },
                                pagination: false,
                            })];
                    case 4:
                        UserLikes = (_b.sent()).docs;
                        console.log("Found all likes by " + currentUser.email);
                        y = 0;
                        _b.label = 5;
                    case 5:
                        if (!(y < UserLikes.length)) return [3 /*break*/, 10];
                        newVendor = UserLikes[y].vendor;
                        console.log("Working on likes by " + currentUser.email + " and " + newVendor.name);
                        z_1 = y + 1;
                        _b.label = 6;
                    case 6:
                        if (!(z_1 < UserLikes.length)) return [3 /*break*/, 9];
                        comparison = UserLikes[z_1].vendor;
                        if (!(newVendor.id === comparison.id)) return [3 /*break*/, 8];
                        console.log("Found Similarities with " +
                            newVendor.name +
                            " and " +
                            comparison.name);
                        console.log("newVendor.id: " +
                            newVendor.id +
                            ". comparison.id: " +
                            comparison.id +
                            ".");
                        return [4 /*yield*/, payload.delete({
                                collection: "likes",
                                where: {
                                    user: { equals: currentUser.id },
                                    and: [{ vendor: { equals: comparison.id } }],
                                },
                            })];
                    case 7:
                        _b.sent();
                        console.log("Duplicate deleted.");
                        _b.label = 8;
                    case 8:
                        z_1++;
                        return [3 /*break*/, 6];
                    case 9:
                        y++;
                        return [3 /*break*/, 5];
                    case 10:
                        x++;
                        return [3 /*break*/, 3];
                    case 11: return [2 /*return*/];
                }
            });
        });
    }),
    checkChat: trpc_1.publicProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string(), vendorId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, chat;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    user: { equals: input.userId },
                                    and: [{ vendor: { equals: input.vendorId } }],
                                },
                            })];
                    case 2:
                        chat = (_b.sent()).docs;
                        return [2 /*return*/, chat];
                }
            });
        });
    }),
    getAllVendorEnq: trpc_1.publicProcedure.query(function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, results, totalSSC, totalSSE, allVendors, i, totalC, totalE, queries, q, msg, breakCondition, m;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _a.sent();
                    results = [];
                    totalSSC = 0;
                    totalSSE = 0;
                    return [4 /*yield*/, payload.find({
                            collection: "vendors",
                            pagination: false,
                        })];
                case 2:
                    allVendors = (_a.sent()).docs;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < allVendors.length)) return [3 /*break*/, 10];
                    totalC = 0;
                    totalE = 0;
                    return [4 /*yield*/, payload.find({
                            collection: "chats",
                            where: {
                                vendor: { equals: allVendors[i].id },
                            },
                            pagination: false,
                        })];
                case 4:
                    queries = (_a.sent()).docs;
                    console.log("We are on: " + allVendors[i].name);
                    if (!(queries.length > 0)) return [3 /*break*/, 8];
                    console.log("Found Queries");
                    q = 0;
                    _a.label = 5;
                case 5:
                    if (!(q < queries.length)) return [3 /*break*/, 8];
                    totalC++;
                    return [4 /*yield*/, payload.find({
                            collection: "message",
                            where: {
                                chat: { equals: queries[q].id },
                            },
                            pagination: false,
                        })];
                case 6:
                    msg = (_a.sent()).docs;
                    if (msg.length > 0) {
                        console.log("Found Messages");
                        breakCondition = false;
                        for (m = 0; m < msg.length; m++) {
                            if (msg[m].from == "user" && !breakCondition) {
                                console.log("Found Message from User");
                                totalE++;
                                breakCondition = true;
                            }
                            console.log("Broke Condition");
                        }
                    }
                    _a.label = 7;
                case 7:
                    q++;
                    return [3 /*break*/, 5];
                case 8:
                    totalSSC = totalSSC + totalC;
                    totalSSE = totalSSE + totalE;
                    results.push({
                        vendor: allVendors[i].name,
                        cat: allVendors[i].category,
                        chat: totalC,
                        queries: totalE,
                    });
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 3];
                case 10:
                    results.push({
                        vendor: "Sarang Sayang",
                        cat: "The Website Itself duh",
                        chat: totalSSC,
                        queries: totalSSE,
                    });
                    return [2 /*return*/, results];
            }
        });
    }); }),
    removeItemsFromPlan: trpc_1.publicProcedure
        .input(zod_1.z.object({ planId: zod_1.z.string(), version: zod_1.z.number() }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!(input.version === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.delete({
                                collection: "budget",
                                where: {
                                    plan: { equals: input.planId },
                                    and: [{ ver: { exists: false } }],
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, payload.delete({
                            collection: "budget",
                            where: {
                                plan: { equals: input.planId },
                                and: [{ ver: { equals: input.version } }],
                            },
                        })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }),
    addNewBudgetVersion: trpc_1.publicProcedure
        .input(zod_1.z.object({ planId: zod_1.z.string() }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, plan;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "plans",
                                where: { id: { equals: input.planId } },
                                pagination: false,
                            })];
                    case 2:
                        plan = (_b.sent()).docs;
                        if (!(!plan[0].totalVer || plan[0].totalVer === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: { id: { equals: input.planId } },
                                data: { totalVer: 2 },
                            })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, payload.update({
                            collection: "plans",
                            where: { id: { equals: input.planId } },
                            data: { totalVer: plan[0].totalVer + 1 },
                        })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }),
    getSimilarVendors: trpc_1.publicProcedure
        .input(zod_1.z.object({ vendorId: zod_1.z.string(), category: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, rank, allVendors, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = [];
                        rank = -1;
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    category: { equals: input.category },
                                    and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
                                },
                                pagination: false,
                            })];
                    case 2:
                        allVendors = (_b.sent()).docs;
                        for (i = 0; i < allVendors.length; i++) {
                            if (allVendors[i].id === input.vendorId) {
                                rank = i;
                                if (rank === 0) {
                                    results.push(allVendors[1]);
                                    results.push(allVendors[2]);
                                    results.push(allVendors[3]);
                                    results.push(allVendors[4]);
                                }
                                else if (rank === 1) {
                                    results.push(allVendors[0]);
                                    results.push(allVendors[2]);
                                    results.push(allVendors[3]);
                                    results.push(allVendors[4]);
                                }
                                else {
                                    results.push(allVendors[rank - 2]);
                                    results.push(allVendors[rank - 1]);
                                    results.push(allVendors[rank + 1]);
                                    results.push(allVendors[rank + 2]);
                                }
                            }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    }),
    getAllVendorLikes: trpc_1.publicProcedure
        .input(zod_1.z.object({ category: zod_1.z.string().optional() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, allVendors, i, enquiriesforthem, messages, replies, x, messagesfromuser, repliesfromvendor, newData, allVendors, i, enquiriesforthem, messages, replies, x, messagesfromuser, repliesfromvendor, newData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = [];
                        if (!input.category) return [3 /*break*/, 12];
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: { category: { equals: input.category } },
                                sort: "-clicks",
                                limit: 10,
                            })];
                    case 2:
                        allVendors = (_b.sent()).docs;
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < allVendors.length)) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: { vendor: { equals: allVendors[i].id } },
                            })];
                    case 4:
                        enquiriesforthem = (_b.sent()).docs;
                        messages = 0;
                        replies = 0;
                        x = 0;
                        _b.label = 5;
                    case 5:
                        if (!(x < enquiriesforthem.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: { equals: enquiriesforthem[x].id },
                                    and: [
                                        {
                                            from: { equals: "user" },
                                        },
                                    ],
                                },
                            })];
                    case 6:
                        messagesfromuser = (_b.sent()).docs;
                        messages = messages + messagesfromuser.length;
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: { equals: enquiriesforthem[x].id },
                                    and: [
                                        {
                                            from: { equals: "vendor" },
                                        },
                                    ],
                                    message: {
                                        not_equals: "This vendor has not claimed their profile, please expect a delay in their response.",
                                    },
                                },
                            })];
                    case 7:
                        repliesfromvendor = (_b.sent()).docs;
                        replies = replies + repliesfromvendor.length;
                        _b.label = 8;
                    case 8:
                        x++;
                        return [3 /*break*/, 5];
                    case 9:
                        newData = __assign(__assign({}, allVendors[i]), { enquiries: messages, replies: replies });
                        results.push(newData);
                        _b.label = 10;
                    case 10:
                        i++;
                        return [3 /*break*/, 3];
                    case 11: return [3 /*break*/, 22];
                    case 12: return [4 /*yield*/, payload.find({
                            collection: "vendors",
                            sort: "-likes",
                            limit: 10,
                        })];
                    case 13:
                        allVendors = (_b.sent()).docs;
                        i = 0;
                        _b.label = 14;
                    case 14:
                        if (!(i < allVendors.length)) return [3 /*break*/, 22];
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: { vendor: { equals: allVendors[i].id } },
                            })];
                    case 15:
                        enquiriesforthem = (_b.sent()).docs;
                        messages = 0;
                        replies = 0;
                        x = 0;
                        _b.label = 16;
                    case 16:
                        if (!(x < enquiriesforthem.length)) return [3 /*break*/, 20];
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: { equals: enquiriesforthem[x].id },
                                    and: [
                                        {
                                            from: { equals: "user" },
                                        },
                                    ],
                                },
                            })];
                    case 17:
                        messagesfromuser = (_b.sent()).docs;
                        messages = messages + messagesfromuser.length;
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: { equals: enquiriesforthem[x].id },
                                    and: [
                                        {
                                            from: { equals: "vendor" },
                                        },
                                    ],
                                    message: {
                                        not_equals: "This vendor has not claimed their profile, please expect a delay in their response.",
                                    },
                                },
                            })];
                    case 18:
                        repliesfromvendor = (_b.sent()).docs;
                        replies = replies + repliesfromvendor.length;
                        _b.label = 19;
                    case 19:
                        x++;
                        return [3 /*break*/, 16];
                    case 20:
                        newData = __assign(__assign({}, allVendors[i]), { enquiries: messages, replies: replies });
                        results.push(newData);
                        _b.label = 21;
                    case 21:
                        i++;
                        return [3 /*break*/, 14];
                    case 22: return [2 /*return*/, results];
                }
            });
        });
    }),
    getClicks: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, vendor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    id: { equals: input.vendorId },
                                },
                                limit: 1,
                            })];
                    case 2:
                        vendor = _b.sent();
                        if (vendor.docs[0].clicks) {
                            return [2 /*return*/, vendor.docs[0].clicks];
                        }
                        else {
                            return [2 /*return*/, 0];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }),
    addClick: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var clicks, payload, vendor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        clicks = 0;
                        return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    id: { equals: input.vendorId },
                                },
                                limit: 1,
                            })];
                    case 2:
                        vendor = _b.sent();
                        if (vendor.docs[0].clicks) {
                            clicks = vendor.docs[0].clicks + 1;
                        }
                        else {
                            clicks = 1;
                        }
                        return [4 /*yield*/, payload.update({
                                collection: "vendors",
                                where: {
                                    id: {
                                        equals: input.vendorId,
                                    },
                                },
                                data: {
                                    clicks: clicks,
                                },
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    updateVendorFirstLog: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.update({
                                collection: "users",
                                where: {
                                    email: {
                                        equals: input.email,
                                    },
                                },
                                data: {
                                    vendorFirstLog: false,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    updateUserFirstLog: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.update({
                                collection: "users",
                                where: {
                                    email: {
                                        equals: input.email,
                                    },
                                },
                                data: {
                                    userFirstLog: false,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    sendWelcomeUserEmail: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "users",
                                where: {
                                    email: {
                                        equals: input.email,
                                    },
                                },
                            })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }),
    getMiscVendors: trpc_1.publicProcedure
        .input(zod_1.z.object({
        category: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, heelsid, misclist, i, results2, pakandamid, misclist, i, results2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "misc",
                                where: {
                                    id: { equals: "65b7aee5c17286ca4dd3e2ed" },
                                },
                                pagination: false,
                            })];
                    case 2:
                        results = _b.sent();
                        if (!(input.category === "berkat")) return [3 /*break*/, 3];
                        return [2 /*return*/, results.docs[0].berkat];
                    case 3:
                        if (!(input.category === "decor")) return [3 /*break*/, 4];
                        return [2 /*return*/, results.docs[0].decor];
                    case 4:
                        if (!(input.category === "agent")) return [3 /*break*/, 5];
                        return [2 /*return*/, results.docs[0].agent];
                    case 5:
                        if (!(input.category === "dulang")) return [3 /*break*/, 6];
                        return [2 /*return*/, results.docs[0].dulang];
                    case 6:
                        if (!(input.category === "liveStation")) return [3 /*break*/, 7];
                        return [2 /*return*/, results.docs[0].liveStation];
                    case 7:
                        if (!(input.category === "cake")) return [3 /*break*/, 8];
                        return [2 /*return*/, results.docs[0].cake];
                    case 8:
                        if (!(input.category === "catering")) return [3 /*break*/, 9];
                        return [2 /*return*/, results.docs[0].catering];
                    case 9:
                        if (!(input.category === "pakandam")) return [3 /*break*/, 10];
                        return [2 /*return*/, results.docs[0].pakandam];
                    case 10:
                        if (!(input.category === "henna")) return [3 /*break*/, 11];
                        return [2 /*return*/, results.docs[0].henna];
                    case 11:
                        if (!(input.category === "stationery")) return [3 /*break*/, 12];
                        return [2 /*return*/, results.docs[0].stationery];
                    case 12:
                        if (!(input.category === "heels")) return [3 /*break*/, 13];
                        return [2 /*return*/, results.docs[0].heels];
                    case 13:
                        if (!(input.category === "bridal")) return [3 /*break*/, 15];
                        heelsid = [];
                        misclist = results.docs[0].heels;
                        for (i = 0; i < misclist.length; i++) {
                            heelsid.push(misclist[i].id);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    id: { not_in: heelsid },
                                    category: { equals: "bridals" },
                                    and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
                                },
                                pagination: false,
                            })];
                    case 14:
                        results2 = _b.sent();
                        return [2 /*return*/, results2.docs];
                    case 15:
                        if (!(input.category === "mua")) return [3 /*break*/, 17];
                        pakandamid = [];
                        misclist = results.docs[0].pakandam;
                        for (i = 0; i < misclist.length; i++) {
                            pakandamid.push(misclist[i].id);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    id: { not_in: pakandamid },
                                    category: { equals: "mua" },
                                    and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
                                },
                                pagination: false,
                            })];
                    case 16:
                        results2 = _b.sent();
                        return [2 /*return*/, results2.docs];
                    case 17: return [2 /*return*/];
                }
            });
        });
    }),
    deletePlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    removeUser2: trpc_1.publicProcedure
        .input(zod_1.z.object({
        user1: zod_1.z.string(),
        planId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.planId },
                                },
                                data: {
                                    user: [input.user1],
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    addUser2: trpc_1.publicProcedure
        .input(zod_1.z.object({
        user1: zod_1.z.string(),
        user2: zod_1.z.string(),
        planId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.planId },
                                },
                                data: {
                                    user: [input.user1, input.user2],
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    checkUserExist: trpc_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "users",
                                where: {
                                    email: {
                                        equals: input.email,
                                    },
                                },
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    userRead: trpc_1.publicProcedure
        .input(zod_1.z.object({ chatId: zod_1.z.string() }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, allmsg, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: input.chatId,
                                    },
                                },
                            })];
                    case 2:
                        allmsg = _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < allmsg.docs.length)) return [3 /*break*/, 6];
                        if (!(allmsg.docs[i].read === false && allmsg.docs[i].from === "vendor")) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "message",
                                where: {
                                    id: {
                                        equals: allmsg.docs[i].id,
                                    },
                                },
                                data: {
                                    read: true,
                                },
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }),
    userGetAllUnread: trpc_1.publicProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, chat, i, allmsg, i_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = 0;
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                },
                            })];
                    case 2:
                        chat = _b.sent();
                        if (!(chat.docs.length > 0)) return [3 /*break*/, 6];
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < chat.docs.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: chat.docs[i].id,
                                    },
                                },
                            })];
                    case 4:
                        allmsg = _b.sent();
                        for (i_1 = 0; i_1 < allmsg.docs.length; i_1++) {
                            if (allmsg.docs[i_1].read === false &&
                                allmsg.docs[i_1].from === "vendor") {
                                results++;
                            }
                        }
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    }),
    userGetUnread: trpc_1.publicProcedure
        .input(zod_1.z.object({ chatId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, allmsg, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = 0;
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: input.chatId,
                                    },
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 2:
                        allmsg = _b.sent();
                        for (i = 0; i < allmsg.docs.length; i++) {
                            if (allmsg.docs[i].read === false && allmsg.docs[i].from === "vendor") {
                                results++;
                            }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    }),
    vendorRead: trpc_1.publicProcedure
        .input(zod_1.z.object({ chatId: zod_1.z.string() }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, allmsg, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: input.chatId,
                                    },
                                },
                            })];
                    case 2:
                        allmsg = _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < allmsg.docs.length)) return [3 /*break*/, 6];
                        if (!(allmsg.docs[i].read === false && allmsg.docs[i].from === "user")) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "message",
                                where: {
                                    id: {
                                        equals: allmsg.docs[i].id,
                                    },
                                },
                                data: {
                                    read: true,
                                },
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }),
    getAllUnread: trpc_1.publicProcedure
        .input(zod_1.z.object({ vendorId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, chat, i, allmsg, i_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = 0;
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                            })];
                    case 2:
                        chat = _b.sent();
                        if (!(chat.docs.length > 0)) return [3 /*break*/, 6];
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < chat.docs.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: chat.docs[i].id,
                                    },
                                },
                            })];
                    case 4:
                        allmsg = _b.sent();
                        for (i_2 = 0; i_2 < allmsg.docs.length; i_2++) {
                            if (allmsg.docs[i_2].read === false &&
                                allmsg.docs[i_2].from === "user") {
                                results++;
                            }
                        }
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    }),
    getUnread: trpc_1.publicProcedure
        .input(zod_1.z.object({ chatId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, allmsg, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = 0;
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: input.chatId,
                                    },
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 2:
                        allmsg = _b.sent();
                        for (i = 0; i < allmsg.docs.length; i++) {
                            if (allmsg.docs[i].read === false && allmsg.docs[i].from === "user") {
                                results++;
                            }
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    }),
    getMessages: trpc_1.publicProcedure
        .input(zod_1.z.object({
        chatId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "message",
                                where: {
                                    chat: {
                                        equals: input.chatId,
                                    },
                                },
                                pagination: false,
                                sort: "createdAt",
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    addMessage: trpc_1.publicProcedure
        .input(zod_1.z.object({
        chatId: zod_1.z.string(),
        from: zod_1.z.string(),
        message: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: "message",
                                data: {
                                    chat: input.chatId,
                                    from: input.from,
                                    message: input.message,
                                    read: false,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    createChat: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
        vendorId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, doesChatExist, getChat, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                            })];
                    case 2:
                        doesChatExist = _b.sent();
                        if (!(doesChatExist.docs.length === 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, payload.create({
                                collection: "chats",
                                data: {
                                    user: input.userId,
                                    vendor: input.vendorId,
                                },
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                            })];
                    case 4:
                        getChat = _b.sent();
                        user = getChat.docs[0].user;
                        return [4 /*yield*/, payload.create({
                                collection: "leads",
                                data: {
                                    name: user.name,
                                    email: user.email,
                                    contact: "-",
                                    message: "-",
                                    source: "Sarang Sayang",
                                    status: "not contacted",
                                    priority: "high",
                                    remarks: "-",
                                    vendor: input.vendorId,
                                    chat: getChat.docs[0].id,
                                },
                            })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }),
    getAllChats: trpc_1.publicProcedure
        .input(zod_1.z.object({ userId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendorChats: trpc_1.publicProcedure
        .input(zod_1.z.object({ vendorId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getChat: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "chats",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    removeItinerary: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "itinerary",
                                id: input.id,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    editItinerary: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        time: zod_1.z.number().optional(),
        date: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        event: zod_1.z.string().optional(),
        involved: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.time) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "itinerary",
                                where: { id: { equals: input.id } },
                                data: {
                                    time: input.time,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        if (!input.date) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "itinerary",
                                where: { id: { equals: input.id } },
                                data: {
                                    date: input.date,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 5:
                        if (!input.location) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "itinerary",
                                where: { id: { equals: input.id } },
                                data: {
                                    location: input.location,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 7:
                        if (!input.event) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "itinerary",
                                where: { id: { equals: input.id } },
                                data: {
                                    event: input.event,
                                },
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        if (!input.involved) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: "itinerary",
                                where: { id: { equals: input.id } },
                                data: {
                                    involved: input.involved,
                                },
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        if (!input.details) return [3 /*break*/, 13];
                        return [4 /*yield*/, payload.update({
                                collection: "itinerary",
                                where: { id: { equals: input.id } },
                                data: {
                                    details: input.details,
                                },
                            })];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    }),
    getItineraryByDate: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
        date: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "itinerary",
                                where: { plan: { equals: input.planId }, date: { equals: input.date } },
                                pagination: false,
                                sort: "time",
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getItinerary: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, dates, i, i_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "itinerary",
                                where: { plan: { equals: input.planId } },
                                pagination: false,
                                sort: "date",
                            })];
                    case 2:
                        results = _b.sent();
                        dates = [];
                        for (i = 0; i < results.docs.length; i++) {
                            if (dates.length === 0) {
                                dates.push(results.docs[i].date);
                            }
                            else if (dates.length > 0) {
                                for (i_3 = 0; i_3 < dates.length; i_3++) {
                                    if (dates[i_3] === dates[i_3 + 1]) {
                                        dates.splice(i_3 + 1, 1);
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, dates];
                }
            });
        });
    }),
    addItinerary: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
        date: zod_1.z.string(),
        time: zod_1.z.number(),
        location: zod_1.z.string().optional(),
        event: zod_1.z.string().optional(),
        involved: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: "itinerary",
                                data: {
                                    plan: input.planId,
                                    date: input.date,
                                    time: input.time,
                                    location: input.location || "-",
                                    event: input.event || "-",
                                    involved: input.involved || "-",
                                    details: input.details || "-",
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    removeGuest: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "guests",
                                id: input.id,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    editGuests: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        group: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        pax: zod_1.z.number().optional(),
        attendance: zod_1.z.string().optional(),
        sent: zod_1.z.boolean().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.group) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "guests",
                                where: { id: { equals: input.id } },
                                data: {
                                    group: input.group,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 3:
                        if (!input.name) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "guests",
                                where: { id: { equals: input.id } },
                                data: {
                                    name: input.name,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 5:
                        if (!input.pax) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "guests",
                                where: { id: { equals: input.id } },
                                data: {
                                    pax: input.pax,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!input.attendance) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "guests",
                                where: { id: { equals: input.id } },
                                data: {
                                    attendance: input.attendance,
                                },
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        if (!(input.sent === true || input.sent === false)) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: "guests",
                                where: { id: { equals: input.id } },
                                data: {
                                    sent: input.sent,
                                },
                            })];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    }),
    getGuests: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "guests",
                                where: { plan: { equals: input.planId } },
                                pagination: false,
                                sort: "createdAt",
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    addGuest: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
        group: zod_1.z.string(),
        name: zod_1.z.string(),
        pax: zod_1.z.number(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: "guests",
                                data: {
                                    plan: input.planId,
                                    group: input.group,
                                    name: input.name,
                                    pax: input.pax,
                                    attendance: "Waiting Confirmation",
                                    sent: false,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    removeBudget: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "budget",
                                id: input.id,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    editBudget: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        for: zod_1.z.string().optional(),
        cat: zod_1.z.string().optional(),
        details: zod_1.z.string().optional(),
        plannedCost: zod_1.z.number().optional(),
        actualCost: zod_1.z.number().optional(),
        amountPaid: zod_1.z.number().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.for) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "budget",
                                where: { id: { equals: input.id } },
                                data: {
                                    for: input.for,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 3:
                        if (!input.cat) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "budget",
                                where: { id: { equals: input.id } },
                                data: {
                                    cat: input.cat,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 5:
                        if (!input.details) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "budget",
                                where: { id: { equals: input.id } },
                                data: {
                                    details: input.details,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 7:
                        if (!input.plannedCost) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "budget",
                                where: { id: { equals: input.id } },
                                data: {
                                    plannedCost: input.plannedCost,
                                },
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        if (!input.actualCost) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: "budget",
                                where: { id: { equals: input.id } },
                                data: {
                                    actualCost: input.actualCost,
                                },
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        if (!input.amountPaid) return [3 /*break*/, 13];
                        return [4 /*yield*/, payload.update({
                                collection: "budget",
                                where: { id: { equals: input.id } },
                                data: {
                                    amountPaid: input.amountPaid,
                                },
                            })];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    }),
    addBudget: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
        for: zod_1.z.string(),
        cat: zod_1.z.string(),
        details: zod_1.z.string().optional(),
        plannedCost: zod_1.z.number().optional(),
        actualCost: zod_1.z.number().optional(),
        ver: zod_1.z.number().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, details, plannedCost, actualCost;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        details = input.details;
                        plannedCost = input.plannedCost;
                        actualCost = input.actualCost;
                        if (!input.details) {
                            details = "-";
                        }
                        if (!input.plannedCost) {
                            plannedCost = 0;
                        }
                        if (!input.actualCost) {
                            actualCost = 0;
                        }
                        if (!!input.ver) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.create({
                                collection: "budget",
                                data: {
                                    plan: input.planId,
                                    for: input.for,
                                    cat: input.cat,
                                    details: details || "-",
                                    plannedCost: plannedCost,
                                    actualCost: actualCost,
                                    amountPaid: 0,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, payload.create({
                            collection: "budget",
                            data: {
                                plan: input.planId,
                                for: input.for,
                                cat: input.cat,
                                details: details || "-",
                                plannedCost: plannedCost,
                                actualCost: actualCost,
                                amountPaid: 0,
                                ver: input.ver,
                            },
                        })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }),
    getBudget: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
        version: zod_1.z.number().optional(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!(input.version && input.version === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.find({
                                collection: "budget",
                                where: {
                                    plan: { equals: input.planId },
                                    and: [{ ver: { exists: false } }],
                                },
                                pagination: false,
                                sort: "-plannedCost",
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, payload.find({
                            collection: "budget",
                            where: {
                                plan: { equals: input.planId },
                                and: [{ ver: { equals: input.version } }],
                            },
                            pagination: false,
                            sort: "-plannedCost",
                        })];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    removeTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({
        todoId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "todos",
                                id: input.todoId,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    editTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        todo: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        check: zod_1.z.boolean().optional(),
        remarks: zod_1.z.string().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.todo) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "todos",
                                where: { id: { equals: input.id } },
                                data: {
                                    todo: input.todo,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!input.date) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "todos",
                                where: { id: { equals: input.id } },
                                data: {
                                    date: input.date,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(input.check === true || input.check === false)) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "todos",
                                where: { id: { equals: input.id } },
                                data: {
                                    done: input.check,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        if (!input.remarks) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "todos",
                                where: { id: { equals: input.id } },
                                data: {
                                    remarks: input.remarks,
                                },
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    }),
    getTodoByTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({
        todo: zod_1.z.string(),
        planId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "todos",
                                where: { todo: { equals: input.todo }, plan: { equals: input.planId } },
                                pagination: false,
                                sort: "date",
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "todos",
                                where: { plan: { equals: input.planId } },
                                pagination: false,
                                sort: "date",
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    addTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({
        planId: zod_1.z.string(),
        todo: zod_1.z.string(),
        date: zod_1.z.string(),
        remarks: zod_1.z.string().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.remarks) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.create({
                                collection: "todos",
                                data: {
                                    plan: input.planId,
                                    todo: input.todo,
                                    date: input.date,
                                    remarks: input.remarks,
                                    done: false,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, payload.create({
                            collection: "todos",
                            data: {
                                plan: input.planId,
                                todo: input.todo,
                                date: input.date,
                                done: false,
                            },
                        })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }),
    planRemovePackage: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        packageId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, plan, packages, packageIds, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                            })];
                    case 2:
                        plan = _b.sent();
                        packages = plan.docs[0].packages;
                        packageIds = [];
                        for (i = 0; i < packages.length; i++) {
                            if (packages[i].id !== input.packageId) {
                                packageIds.push(packages[i].id);
                            }
                        }
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    packages: packageIds,
                                },
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    planAddPackage: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        packageId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, plan, packageIds, packages, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                            })];
                    case 2:
                        plan = _b.sent();
                        if (!plan.docs[0].packages) return [3 /*break*/, 4];
                        packageIds = [];
                        packages = plan.docs[0].packages;
                        for (i = 0; i < packages.length; i++) {
                            packageIds.push(packages[i].id);
                        }
                        packageIds.push(input.packageId);
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    packages: packageIds,
                                },
                            })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, payload.update({
                            collection: "plans",
                            where: {
                                id: { equals: input.id },
                            },
                            data: {
                                packages: [input.packageId],
                            },
                        })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }),
    updatePlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        brideName: zod_1.z.string().optional(),
        groomName: zod_1.z.string().optional(),
        weddingDate: zod_1.z.string().optional(),
        venue: zod_1.z.string().optional(),
        agent: zod_1.z.string().optional(),
        bridal: zod_1.z.string().optional(),
        photovideo: zod_1.z.string().optional(),
        mua: zod_1.z.string().optional(),
        henna: zod_1.z.string().optional(),
        emceesperformers: zod_1.z.string().optional(),
        misc: zod_1.z.string().optional(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.brideName) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    brideName: input.brideName,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 3:
                        if (!input.groomName) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    groomName: input.groomName,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 5:
                        if (!input.weddingDate) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    weddingDate: input.weddingDate,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 7:
                        if (!input.venue) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    venue: input.venue,
                                },
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 9:
                        if (!input.agent) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    agent: input.agent,
                                },
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 11:
                        if (!input.bridal) return [3 /*break*/, 13];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    bridal: input.bridal,
                                },
                            })];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 13:
                        if (!input.photovideo) return [3 /*break*/, 15];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    photovideo: input.photovideo,
                                },
                            })];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 15:
                        if (!input.henna) return [3 /*break*/, 17];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    henna: input.henna,
                                },
                            })];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 17:
                        if (!input.mua) return [3 /*break*/, 19];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    mua: input.mua,
                                },
                            })];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 19:
                        if (!input.emceesperformers) return [3 /*break*/, 21];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    emceesperformers: input.emceesperformers,
                                },
                            })];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 23];
                    case 21:
                        if (!input.misc) return [3 /*break*/, 23];
                        return [4 /*yield*/, payload.update({
                                collection: "plans",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    misc: input.misc,
                                },
                            })];
                    case 22:
                        _b.sent();
                        _b.label = 23;
                    case 23: return [2 /*return*/];
                }
            });
        });
    }),
    createPlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: "plans",
                                data: {
                                    user: [input.userId],
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getPlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "plans",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    createPlanIfNil: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "plans",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2:
                        results = _b.sent();
                        if (!(results.docs.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, payload.create({
                                collection: "plans",
                                data: {
                                    user: [input.userId],
                                },
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }),
    getEnquiries12M: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, resultsArray, currentEnqData, accuEnqData, currentSSData, accuSSData, i, currentMonth, currentYear, followingMonth, followingYear, results1, results2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        resultsArray = [];
                        currentEnqData = 0;
                        accuEnqData = 0;
                        currentSSData = 0;
                        accuSSData = 0;
                        i = 12;
                        _b.label = 2;
                    case 2:
                        if (!(i > -1)) return [3 /*break*/, 6];
                        currentMonth = input.month - i;
                        currentYear = input.year;
                        followingMonth = currentMonth + 1;
                        followingYear = input.year;
                        if (currentMonth === 0) {
                            currentMonth = 12;
                            currentYear = currentYear - 1;
                        }
                        else if (currentMonth < 0) {
                            currentMonth = currentMonth + 12;
                            currentYear = currentYear - 1;
                            followingMonth = currentMonth + 1;
                            followingYear = currentYear;
                        }
                        if (followingMonth > 12) {
                            followingMonth = followingMonth - 12;
                            followingYear = followingYear + 1;
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: { equals: input.vendorId },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(currentYear, "-").concat(formatWithLeadingZero(currentMonth), "-01T00:00:00Z")),
                                        less_than: new Date("".concat(followingYear, "-").concat(formatWithLeadingZero(followingMonth), "-01T00:00:00Z")),
                                    },
                                },
                                pagination: false,
                            })];
                    case 3:
                        results1 = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    source: { equals: "Sarang Sayang" },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(currentYear, "-").concat(formatWithLeadingZero(currentMonth), "-01T00:00:00Z")),
                                        less_than: new Date("".concat(followingYear, "-").concat(formatWithLeadingZero(followingMonth), "-01T00:00:00Z")),
                                    },
                                },
                                pagination: false,
                            })];
                    case 4:
                        results2 = _b.sent();
                        currentEnqData = results1.docs.length - accuEnqData;
                        currentSSData = results2.docs.length - accuSSData;
                        accuEnqData = accuEnqData + currentEnqData;
                        accuSSData = accuSSData + currentSSData;
                        resultsArray.push({
                            month: currentMonth,
                            year: currentYear,
                            data: currentEnqData,
                            ss: currentSSData,
                        });
                        _b.label = 5;
                    case 5:
                        i = i - 1;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, resultsArray];
                }
            });
        });
    }),
    getVendorLikes12M: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, resultsArray, currentData, accuData, i, currentMonth, currentYear, followingMonth, followingYear, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        resultsArray = [];
                        currentData = 0;
                        accuData = 0;
                        i = 12;
                        _b.label = 2;
                    case 2:
                        if (!(i > -1)) return [3 /*break*/, 5];
                        currentMonth = input.month - i;
                        currentYear = input.year;
                        followingMonth = currentMonth + 1;
                        followingYear = input.year;
                        if (currentMonth === 0) {
                            currentMonth = 12;
                            currentYear = currentYear - 1;
                        }
                        else if (currentMonth < 0) {
                            currentMonth = currentMonth + 12;
                            currentYear = currentYear - 1;
                            followingMonth = currentMonth + 1;
                            followingYear = currentYear;
                        }
                        if (followingMonth > 12) {
                            followingMonth = followingMonth - 12;
                            followingYear = followingYear + 1;
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "likesArchive",
                                where: {
                                    vendor: { equals: input.vendorId },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(currentYear, "-").concat(formatWithLeadingZero(currentMonth), "-01T00:00:00Z")),
                                        less_than: new Date("".concat(followingYear, "-").concat(formatWithLeadingZero(followingMonth), "-01T00:00:00Z")),
                                    },
                                },
                                pagination: false,
                            })];
                    case 3:
                        results = _b.sent();
                        currentData = results.docs.length - accuData;
                        accuData = accuData + currentData;
                        resultsArray.push({
                            month: currentMonth,
                            year: currentYear,
                            data: currentData,
                        });
                        _b.label = 4;
                    case 4:
                        i = i - 1;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log(resultsArray);
                        return [2 /*return*/, resultsArray];
                }
            });
        });
    }),
    getSSLeadsThisMonth: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, ltDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        ltDate = input.month === 12
                            ? new Date("".concat(input.year + 1, "-01-01T00:00:00Z"))
                            : new Date("".concat(input.year, "-").concat(input.month + 1, "-01T00:00:00Z"));
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: { equals: input.vendorId },
                                    source: { equals: "Sarang Sayang" },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(input.year, "-").concat(input.month, "-01T00:00:00Z")),
                                        less_than: ltDate,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendorLikesThisMonth: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, ltDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        ltDate = input.month === 12
                            ? new Date("".concat(input.year + 1, "-01-01T00:00:00Z"))
                            : new Date("".concat(input.year, "-").concat(input.month + 1, "-01T00:00:00Z"));
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                where: {
                                    vendor: { equals: input.vendorId },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(input.year, "-").concat(input.month, "-01T00:00:00Z")),
                                        less_than: ltDate,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getEnquiriesThisMonth: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, ltDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        ltDate = input.month === 12
                            ? new Date("".concat(input.year + 1, "-01-01T00:00:00Z"))
                            : new Date("".concat(input.year, "-").concat(input.month + 1, "-01T00:00:00Z"));
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendorId: { equals: input.vendorId },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(input.year, "-").concat(input.month, "-01T00:00:00Z")),
                                        less_than: ltDate,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendUserId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    venduserid: {
                                        equals: input.vendUserId,
                                    },
                                },
                                limit: 1,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendorId: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    venduserid: {
                                        equals: input.userId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getLeads: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
        sort: zod_1.z.string().optional(),
        high: zod_1.z.boolean(),
        medium: zod_1.z.boolean(),
        low: zod_1.z.boolean(),
        cs: zod_1.z.boolean(),
        ni: zod_1.z.boolean(),
        lnr: zod_1.z.boolean(),
        cold: zod_1.z.boolean(),
        hot: zod_1.z.boolean(),
        warm: zod_1.z.boolean(),
        nc: zod_1.z.boolean(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results, preResults, x, preResults, x, high, h, medium, m, low, l, cs, a, ni, a, lnr, a, cold, a, hot, a, warm, a, nc, a, endResults, tweaked, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a, a, current, a, a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        results = [];
                        if (!!input.sort) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 2:
                        preResults = (_b.sent()).docs;
                        for (x = 0; x < preResults.length; x++) {
                            results.push(preResults[x]);
                        }
                        return [3 /*break*/, 17];
                    case 3:
                        if (!(input.sort === "source")) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                                pagination: false,
                                sort: "source",
                            })];
                    case 4:
                        preResults = (_b.sent()).docs;
                        for (x = 0; x < preResults.length; x++) {
                            results.push(preResults[x]);
                        }
                        return [3 /*break*/, 17];
                    case 5:
                        if (!(input.sort === "priority")) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            priority: { equals: "high" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 6:
                        high = (_b.sent()).docs;
                        for (h = 0; h < high.length; h++) {
                            results.push(high[h]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            priority: { equals: "medium" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 7:
                        medium = (_b.sent()).docs;
                        for (m = 0; m < medium.length; m++) {
                            results.push(medium[m]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            priority: { equals: "low" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 8:
                        low = (_b.sent()).docs;
                        for (l = 0; l < low.length; l++) {
                            results.push(low[l]);
                        }
                        return [3 /*break*/, 17];
                    case 9:
                        if (!(input.sort === "status")) return [3 /*break*/, 17];
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "contract signed" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 10:
                        cs = (_b.sent()).docs;
                        for (a = 0; a < cs.length; a++) {
                            results.push(cs[a]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "not interested" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 11:
                        ni = (_b.sent()).docs;
                        for (a = 0; a < ni.length; a++) {
                            results.push(ni[a]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "lnr" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 12:
                        lnr = (_b.sent()).docs;
                        for (a = 0; a < lnr.length; a++) {
                            results.push(lnr[a]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "cold" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 13:
                        cold = (_b.sent()).docs;
                        for (a = 0; a < cold.length; a++) {
                            results.push(cold[a]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "hot" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 14:
                        hot = (_b.sent()).docs;
                        for (a = 0; a < hot.length; a++) {
                            results.push(hot[a]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "warm" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 15:
                        warm = (_b.sent()).docs;
                        for (a = 0; a < warm.length; a++) {
                            results.push(warm[a]);
                        }
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    and: [
                                        {
                                            status: { equals: "not contacted" },
                                        },
                                    ],
                                },
                                pagination: false,
                                sort: "-createdAt",
                            })];
                    case 16:
                        nc = (_b.sent()).docs;
                        for (a = 0; a < nc.length; a++) {
                            results.push(nc[a]);
                        }
                        _b.label = 17;
                    case 17:
                        endResults = [];
                        tweaked = false;
                        if (input.high === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].priority != "high") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].priority != "high") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.medium === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].priority != "medium") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].priority != "medium") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.low === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].priority != "low") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].priority != "low") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.cs === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "contract signed") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "contract signed") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.ni === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "not interested") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "not interested") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.lnr === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "lnr") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "lnr") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.cold === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "cold") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "cold") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.hot === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "hot") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "hot") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.warm === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "warm") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "warm") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (input.nc === false) {
                            if (!tweaked) {
                                for (a = 0; a < results.length; a++) {
                                    if (results[a].status != "not contacted") {
                                        endResults.push(results[a]);
                                        tweaked = true;
                                    }
                                }
                            }
                            else {
                                current = [];
                                for (a = 0; a < endResults.length; a++) {
                                    if (endResults[a].status != "not contacted") {
                                        current.push(endResults[a]);
                                    }
                                }
                                endResults = [];
                                for (a = 0; a < current.length; a++) {
                                    endResults.push(current[a]);
                                }
                            }
                        }
                        if (!tweaked) {
                            return [2 /*return*/, results];
                        }
                        else {
                            return [2 /*return*/, endResults];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }),
    getSSLeads: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    source: {
                                        equals: "Sarang Sayang",
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    addLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        contact: zod_1.z.string(),
        message: zod_1.z.string(),
        source: zod_1.z.string(),
        status: zod_1.z.string(),
        priority: zod_1.z.string(),
        remarks: zod_1.z.string(),
        vendorId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: "leads",
                                data: {
                                    name: input.name,
                                    email: input.email,
                                    contact: input.contact,
                                    message: input.message,
                                    source: input.source,
                                    status: input.status,
                                    priority: input.priority,
                                    remarks: input.remarks,
                                    vendor: input.vendorId,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    removeLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        leadId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "leads",
                                id: input.leadId,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "leads",
                                where: {
                                    id: {
                                        equals: input.id,
                                    },
                                },
                                limit: 1,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    updateLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        contact: zod_1.z.string(),
        source: zod_1.z.string(),
        status: zod_1.z.string(),
        priority: zod_1.z.string(),
        remarks: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.update({
                                collection: "leads",
                                where: {
                                    id: { equals: input.id },
                                },
                                data: {
                                    updatedAt: new Date().toISOString(),
                                    name: input.name,
                                    email: input.email,
                                    contact: input.contact,
                                    source: input.source,
                                    status: input.status,
                                    priority: input.priority,
                                    remarks: input.remarks,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getVendor: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    id: {
                                        equals: input.id,
                                    },
                                },
                                limit: 1,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getLikes: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getLikesFromVendId: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    isLiked: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
        userId: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                },
                                pagination: false,
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    transferAllLikes: trpc_1.publicProcedure
        .input(zod_1.z.object({
        blank: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, allVendors, i, initLikes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                pagination: false,
                            })];
                    case 2:
                        allVendors = _b.sent();
                        console.log("We have collated all vendors. We are doing it now");
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < allVendors.docs.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.find({
                                collection: "likes",
                                where: {
                                    vendor: { equals: allVendors.docs[i].id },
                                },
                                pagination: false,
                            })];
                    case 4:
                        initLikes = _b.sent();
                        console.log("We are on: " + allVendors.docs[i].name);
                        return [4 /*yield*/, payload.update({
                                collection: "vendors",
                                where: {
                                    id: { equals: allVendors.docs[i].id },
                                },
                                data: {
                                    likes: initLikes.docs.length,
                                },
                            })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        console.log("Alhamdulillah we are done. We are going home.");
                        return [2 /*return*/];
                }
            });
        });
    }),
    addLike: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
        userId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, vendor, alreadyLikedBefore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: "likes",
                                data: {
                                    vendor: input.vendorId,
                                    user: input.userId,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    id: { equals: input.vendorId },
                                    and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
                                },
                                pagination: false,
                            })];
                    case 3:
                        vendor = _b.sent();
                        if (!vendor.docs[0].likes) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "vendors",
                                where: {
                                    id: { equals: input.vendorId },
                                },
                                data: {
                                    likes: vendor.docs[0].likes + 1,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, payload.update({
                            collection: "vendors",
                            where: {
                                id: { equals: input.vendorId },
                            },
                            data: {
                                likes: 1,
                            },
                        })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [4 /*yield*/, payload.find({
                            collection: "likesArchive",
                            where: {
                                vendor: { equals: input.vendorId },
                                user: { equals: input.userId },
                            },
                        })];
                    case 8:
                        alreadyLikedBefore = _b.sent();
                        if (!(alreadyLikedBefore.docs.length === 0)) return [3 /*break*/, 10];
                        return [4 /*yield*/, payload.create({
                                collection: "likesArchive",
                                data: {
                                    vendor: input.vendorId,
                                    user: input.userId,
                                },
                            })];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    }),
    removeLike: trpc_1.publicProcedure
        .input(zod_1.z.object({
        likeId: zod_1.z.string(),
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: "likes",
                                id: input.likeId,
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getTopVendor: trpc_1.publicProcedure
        .input(zod_1.z.object({
        category: zod_1.z.string(),
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                            })];
                    case 2:
                        results = _b.sent();
                        if (input.category === "venues") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Venue,
                                    top4: results.docs[0].top4Venues,
                                }];
                        }
                        else if (input.category === "stylist") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Stylist,
                                    top4: results.docs[0].top4Stylist,
                                }];
                        }
                        else if (input.category === "packages") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Packages,
                                    top4: results.docs[0].top4Packages,
                                }];
                        }
                        else if (input.category === "bridals") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Bridal,
                                    top4: results.docs[0].top4Bridals,
                                }];
                        }
                        else if (input.category === "photovideo") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Photovideo,
                                    top4: results.docs[0].top4Photovideo,
                                }];
                        }
                        else if (input.category === "coordinators") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Coordinator,
                                    top4: results.docs[0].top4Coordinator,
                                }];
                        }
                        else if (input.category === "mua") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Mua,
                                    top4: results.docs[0].top4Mua,
                                }];
                        }
                        else if (input.category === "berkat") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Berkat,
                                    top4: results.docs[0].top4Berkat,
                                }];
                        }
                        else if (input.category === "pakandam") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Pakandam,
                                    top4: results.docs[0].top4Pakandam,
                                }];
                        }
                        else if (input.category === "dulang") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Dulang,
                                    top4: results.docs[0].top4Dulang,
                                }];
                        }
                        else if (input.category === "live") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Live,
                                    top4: results.docs[0].top4Live,
                                }];
                        }
                        else if (input.category === "henna") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Henna,
                                    top4: results.docs[0].top4Henna,
                                }];
                        }
                        else if (input.category === "emcees") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Emcee,
                                    top4: results.docs[0].top4Emcees,
                                }];
                        }
                        else if (input.category === "performers") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Performers,
                                    top4: results.docs[0].top4Performers,
                                }];
                        }
                        else if (input.category === "prep") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Prep,
                                    top4: results.docs[0].top4Prep,
                                }];
                        }
                        else if (input.category === "stationery") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Stationery,
                                    top4: results.docs[0].top4Stationery,
                                }];
                        }
                        else if (input.category === "cake") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Cake,
                                    top4: results.docs[0].top4Cake,
                                }];
                        }
                        else if (input.category === "catering") {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Catering,
                                    top4: results.docs[0].top4Catering,
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }),
    setHomepageVendor: trpc_1.publicProcedure
        .input(zod_1.z.object({ slot: zod_1.z.number(), vendorId: zod_1.z.string() }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!(input.slot == 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot1: input.vendorId,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 3:
                        if (!(input.slot == 2)) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot2: input.vendorId,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 5:
                        if (!(input.slot == 3)) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot3: input.vendorId,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 7:
                        if (!(input.slot == 4)) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot4: input.vendorId,
                                },
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 9:
                        if (!(input.slot == 5)) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot5: input.vendorId,
                                },
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 11:
                        if (!(input.slot == 6)) return [3 /*break*/, 13];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot6: input.vendorId,
                                },
                            })];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 13:
                        if (!(input.slot == 7)) return [3 /*break*/, 15];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot7: input.vendorId,
                                },
                            })];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 17];
                    case 15:
                        if (!(input.slot == 8)) return [3 /*break*/, 17];
                        return [4 /*yield*/, payload.update({
                                collection: "homepage",
                                where: {
                                    id: { equals: "6731fa30466109cc5693fa69" },
                                },
                                data: {
                                    slot8: input.vendorId,
                                },
                            })];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    }),
    setTopVendors: trpc_1.publicProcedure
        .input(zod_1.z.object({ cat: zod_1.z.string(), vendorId: zod_1.z.string() }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!(input.cat == "venues")) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Venue: input.vendorId,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 3:
                        if (!(input.cat == "coordinators")) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Coordinator: input.vendorId,
                                },
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 5:
                        if (!(input.cat == "stylist")) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Stylist: input.vendorId,
                                },
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 7:
                        if (!(input.cat == "photovideo")) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Photovideo: input.vendorId,
                                },
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 9:
                        if (!(input.cat == "bridals")) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Bridal: input.vendorId,
                                },
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 11:
                        if (!(input.cat == "mua")) return [3 /*break*/, 13];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Mua: input.vendorId,
                                },
                            })];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 13:
                        if (!(input.cat == "pakandam")) return [3 /*break*/, 15];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Pakandam: input.vendorId,
                                },
                            })];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 15:
                        if (!(input.cat == "berkat")) return [3 /*break*/, 17];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Berkat: input.vendorId,
                                },
                            })];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 17:
                        if (!(input.cat == "dulang")) return [3 /*break*/, 19];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Dulang: input.vendorId,
                                },
                            })];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 19:
                        if (!(input.cat == "live")) return [3 /*break*/, 21];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Live: input.vendorId,
                                },
                            })];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 21:
                        if (!(input.cat == "henna")) return [3 /*break*/, 23];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Henna: input.vendorId,
                                },
                            })];
                    case 22:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 23:
                        if (!(input.cat == "emcees")) return [3 /*break*/, 25];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Emcee: input.vendorId,
                                },
                            })];
                    case 24:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 25:
                        if (!(input.cat == "performers")) return [3 /*break*/, 27];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Performers: input.vendorId,
                                },
                            })];
                    case 26:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 27:
                        if (!(input.cat == "prep")) return [3 /*break*/, 29];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Prep: input.vendorId,
                                },
                            })];
                    case 28:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 29:
                        if (!(input.cat == "stationery")) return [3 /*break*/, 31];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Stationery: input.vendorId,
                                },
                            })];
                    case 30:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 31:
                        if (!(input.cat == "cake")) return [3 /*break*/, 33];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Cake: input.vendorId,
                                },
                            })];
                    case 32:
                        _b.sent();
                        return [3 /*break*/, 35];
                    case 33:
                        if (!(input.cat == "catering")) return [3 /*break*/, 35];
                        return [4 /*yield*/, payload.update({
                                collection: "featured",
                                where: {
                                    id: { equals: "65a3e090f66a58e7b5eb9542" },
                                },
                                data: {
                                    top1Catering: input.vendorId,
                                },
                            })];
                    case 34:
                        _b.sent();
                        _b.label = 35;
                    case 35: return [2 /*return*/];
                }
            });
        });
    }),
    getSlotVendor: trpc_1.publicProcedure.query(function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, vendor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                case 1:
                    payload = _a.sent();
                    return [4 /*yield*/, payload.find({
                            collection: "homepage",
                            where: {
                                id: { equals: "6731fa30466109cc5693fa69" },
                            },
                            pagination: false,
                        })];
                case 2:
                    vendor = (_a.sent()).docs;
                    return [2 /*return*/, vendor];
            }
        });
    }); }),
    getPagelessInfiniteProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({ cat: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: {
                                    category: { equals: input.cat },
                                    and: [{ venduserid: { not_in: "658fdba885aa3665781e567a" } }],
                                },
                                pagination: false,
                            })];
                    case 2:
                        items = (_b.sent()).docs;
                        return [2 /*return*/, items];
                }
            });
        });
    }),
    getAllPagelessInfiniteProducts: trpc_1.publicProcedure.query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                pagination: false,
                                where: {
                                    venduserid: { not_in: "658fdba885aa3665781e567a" },
                                },
                            })];
                    case 2:
                        items = (_b.sent()).docs;
                        return [2 /*return*/, items];
                }
            });
        });
    }),
    getInfiniteProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(1000),
        cursor: zod_1.z.number().nullish(),
        query: query_validator_1.QueryValidator,
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var query, cursor, sort, limit, queryOpts, payload, parsedQueryOpts, page, _b, items, hasNextPage, nextPage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = input.query, cursor = input.cursor;
                        sort = query.sort, limit = query.limit, queryOpts = __rest(query, ["sort", "limit"]);
                        return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _c.sent();
                        parsedQueryOpts = {};
                        Object.entries(queryOpts).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            if (key === "search") {
                                parsedQueryOpts["name"] = {
                                    contains: value,
                                };
                            }
                            else {
                                parsedQueryOpts[key] = {
                                    equals: value,
                                };
                            }
                        });
                        page = cursor || 1;
                        return [4 /*yield*/, payload.find({
                                collection: "vendors",
                                where: __assign(__assign({}, parsedQueryOpts), { and: [
                                        {
                                            venduserid: {
                                                not_in: [
                                                    "658fdba885aa3665781e567a",
                                                    "65d23bde3d200459cb8a58b2",
                                                ],
                                            },
                                        },
                                    ] }),
                                sort: sort,
                                depth: 1,
                                limit: limit,
                                page: page,
                            })];
                    case 2:
                        _b = _c.sent(), items = _b.docs, hasNextPage = _b.hasNextPage, nextPage = _b.nextPage;
                        return [2 /*return*/, {
                                items: items,
                                nextPage: hasNextPage ? nextPage : null,
                            }];
                }
            });
        });
    }),
});
