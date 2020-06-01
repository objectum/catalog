import fs from "fs";
import util from "util";

fs.readFileAsync = util.promisify (fs.readFile);

function timeout (ms = 500) {
	return new Promise (resolve => setTimeout (() => resolve (), ms));
};

async function readFile ({store, progress, filename}) {
	for (let i = 0; i < 10; i ++) {
		await timeout (1000);
		progress ({label: "processing", value: i + 1, max: 10});
	}
	return await fs.readFileAsync (filename, "utf8");
};

async function increaseCost ({store, progress}) {
	await store.startTransaction ("demo");
	
	let records = await store.getRecords ({model: "item"});
	
	for (let i = 0; i < records.length; i ++) {
		let record = records [i];
		
		record.cost = record.cost + 1;
		await record.sync ();
	}
	await store.commitTransaction ();
	
	return "ok";
};

export default {
	readFile,
	increaseCost
};
