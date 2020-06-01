/* eslint-disable no-whitespace-before-property */
/* eslint-disable eqeqeq */

import objectumClient from "objectum-client";
const {Record} = objectumClient;

function timeout (ms = 500) {
	return new Promise (resolve => setTimeout (() => resolve (), ms));
};

class ItemModel extends Record {
	async getComments ({progress}) {
		let me = this;

		for (let i = 0; i < 10; i ++) {
			await timeout (1000);
			progress ({label: "processing", value: i + 1, max: 10});
		}
		return await me.store.getRecs ({
			model: "t.item.comment",
			filters: [
				["item", "=", me.id]
			]
		});
	}
};

export default ItemModel;
