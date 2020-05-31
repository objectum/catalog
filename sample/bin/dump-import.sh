DB=catalog
export PGPASSWORD=12345
dropdb -h 127.0.0.1 -U postgres $DB
createdb -h 127.0.0.1 -U postgres --tablespace $DB $DB
pg_restore -Fc -j 4 -h 127.0.0.1 -U postgres -d $DB $DB.dump
