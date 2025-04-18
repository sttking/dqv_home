#!/bin/bash

DATE=$(date +%Y%m%d%H%M)
LOCAL_BACK_DIR="/home/daquv/deploy/daquv_home/back"
LOCAL_FRONT_DIR="/home/daquv/deploy/daquv_home/front"
REMOTE_USER="ec2-user"
REMOTE_HOST="your-prod-server-hostname"  # 실제 운영 서버 호스트명으로 변경 필요
REMOTE_DIR="/home/ec2-user/daquv_home"
REMOTE_LOG_DIR="/home/ec2-user/logs/daquv_home"
APP_NAME="daquvhome"

echo "===== 운영 서버 배포 시작 - $(date) ====="

# 로컬 디렉토리 확인
if [ ! -d "$LOCAL_BACK_DIR" ]; then
  echo "오류: 로컬 백엔드 디렉토리($LOCAL_BACK_DIR)가 존재하지 않습니다."
  exit 1
fi

if [ ! -d "$LOCAL_FRONT_DIR" ]; then
  echo "오류: 로컬 프론트엔드 디렉토리($LOCAL_FRONT_DIR)가 존재하지 않습니다."
  exit 1
fi

# 최신 백엔드 JAR 파일 찾기
LATEST_JAR=$(ls -t ${LOCAL_BACK_DIR}/${APP_NAME}-*.jar 2>/dev/null | head -1)
JAR_FILENAME=$(basename $LATEST_JAR)

if [ -z "$LATEST_JAR" ]; then
  echo "오류: 배포할 JAR 파일이 없습니다."
  exit 1
fi

# 최신 프론트엔드 빌드 아카이브 찾기
LATEST_BUILD=$(ls -t ${LOCAL_FRONT_DIR}/build_*.tar.gz 2>/dev/null | head -1)

if [ -z "$LATEST_BUILD" ]; then
  echo "오류: 배포할 프론트엔드 빌드가 없습니다."
  exit 1
fi

# SSH 연결 테스트
ssh -q ${REMOTE_USER}@${REMOTE_HOST} exit
if [ $? -ne 0 ]; then
  echo "오류: 운영 서버(${REMOTE_USER}@${REMOTE_HOST})에 SSH 연결할 수 없습니다."
  exit 1
fi

# 운영 서버에 디렉토리 확인
ssh ${REMOTE_USER}@${REMOTE_HOST} "if [ ! -d ${REMOTE_DIR}/back ] || [ ! -d ${REMOTE_DIR}/front ] || [ ! -d ${REMOTE_LOG_DIR} ]; then echo '오류: 운영 서버에 필요한 디렉토리가 없습니다. 디렉토리를 먼저 생성해주세요.'; exit 1; fi"
if [ $? -ne 0 ]; then
  exit 1
fi

# 백엔드 JAR 파일 복사
echo "백엔드 JAR 파일 전송 중..."
scp $LATEST_JAR ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/back/
if [ $? -ne 0 ]; then
  echo "오류: 백엔드 JAR 파일 전송 실패"
  exit 1
fi

# 프론트엔드 빌드 파일 복사
echo "프론트엔드 빌드 파일 전송 중..."
scp $LATEST_BUILD ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/front/
if [ $? -ne 0 ]; then
  echo "오류: 프론트엔드 빌드 파일 전송 실패"
  exit 1
fi

# 운영 서버에서 프론트엔드 배포
FRONTEND_ARCHIVE=$(basename $LATEST_BUILD)
ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR}/front && \
  mkdir -p temp && \
  tar -xzf $FRONTEND_ARCHIVE -C temp && \
  rm -rf web/* && \
  mv temp/* web/ && \
  rmdir temp && \
  echo '프론트엔드 배포 완료'"

if [ $? -ne 0 ]; then
  echo "오류: 운영 서버 프론트엔드 배포 실패"
  exit 1
fi

# 운영 서버에서 애플리케이션 재시작
echo "운영 서버 애플리케이션 재시작 중..."
ssh ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR}/back && \
  PID=\$(ps -ef | grep java | grep ${APP_NAME} | grep -v grep | awk '{print \$2}') && \
  if [ ! -z \"\$PID\" ]; then kill -15 \$PID && sleep 5; fi && \
  if [ -f \"${APP_NAME}.jar\" ]; then mv ${APP_NAME}.jar ${APP_NAME}_\$(date +%Y%m%d%H%M)_backup.jar; fi && \
  ln -sf $JAR_FILENAME ${APP_NAME}.jar && \
  nohup java -jar ${APP_NAME}.jar --spring.profiles.active=prod > ${REMOTE_LOG_DIR}/${APP_NAME}_${DATE}.log 2>&1 &"

if [ $? -ne 0 ]; then
  echo "오류: 운영 서버 애플리케이션 재시작 실패"
  exit 1
fi

echo "운영 서버 배포 완료"
echo "===== 운영 서버 배포 완료 - $(date) ====="
