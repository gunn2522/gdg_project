#!/bin/bash

# Install Python dependencies (if not already handled)
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --noinput

# Apply migrations
python manage.py migrate
