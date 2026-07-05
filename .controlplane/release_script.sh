#!/bin/sh
set -e

mkdir -p db storage
./bin/rails db:prepare
