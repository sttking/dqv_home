#!/bin/bash

PROFILE=$1
DATE=$(date +%Y%m%d%H%M)

if [ -z "$PROFILE" ]; then
  PROFILE="dev"
fi

echo "===== 전체 배포 프로세스 시작 (${PROFILE}) - $(date) ====="

# 필수 디렉토리 확인
DIRS=(
  "/home/daquv/src/daquv_home/back"
  "/home/daquv/src/daquv_home/front"
  "/home/daquv/deploy/daquv_home/back"
  "/home/daquv/deploy/daquv_home/front"
  "/home/daquv/logs/daquv_home"
)

for DIR in "${DIRS[@]}"; do
  if [ ! -d "$DIR" ]; then
    echo "오류: 필수 디렉토리($DIR)가 존재하지 않습니다. 디렉토리를 먼저 생성해주세요."
    exit 1
  fi
done

# 빌드 스크립트 실행
./back_build.sh
if [ $? -ne 0 ]; then
  echo "백엔드 빌드 실패"
  exit 1
fi

./front_build.sh
if [ $? -ne 0 ]; then
  echo "프론트엔드 빌드 실패"
  exit 1
fi

# 프로필에 따른 배포 스크립트 실행
if [ "$PROFILE" == "dev" ]; then
  # 개발 환경 배포
  ./back_deploy_dev.sh
  ./front_deploy_dev.sh
elif [ "$PROFILE" == "prod" ]; then
  # 운영 환경 배포
  ./prod_deploy.sh
else
  echo "알 수 없는 프로필: $PROFILE"
  exit 1
fi

echo "===== 전체 배포 프로세스 완료 (${PROFILE}) - $(date) ====="
