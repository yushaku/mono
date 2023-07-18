#!/bin/bash

function register() {
	curl -X POST http://localhost:8005/api/user/register \
		-H "Content-Type: application/json" \
		-d '{"email": "yushaku@gmail.com", "name": "yushaku", "password": "changeme"}' | pino-pretty
}

function login() {
	curl -X POST http://localhost:8005/api/user/login \
		-H "Content-Type: application/json" \
		-d '{"email": "yushaku@gmail.com", "password": "changeme"}' |
		pino-pretty
}

function gg() {
	curl -X GET http://localhost:8005/api/user/google \
		-H "Content-Type: application/json"
}

"$1"
