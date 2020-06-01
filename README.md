# catalog
Objectum project example.

Objectum ecosystem:
* Javascript platform https://github.com/objectum/objectum  
* Isomorhic javascript client https://github.com/objectum/objectum-client  
* React components https://github.com/objectum/objectum-react  
* Command-line interface (CLI) https://github.com/objectum/objectum-cli  

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
mkdir /opt/objectum/projects/catalog/bin
node store-create.js
node store-import.js
```
Create models, properties, queries, records:
```bash
mkdir /opt/objectum/projects/catalog
objectum-cli --file catalog-cli.json
```
Run:
```bash
cd /opt/objectum/server
node index.js
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
