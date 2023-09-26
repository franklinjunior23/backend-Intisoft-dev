"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTickets = exports.GetAllTickets = void 0;
const Administradores_1 = __importDefault(require("../models/Administradores"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Sucursales_1 = __importDefault(require("../models/Sucursales"));
const Empresa_1 = __importDefault(require("../models/Empresa"));
const DateFecha_1 = require("../utils/DateFecha");
function GetAllTickets(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      function contarTicketsCerrados(tickets, estado) {
        const ticketsCerrados = tickets.filter(
          (ticket) => ticket.Estado === estado
        );
        return ticketsCerrados.length;
      }
      const { Fecha } = (0, DateFecha_1.FechaActually)();
      const Empresas = yield Empresa_1.default.findAll({
        attributes: ["nombre"],
        include: [
          { model: Sucursales_1.default, attributes: ["nombre", "id"] },
        ],
      });
      const Ticke = yield Ticket_1.default.findAll({
        where: {
          Fecha: Fecha,
        },
        include: [
          {
            model: Administradores_1.default,
            attributes: ["nombre", "apellido"],
          },
          {
            model: Sucursales_1.default,
            attributes: ["nombre"],
            include: [{ model: Empresa_1.default, attributes: ["nombre"] }],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      const TicketsAll = yield Ticket_1.default.findAll({
        include: [
          {
            model: Administradores_1.default,
            attributes: ["nombre", "apellido"],
          },
          {
            model: Sucursales_1.default,
            attributes: ["nombre"],
            include: [{ model: Empresa_1.default, attributes: ["nombre"] }],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return res.json({
        Details: {
          cantidad: Ticke.length,
          fecha: Fecha,
          cerrado: contarTicketsCerrados(Ticke, "Cerrado"),
          abierto: contarTicketsCerrados(Ticke, "Abierto"),
        },
        tickets: Ticke,
        Empresas,
        TicketsAll,
      });
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  });
}
exports.GetAllTickets = GetAllTickets;
function CreateTickets(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const { Fecha, Hora } = (0, DateFecha_1.FechaActually)();
      const Dats = req.body;
      const UserId = req.User.id;
      const TicketCreate = yield Ticket_1.default.create(
        Object.assign(Object.assign({}, Dats), {
          UsuarioId: UserId,
          Estado: "Abierto",
          Fecha,
          Hora,
        })
      );
      res.json({ create: true });
    } catch (error) {
      res.json({ create: error });
    }
  });
}
exports.CreateTickets = CreateTickets;
