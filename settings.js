const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0pPbVhkcFNCTmNnYmNxUHMyODBIdDMwYWg3RlMxd0xtdFJmVXE5MXUzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTFBTXZOZXlwZlNSRGNtbjY2eXc4V1ArWDZTZWJxTW1mWmcxeDlhRzUyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSW5Pa1ozZ1JoUXhIdVdPRWZDRVVuYm9KNGk3TVc0eHBaQ1NuSzI5L2xvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0RVZnM2s2MlpscHg1MXUvQmtNaGIrZnhOR3N3SmpHZXVuSk5IeGlVaHhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllDcUt6TlZBVXA1cS9QL0pUemQyTUl1QS8ycGtsbGx4STRMVkkwQk1HbUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmTEVyZk9iQVBXbHB2TGh1dWdJQlVIdjlnVDYvb0NENHVXT3NSVWZTeTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0d5d3NaK0czdWVTUmpOZkVNRjJFV3F3TmJqdHBaeTh2TkN3bFBZV1ZVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmZHUVFuRkRyaWFaaDNmWmFwaFZFLzVraUtVdU8wT3FPVXZTTFM5QWluYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJwRFRmOUw0MTEvZzliczNtWlVNem40RWY1cFo0bk83NU1BZzRFY2crNVVCQXRmQ0hXc28vam9RMStXdHZEbksrUjZNTi8weFBiMGM3TlM1RjY0TGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEsImFkdlNlY3JldEtleSI6IjNISmJLZUZHcDB0aHlsZVF3Rmkyb09qaHE1UVVzbDM4YkNZbS9hS24vVWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzU4NDA3OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUJEODczNzM3QzY3OENGRjI1MTdDQkUxN0FERTA1REEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTgzMTE4MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzU4NDA3OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDAyQUQzQUNEOUU2NDEzRDlFQzJFQzNGMDBGNjdGRkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTgzMTE4Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzU4NDA3OTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNkJGNjNDRThDMjAxRDU0RjlCOTBCMUVGOTI3Nzk2RTYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTgzMTE4N31dLCJuZXh0UHJlS2V5SWQiOjMyLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzIsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNDVRMUxEUEsiLCJtZSI6eyJpZCI6IjUwOTM1ODQwNzkxOjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLvCdkIvwnZq18J2ar/CdmrTwnZqw8J2Qg/CdmqtTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiIsImxpZCI6IjEwMzY4OTcwNDQ2ODYzMTo3QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXJOcTQ4RUVQKzJuOFVHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSE4wQWl1eW9tYW5KTXQ5ank3NXI1UUllUWtkWDV0L0w2ekgzWGtIZXNTVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSmFCT1F6c2QvNWZ4c1pzd2ova3pNN05IMktOZG8wZEZoWEc4RTNkZzloM1QvOW5rM0JkMzE3YzZKVWVLQkY3OTdBUW02NWFBR0dxRUxWUUluNHhvQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ikdyd0wrSnpqOG9WTGpVU0NHUzliTTlsN2YwbFVPUDZxckJPMkJkem5MdUt6Qzg2WnFYbC9NMVdvY0hwSmt2QTdHQjc2WndSNzJodVBXTGhreElmT2pBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5MzU4NDA3OTE6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSemRBSXJzcUptcHlUTGZZOHUrYStVQ0hrSkhWK2JmeStzeDkxNUIzckVsIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTU4MzExODAsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSmZQIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Leonidas",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "50935840791",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
