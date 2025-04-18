#!/bin/bash

DATE=$(date +%Y%m%d%H%M)
APP_NAME="daquvhome"
APP_VERSION="0.0.1"
SRC_DIR="/home/daquv/src/daquv_home/back"
DEPLOY_DIR="/home/daquv/deploy/daquv_home/back"

echo "===== 백엔드 빌드 시작 - $(date) ====="

# 백엔드 소스 디렉토리로 이동
cd $SRC_DIR || { echo "오류: 소스 디렉토리($SRC_DIR)가 존재하지 않습니다."; exit 1; }

# Gradle 빌드 실행
./gradlew clean
./gradlew build

# 빌드 결과 확인
if [ $? -ne 0 ]; then
  echo "백엔드 빌드 실패"
  exit 1
fi

# 배포 디렉토리 확인
if [ ! -d "$DEPLOY_DIR" ]; then
  echo "오류: 배포 디렉토리($DEPLOY_DIR)가 존재하지 않습니다. 디렉토리를 먼저 생성해주세요."
  exit 1
fi

# JAR 파일 복사
cp build/libs/${APP_NAME}-${APP_VERSION}-SNAPSHOT.jar ${DEPLOY_DIR}/${APP_NAME}-${APP_VERSION}_${DATE}.jar

echo "백엔드 빌드 완료: ${DEPLOY_DIR}/${APP_NAME}-${APP_VERSION}_${DATE}.jar"
echo "===== 백엔드 빌드 완료 - $(date) ====="
