/* eslint-disable no-whitespace-before-property */
/* eslint-disable eqeqeq */

import React from "react";
import {Record, factory} from "objectum-client";
import {Action} from "objectum-react";

class ItemModel extends Record {
	static _renderGrid ({grid, store}) {
		// Additional buttons in grid
		let actions = [
			...grid.props.children,
			<Action label="Server action: getComments" onClickSelected={async ({progress, id}) => {
				let recs = await store.remote ({
					model: "item",
					method: "getComments",
					id,
					progress
				});
				return JSON.stringify (recs)
			}} />
		];
		return React.cloneElement (grid, {
			label: "Items", // grid label
			query: "item.list", // grid query
			onRenderTable: ItemModel.onRenderTable, // grid table custom render
			children: store.roleCode === "guest" ? null : actions
		});
	}
	
	static onRenderTable ({grid, cols, colMap, recs, store}) {
		return (
			<div className="p-1">
				{recs.map ((rec, i) => {
					let record = factory ({rsc: "record", data: Object.assign (rec, {_model: "item"}), store});
					
					return (
						<div key={i} className={`row border-bottom my-1 p-1 no-gutters ${grid.state.selected === i ? "bg-secondary text-white" : ""}`} onClick={() => grid.onRowClick (i)} >
							<div className="col-6">
								<div className="p-1">
									<div>
										<strong className="mr-1">Name:</strong>{rec.name}
									</div>
									<div>
										<strong className="mr-1">Date:</strong>{rec.date && rec.date.toLocaleString ()}
									</div>
									<div>
										<strong className="mr-1">Type:</strong>{rec.type && store.dict ["d.item.type"][rec.type].name}
									</div>
									<div>
										<strong className="mr-1">Cost:</strong>{rec.cost}
									</div>
									<div>
										<strong>Description:</strong>
									</div>
									<div dangerouslySetInnerHTML={{__html: `${record.description || ""}`}} />
								</div>
							</div>
							<div className="col-6 text-right">
								{record.photo && <div>
									 <img src={record.getRef ("photo")} className="img-fluid" width={300} height={200} alt={record.photo} />
								</div>}
							</div>
						</div>
					);
				})}
			</div>
		);
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
					"type", "cost"
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
	
	// new item render
	static _renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {value: new Date (), showTime: true});
		} else {
			return field;
		}
	}

	// item render
	_renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {showTime: true});
		} else {
			return field;
		}
	}
};

export default ItemModel;
