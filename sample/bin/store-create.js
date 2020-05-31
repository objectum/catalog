let $o = require ("/opt/objectum/server/objectum");

$o.db.execute ({
	"code": "catalog",
	"fn": "create"
});
