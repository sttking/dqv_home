#!/bin/bash

DATE=$(date +%Y%m%d%H%M)
DEPLOY_DIR="/home/daquv/deploy/daquv_home/front"
WEB_ROOT="/var/www/html/daquv_dev"  # Nginx나 Apache 웹 루트 디렉토리

echo "===== 프론트엔드 개발 배포 시작 - $(date) ====="

# 배포 디렉토리로 이동
cd $DEPLOY_DIR || { echo "오류: 배포 디렉토리($DEPLOY_DIR)가 존재하지 않습니다."; exit 1; }

# 최신 빌드 아카이브 찾기
LATEST_BUILD=$(ls -t daquv_home_front_*.tar.gz 2>/dev/null | head -1)

if [ -z "$LATEST_BUILD" ]; then
  echo "오류: 배포할 빌드 아카이브가 없습니다."
  exit 1
fi

# 웹 루트 디렉토리 확인
if [ ! -d "$WEB_ROOT" ]; then
  echo "오류: 웹 루트 디렉토리($WEB_ROOT)가 존재하지 않습니다. 디렉토리를 먼저 생성해주세요."
  exit 1
fi

# 웹 루트 디렉토리 백업 (필요한 경우)
if [ -d "$WEB_ROOT" ] && [ "$(ls -A $WEB_ROOT 2>/dev/null)" ]; then
  BACKUP_DIR="${WEB_ROOT}_${DATE}_backup"
  if mkdir -p "$BACKUP_DIR" 2>/dev/null; then
    cp -r $WEB_ROOT/* "$BACKUP_DIR/" 2>/dev/null || true
    echo "기존 웹 콘텐츠 백업 완료: $BACKUP_DIR"
  else
    echo "경고: 백업 디렉토리를 생성할 수 없습니다. 백업 없이 진행합니다."
  fi
fi

# 웹 루트 디렉토리 비우기
rm -rf $WEB_ROOT/* || { echo "오류: 웹 루트 디렉토리($WEB_ROOT)를 비울 수 없습니다. 권한을 확인해주세요."; exit 1; }

# 아카이브 압축 해제하여 배포
echo "새 프론트엔드 빌드 배포 중: $LATEST_BUILD -> $WEB_ROOT"
tar -xzf "$LATEST_BUILD" -C "$WEB_ROOT" || { 
  echo "오류: 아카이브 압축 해제 실패. 권한을 확인해주세요."; 
  exit 1; 
}

echo "새 프론트엔드 빌드 배포 완료: $LATEST_BUILD -> $WEB_ROOT"
echo "===== 프론트엔드 개발 배포 완료 - $(date) ====="
