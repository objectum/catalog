/* eslint-disable no-whitespace-before-property */
/* eslint-disable eqeqeq */

let map = {
	"guest": {
		"data": {
			"model": {
				"item": true, "d.item.category": true, "d.item.company": true, "d.item.color": true, "t.item.comment": true
			},
			"query": {
				"objectum.userMenuItems": true
			}
		},
		"read": {
			"objectum.role": true, "objectum.user": true, "objectum.menu": true, "objectum.menuItem": true
		}
	}
};
async function _init ({store}) {
};

function _accessData ({store, data}) {
	if (store.roleCode == "guest") {
		if (data.model) {
			return map.guest.data.model [store.getModel (data.model).getPath ()];
		}
		if (data.query) {
			return map.guest.data.query [store.getQuery (data.query).getPath ()];
		}
	} else {
		return true;
	}
};

function _accessFilter ({store, model, alias}) {
};

function _accessCreate ({store, model, data}) {
	return store.roleCode != "guest";
};

function _accessRead ({store, model, record}) {
	let modelPath = model.getPath ();
	
	if (store.roleCode == "guest") {
		if (modelPath == "objectum.user") {
			return record.login == "guest";
		}
		return map.guest.read [modelPath];
	}
	return true;
};

function _accessUpdate ({store, model, record, data}) {
	return store.roleCode != "guest";
};

function _accessDelete ({store, model, record}) {
	return store.roleCode != "guest";
};

export default {
	_init,
	_accessData,
	_accessFilter,
	_accessCreate,
	_accessRead,
	_accessUpdate,
	_accessDelete
};
