// node extract.js file.html → readable text of <main>/<body> without nav/footer/scripts
const fs=require('fs');const h=fs.readFileSync(process.argv[2],'utf8');
let b=(h.match(/<body[\s\S]*<\/body>/)||[h])[0];
b=b.replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi,'').replace(/<header[\s\S]*?<\/header>/i,'').replace(/<footer[\s\S]*?<\/footer>/i,'');
b=b.replace(/<img[^>]*src="([^"]+)"[^>]*>/gi,' [IMG $1] ').replace(/<a [^>]*href="([^"]+)"[^>]*>/gi,' ').replace(/<\/(p|div|h\d|li|tr|section|article|br)>/gi,'\n').replace(/<br\s*\/?>/gi,'\n').replace(/<h(\d)[^>]*>/gi,'\n## ');
b=b.replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;|&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');const E={uuml:'ü',Uuml:'Ü',ouml:'ö',Ouml:'Ö',ccedil:'ç',Ccedil:'Ç',mdash:'—',ndash:'–',laquo:'«',raquo:'»',hellip:'…',rsquo:'’',lsquo:'‘',ldquo:'“',rdquo:'”',reg:'®',copy:'©',bull:'•',Scedil:'Ş',scedil:'ş'};b=b.replace(/&([a-zA-Z]+);/g,(m,n)=>E[n]??m).replace(/&#(d+);/g,(m,n)=>String.fromCharCode(+n));
console.log(b.split('\n').map(s=>s.replace(/\s+/g,' ').trim()).filter(Boolean).join('\n'));
