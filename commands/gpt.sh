#!/bin/bash

function ask() {
	curl -X POST http://localhost:8005/api/openai/ask \
		-H "Content-Type: application/json" \
		-d "{\"prompt\": \"$1\"}" | pino-pretty
}

ask "$1"
