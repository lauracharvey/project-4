web: flask run --port $PORT --host 0.0.0.0
web: gunicorn -k flask_sockets.worker chat:app