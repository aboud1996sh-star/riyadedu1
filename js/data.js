// ملف البيانات - قم بتعديل هذا الملف لتغيير محتوى الموقع

const siteData = {
    // معلومات عامة
    general: {
        appName: "منصة رياد التعليمية",
        appDescription: "منصة تعليمية تقدم دورات احترافية في مجالات متعددة.",
        contact: {
            whatsapp: "+966 50 000 0000",
            email: "info@riyadedu.com",
            telegram: "@riyadedu",
            telegramLink: "https://t.me/riyadedu"
        },
        appDownloadLink: "assets/app/riyad-edu.apk", // رابط ملف التطبيق
        appVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // رابط الفيديو التعريفي للتطبيق
    },

    // شرائح العرض (بانرات إعلانية للدورات)
    // ملاحظة: تم إزالة الصور ليعمل الموقع بخلفيات ملونة عصرية. يمكنك إضافة رابط صورة (image: "url") إذا أردت.
    heroSlides: [
        {
            image: "",
            title: "دورة البرمجة الشاملة",
            description: "تعلم البرمجة من الصفر حتى الاحتراف مع أحدث التقنيات."
        },
        {
            image: "",
            title: "خصومات خاصة",
            description: "اشترك الآن واحصل على عروض حصرية لفترة محدودة."
        }
    ],

    // تم حذف قسم الدورات Details بناءً على الطلب
    courses: []
};
