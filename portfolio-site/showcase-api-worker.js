
function j(data,status=200){return new Response(JSON.stringify(Object.assign({demo:true,connected_to_production:false,data_is_sample:true},data)),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff","x-demo-mode":"isolated"}})}
const normalize=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[ي]/g,"ی").replace(/[ك]/g,"ک").replace(/\u200c/g," ").trim();
const choose=(en,fa,x)=>x==="en"?en:fa;
async function demoEndpoint(req,url){
if(url.pathname==="/api/showcase/health"&&req.method==="GET")return j({status:"ok",engine:"Cloudflare Worker",types:["loomi","bot","booking","otp"]});
if(req.method!=="POST")return j({error:"POST required"},405);
const origin=req.headers.get("origin");if(origin){try{if(new URL(origin).host!==url.host)return j({error:"same origin only"},403)}catch(e){return j({error:"invalid origin"},403)}}
if((Number(req.headers.get("content-length")||0))>2048)return j({error:"payload too large"},413);
let body;try{const raw=await req.text();if(raw.length>2048)return j({error:"payload too large"},413);body=JSON.parse(raw);if(!body||typeof body!=="object"||Array.isArray(body))throw Error("body")}catch(e){return j({error:"invalid JSON object"},400)}
const l=body.language==="en"?"en":"fa";const t=(fa,en)=>choose(en,fa,l);const name=url.pathname.split("/").pop();
if(name==="loomi"){
const message=normalize(body.message).slice(0,180);
if(!message)return j({reply:t("یک سؤال کوتاه درباره خدمات یا رزرو بنویسید.","Ask a short question about services or booking."),intent:"empty"},400);
const intent=/قیمت|هزینه|price|cost|charge/.test(message)?"price":/وقت|زمان|ساعت|نوبت آزاد|avail|slot|schedule/.test(message)?"availability":/رزرو|book|appointment/.test(message)?"booking":/آدرس|تماس|نشانی|contact|address/.test(message)?"contact":/خدمت|سرویس|services|offer|service/.test(message)?"services":"fallback";
const data={services:{tool:"get_services",reply:t("خدمات نمونه: کوتاهی مو، فیشیال پوست و مانیکور. برای هر خدمت می‌توانید درباره قیمت بپرسید.","Sample services: haircut, facial and manicure. Ask about pricing for a specific service.")},price:{tool:"get_service_price",reply:t("قیمت آزمایشی کوتاهی مو از ۳۵۰٬۰۰۰ تومان شروع می‌شود. این مبلغ واقعی نیست.","Illustrative haircut pricing starts at 350,000 toman; this is not a real quote.")},availability:{tool:"get_availability",reply:t("زمان‌های نمایشی: فردا ساعت ۱۱:۰۰ و ۱۶:۳۰. ثبت رزرو واقعی فقط در سامانه اصلی ممکن است.","Illustrative slots: tomorrow at 11:00 and 16:30. Real booking requires the original platform.")},booking:{tool:"booking_handoff",reply:t("برای نهایی‌کردن رزرو، کاربر باید در مسیر امن وب‌سایت مجموعه ادامه دهد. این دمو نوبت نمی‌سازد.","Final booking should be completed through the venue’s trusted website. This demo creates no bookings.")},contact:{tool:"get_contact",reply:t("اطلاعات تماس در محصول اصلی فقط از داده‌های عمومی مجموعه خوانده می‌شود. در دمو اطلاعات واقعی وجود ندارد.","The real product uses only publicly available venue contact details. No real contact records are included here.")},fallback:{tool:"safe_fallback",reply:t("این سؤال در محدوده داده‌های این دموی کوچک نیست. در محصول واقعی از حدس‌زدن پاسخ پرهیز می‌شود.","This is outside the small demo dataset. The production design avoids inventing unsupported answers.")}}[intent];
return j({reply:data.reply,intent,tool:data.tool,policy:"demo_public_read_only",model_used:false,write_operations_enabled:false});
}
if(name==="bot"){
const provider=body.provider==="bale"?"bale":"telegram";const role=["customer","stylist","manager"].includes(body.role)?body.role:"customer";const action=String(body.action||"menu").slice(0,30);
const messages={customer:{menu:t("👤 منوی مشتری\nنوبت‌های من · جست‌وجوی خدمات · راهنما","👤 Customer menu\nMy appointments · Search services · Help"),appointments:t("📅 دو نوبت نمونه برای این مشتری نمایش داده می‌شود.\nجزئیات دیگران قابل دسترسی نیست.","📅 Two fictional appointments belong to this sample customer.\nOther users’ records remain hidden."),find:t("🔎 جست‌وجوی نمونه: کوتاهی مو، فیشیال، مانیکور.","🔎 Sample search results: haircut, facial, manicure.")},stylist:{menu:t("✂️ منوی متخصص\nبرنامه امروز · شروع خدمت · پایان خدمت","✂️ Specialist menu\nToday · Start service · Finish service"),today:t("امروز ۴ نوبت فرضی دارید: ۹، ۱۱، ۱۴ و ۱۶.","You have four fictional bookings today: 09:00, 11:00, 14:00, 16:00."),start:t("▶ خدمت نمونه شروع شد. وضعیت نوبت در این پاسخ فقط شبیه‌سازی شده است.","▶ Sample service started. Status is simulated only."),finish:t("✓ اتمام خدمت به‌صورت نمایشی ثبت شد. در عملیات واقعی تأیید هویت و مجوز لازم است.","✓ Simulated service completion. Real actions require authorization.")},manager:{menu:t("▦ منوی مدیر\nخلاصه امروز · درخواست مرخصی · درخواست همکاری","▦ Manager menu\nDaily summary · Leave requests · Team requests"),summary:t("خلاصه ساختگی امروز\nرزرو: ۱۲ · پایان‌یافته: ۸ · در انتظار: ۳ · لغو: ۱","Fictional daily summary\nBookings: 12 · Completed: 8 · Pending: 3 · Cancelled: 1"),leave:t("۲ درخواست مرخصی نمونه برای بررسی مدیر نمایش داده می‌شود.","2 fictional leave requests are awaiting manager review."),requests:t("۱ درخواست همکاری نمونه در صف بررسی قرار دارد.","1 sample team request is pending review.")}};
const value=messages[role][action]||messages[role].menu;return j({reply:value,provider,role,action,authorization:"role-scoped demo",real_message_sent:false});
}
if(name==="booking"){
const time=String(body.time||"");if(!["09:00","10:00","11:00","12:00"].includes(time))return j({reply:t("ساعت نامعتبر است.","Invalid time slot."),slot:time,available:false},400);
if(time==="10:00")return j({reply:t("این ساعت قبلاً رزرو شده؛ درخواست با کد ۴۰۹ رد شد. از ساعت‌های آزاد انتخاب کنید.","This time is already occupied. The API rejected the request with HTTP 409."),slot:time,available:false,conflict:"overlapping_appointment",http_status:409},409);
return j({reply:t("✓ ساعت "+time+" در مجموعه داده آزمایشی آزاد است. در سیستم واقعی قبل از ثبت نهایی دوباره بررسی می‌شود.","✓ "+time+" is available in the sample dataset. A real system would recheck before committing."),slot:time,available:true,booking_created:false,http_status:200});
}
if(name==="otp"){
if(body.action==="request")return j({reply:t("کد نمونه ۱۲۳۴۵۶ آماده است. پیامک، ایمیل یا کد واقعی ارسال نشد.","Demo code 123456 is ready. No real SMS, email or OTP was sent."),sample_code:"123456",real_delivery:false,authenticated:false});
if(body.action==="verify"){const entered=normalize(body.code).replace(/[۰-۹]/g,c=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(c))).replace(/[٠-٩]/g,c=>String("٠١٢٣٤٥٦٧٨٩".indexOf(c)));const ok=entered==="123456";return j({reply:ok?t("✓ کد نمونه پذیرفته شد. نشست ورود واقعی ایجاد نشده است.","✓ Sample code accepted. No real authenticated session was created."):t("کد نمونه صحیح نیست. از ۱۲۳۴۵۶ استفاده کنید.","Sample code did not match. Use 123456."),sample_verified:ok,authenticated:false},ok?200:422)}
return j({error:"invalid demo action"},400);
}
return j({error:"unknown demo endpoint"},404);
}
