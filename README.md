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

Install project with name "my_project":
```bash
mkdir /opt/objectum/projects/my_catalog
cd /opt/objectum/projects/my_catalog
git clone https://github.com/objectum/catalog.git .
npm install
npm run build
cp -r /opt/objectum/projects/my_catalog/sample/* /opt/objectum/projects/my_catalog
```

Create store:
```bash
mkdir /opt/objectum/projects/my_catalog/bin
node create.js
node import.js
```
Run:
```bash
cd /opt/objectum/server
node index.js
cd /opt/objectum/projects/my_catalog
node index.js
```
Open URL http://127.0.0.1:3100

## Author

**Dmitriy Samortsev**

+ http://github.com/objectum


## Copyright and license

MIT
