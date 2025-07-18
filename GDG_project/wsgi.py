"""
WSGI config for GDG_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""
# GDG_project/wsgi.py

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'GDG_project.settings')

application = get_wsgi_application()

# This line is required by Vercel
app = application  # ✅ Add this line

handler = application    # ← for frameworks that look for "handler"
