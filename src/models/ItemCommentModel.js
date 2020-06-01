import React from "react";
import {Record} from "objectum-client";

class ItemCommentModel  extends Record {
	static _renderGrid ({grid, store}) {
		return React.cloneElement (grid, {
			label: "Comments"
		});
	}
	
	static _renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {value: new Date (), showTime: true});
		} else {
			return field;
		}
	}
};
export default ItemCommentModel;
