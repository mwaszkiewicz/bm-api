#!/bin/sh

#Run bm container and link mongoDb container to bm application
 docker run -itd -p 3000:3000 --name bm --link mongodb:mongodb mwaszkiewicz/bm-api