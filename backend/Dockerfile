FROM python:3.13-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
 && rm -rf /var/lib/apt/lists/*

# Copy backend code
COPY fork_and_star_backend/ .

RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

RUN useradd --create-home --shell /bin/bash app \
 && chown -R app:app /app

USER app

EXPOSE $PORT

# Keep app.main:app but use Railway's PORT variable
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]