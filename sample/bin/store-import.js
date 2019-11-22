let $o = require ("/opt/objectum/server/objectum");

$o.db.execute ({
	"code": "my_catalog",
	"fn": "import",
	"file": "../schema/schema-catalog.json"
});
