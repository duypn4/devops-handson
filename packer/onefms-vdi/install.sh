#!/bin/bash

sleep 30

sudo apt-get update -y

sudo apt-get install ubuntu-desktop -y
sudo apt-get install tightvncserver -y
sudo apt-get install gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal