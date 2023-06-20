#!/bin/bash

# curl --location --request POST 'http://localhost:8005/files' \
# 	--form 'file=@"/home/yushaku/Pictures/anya.jpg"'

curl --location --request POST 'http://localhost:8005/files' \
	--form 'file=@"/home/yushaku/Videos/actuallyKnow.mp4"'
