const fs = require ("fs");
const {http} = require ("follow-redirects");
const csvParse = require ("csv-parse/lib/sync")
const sharp = require ("sharp");

async function request (url) {
	return new Promise ((resolve, reject) => {
		let reqErr;
		
		http.get (url, res => {
			let resData;
			
			res.on ("data", function (d) {
				if (resData) {
					resData = Buffer.concat ([resData, d]);
				} else {
					resData = d;
				}
			});
			res.on ("end", function () {
				if (!reqErr) {
					resolve (resData);
				}
			});
		}).on ("error", err => {
			reqErr = err;
			reject (err);
		});
	});
};

async function go () {
	let data = fs.readFileSync ("tv-src.csv", "utf8");
	let rows = csvParse (data, {
		columns: true,
		skip_empty_lines: true,
		delimiter: ";",
		ltrim: true,
		rtrim: true
	});
	let cols = ["code", "name", "category", "cost", "amount", "description", "company", "photo", "color"];
	let r = [
		cols.join (";")
	];
	let fileCount = 1;
	
	for (let i = 1; i < rows.length; i ++) {
		let row = rows [i];
		let a = [];
		
		for (let j = 0; j < cols.length; j ++) {
			let col = cols [j];
			let v = row [col];
			
			if (col == "photo") {
				let tokens = v.split (" ");
				v = tokens [0];
				//let data = await request (v);
				tokens = v.split (".");
				v = `tv-${fileCount ++}.${tokens [tokens.length - 1]}`;
				
				//await sharp (data).resize (200, 200).toFile (`files/${v}`);
			}
			v = (v.indexOf (";") > -1 || v.indexOf ('"') > -1) ? `"${v.split ('"').join ('""')}"` : v;
			a.push (v);
		}
		r.push (a.join (";"));
		console.log (i + 1, "of", rows.length);
	}
	fs.writeFileSync ("tv.csv", r.join ("\r\n"));
};
go ();
