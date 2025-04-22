#!/bin/bash

# Install Python & dependencies
apt-get update && apt-get install -y python3 python3-pip
pip3 install playwright
python3 -m playwright install

# Start Node server
node server.js
