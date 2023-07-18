#!/bin/bash

curl --location --request GET 'http://localhost:8005/api/health' | pino-pretty
