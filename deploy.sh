#!/bin/bash

echo "🚀 Deploying Victoria Assets Monitor..."

# ตรวจสอบว่า assets/ มีอยู่
if [ ! -d "assets" ]; then
  echo "❌ ไม่พบโฟลเดอร์ assets/"
  exit 1
fi

# สร้าง orphan branch สำหรับ GitHub Pages
git checkout --orphan gh-pages
git rm -rf .

# คัดลอกไฟล์ทั้งหมดจาก assets ไปยัง root
cp -r assets/* .

# ตรวจสอบว่า .nojekyll อยู่ใน root
if [ -f ".nojekyll" ]; then
  echo "✅ พบไฟล์ .nojekyll"
else
  echo "⚠️ ไม่พบไฟล์ .nojekyll — GitHub Pages อาจไม่เสิร์ฟ .json"
fi

# Commit และ push
git add .
git commit -m "Deploy Victoria Assets Monitor"
git push origin gh-pages --force

# กลับไปที่ main branch
git checkout main

echo "✅ Deployment เสร็จสมบูรณ์"
echo "🌐 เปิดหน้าเว็บที่: https://moda48130-cloud.github.io/mssg/index.html"
