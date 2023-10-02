"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountData = void 0;
function CountData(data, tip) {
    return data.filter((item) => item.tipo === tip).length;
}
exports.CountData = CountData;
