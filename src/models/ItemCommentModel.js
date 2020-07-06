import React from "react";
import {Record} from "objectum-client";

class ItemCommentModel  extends Record {
	static _renderGrid ({grid, store}) {
		return React.cloneElement (grid, {
			label: "Comments"
		});
	}
	
	static _renderForm ({form, store}) {
		return React.cloneElement (form, {
			defaults: {
				date: new Date ()
			}
		});
	}

	static _renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {showTime: true});
		} else {
			return field;
		}
	}
	
	_renderField ({field, store}) {
		return ItemCommentModel._renderField ({field, store});
	}
};
export default ItemCommentModel;
