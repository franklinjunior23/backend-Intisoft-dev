"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateUser_1 = require("../middleware/ValidateUser");
const Tikets_controllers_1 = require("../controller/Tikets.controllers");
const express_1 = require("express");
const TicketsRoutes = (0, express_1.Router)();
TicketsRoutes.get("/", Tikets_controllers_1.GetAllTickets);
TicketsRoutes.post("/", ValidateUser_1.ValidateUser, Tikets_controllers_1.CreateTickets);
exports.default = TicketsRoutes;
