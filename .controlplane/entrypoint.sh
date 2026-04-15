#!/bin/sh
# Runs before the main command

echo " -- Preparing database"
rails db:prepare

echo " -- Finishing entrypoint.sh, executing '$@'"
exec "$@"
