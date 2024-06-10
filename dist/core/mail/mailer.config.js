"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true,
    auth: {
        user: 'hamza.zenkoders@gmail.com',
        pass: 'clashofclans1199',
    },
});
//# sourceMappingURL=mailer.config.js.map