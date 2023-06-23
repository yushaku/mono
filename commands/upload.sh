#!/bin/bash

# curl --location --request POST 'http://localhost:8005/files' \
# 	--form 'file=@"/home/yushaku/Pictures/anya.jpg"'

# curl --location --request POST 'http://localhost:8005/files' \
# 	--form 'file=@"/home/yushaku/Videos/actuallyKnow.mp4"'

curl --location --request POST 'http://localhost:8005/api/knowledge/crawl' \
	-H "Content-Type: application/json" \
	-d '{"url": "https://dev.to/martinp/use-notion-as-a-database-for-your-nextjs-blog-195p"}' | pino-pretty
