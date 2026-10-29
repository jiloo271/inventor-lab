# Inventor Lab — เว็บไซต์ของ ป๋อ จิรายุ

เว็บไซต์ Portfolio แบบ Static ใช้ HTML + CSS + JavaScript ล้วน ไม่ต้องมี Backend ไม่ต้องติดตั้งไลบรารี

## ไฟล์ในโปรเจกต์

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | เนื้อหาและโครงสร้างหน้าเว็บ + SEO / Open Graph |
| `style.css` | ดีไซน์ ธีมสี และ Responsive |
| `script.js` | เมนูมือถือ ตัวกรองโปรเจกต์ แอนิเมชัน ปุ่มคัดลอก |
| `robots.txt`, `sitemap.xml` | ไฟล์สำหรับ SEO (ต้องแก้ URL ก่อนเผยแพร่) |

## เปิดบนคอมพิวเตอร์

ดับเบิลคลิก `index.html` เบราว์เซอร์จะเปิดได้ทันที

## เปิดบน Android

**วิธี A: ใช้เบราว์เซอร์**
1. แตก ZIP ด้วยแอปจัดการไฟล์ (Files by Google หรือ My Files ของ Samsung) → แตกไฟล์ไว้ในโฟลเดอร์เดียวกัน
2. กดค้างที่ `index.html` → เลือก "เปิดด้วย" → Chrome
3. ถ้าเปิดไม่ได้ ใช้วิธี B

**วิธี B: ใช้ Termux (เซิร์ฟเวอร์ในเครื่อง)**
```bash
pkg install python
cd /storage/emulated/0/Download/inventor-lab   # แก้เป็นโฟลเดอร์ที่แตกไฟล์ไว้
python -m http.server 8080
```
แล้วเปิด Chrome ไปที่ `http://localhost:8080` (หากเข้าโฟลเดอร์ไม่ได้ ให้รัน `termux-setup-storage` ก่อน)

## แก้ไขเนื้อหา

- **ชื่อ/คำโปรย:** ส่วน `<section class="hero">` ใน `index.html`
- **โปรเจกต์ใหม่:** คัดลอกบล็อก `<article class="card" ...>` แล้วแก้ชื่อ คำอธิบาย และ `data-status` (`experiment` หรือ `concept`) พร้อมป้าย `.badge` ให้ตรงสถานะจริง
- **ช่องทางติดต่อ:** แก้ใน `<section id="contact">` เช่นเพิ่มลิงก์ `mailto:` หรือโซเชียลที่ยืนยันแล้ว
- **สี:** แก้ตัวแปรใน `:root` ของ `style.css` (`--accent`, `--accent-2`, `--bg`)

> หลักการเนื้อหา: ใส่เฉพาะข้อมูลที่เป็นจริงและมีหลักฐาน โปรเจกต์ที่ยังเป็นแนวคิดต้องระบุว่าเป็นแนวคิด

## เผยแพร่ด้วย GitHub Pages (ฟรี)

1. สมัคร/เข้าสู่ระบบ GitHub → สร้าง Repository ใหม่ (เช่น `inventor-lab`) แบบ Public
2. อัปโหลดไฟล์ทั้งหมด (ผ่านเว็บ: Add file → Upload files)
3. ไปที่ Settings → Pages → Source เลือก "Deploy from a branch" → Branch `main` / โฟลเดอร์ `/ (root)` → Save
4. รอประมาณ 1–3 นาที จะได้ลิงก์ `https://ชื่อผู้ใช้.github.io/inventor-lab/`
5. แก้ `YOUR-USERNAME.github.io/YOUR-REPO` ใน `index.html` (canonical, og:url), `robots.txt` และ `sitemap.xml` ให้เป็นลิงก์จริง

### ออนไลน์แล้ว ≠ ติดอันดับ Google แล้ว

- **เว็บไซต์ออนไลน์:** เปิดลิงก์ GitHub Pages ได้ แปลว่าเผยแพร่สำเร็จ
- **ถูกจัดทำดัชนีใน Google:** เป็นอีกขั้นหนึ่ง Google ตัดสินใจเอง และไม่มีใครรับประกันเวลาหรือผลลัพธ์ได้

เพื่อให้ Google พบเว็บไซต์:
1. เข้า [Google Search Console](https://search.google.com/search-console) → เพิ่มพร็อพเพอร์ตี้แบบ URL prefix ด้วยลิงก์เว็บไซต์
2. ยืนยันความเป็นเจ้าของ (ทำตามวิธีที่ระบบแนะนำ)
3. ส่ง `sitemap.xml` ในเมนู Sitemaps
4. ใช้ "URL Inspection" ตรวจ URL หน้าแรก แล้วกด "Request Indexing"
5. ตรวจสถานะในรายงาน Pages — อาจใช้เวลาหลายวันถึงหลายสัปดาห์ และ Google อาจไม่ทำดัชนีทุกหน้า
6. ลองค้นหา `site:ลิงก์เว็บไซต์ของคุณ` เพื่อดูว่าถูกจัดทำดัชนีหรือยัง
