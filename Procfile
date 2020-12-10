web: flask run --port $PORT --host 0.0.0.0
web: gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker --log-file=- server:app