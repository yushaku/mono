#!/bin/bash

function ask() {
	curl -X POST http://localhost:8005/api/openai/ask \
		-H "Content-Type: application/json" \
		-d "{\"prompt\": \"$1\"}" | pino-pretty
}

function listModel() {
	curl -X GET http://localhost:8005/api/openai/listModel \
		-H "Content-Type: application/json" | pino-pretty
}

"$1" "$2"
