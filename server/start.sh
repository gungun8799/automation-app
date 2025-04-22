#!/bin/bash

# Install Python & dependencies
apt-get update && apt-get install -y python3 python3-pip
pip3 install playwright
python3 -m playwright install

# Start Node server
<<<<<<< HEAD
node server.js
=======
node server.js
>>>>>>> 5fbbe40 (Add custom start script for Render backend)
