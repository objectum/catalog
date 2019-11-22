DB=my_catalog
export PGPASSWORD=1
pg_dump -h 127.0.0.1 -Fc -U $DB $DB >$DB.dump
