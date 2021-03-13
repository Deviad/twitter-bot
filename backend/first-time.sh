!/usr/bin/env bash
mongo --host  localhost:27017 -u root -p example --authenticationDatabase admin
docker exec  backend_mongo_1 bash -c "mongo --host  localhost:27017 -u root -p example --authenticationDatabase admin"

