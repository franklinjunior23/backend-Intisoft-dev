"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateUser_1 = require("../middleware/ValidateUser");
const BaseConocimiento_controller_1 = require("../controller/BaseConocimiento.controller");
const express_1 = require("express");
const BaseConocimientos = (0, express_1.Router)();
BaseConocimientos.get("/", BaseConocimiento_controller_1.GetBaseConocimientos);
BaseConocimientos.post("/", ValidateUser_1.ValidateUser, BaseConocimiento_controller_1.CreateBaseConocimiento);
exports.default = BaseConocimientos;
