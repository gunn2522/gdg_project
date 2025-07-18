# api/index.py
import os
import sys
from GDG_project.wsgi import app

# Vercel expects either `app` or `handler`
# In Django, `app` is your WSGI callable, so we just expose it directly
handler = app



from django.core.wsgi import get_wsgi_application

# Ensure the app root is in the path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set environment variable to your Django settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "GDG_project.settings")

# Fix: Set DJANGO_ALLOW_ASYNC_UNSAFE for compatibility with serverless environments
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

# Fix: Ensure that Vercel uses this as entry point



import sys
sys.path.append('./GDG_project')

from django.core.asgi import get_asgi_application
app = get_asgi_application()

