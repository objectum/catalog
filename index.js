import Proxy from "objectum-proxy";

import fs from "fs";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath (import.meta.url);
const __dirname = dirname (__filename);
const config = JSON.parse (fs.readFileSync ("./config.json", "utf8"));

global.config = config;

const proxy = new Proxy ();

proxy.start ({config, path: "/api", __dirname});
