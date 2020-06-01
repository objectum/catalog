import Proxy from "objectum-proxy";

import fs from "fs";
import {fileURLToPath} from "url";
import {dirname} from "path";

import ItemModel from "./src/models/ItemServerModel.js";
import adminMethods from "./src/modules/admin.js";
import accessMethods from "./src/modules/access.js";

const __filename = fileURLToPath (import.meta.url);
const __dirname = dirname (__filename);
const config = JSON.parse (fs.readFileSync ("./config.json", "utf8"));

global.config = config;

const proxy = new Proxy ();

proxy.register ("item", ItemModel);
proxy.registerAdminMethods (adminMethods);
proxy.registerAccessMethods (accessMethods);

proxy.start ({config, path: "/api", __dirname});
