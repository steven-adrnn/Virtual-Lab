#!/bin/bash

# Install python dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Run database migrations
echo "Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser (opsional)
# echo "Creating superuser..."
# python manage.py createsuperuser --noinput

echo "Build completed!"