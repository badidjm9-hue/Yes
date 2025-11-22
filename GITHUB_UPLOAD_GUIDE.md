# دليل رفع مشروع Volo إلى GitHub

## 📋 المتطلبات المسبقة
- حساب GitHub
- Git مثبت على جهازك
- مفتاح SSH أو HTTPS للوصول إلى GitHub

## 🚀 خطوات الرفع

### 1. إنشاء مستودع جديد على GitHub
1. اذهب إلى [GitHub.com](https://github.com)
2. اضغط على "+" في الزاوية العلوية اليمنى
3. اختر "New repository"
4. أدخل اسم المستودع: `volo-hotel-booking-platform`
5. أضف وصف: "Advanced Hotel Booking Platform with ChatGPT AI Integration"
6. اختر "Public" أو "Private" حسب تفضيلك
7. لا تقم بتهيئة README (.gitignore، license) لأن لديك ملفات موجودة بالفعل
8. اضغط "Create repository"

### 2. ربط المشروع بـ GitHub

انسخ الأوامر التالية ونفذها في terminal من مجلد المشروع:

```bash
# إضافة remote origin
git remote add origin https://github.com/YOUR_USERNAME/volo-hotel-booking-platform.git

# تغيير اسم الفرع الرئيسي إلى main (إذا كان master)
git branch -M main

# رفع المشروع
git push -u origin main
```

### 3. إعداد SSH (اختياري - للأمان أكثر)
إذا كنت تفضل استخدام SSH:

```bash
# إزالة HTTPS remote
git remote remove origin

# إضافة SSH remote
git remote add origin git@github.com:YOUR_USERNAME/volo-hotel-booking-platform.git

# رفع المشروع
git push -u origin main
```

## 📁 محتويات المستودع

### الملفات الرئيسية:
- `src/` - كود المصدر الكامل للتطبيق
- `public/` - الملفات العامة (إذا وجدت)
- `prisma/` - قاعدة البيانات والـ schema
- `package.json` - متطلبات المشروع
- `next.config.js` - إعدادات Next.js
- `tailwind.config.ts` - إعدادات Tailwind CSS
- `tsconfig.json` - إعدادات TypeScript

### ملفات التوثيق:
- `README.md` - توثيق شامل للمشروع
- `SETUP.md` - دليل الإعداد والتشغيل
- `CHATGPT_INTEGRATION_REPORT.md` - تقرير تكامل ChatGPT
- `.env.example` - مثال متغيرات البيئة

### ملفات الإعداد:
- `.gitignore` - إعدادات Git
- `docker-compose.yml` - إعداد Docker
- `postcss.config.js` - إعدادات PostCSS

## 🔐 متغيرات البيئة المطلوبة

بمجرد رفع المشروع، ستحتاج إلى إعداد متغيرات البيئة التالية:

```env
# OpenAI (للذكاء الاصطناعي)
OPENAI_API_KEY=your_openai_api_key_here

# قاعدة البيانات
DATABASE_URL=your_database_url

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (اختياري)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# بوابات الدفع
CCP_MERCHANT_ID=your_ccp_merchant_id
CCP_SECRET_KEY=your_ccp_secret_key
BARIDIMOB_API_KEY=your_baridimob_api_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# خدمات أخرى
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_ANALYTICS_ID=your_google_analytics_id
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
REDIS_URL=your_redis_url
```

## 📝 أوامر مفيدة لإدارة المشروع

```bash
# تحديث المشروع من GitHub
git pull origin main

# إضافة ميزات جديدة
git add .
git commit -m "Add new feature: description"
git push origin main

# إنشاء فرع جديد للميزات
git checkout -b feature/new-feature-name
git push origin feature/new-feature-name

# دمج الفرع الرئيسي
git checkout main
git merge feature/new-feature-name
git push origin main
```

## 🌐 روابط مفيدة

- [وثائق Next.js](https://nextjs.org/docs)
- [وثائق Tailwind CSS](https://tailwindcss.com/docs)
- [وثائق Prisma](https://www.prisma.io/docs)
- [وثائق OpenAI API](https://platform.openai.com/docs)
- [دليل GitHub](https://docs.github.com/en)

## 📞 الدعم

إذا واجهت أي مشاكل في رفع المشروع:
1. تأكد من أن Git مثبت بشكل صحيح
2. تحقق من صحة بيانات الوصول إلى GitHub
3. تأكد من أن المستودع تم إنشاؤه بنجاح
4. راجع رسائل الأخطاء في terminal

---

**ملاحظة**: تأكد من عدم رفع ملفات `.env` الفعلية التي تحتوي على مفاتيح حساسة!
