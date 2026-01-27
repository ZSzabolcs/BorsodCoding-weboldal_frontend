FROM oven/bun:1.1.41 AS builder
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install

COPY . .
RUN bun run build

CMD ["sh", "-c", "bun x serve -s dist -l $PORT"]