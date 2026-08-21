FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOST=0.0.0.0 \
    PORT=8000

WORKDIR /app

COPY backend ./backend
COPY assets ./assets
COPY components ./components
COPY css ./css
COPY data ./data
COPY js ./js
COPY pages ./pages
COPY index.html ./index.html
COPY LICENSE ./LICENSE

EXPOSE 8000

CMD ["python", "backend/server.py"]
