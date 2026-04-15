#!/bin/sh
# Runs before the main command
set -e

echo " -- Preparing database"
rails db:prepare

echo " -- Finishing entrypoint.sh, executing '$@'"
exec "$@"
