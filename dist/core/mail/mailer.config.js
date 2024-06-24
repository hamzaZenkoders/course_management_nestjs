"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hamza.zenkoders@gmail.com',
        pass: 'iwxi ldjx mppt mexe',
    },
});
//# sourceMappingURL=mailer.config.js.map