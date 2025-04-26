const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0RtMnlFZzM2QUh6c2FGU3pnOUE5cnRyRHNVOWZpemsrYnlQM3p3YUxsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGhzTWU3RStPWVNGdUpEVHdiM25OQitzbGlBdGlBNDhVWW1LMUY3SGZoST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTnBrNDFmZDh0c0pSZVZXUlhnZ1pONFJsQ0p5UnJSYVNwV1h1UFlNZjJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaMU9BM0htaWRHVnJaSm9VajJWNzdtVVQ5dG9QKzk1WkdQNisrU2hYUW5jPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNLOGJQaTNuK01rSUcxZWw2Vzg4Q0lZRFh1NHVaUHNlZDUxWlRwa0dVSHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVabzFtRytUR1Q0T00veHZwUkxHNHBPZmlWRGhtUmc5WGRTNTZJUkp5MUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0daOVpHOU5WZmx6SzRkVDlKWE56RXJKb2xiMnZjYWt0ZHluRjBHU0szST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUJpYlc5bWFLR1hId0c4TkRqS3FhUjZpUTFoRVplZVBkYW5NL25jWUhDdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRFSnB6VUEzZUs4SUJrWUlGNnlSUVlnemN3UDNQZjJWb2pkRWZJWEd2T2FjSG9ZazdJdHdkTFZWTmpMSXdNenhNR2JHVkNoQjYxd0hIZ1dtMjdJa2p3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJhRGhaK3dmb3pxam9pOTd4RWlqZ0NTQU1lbEJFZkI0Rys2SnNmaTVFWFc0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkwNzU4MTYzMjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOUFEMkYxRjlDMTREMjAxODQ3MDMyRURGMjQ1NjI3OEYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTYyNjAyMn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiSFJLVkdGM1AiLCJtZSI6eyJpZCI6IjIzNDkwNzU4MTYzMjc6NEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjY3MTIyNDAzMjI1NzcyOjRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMT0R2TmdHRUpUSHNNQUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5QURnUXlkTVJLTTFIWmR0RitOQ1B2OGpDOFlvY0FSVGpJU2kzdzNhN3pzPSIsImFjY291bnRTaWduYXR1cmUiOiIwVUJ2VTRUSUEvUFR6dFVCWkhqQ29lRE5iaHdtS3BJWFBoTnFpQUdUeXZvT0pPS2tJeTE3Vk1PdUtaOGIvK09UNFIxWHRqMmtFbm5zdFVNKzJjeXRCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaGxkK3NicmxIZjdicUlWVEt6Zys2cjRrMDJRTkVaN2ZZTExCRFhBQVlBRlNHZUJrK3JacTRjRUJNOEdrSkFjRTZLTmZZbGdhQW9kb3lNei9WdXhKZ2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDc1ODE2MzI3OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZlFBNEVNblRFU2pOUjJYYlJmalFqNy9Jd3ZHS0hBRVU0eUVvdDhOMnU4NyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NjI2MDE4LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
