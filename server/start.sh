#!/bin/bash

# Install Python and pip
apt-get update && apt-get install -y python3 python3-pip

# Install Playwright and browser binaries with system override
pip3 install --break-system-packages playwright
python3 -m playwright install

# Start the Node.js backend
node server.js