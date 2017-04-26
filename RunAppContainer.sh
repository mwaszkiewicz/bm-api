#!/bin/sh

 docker run -itd -p 3000:3000 --name bm --link mongodb:mongodb mwaszkiewicz/bm-api