let $o = require ("../../../server/objectum");

$o.db.execute ({
	"code": "catalog",
	"fn": "import",
	"file": "schema-objectum.json"
});
