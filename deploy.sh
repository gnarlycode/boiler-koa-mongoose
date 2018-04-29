#!/bin/bash

if [ "$1" == "-i" ]
then

ssh -tt ubuntu@54.85.133.60 << 'ENDSSH'
pm2 stop dropin-backend
cd dropin-backend
git pull origin master
npm i
pm2 restart dropin-backend
exit 0
ENDSSH

else

ssh -tt ubuntu@54.85.133.60 << 'ENDSSH'
pm2 stop dropin-backend
cd dropin-backend
git pull origin master
pm2 restart dropin-backend
exit 0
ENDSSH

fi
