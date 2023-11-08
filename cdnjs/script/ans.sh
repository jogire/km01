#!/bin/bash

echo "ANS"

# 1. install curl 
sudo apt install curl 
# 2. install and use nvm
# 3. curl 'get server list ' 
# 4. for each server/random if available 
# 5. onboarding : dev , ops EASY 1 click; start 



# Formatting variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color
BOLD='\033[1m'
UNDERLINE='\033[4m'



# Directory to hold the files
DIR_NAME="secured_scripts"

# URL locations for the files on GitLab or GitHub Pages
SCRIPT_URL="https://sachita007.github.io/TestScript/script.js.enc"
VERSION_URL="https://sachita007.github.io/TestScript/version.json"

# Derive the variable name from the script name
#VAR_NAME=$(basename "$0" .sh)
VAR_NAME="key001"
echo "${VAR_NAME}"
