نشر الموقع — تعليمات سريعة (Vercel & Netlify)

الملف: README_DEPLOY.md

ماذا أضفت في المستودع
- vercel.json: تكوين بسيط لنشر كسيتاتيك على Vercel.
- netlify.toml: تكوين نشر بسيط لـ Netlify مع إعادة توجيه إلى index.html.

خطوات النشر على Vercel
1. سجل دخولك إلى https://vercel.com/ (أو أنشئ حسابًا).
2. اختر "New Project" → اختر "Import Git Repository" → اختر repo: jalabapp/jalab.
3. في إعداد الاستيراد: Root Directory = `/`، Framework Preset = "Other", Build Command = (اتركه فارغًا)، Output Directory = `/`.
4. اضغط Deploy. Vercel سيجلب الملفات وينشر الموقع تلقائيًا مع HTTPS.
5. لإعداد نموذج التواصل: في مشروع Vercel → Settings → Environment Variables أضف:
   - KEY: FORM_ENDPOINT
   - VALUE: رابط الويب هوك (مثلاً https://formspree.io/f/your-form-id)
   - ضع المتغيّر في Environment: Production
6. بعد نشر أولي، ستحصل على رابط مثل: https://<your-project>.vercel.app أو يمكنك ربط دومين مخصص.

خطوات النشر على Netlify
1. سجل دخولك إلى https://app.netlify.com/.
2. اختر "New site from Git" → GitHub → اختر repo: jalabapp/jalab.
3. في Build settings: Build command = (فارغ)، Publish directory = `/`.
4. اضغط Deploy site. Netlify ينشر الموقع ويقدّم رابطًا مؤقتًا مع HTTPS.
5. لإعداد نموذج التواصل: Site settings → Build & deploy → Environment → Edit variables. أضف:
   - KEY: FORM_ENDPOINT
   - VALUE: رابط الويب هوك
6. لربط دومين مخصص: Site settings → Domain management → Add custom domain.

ملاحظات أمان / الأداء
- أنصح باستخدام Formspree / Getform أو API خلفي آمن لمعالجة طلبات النموذج.
- فعّل reCAPTCHA في الخدمة المختارة أو اعمل تحقق server-side.
- إن أردت، أقدّم ملف CI لتوليد favicon.ico وملفات PNG متعددة.

أخبرني بأي خدمة تفضل (Vercel أو Netlify) وسأرشدك خلال خطوة الموافقة على الربط (أستطيع إكمال الباقي بمجرد موافقتك في واجهة الخدمة، لا أحتاج بيانات حساسة منك هنا).