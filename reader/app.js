/* No frameworks, no external requests, no secrets: deploy as static assets on Cloudflare Pages. */
'use strict';
const dict={
zh:{skip:'跳至正文',title:'入菩薩行論',interface:'選單語言',eyebrow:'BODHICARYĀVATĀRA · TEXT READER',edition:'電子對照本 · 全十品',options:'顯示選項與章節',intro:'藏文原字形與兩種漢譯並讀；每偈獨立呈現。',display:'顯示模式',modeBi:'藏中對照',modeZh:'中文（可單譯／雙譯）',modeZh2:'雙漢譯對照',modeBo:'僅藏文',translations:'漢譯版本',longName:'隆蓮法師譯',ruName:'如石法師譯',size:'中文字級',chapters:'章節',dataCaption:'文字依沈陽北塔藏文翻譯班（2010）原檔重排。',about:'來源及資料說明 ↗',jump:'前往第',verseUnit:'偈',go:'前往',searchLabel:'搜尋兩種漢譯',search:'搜尋',searchHint:'搜尋漢譯關鍵字',previous:'← 上一品',next:'下一品 →',footnote:'藏文以原 PDF 的文字影像保存，無法選取或搜尋藏文；漢譯維持可選取文字。原典有特殊句數與缺偈，未自行補入。',credit:'原檔：沈陽北塔藏文翻譯班（2010.03）；中文：隆蓮法師、如石法師。',loading:'正在載入全十品資料…',origin:'原檔',page:'頁',chapter:'第',chapterSuffix:'品',verse:'第',verseSuffix:'偈',notFound:'沒有找到對應的漢譯文字。',results:'筆結果',missing:'原檔此偈缺文；未自行補入。',noTrans:'請在左側至少勾選一種漢譯。',jumpError:'這一品沒有這個偈號。',searchTib:'藏文為原字形圖片，僅能搜尋漢譯。'},
en:{skip:'Skip to the text',title:'Bodhicaryāvatāra',interface:'Menu language',eyebrow:'BODHICARYĀVATĀRA · TEXT READER',edition:'COMPLETE READER · TEN CHAPTERS',options:'Chapters & reading settings',intro:'Original Tibetan glyphs paired with two Chinese translations, verse by verse.',display:'Text display',modeBi:'Tibetan + Chinese',modeZh:'Chinese (one or two versions)',modeZh2:'Compare two Chinese translations',modeBo:'Tibetan only',translations:'Chinese translations',longName:'Longlian translation',ruName:'Rushi translation',size:'Chinese font size',chapters:'Chapters',dataCaption:'Retypeset from the 2010 Shenyang Beita parallel edition.',about:'Source notes ↗',jump:'Go to verse',verseUnit:'',go:'Go',searchLabel:'Search the Chinese translations',search:'Search',searchHint:'Search Chinese verses',previous:'← Previous',next:'Next →',footnote:'Tibetan is reproduced as images of the source glyphs and cannot be copied or searched; Chinese remains selectable. Unusual stanza lengths and omissions in the source are retained.',credit:'Source: Shenyang Beita Tibetan Translation Class (2010.03); Chinese: Longlian and Rushi.',loading:'Loading ten chapters…',origin:'Source',page:'p.',chapter:'Ch.',chapterSuffix:'',verse:'Verse',verseSuffix:'',notFound:'No matches found in the Chinese translations.',results:'results',missing:'This verse is missing in the source; no text was invented.',noTrans:'Enable at least one Chinese translation.',jumpError:'The requested verse is not in this chapter.',searchTib:'Only Chinese text is searchable; Tibetan is in original glyph images.'},
bo:{skip:'གཞུང་ལ་མཆོངས།',title:'བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ།',interface:'སྐད་ཡིག',eyebrow:'BODHICARYĀVATĀRA',edition:'ལེའུ་བཅུ།',options:'ལེའུ་དང་འདེམས་ཀ།',intro:'བོད་ཡིག་དང་རྒྱ་ཡིག་ཕན་ཚུན་བསྡུར་བ།',display:'མངོན་ཚུལ།',modeBi:'བོད་རྒྱ་མཉམ་དུ།',modeZh:'རྒྱ་འགྱུར་གཅིག',modeZh2:'རྒྱ་འགྱུར་གཉིས།',modeBo:'བོད་ཡིག་ཁོ་ན།',translations:'རྒྱ་འགྱུར།',longName:'隆蓮法師譯',ruName:'如石法師譯',size:'རྒྱ་ཡིག་གི་ཡིག་ཚད།',chapters:'ལེའུ།',dataCaption:'མ་དཔེ། ཧྲེན་ཡང་པེ་ཐཱ། 2010',about:'ཁུངས་ཀྱི་གསལ་བཤད། ↗',jump:'ཚིགས་བཅད།',verseUnit:'',go:'འགྲོ།',searchLabel:'རྒྱ་ཡིག་འཚོལ་བ།',search:'འཚོལ།',searchHint:'རྒྱ་ཡིག་འཚོལ་བ།',previous:'← ལེའུ་གོང་མ།',next:'ལེའུ་རྗེས་མ། →',footnote:'བོད་ཡིག་ནི་མ་དཔེའི་པར་རིས་ཡིན་པས་འདྲ་བཤུས་དང་འཚོལ་བ་མི་ཐུབ།',credit:'མ་དཔེ། ཧྲེན་ཡང་པེ་ཐཱ།',loading:'ཡིག་ཆ་འགེལ་བཞིན་ཡོད།',origin:'མ་དཔེ།',page:'ཤོག',chapter:'ལེའུ་',chapterSuffix:'',verse:'ཚིགས་བཅད་',verseSuffix:'',notFound:'འཚོལ་འབྲས་མ་རྙེད།',results:'འབྲས་བུ།',missing:'མ་དཔེའི་ཚིག་མི་ཚང་།',noTrans:'རྒྱ་འགྱུར་གཅིག་འདེམས་རོགས།',jumpError:'ཚིགས་བཅད་མ་རྙེད།',searchTib:'རྒྱ་ཡིག་ཁོ་ན་འཚོལ་ཐུབ།'}
};
let book=null;
const $=id=>document.getElementById(id);
const store={get(k,def){try{return localStorage.getItem('bca-'+k)||def}catch{return def}},put(k,v){try{localStorage.setItem('bca-'+k,String(v))}catch{}}};
const state={chapter:1,mode:store.get('mode','bi')==='zh2'?'zh':store.get('mode','bi'),locale:store.get('locale','zh'),long:store.get('long','true')==='true',ru:store.get('ru','true')==='true',font:Math.max(18,Math.min(36,Number(store.get('font','23'))||23)),q:''};
const trans=key=>(dict[state.locale]||dict.zh)[key]||dict.zh[key];
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function prettify(t,type){
  if(type==='long')return String(t||'').trim();
  return String(t||'').replace(/([，。！？])/g,'$1\n').replace(/\n\n/g,'\n').trim();
}
function longHtml(raw){
  // Preserve the original two half-lines but place a large, explicit visual gap between them.
  return String(raw||'').trim().split('\n').map(line=>{
    const halves=line.split(/ {2,}/).filter(Boolean);
    return '<span class="long-line">'+halves.map(part=>'<span class="long-half">'+esc(part.trim())+'</span>').join('')+'</span>';
  }).join('');
}

function applyLocale(){
 document.documentElement.lang=state.locale==='zh'?'zh-Hant':state.locale==='bo'?'bo':'en';
 document.querySelectorAll('[data-i18n]').forEach(n=>{n.textContent=trans(n.dataset.i18n)});
 $('search-text').placeholder=trans('searchHint');
 document.title=trans('title')+' · '+trans('modeBi');
 $('locale').value=state.locale;
 const names=state.locale==='bo'?{long:'ཀླུང་།',ru:'རུ་ཤི།',both:'རྒྱ་ཡིག་༢',bo:'བོད་ཡིག',bi:'བོད་རྒྱ'}:state.locale==='en'?{long:'Longlian',ru:'Rushi',both:'Both',bo:'Tibetan',bi:'Parallel'}:{long:'隆譯',ru:'如譯',both:'雙譯',bo:'藏文',bi:'藏漢'};
 document.querySelectorAll('[data-quick]').forEach(b=>b.textContent=names[b.dataset.quick]);
 document.querySelectorAll('.mode').forEach(n=>n.classList.toggle('checked',n.querySelector('input').checked));
}
function chapterHeading(ch){
 return state.locale==='en'? `Chapter ${ch.number} · ${ch.title}` : state.locale==='bo'?`ལེའུ་ ${ch.number}`: `第${ch.number}品 · ${ch.expected} 偈`;
}
function chapterList(){
 $('chapter-list').innerHTML=book.chapters.map(ch=>`<button type="button" class="chapter-link ${ch.number===state.chapter?'active':''}" data-ch="${ch.number}" aria-current="${ch.number===state.chapter?'page':'false'}"><span>${String(ch.number).padStart(2,'0')}</span><span>${esc(state.locale==='bo'?ch.tibetanTitle:ch.title)}</span><small>${ch.expected}</small></button>`).join('');
 $('chapter-list').querySelectorAll('[data-ch]').forEach(b=>b.addEventListener('click',()=>selectChapter(Number(b.dataset.ch),true)));
}
function updateQuickBar(){
  document.querySelectorAll('[data-quick]').forEach(b=>{
    const k=b.dataset.quick;
    const active=(k==='long' && state.mode==='zh' && state.long && !state.ru)||
      (k==='ru' && state.mode==='zh' && !state.long && state.ru)||
      (k==='both' && state.mode==='zh' && state.long && state.ru)||
      (k==='bo' && state.mode==='bo')||
      (k==='bi' && state.mode==='bi');
    b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
  });
}
function modeDisplay(){
  updateQuickBar();
 $('translation-controls').hidden=state.mode==='bo';
 $('smaller').disabled=state.mode==='bo';$('larger').disabled=state.mode==='bo';
 $('size-label').textContent=state.font+' px';
 document.documentElement.style.setProperty('--zh-size',state.font+'px');
 document.querySelectorAll('input[name="mode"]').forEach(n=>{n.checked=n.value===state.mode});
 $('show-long').checked=state.long;$('show-ru').checked=state.ru;
}
function verseMarkup(ch,r){
 const no=state.locale==='zh'?`第 ${r.number} 偈`:state.locale==='en'?`Verse ${r.number}`:`ཚིགས་བཅད་ ${r.number}`;
 const loc= `${trans('origin')} ${r.sourcePages.join(', ')} ${trans('page')}`;
 let out=`<article class="verse" id="${r.id}" tabindex="-1"><div class="verse-meta"><span class="verse-number">${esc(no)}</span><span class="source-page">${esc(loc)}</span></div>`;
 if(state.mode!=='bo'){
  if(state.long)out+=`<div class="translation long"><div class="translation-label">${esc(trans('longName').split('法師')[0].split(' translation')[0])}</div><div class="chinese-poem" lang="zh-Hant">${longHtml(r.long)}</div></div>`;
  if(state.ru)out+=`<div class="translation ru"><div class="translation-label">${esc(trans('ruName').split('法師')[0].split(' translation')[0])}</div><div class="chinese-poem" lang="zh-Hant">${esc(prettify(r.ru,'ru'))}</div></div>`;
  if(!state.long&&!state.ru)out+=`<div class="no-text">${esc(trans('noTrans'))}</div>`;
 }
 if(state.mode!=='zh'){
   out+=r.tibetanImage? `<div class="tibetan-panel" lang="bo"><a class="tibetan-zoom" target="_blank" rel="noopener" href="${esc(r.tibetanImage)}" title="點按開啟藏文圖片，可放大檢視"><img class="tibetan-image" src="${esc(r.tibetanImage)}" alt="${esc('Tibetan original, '+no)}" loading="lazy" decoding="async"></a><small class="zoom-hint">點按藏文可放大</small></div>`:`<p class="no-text">${esc(trans('missing'))}</p>`;
 }
 return out+`</article>`;
}
function render(scroll=false){
 if(!book)return;
 applyLocale();modeDisplay();chapterList();
 const ch=book.chapters[state.chapter-1];
 $('chapter-index').textContent=chapterHeading(ch);
 $('chapter-heading').textContent=state.locale==='bo'?ch.tibetanTitle:ch.title;
 $('chapter-tibetan').textContent=ch.tibetanTitle;
 $('mobile-chapter').innerHTML=book.chapters.map(ch=>`<option value="${ch.number}">${ch.number}. ${esc(state.locale==='bo'?ch.tibetanTitle:ch.title)}</option>`).join('');
 $('mobile-chapter').value=String(state.chapter);
 $('verse-number').max=ch.expected;
 $('verse-number').value=1;
 const q=state.q.trim().toLocaleLowerCase();
 let chapters=q?book.chapters:[ch],hits=[];
 for(const c of chapters)for(const r of c.verses){
   if(!q||r.long.toLocaleLowerCase().includes(q)||r.ru.toLocaleLowerCase().includes(q))hits.push({c,r});
 }
 if(q){
   $('chapter-heading').textContent=trans('search')+': '+state.q;
   $('chapter-index').textContent=`${hits.length} ${trans('results')}`;
   $('chapter-tibetan').textContent='';
   $('notice').textContent=hits.length ? `${hits.length} ${trans('results')} · ${trans('searchTib')}`:trans('notFound');
 }else $('notice').textContent='';
 // All verses in one selected chapter; search output is capped to keep mobile responsive.
 const list=(q?hits.slice(0,150):hits);
 $('verse-list').innerHTML=list.map(({c,r})=>(q?`<p class="search-result-marker">${esc(c.title)} · ${r.number}</p>`:'')+verseMarkup(c,r)).join('');
 $('prev-chapter').disabled=state.chapter===1||Boolean(q);
 $('next-chapter').disabled=state.chapter===10||Boolean(q);
 if(scroll)window.scrollTo({top:0,behavior:'auto'});
 if(window.innerWidth<691)$('sidebar').classList.remove('open');
}
function selectChapter(n,scroll){
 if(n<1||n>10)return;
 state.chapter=n;state.q='';$('search-text').value='';
 history.replaceState(null,'',`#c${n}-v1`);
 render(scroll);
}
function jump(n){
 const ch=book.chapters[state.chapter-1];
 if(!Number.isInteger(n)||n<1||n>ch.expected){$('notice').textContent=trans('jumpError');return}
 if(state.q){state.q='';$('search-text').value='';render(false)}
 const id=`c${state.chapter}-v${n}`;
 const node=$(id);
 if(node){history.replaceState(null,'','#'+id);node.scrollIntoView({behavior:'smooth',block:'start'});node.classList.remove('highlight');void node.offsetWidth;node.classList.add('highlight');node.focus({preventScroll:true})}
}
function onHash(){const m=location.hash.match(/^#c(\d+)-v(\d+)$/);if(!m||!book)return;const ch=Number(m[1]),verse=Number(m[2]);if(ch>=1&&ch<=10){state.chapter=ch;render();if(verse>1)requestAnimationFrame(()=>jump(verse))}}
function bind(){
 $('mobile-toggle').addEventListener('click',()=>{
   const opened=$('sidebar').classList.toggle('open');
   $('mobile-toggle').setAttribute('aria-expanded',String(opened));
 });
 $('mobile-chapter').addEventListener('change',e=>selectChapter(Number(e.target.value),true));
 document.querySelectorAll('[data-quick]').forEach(b=>b.addEventListener('click',()=>{
   const oldVerse=[...document.querySelectorAll('#verse-list .verse')].find(v=>v.getBoundingClientRect().bottom>85);
   const oldId=oldVerse?.id;
   const k=b.dataset.quick;
   if(k==='bo') state.mode='bo';
   else if(k==='bi') {state.mode='bi';state.long=true;state.ru=true;}
   else {state.mode='zh';state.long=k!=='ru';state.ru=k!=='long';}
   store.put('mode',state.mode);store.put('long',state.long);store.put('ru',state.ru);
   render(false);
   if(oldId){const here=$(oldId); if(here)here.scrollIntoView({block:'start',behavior:'instant'});}
 }));
 $('locale').addEventListener('change',e=>{state.locale=e.target.value;store.put('locale',state.locale);render()});
 document.querySelectorAll('input[name="mode"]').forEach(el=>el.addEventListener('change',()=>{state.mode=el.value;store.put('mode',state.mode);render()})); 
 for(const [id,key] of [['show-long','long'],['show-ru','ru']])$(id).addEventListener('change',e=>{state[key]=e.target.checked;store.put(key,state[key]);render()});
 for(const [id,delta] of [['smaller',-1],['larger',1]])$(id).addEventListener('click',()=>{state.font=Math.max(18,Math.min(36,state.font+delta));store.put('font',state.font);modeDisplay()});
 $('jump-form').addEventListener('submit',e=>{e.preventDefault();jump(Number($('verse-number').value))});
 $('search-form').addEventListener('submit',e=>{e.preventDefault();state.q=$('search-text').value.trim();render(false)});
 $('prev-chapter').addEventListener('click',()=>selectChapter(state.chapter-1,true));
 $('next-chapter').addEventListener('click',()=>selectChapter(state.chapter+1,true));
 window.addEventListener('hashchange',onHash);
}
async function init(){bind();applyLocale();try{const inline=$('embedded-data'); if(inline && inline.textContent.trim()){book=JSON.parse(inline.textContent)}else{const res=await fetch('data/verses.json');if(!res.ok)throw Error('HTTP '+res.status);book=await res.json();}if(book.totalVerses!==914)throw Error('Verse index did not validate');$('loading').remove();onHash();if(!location.hash)render()}catch(err){$('loading').textContent=`${trans('loading')} — ${err.message}. Please serve through HTTP(S), not file://`}}
init();
