#!/bin/bash

if [ "$1" == "-i" ]
then

ssh -tt ubuntu@54.85.133.60 << 'ENDSSH'
pm2 stop _app_name_
cd _app_dir_
git pull origin master
npm i
pm2 restart _app_name_
exit 0
ENDSSH

else

ssh -tt ubuntu@54.85.133.60 << 'ENDSSH'
pm2 stop _app_name_
cd _app_dir_
git pull origin master
pm2 restart _app_name_
exit 0
ENDSSH

fi
