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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendors = void 0;
var config_1 = require("../../../config");
var yourOwnVendor = function (_a) {
    var req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, vendors, ownVendorIds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = req.user;
                    if (!user)
                        return [2 /*return*/, false];
                    if (user.role === "admin")
                        return [2 /*return*/, true];
                    return [4 /*yield*/, req.payload.find({
                            collection: "vendors",
                            where: {
                                venduserid: {
                                    equals: user.id,
                                },
                            },
                        })];
                case 1:
                    vendors = (_b.sent()).docs;
                    ownVendorIds = vendors.map(function (vendor) { return vendor.id; }).flat();
                    return [2 /*return*/, {
                            id: {
                                in: ownVendorIds,
                            },
                        }];
            }
        });
    });
};
exports.Vendors = {
    slug: "vendors",
    admin: {
        useAsTitle: "name",
        hideAPIURL: true,
    },
    access: {
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        read: yourOwnVendor,
        update: yourOwnVendor,
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    fields: [
        {
            name: "venduserid",
            label: "Vendor User ID",
            type: "relationship",
            relationTo: "users",
            access: {
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
            required: true,
            hasMany: false,
        },
        {
            name: "name",
            label: "Vendor Name",
            type: "text",
            required: true,
            index: true,
        },
        {
            name: "category",
            label: "Vendor Category",
            type: "select",
            options: config_1.VENDOR_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
        },
        // {
        //   name: "details",
        //   type: "richText",
        //   label: "Vendor Details",
        //   required: false,
        // },
        {
            name: "bio",
            label: "Bio",
            type: "textarea",
            required: false,
        },
        {
            name: "location",
            label: "Vendor Location",
            type: "text",
            required: false,
        },
        {
            name: "facebook",
            label: "Vendor Facebook Link",
            type: "text",
            required: false,
        },
        {
            name: "instagram",
            label: "Vendor Instagram Link",
            type: "text",
            required: false,
        },
        {
            name: "packages",
            type: "relationship",
            label: "Vendor Package(s)",
            required: false,
            relationTo: "packages",
            hasMany: true,
        },
        {
            name: "link",
            type: "text",
            required: false,
            label: "Showcase Link",
        },
        {
            name: "images",
            type: "array",
            label: "Product images",
            minRows: 1,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
        {
            name: "clicks",
            type: "number",
            required: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "likes",
            type: "number",
            required: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "visible",
            defaultValue: false,
            required: false,
            type: "checkbox",
            access: {
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                },
            },
        },
    ],
};
