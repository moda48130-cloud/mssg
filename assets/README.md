# Victoria Assets Monitor

## โครงสร้างโปรเจกต์

```
assets/
├── index.html
├── style.css
├── script.js
├── mock_online.json
├── mock_jackpot.json
├── .nojekyll
└── README.md
```

## จุดประสงค์

- ใช้สำหรับแสดงข้อมูลผู้เล่นออนไลน์และแจ็กพอตแบบ real-time
- สามารถ deploy บน GitHub Pages และฝังใน iframe หรือ mssg.me ได้ทันที
- ไฟล์ `.nojekyll` ทำให้ GitHub Pages เสิร์ฟไฟล์ `.json` ได้

## วิธีใช้งาน

1. เปิด `index.html` ใน browser หรือ deploy ไปยัง GitHub Pages
2. ระบบจะ fetch ข้อมูลจาก `mock_online.json` และ `mock_jackpot.json` ทุก 10 วินาที
3. สามารถปรับค่า refresh interval ได้จากหน้าเว็บ
4. หาก fetch ไม่สำเร็จจะแสดง “N/A” เป็น fallback

## หมายเหตุ

- ไฟล์ `.json` ต้อง valid และไม่มี trailing comma
- ไม่ใช้ external library