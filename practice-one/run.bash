#!/bin/bash
pid=$(sudo lsof -i :3000)
$(kill -9 $pid)
ip=$(ip -4 addr show | grep "inet " | awk '{print $2}' | cut -d'/' -f1 | sed -n "2p");
echo $ip
npx json-server --host $ip ./data/db.json & IP=$ip yarn android
