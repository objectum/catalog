# catalog
Objectum project example.

Requirements: [NodeJS (ES Modules)](https://nodejs.org), [PostgreSQL](https://www.postgresql.org/download/), [Redis](https://redis.io/)

Objectum ecosystem:
* Javascript platform https://github.com/objectum/objectum  
* Isomorhic javascript client https://github.com/objectum/objectum-client  
* Proxy for server methods and access control https://github.com/objectum/objectum-proxy  
* React components https://github.com/objectum/objectum-react  
* Command-line interface (CLI) https://github.com/objectum/objectum-cli  
* Objectum project example https://github.com/objectum/catalog 
* Objectum project example (PWA) https://github.com/objectum/recipes 

## Install

Install CLI:
```bash
npm i -g objectum-cli
```

Install platform
```bash
mkdir /opt/objectum
objectum-cli --create-platform --path /opt/objectum
```
objectum-cli defaults: 
```
--redis-host 127.0.0.1
--redis-port 6379
--objectum-port 8200
```

Install project:
```bash
mkdir /opt/objectum/projects/catalog
cd /opt/objectum/projects/catalog
git clone https://github.com/objectum/catalog.git .
yarn install
npm run build
cp -r /opt/objectum/projects/catalog/sample/* /opt/objectum/projects/catalog
```
/opt/objectum/projects/catalog/config.json defaults: 
```
{
    "port": 3100 - project port 
    "database": {
        "host": "localhost", - host and port of PostgreSQL server
        "port": 5432,
        "dbPassword": "1", - password of database user "catalog"
        "dbaPassword": "12345" - postgres password
    },
    "adminPassword": "sha1 hash" - password of project administrator. Default: "admin"
```

Create store:
```bash
cd /opt/objectum/projects/catalog/bin
node store-create.js
node store-import.js
```

Run objectum:
```bash
cd /opt/objectum/server
node index.js
```

Create models, properties, queries, records:
```bash
cd /opt/objectum/projects/catalog
objectum-cli --import-json catalog-cli.json --file-directory files
```

Run project:
```bash
cd /opt/objectum/projects/catalog
node index.js
```

Open URL http://127.0.0.1:3100

Admin (developer):  
login: admin  
password: admin

User (role "User"):  
login: user  
password: user

Run in development mode:
```bash
cd /opt/objectum/projects/catalog
npm run start
```

Open URL http://127.0.0.1:3000

## Author

**Dmitriy Samortsev**

+ http://github.com/objectum


## Copyright and license

MIT
