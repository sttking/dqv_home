#!/bin/bash

DATE=$(date +%Y%m%d%H%M)
APP_NAME="daquvhome"
APP_VERSION="0.0.1"
DEPLOY_DIR="/home/daquv/deploy/daquv_home/back"
LOG_DIR="/home/daquv/logs/daquv_home"

echo "===== 백엔드 개발 배포 시작 - $(date) ====="

# 배포 디렉토리로 이동
cd $DEPLOY_DIR || { echo "오류: 배포 디렉토리($DEPLOY_DIR)가 존재하지 않습니다."; exit 1; }

# 최신 JAR 파일 찾기
LATEST_JAR=$(ls -t ${APP_NAME}-${APP_VERSION}_*.jar 2>/dev/null | head -1)

if [ -z "$LATEST_JAR" ]; then
  echo "오류: 배포할 JAR 파일이 없습니다."
  exit 1
fi

# 현재 실행 중인 프로세스 중지
RUNNING_PID=$(ps -ef | grep java | grep ${APP_NAME} | grep -v grep | awk '{print $2}')
if [ ! -z "$RUNNING_PID" ]; then
  echo "실행 중인 백엔드 프로세스($RUNNING_PID) 중지 중..."
  kill -15 $RUNNING_PID
  sleep 5
  
  # 확실히 종료되었는지 확인
  if ps -p $RUNNING_PID > /dev/null; then
    echo "강제 종료 시도..."
    kill -9 $RUNNING_PID
    sleep 2
  fi
fi

# 기존 실행 파일 백업
if [ -f "${APP_NAME}.jar" ]; then
  mv ${APP_NAME}.jar ${APP_NAME}_$(date +%Y%m%d%H%M)_backup.jar
  echo "기존 JAR 백업 완료"
fi

# 새 파일 링크 생성
ln -sf $LATEST_JAR ${APP_NAME}.jar
echo "새 JAR 링크 생성 완료: $LATEST_JAR -> ${APP_NAME}.jar"

# 로그 디렉토리 확인
if [ ! -d "$LOG_DIR" ]; then
  echo "오류: 로그 디렉토리($LOG_DIR)가 존재하지 않습니다. 디렉토리를 먼저 생성해주세요."
  exit 1
fi

# 애플리케이션 시작
echo "백엔드 애플리케이션 시작 중..."
nohup java -jar ${APP_NAME}.jar --spring.profiles.active=dev > ${LOG_DIR}/${APP_NAME}_${DATE}.log 2>&1 &

# 시작 확인
sleep 5
NEW_PID=$(ps -ef | grep java | grep ${APP_NAME} | grep -v grep | awk '{print $2}')
if [ -z "$NEW_PID" ]; then
  echo "오류: 백엔드 애플리케이션 시작 실패"
  exit 1
else
  echo "백엔드 애플리케이션 시작 완료 (PID: $NEW_PID)"
fi

echo "===== 백엔드 개발 배포 완료 - $(date) ====="
