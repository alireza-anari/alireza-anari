
/* Independent, server-backed feature studios. Real HTTP exchanges; fictional data. */
(function(){
'use strict';
const supported=['discounts','notifications','analytics','gold-pricing','role-dashboards','quick-links','payment-states'];
const slug=(location.pathname.match(/^\/features\/([a-z0-9-]+)\/?$/)||[])[1];
if(!supported.includes(slug))return;
const isEn=()=>document.documentElement.lang==='en';
const t=(fa,en)=>isEn()?en:fa;
const esc=(v)=>String(v===undefined||v===null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const option=(val,fa,en)=>'<option value="'+val+'">'+esc(t(fa,en))+'</option>';
const label=(id,fa,en)=>'<label class="studio-label" for="'+id+'">'+esc(t(fa,en))+'</label>';
const fbtn=(id,fa,en)=>'<button class="studio-solid" type="button" data-run="'+id+'">'+esc(t(fa,en))+' ↗</button>';
const basicField=(id,fa,en,value,type='text')=>label(id,fa,en)+'<input class="studio-input" id="'+id+'" type="'+type+'" value="'+esc(value)+'" autocomplete="off">';
const select=(id,fa,en,options)=>label(id,fa,en)+'<select class="studio-input" id="'+id+'">'+options.map(x=>option(...x)).join('')+'</select>';
const apiBySlug={'discounts':'discounts','notifications':'notifications','analytics':'analytics','gold-pricing':'gold-pricing','role-dashboards':'role-dashboards','quick-links':'quick-links','payment-states':'payment-states'};
const formats={discounts:t('قواعد تخفیف','Discount rules'),notifications:t('موتور اعلان','Notification router'),analytics:t('گزارش تجمیعی','Summary analytics'),'gold-pricing':t('محاسبه نمونه','Sample pricing'),'role-dashboards':t('کنترل دسترسی نقش‌ها','Role policy'),'quick-links':t('ورود مستقیم به رزرو','Booking deep links'),'payment-states':t('ماشین حالات پرداخت','Payment state machine')};
let state='booked';
function content(){
if(slug==='discounts')return '<div class="studio-two">'+basicField('a-subtotal','مبلغ پایه سفارش (تومان)','Order subtotal (toman)',500000,'number')+basicField('a-coupon','کد آزمایشی','Demo coupon','DEMO10')+'</div><p class="studio-explainer">'+t('DEMO10: ده درصد تا سقف ۸۰ هزار تومان. WELCOME15: پانزده درصد تا سقف ۱۲۰ هزار تومان با حداقل سفارش ۵۰۰ هزار تومان.','DEMO10: 10% up to 80,000 toman. WELCOME15: 15% up to 120,000 with 500,000 minimum.')+'</p>'+fbtn('apply','بررسی و اعمال کوپن','Validate coupon');
if(slug==='notifications')return '<div class="studio-two">'+select('a-event','رویداد','Event',[['booking_created','ثبت رزرو','Booking created'],['rescheduled','تغییر زمان','Rescheduled'],['service_completed','پایان خدمت','Service completed'],['reminder','یادآوری','Reminder']])+select('a-channel','کانال','Channel',[['in_app','اعلان داخل سایت','In-app'],['sms','پیامک آزمایشی','Simulated SMS'],['bale','بله آزمایشی','Simulated Bale']])+select('a-role','گیرنده نمونه','Sample recipient',[['customer','مشتری','Customer'],['stylist','متخصص','Specialist'],['manager','مدیر','Manager']])+'<label class="studio-check"><input type="checkbox" id="a-optout"> '+t('گیرنده اعلان‌ها را خاموش کرده است','Recipient opted out')+'</label></div>'+fbtn('notify','ارزیابی ارسال نمونه','Evaluate sample delivery');
if(slug==='analytics')return '<div class="studio-buttons">'+[['today','امروز','Today'],['week','هفته','Week'],['month','ماه','Month']].map(x=>'<button type="button" class="studio-action" data-run="'+x[0]+'">'+t(x[1],x[2])+'</button>').join('')+'</div><div id="advanced-chart" class="studio-chart" aria-label="'+t('نمودار آزمایشی','Sample chart')+'"></div>';
if(slug==='gold-pricing')return '<div class="studio-two">'+basicField('a-weight','وزن (گرم)','Weight in grams','2.5','number')+basicField('a-rate','نرخ فرضی هر گرم (تومان)','Fictional rate / g (toman)','4500000','number')+basicField('a-labor','اجرت فرضی (%)','Illustrative labor (%)','8','number')+'</div>'+fbtn('calc','محاسبه نمونه','Calculate sample')+'<p class="studio-explainer">'+t('قیمت بازار، سود، مالیات و سیاست قیمت‌گذاری فروشگاه در این سناریو محاسبه نمی‌شوند.','This is not a live market price or final quote. Margin, taxes and actual store policies are excluded.')+'</p>';
if(slug==='role-dashboards')return '<div class="studio-two">'+select('a-role','نقش نمونه','Sample role',[['customer','مشتری','Customer'],['stylist','متخصص','Specialist'],['manager','مدیر','Manager']])+select('a-resource','بخشی که می‌خواهید ببینید','Requested section',[['overview','نمای کلی','Overview'],['finance','اطلاعات مالی','Finance'],['team','اطلاعات تیم','Team']])+'</div>'+fbtn('access','بررسی دسترسی','Check access');
if(slug==='quick-links')return '<div class="studio-buttons">'+[['salon','رزرو سالن','Salon booking'],['stylist','رزرو متخصص','Specialist booking'],['campaign','ورود کمپین','Campaign link']].map(x=>'<button type="button" class="studio-action" data-run="'+x[0]+'">'+t(x[1],x[2])+'</button>').join('')+'</div><div id="a-preview" class="studio-path" hidden></div><p class="studio-explainer">'+t('مسیرهای نمونه فقط مفهوم لینک مستقیم و منشأ مراجعه را نشان می‌دهند؛ لینک فعال رزرو یا QR قابل اسکن ساخته نمی‌شود.','Paths are conceptual only. This sandbox creates no active booking URL or scannable QR code.')+'</p>';
if(slug==='payment-states')return '<div class="studio-process" id="a-steps">'+[['booked','رزرو','Booked'],['started','شروع خدمت','Started'],['completed','پایان خدمت','Completed'],['paid','ثبت تسویه','Settled']].map(x=>'<span data-step="'+x[0]+'">'+t(x[1],x[2])+'</span>').join('<span class="studio-arr">→</span>')+'</div><div class="studio-buttons">'+[['start','شروع خدمت','Start service'],['finish','پایان خدمت','Finish service'],['collect','ثبت وجه','Record payment'],['reset','شروع مجدد','Reset scenario']].map(x=>'<button type="button" class="studio-action" data-run="'+x[0]+'">'+t(x[1],x[2])+'</button>').join('')+'</div><p class="studio-explainer">'+t('برای مشاهده کنترل انتقال وضعیت، «ثبت وجه» را قبل از «پایان خدمت» امتحان کنید. هیچ پولی منتقل نمی‌شود.','Try recording payment before service completion to see a rejected transition. No money is moved.')+'</p>';
return '';
}
function build(){
const old=document.querySelector('.demo-stage .demo-panel');if(!old)return;
old.outerHTML='<div class="studio-frame advanced-studio" data-engine="'+esc(slug)+'"><div class="studio-status"><span>EDGE / '+esc(apiBySlug[slug].toUpperCase())+'</span><span class="studio-live">'+t('API آزمایشی / داده ساختگی','LIVE DEMO API / SYNTHETIC DATA')+'</span></div><h3 class="advanced-name">'+esc(formats[slug])+'</h3>'+content()+'<output id="advanced-output" class="studio-result" aria-live="polite">'+t('برای شروع یکی از گزینه‌ها را انتخاب کنید.','Choose an option to explore the demo.')+'</output><details class="studio-json"><summary>'+t('مشاهده پاسخ HTTP و JSON','Inspect HTTP response & JSON')+' ↘</summary><pre id="advanced-trace" aria-label="HTTP JSON">{ "mode": "isolated_demo" }</pre></details><p class="studio-explainer">'+t('این یک شبیه‌ساز با API واقعی و داده ساختگی است. هیچ کاربر، مبلغ، پیام یا رزرو واقعی ایجاد یا ویرایش نمی‌شود.','A real HTTP demo API using only fictional data. No real users, payments, messages or reservations are created or modified.')+'</p></div>';
const host=document.querySelector('.advanced-studio');if(!host)return;
host.querySelectorAll('button[data-run]').forEach(b=>b.addEventListener('click',()=>run(b.dataset.run,b)));
updateSteps();
}
function val(id){return (document.getElementById(id)||{}).value||''}
function show(text){const box=document.getElementById('advanced-output');if(box)box.textContent=text}
function trace(req,status,response){const pre=document.getElementById('advanced-trace');if(pre)pre.textContent=JSON.stringify({request:req,http_status:status,response},null,2)}
const fmt=n=>Number(n).toLocaleString(isEn()?'en-US':'fa-IR');
function updateSteps(){document.querySelectorAll('#a-steps [data-step]').forEach(x=>x.classList.toggle('active',x.dataset.step===state))}
async function run(action,button){
const kind=apiBySlug[slug],payload={language:isEn()?'en':'fa'};
if(slug==='discounts')Object.assign(payload,{subtotal:Number(val('a-subtotal')),code:val('a-coupon')});
else if(slug==='notifications')Object.assign(payload,{event:val('a-event'),channel:val('a-channel'),role:val('a-role'),opt_out:!!(document.getElementById('a-optout')||{}).checked});
else if(slug==='analytics')payload.period=action;
else if(slug==='gold-pricing')Object.assign(payload,{weight:Number(val('a-weight')),rate:Number(val('a-rate')),labor:Number(val('a-labor'))});
else if(slug==='role-dashboards')Object.assign(payload,{role:val('a-role'),resource:val('a-resource')});
else if(slug==='quick-links')payload.channel=action;
else if(slug==='payment-states')Object.assign(payload,{state:state,action:action});
show(t('در حال دریافت پاسخ سرور آزمایشی...','Requesting demo server...'));
if(button)button.disabled=true;
const req={endpoint:'/api/showcase/'+kind,body:payload};
let response,code=0,ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),9000);
try{
const r=await fetch('/api/showcase/'+kind,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),signal:ctrl.signal,cache:'no-store'});code=r.status;response=await r.json();trace(req,code,response);
}catch(err){response={reply:t('خطای ارتباط با API آزمایشی. لطفاً دوباره امتحان کنید.','Demo API unavailable. Please retry.'),error:String(err)};trace(req,code,response)}
finally{clearTimeout(timeout);if(button)button.disabled=false}
if(!response)return;
let result=response.reply||response.error||'';
if(slug==='discounts'&&response.valid)result+='\n'+t('مبلغ پایه: ','Subtotal: ')+fmt(response.subtotal)+'\n'+t('تخفیف: ','Discount: ')+fmt(response.discount)+'\n'+t('مبلغ نمونه نهایی: ','Illustrative total: ')+fmt(response.total)+t(' تومان',' toman');
if(slug==='gold-pricing'&&response.illustrative_total!==undefined)result+='\n'+t('ارزش وزن با نرخ فرضی: ','Metal value: ')+fmt(response.metal_value)+'\n'+t('اجرت نمونه: ','Sample labor: ')+fmt(response.labor_value)+'\n'+t('جمع نمونه: ','Illustrative sum: ')+fmt(response.illustrative_total)+t(' تومان',' toman');
if(slug==='notifications')result+='\n'+t('وضعیت فرضی: ','Sample decision: ')+response.delivery+(response.reason?' ('+response.reason+')':'');
if(slug==='analytics'&&response.summary){const v=response.summary;result+='\n'+t('نوبت‌ها: ','Bookings: ')+fmt(v.bookings)+' · '+t('تکمیل‌شده: ','Completed: ')+fmt(v.completed)+'\n'+t('لغوشده: ','Cancelled: ')+fmt(v.cancelled)+' · '+t('در انتظار: ','Pending: ')+fmt(v.pending);drawChart(response.trend||[])}
if(slug==='role-dashboards'&&response.allowed){result+='\n'+(response.cards||[]).map(x=>x.label+': '+fmt(x.value)).join('\n')}
if(slug==='quick-links'&&response.example_path){result+='\n'+t('مسیر غیرعملیاتی نمونه: ','Non-operational example path: ')+response.example_path+'\n'+t('منبع ورود: ','Attribution tag: ')+response.attribution_tag;const b=document.getElementById('a-preview');if(b){b.hidden=false;b.textContent=response.example_path}}
if(slug==='payment-states'&&response.state){state=response.state;updateSteps();result+='\n'+t('وضعیت سناریو: ','Scenario state: ')+state}
show(result);
if(button){document.querySelectorAll('.advanced-studio .studio-action').forEach(x=>x.classList.remove('selected'));button.classList.add('selected')}
}
function drawChart(points){
const el=document.getElementById('advanced-chart');if(!el)return;const data=points.map(x=>Math.max(0,Number(x.count)||0)),maximum=Math.max(...data,1);
el.innerHTML=data.map((n,i)=>'<div class="studio-bar-wrap"><div class="studio-bar" style="height:'+Math.round(n/maximum*100)+'%" title="'+esc(n)+'"></div><span>'+fmt(i+1)+'</span></div>').join('');
}
function setup(){if(!document.querySelector('.feature-detail'))return;build()}
window.addEventListener('portfolio-render',setup);
setup();
})();
