/* eslint-disable no-whitespace-before-property */
/* eslint-disable eqeqeq */

import React from "react";
import {Record, factory} from "objectum-client";

class ItemModel extends Record {
	static _renderGrid ({grid, store}) {
		return React.cloneElement (grid, {
			label: "Items",
			onRenderTable: ItemModel.onRenderTable,
			children: store.roleCode === "guest" ? null : grid.props.children
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
								</div>
							</div>
							<div className="col-6 text-right">
								{record.photo && <div>
									 <img src={record.getRef ("photo")} className="img-fluid" width={400} height={300} alt={record.photo} />
								</div>}
							</div>
						</div>
					);
				})}
			</div>
		);
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
				],
				[
					"t.item.comment"
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

	_renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {showTime: true});
		} else {
			return field;
		}
	}
};

export default ItemModel;
