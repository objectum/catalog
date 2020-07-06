/* eslint-disable no-whitespace-before-property */
/* eslint-disable eqeqeq */

import React from "react";
import {Record, factory} from "objectum-client";
import {Action} from "objectum-react";

class ItemModel extends Record {
	static _renderGrid ({grid, store}) {
		return React.cloneElement (grid, {
			label: "Items",
			showImages: true,
			filtersOnTop: true,
			filters: [
				["category", "=", ""],
				["company", "=", ""]
			],
			children: (
				<div className="d-flex">
					{grid.props.children}
					<Action label="Server action: getComments" onClickSelected={async ({progress, id}) => {
						let recs = await store.remote ({
							model: "item",
							method: "getComments",
							id,
							progress
						});
						return JSON.stringify (recs)
					}} />
				</div>
			)
		});
	}
	
	// item form layout
	static _layout () {
		return {
			"Information": [
				"id",
				[
					"name", "date"
				],
				[
					"category", "cost"
				],
				[
					"company", "color"
				],
				[
					"description"
				],
				[
					"photo"
				],
				[
					"t.item.comment"
				]
			]
		};
	}
	
	static _renderForm ({form, store}) {
		return React.cloneElement (form, {
			defaults: {
				date: new Date ()
			}
		});
	}
	// new item render
	static _renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {showTime: true});
		} else {
			return field;
		}
	}

	// item render
	_renderField ({field, store}) {
		return ItemModel._renderField ({field, store});
	}
};

export default ItemModel;
