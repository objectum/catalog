let dict = {};

function getNodeName (d, rec) {
	let name = rec.name;
	
	if (rec.parent) {
		name = `${getNodeName (d, d [rec.parent])}->${name}`;
	}
	return name;
};
async function onRow ({store, row}) {
	let props = ["company", "color"];
	
	for (let i = 0; i < props.length; i ++) {
		let p = props [i];

		if (row [p]) {
			if (!dict [p]) {
				dict [p] = {};
				
				let recs = await store.getRecs ({model: `d.item.${p}`});
				recs.forEach (rec => dict [p][rec.name] = rec.id);
			}
			if (!dict [p][row [p]]) {
				let record = await store.createRecord ({
					_model: `d.item.${p}`,
					name: row [p]
				});
				dict [p][row [p]] = record.id;
			}
			row [p] = dict [p][row [p]];
		}
	}
	if (row.category) {
		if (!dict.category) {
			dict.category = {};
			
			let recs = await store.getRecs ({model: "d.item.category"});
			recs.forEach (rec => {
				dict.category [rec.id] = rec;
			});
			recs.forEach (rec => {
				dict.category [getNodeName (dict.category, rec)] = rec.id;
			});
		}
		if (!dict.category [row.category]) {
			let tokens = row.category.split ("->");
			let name = "", parent = null;
			
			for (let i = 0; i < tokens.length; i ++) {
				if (name) {
					name += "->";
				}
				name += tokens [i];
				
				if (!dict.category [name]) {
					let record = await store.createRecord ({
						_model: `d.item.category`,
						name: tokens [i],
						parent
					});
					dict.category [name] = record.id;
					dict.category [record.id] = record;
					parent = record.id;
				}
			}
		}
		row.category = dict.category [row.category];
	}
	if (row.photo.startsWith ("tv")) {
		row.photo = "tv-1.jpg";
	}
	row.date = new Date ();
};

module.exports = {
	onRow
};
