# catalog
Objectum project example.

Objectum ecosystem:
* Javascript platform https://github.com/objectum/objectum  
* Isomorhic javascript client https://github.com/objectum/objectum-client  
* Proxy for server methods and access control https://github.com/objectum/objectum-proxy  
* React components https://github.com/objectum/objectum-react  
* Command-line interface (CLI) https://github.com/objectum/objectum-cli  
* Objectum project example https://github.com/objectum/catalog 

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

Install project:
```bash
mkdir /opt/objectum/projects/catalog
cd /opt/objectum/projects/catalog
git clone https://github.com/objectum/catalog.git .
npm install
npm run build
cp -r /opt/objectum/projects/catalog/sample/* /opt/objectum/projects/catalog
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
objectum-cli --file catalog-cli.json
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

## Author

**Dmitriy Samortsev**

+ http://github.com/objectum


## Copyright and license

MIT
