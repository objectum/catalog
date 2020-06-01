import React from "react";
import {Record} from "objectum-client";

class ItemModel  extends Record {
	static _renderGrid ({grid, store}) {
		return React.cloneElement (grid, {
			label: "Items"
		});
	}
	
	static _layout () {
		return {
			"Information": [
				"id",
				[
					"name", "date"
				],
				[
					"type", "cost"
				],
				[
					"photo"
				]
			]
		};
	}

	static _renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {value: new Date (), showTime: true});
		} else {
			return field;
		}
	}
};
export default ItemModel;
