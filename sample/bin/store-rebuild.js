let $o = require ("../../../server/objectum");

$o.db.execute ({
	"code": "catalog",
	"fn": "rebuild"
});
