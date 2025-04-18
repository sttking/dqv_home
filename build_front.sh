#!/bin/bash

DATE=$(date +%Y%m%d%H%M)
SRC_DIR="/home/daquv/src/daquv_home/front"
DEPLOY_DIR="/home/daquv/deploy/daquv_home/front"

echo "===== 프론트엔드 빌드 시작 - $(date) ====="

# 프론트엔드 소스 디렉토리로 이동
cd $SRC_DIR || { echo "오류: 소스 디렉토리($SRC_DIR)가 존재하지 않습니다."; exit 1; }

# Node 모듈 설치 및 빌드
npm install
npm run build

# 빌드 결과 확인
if [ $? -ne 0 ]; then
  echo "프론트엔드 빌드 실패"
  exit 1
fi

# 배포 디렉토리 확인
if [ ! -d "$DEPLOY_DIR" ]; then
  echo "오류: 배포 디렉토리($DEPLOY_DIR)가 존재하지 않습니다. 디렉토리를 먼저 생성해주세요."
  exit 1
fi

# 빌드 결과물을 압축 파일로 생성
ARCHIVE_NAME="daquv_home_front_${DATE}.tar.gz"
tar -czf "${DEPLOY_DIR}/${ARCHIVE_NAME}" -C build .

if [ $? -ne 0 ]; then
  echo "오류: 빌드 결과물 압축 실패. 권한을 확인해주세요."
  exit 1
fi

echo "프론트엔드 빌드 완료: ${DEPLOY_DIR}/${ARCHIVE_NAME}"
echo "===== 프론트엔드 빌드 완료 - $(date) ====="
