import fs from "fs";
import objectumClient from "objectum-client";
import ProgressBar from "progress";
const {Store} = objectumClient;
const store = new Store ();
const config = JSON.parse (fs.readFileSync ("./config.json"));

store.setUrl (`http://${config.objectum.host}:${config.objectum.port}/projects/${config.code}/`);

async function createModels ({code, num, types}) {
	console.log ("createModel: " + code);

	let bar = new ProgressBar (`:current/:total, :elapsed sec.: :bar`, {total: num, renderThrottle: 200});
	let model = await store.createModel ({name: code, code});
	
	for (let i = 0; i < num; i ++) {
		for (let j = 0; j < types.length; j ++) {
			let t = types [j];
			
			await store.createProperty ({
				"model": model.id,
				"name": t + i,
				"code": t + i,
				"type": t
			});
		}
		bar.tick ();
	}
};

async function test ({code, num, recs, types}) {
	console.log ("test: " + code + ", number of properties: " + (num * types.length) + ", types: " + types);
	
	let bar = new ProgressBar (`:current/:total, :elapsed sec.: :bar`, {total: recs, renderThrottle: 200});
	let d = new Date ();
	
	for (let i = 0; i < recs; i ++) {
		let data = {
			_model: code
		};
		for (let j = 0; j < num; j ++) {
			for (let k = 0; k < types.length; k ++) {
				let t = types [k];
				let v = i;
				
				if (t == "string") {
					v = "s" + v;
				}
				if (t == "date") {
					v = d;
				}
				data [t + j] = v;
			}
		}
		await store.createRecord (data);
		
		bar.tick ();
	}
	let duration = new Date ().getTime () - d.getTime ();
	
	console.log ("average per second: " + (recs / (duration / 1000)).toFixed (1));
};

async function start () {
	await store.auth ({
		username: "admin",
		password: config.adminPassword
	});
	if (!store.map ["model"]["test1n"]) {
		await store.startTransaction ();
		
		await createModels ({code: "test1n", num: 1, types: ["number"]});
		await createModels ({code: "test1s", num: 1, types: ["string"]});
		await createModels ({code: "test1d", num: 1, types: ["date"]});
		await createModels ({code: "test1nsd", num: 1, types: ["number", "string", "date"]});
		await createModels ({code: "test10n", num: 10, types: ["number"]});
		await createModels ({code: "test10s", num: 10, types: ["string"]});
		await createModels ({code: "test10d", num: 10, types: ["date"]});
		await createModels ({code: "test10nsd", num: 10, types: ["number", "string", "date"]});
		await createModels ({code: "test100n", num: 100, types: ["number"]});
		await createModels ({code: "test100s", num: 100, types: ["string"]});
		await createModels ({code: "test100d", num: 100, types: ["date"]});
		await createModels ({code: "test100nsd", num: 100, types: ["number", "string", "date"]});

		await store.commitTransaction ();
	}
	console.log ("test started.");
	
	await store.startTransaction ();
	
	await test ({code: "test1n", num: 1, recs: 100, types: ["number"]});
	await test ({code: "test1s", num: 1, recs: 100, types: ["string"]});
	await test ({code: "test1d", num: 1, recs: 100, types: ["date"]});
	await test ({code: "test1nsd", num: 1, recs: 100, types: ["number", "string", "date"]});
	await test ({code: "test10n", num: 10, recs: 100, types: ["number"]});
	await test ({code: "test10s", num: 10, recs: 100, types: ["string"]});
	await test ({code: "test10d", num: 10, recs: 100, types: ["date"]});
	await test ({code: "test10nsd", num: 10, recs: 100, types: ["number", "string", "date"]});
	await test ({code: "test100n", num: 100, recs: 100, types: ["number"]});
	await test ({code: "test100s", num: 100, recs: 100, types: ["string"]});
	await test ({code: "test100d", num: 100, recs: 100, types: ["date"]});
	await test ({code: "test100nsd", num: 100, recs: 100, types: ["number", "string", "date"]});
	
	await test ({code: "test1n", num: 1, recs: 1000, types: ["number"]});
	await test ({code: "test1s", num: 1, recs: 1000, types: ["string"]});
	await test ({code: "test1d", num: 1, recs: 1000, types: ["date"]});
	await test ({code: "test1nsd", num: 1, recs: 1000, types: ["number", "string", "date"]});
	await test ({code: "test10n", num: 10, recs: 1000, types: ["number"]});
	await test ({code: "test10s", num: 10, recs: 1000, types: ["string"]});
	await test ({code: "test10d", num: 10, recs: 1000, types: ["date"]});
	await test ({code: "test10nsd", num: 10, recs: 1000, types: ["number", "string", "date"]});
	await test ({code: "test100n", num: 100, recs: 1000, types: ["number"]});
	await test ({code: "test100s", num: 100, recs: 1000, types: ["string"]});
	await test ({code: "test100d", num: 100, recs: 1000, types: ["date"]});
	await test ({code: "test100nsd", num: 100, recs: 1000, types: ["number", "string", "date"]});

	await store.rollbackTransaction ();
};

start ().then (() => {
	console.log ("ok");
	process.exit ();
});
