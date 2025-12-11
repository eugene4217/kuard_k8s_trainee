#!/bin/bash
cp /redis-config-src/*.* /redis-config

while ! ping -c redis-0.redis; do
	echo 'Waiting for server'
	sleep 2
done
