#!/bin/bash

date=`date +%Y%m%d%H%M`;

cd /home/daquv/src/daquv_homepage

./gradlew clean
./gradlew build

cp build/libs/daquvhome-0.0.1-SNAPSHOT.jar /home/daquv/deploy/daquv_homepage/daquvhome-0.0.1_$date.jar
