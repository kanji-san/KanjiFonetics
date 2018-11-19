var notFound='not found';
var keys=[
	'Иероглиф',     //0
	'Кантонский',  //1
	'Значение', //2
	'Хангыль',     //3
	'HanyuPinlu', //4
	'HanyuPinyin',//5
	'Японский (КУН)',//6
	'Японский (ОН)', //7
	'Корейский', //8
	'Путунхуа',   //9
	'Tang',       //10
	'Вьетнамский', //11
	'XHC1983',    //12
	'Фонетик',    //13
	'Чтение фонетика',//14
	'Ключ',    //15
	];

var keyMap = [0, 2, 9, 1, 7, 6, 3, 8, 11, 13, 15];

var sortedFonetic = '方光圭戈冎甫危丰勹匕果向瓜王公付官享毌鬼干夫孚吅貴豆巴刀屰必世我畢而票東工壽同反安昌成犮重冓愛昆ꀜ倉弋凡采賓啇九弔眔多音半參元畐單丱小廾旦岡曹支兹北昜癶斗敝骨也厂保次段坐旡垂巢辰氐規可台今周卉匆匃荅奥豈伏才告達寸乞夬會幸国癸ꀆ古甚叉楚余番朶另朵非争查曾皮圣乇真幼暴尸分屯ꀚ為离冬倝申亞百冘八林産朿麃白者寽隶登朋廛各祭表伐布卞長畀則咅豐𩫏发戌ꀈꀝ庚尗對且中呙ꀕ弗鼓雔車戹雋ꀂ蜀般奏出秋矣化卑夭更畜复占由土贊不丿負兓軍覃ꀌ菐艾乖至肥乏ꀙ羊就巿勾彖彡是㔾州卒麀二服丁卬本亲田戶欮噩喿棥取司父呂母步咎詹兼咸爾狄猋玨欠囱去朝大畾疑昔皋勅益盍川眞早竄册臧臿舂斬艮虍殿正豊折豕孱充辛辡道亘隹霸革互乙恩弓氏乘專丹弇尺袁垚ꀊ为ꀅ几市玄差臣無臱委臽塵备舛焱爯存芻冃敢蓋朕蚤蚩孛衣此衰攸討卜谷兵兜卓爻爽貞太春買來扁赤走户央辟毒介吊它亥亢金亙陏毳殳宕合井監氶飛戈鳥宗炎利寺㬎封奄知示式別刃会刁弁丑延度尨ꀟꀛ甘唐ꀓ竹帶算罡帝希奉规日屈灰叕ꀡꀄ島耑侖ꀁ盾有罷厷翏習翟夆ꀖ帚耳肉凹术朱臭夏允臺平杀舀束并杲及幻柬若棘交萬葡兆橐虫丐庸款蟲蠆衆止免夰失武夷兑句兒奠毚制豖象豩貝妻录泵ꀎ力焦加煩足熏思兔ꀏ兠后爿酉酋犬ꀐ戒戔戕戛丘定雩共青从用韱手頻風典食打鬲甲鹿區甶黎鼎甹齊龍午品敕丢並異矞啚疌斥ꀒ斷冉ꀀ𠬆族关皐四再山串旬圥兄易侯ꀞ石冫報岁晶ꀔ己穴穿士巨龜壬筆答最糞缶圂过罙於';

//radInSelect();

//Need check substr() in IE
function showFlist(){
for(var i=0; i<stringToArray(sortedFonetic).length;i++){
	document.getElementById('fList').innerHTML+='<a onClick=JavaScript:showSymByFon(this.innerHTML)>'+'&#'+fixedCharCodeAt(stringToArray(sortedFonetic)[i])+'</a>';
    }
}

function searchSymByFon(fonetic) {
	var res = '', count = 0;
	for (var i = 0; i < FN.length; i++) {
		if(~FN[i][0].indexOf(fonetic)) {
			res += FN[i][1];
		}
	}
return res;
}

function showSymByFon(fonetic) {
	var str = searchSymByFon(fonetic);
	document.getElementById('SymByFon').innerHTML = '';
    document.getElementById('fInfo').innerHTML = 'Список иероглифов с фонетиком ' + '<a onClick=JavaScript:pressButton(0,this.innerHTML)>'+fonetic+'</a>' + ' :';
	for (var i = 0; i < stringToArray(str).length; i++) {
		document.getElementById('SymByFon').innerHTML += '<a onClick=JavaScript:pressButton(0,this.innerHTML)>'+'&#'+fixedCharCodeAt(stringToArray(str)[i])+'</a>';
	}	
}
//----Две функции для решения проблем с иероглифами с кодами выше 0x10000---

function fixedCharCodeAt(str, idx) {
  // например, fixedCharCodeAt('\uD800\uDC00', 0); // 65536
  // например, fixedCharCodeAt('\uD800\uDC00', 1); // false
  idx = idx || 0;
  var code = str.charCodeAt(idx);
  var hi, low;

  // Старшая часть суррогатной пары (последнее число можно изменить на 0xDB7F,
  // чтобы трактовать старшую часть суррогатной пары в частной плоскости как
  // одиночный символ)
  if (0xD800 <= code && code <= 0xDBFF) {
    hi = code;
    low = str.charCodeAt(idx + 1);
    if (isNaN(low)) {
      throw 'Старшая часть суррогатной пары без следующей младшей в fixedCharCodeAt()';
    }
    return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
  }
  if (0xDC00 <= code && code <= 0xDFFF) { // Младшая часть суррогатной пары
    // Мы возвращаем false, чтобы цикл пропустил эту итерацию,
    // поскольку суррогатная пара
    // уже обработана в предыдущей итерации
    return false;
    // hi = str.charCodeAt(idx - 1);
    // low = code;
    // return ((hi - 0xD800) * 0x400) +
    //   (low - 0xDC00) + 0x10000;
  }
  return code;
}

function stringFromCodePoint(codeNum) {
	if(codeNum<0x10000) return String.fromCharCode(codeNum);
    else{
		var cp = codeNum - 0x10000;
		var high = 0xD800 | (cp >> 10);
		var low = 0xDC00 | (cp & 0x3FF);
		return String.fromCharCode(high, low);
	}
}

function stringToArray (str) {
    return str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
}
//------------------------------------

//Функция setVisibility - видимость блоков для вывода. 
//Значение 0 или пусто - невидимые; любое другое значение - видимые.
function setVisibility(isVisible){
var visibility = isVisible||0;
if(visibility == 0) 
	for(var i=0;i<keys.length;i++) document.getElementById(keys[i]).style.display = "none";
else 
	for(var i=0;i<keys.length;i++) document.getElementById(keys[i]).style.display = "block";
}

//Функция searchValueByKey - поиск в базе UNIHAN по ключу. 
//При key=0 возвращает информацию о иероглифе.
function searchValueByKey(key,value){
var result = '';
if(key>0 && key!==9 && key!==1){
for(var i=0; i<DB.length; i++)
	if (DB[i][key]){
		var str=' '+DB[i][key]+' ';
		if(~str.indexOf(' '+value+' '))result+=stringFromCodePoint(DB[i][0]);
	}
}
if(key==0){
	var code=fixedCharCodeAt(value);
	for (var i=0;i<DB.length;i++){
	if(DB[i][0]==code){result=DB[i];break;}
	}
}
if(key==9 || key==1){
for(var i=0; i<DB.length; i++)
	if (DB[i][key]){
		var str=' '+deleteTone(DB[i][key])+' ';
		if(~str.indexOf(' '+value+' ')) result+=stringFromCodePoint(DB[i][0]);
	}
}
 if(!result) return(notFound);
 else return(result);
}

function deleteTone(strng){
var str='āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜü';
var rep='aeiouvaeiouvaeiouvaeiouvv';
for(var i=0;i<str.length;i++){
	if(~strng.indexOf(str[i])) return strng.replace(str[i],rep[i]);
	if(~strng.indexOf(i)) return strng.slice(0, -1);
}
return strng;
}

function pressEnter(key,value,yourEvent) {
if(key==7||key==6||key==8) var value = value.toUpperCase();
if(yourEvent.keyCode == 13) {
	var result = searchValueByKey(key,value);
	showResult(key,value,result);
}}

function pressButton(key,value) {
if(key==7||key==6||key==8) var value = value.toUpperCase();
var result = searchValueByKey(key,value);
showResult(key,value,result);
}

function clearText(){
	document.getElementById('inputValue').value='';
}

//Функция selectKey для обработки радиокнопок. 
//Возвращает номер ключа, по которому производится поиск.
function selectKey (){
var selectKeys = document.getElementsByName('select');
for(var i = 0; i < selectKeys.length; i++)
   if(selectKeys[i].checked) return selectKeys[i].value;
}

function showResult(key, value, result){
    if(key==0){showSymbol(value, result);}
    else showInfoByKey(value, result);
}

function showSymbol(value, result){
    document.getElementById('unihanResult').innerHTML ='';
    if(result==notFound) {
       document.getElementById('unihanResult').innerHTML = 'Не найдено';
    } else {
        for(var i = 0; i < keyMap.length; i++) {
            if(!result[keyMap[i]]) {
                document.getElementById('unihanResult').innerHTML += '<div>'+keys[keyMap[i]]+'</div><div>'+'не найдено' + '</div>';
            } else {
                if(keyMap[i]==0){
                   document.getElementById('unihanResult').innerHTML += '<div>'+keys[keyMap[i]]+'</div><div>'+stringFromCodePoint(result[keyMap[i]]) + '</div>'; 
                }else
                if(keyMap[i]==15){
                   document.getElementById('unihanResult').innerHTML += '<div>'+keys[keyMap[i]]+'</div><div>' + radByNum(parseInt(result[keyMap[i]])) + '(' + parseInt(result[keyMap[i]]) +')+' + result[keyMap[i]].slice(result[keyMap[i]].indexOf('#')+1) + '</div>';
                }else
                document.getElementById('unihanResult').innerHTML += '<div>'+keys[keyMap[i]]+'</div><div>'+result[keyMap[i]] + '</div>';
            }
        }
    }
}

function showInfoByKey(value, result){
    document.getElementById('unihanResult').innerHTML ='';
    document.getElementById('symList').innerHTML ='';
    if(result==notFound) {
       document.getElementById('symList').innerHTML = 'Не найдено';
    } else {
        for(var i = 0; i<result.length; i++)
        document.getElementById('symList').innerHTML += '<a onClick=JavaScript:pressButton(0,this.innerHTML)>'+'&#'+fixedCharCodeAt(stringToArray(result)[i])+'</a>';
    }
}

//Функция showResult для вывода результатов в HTML. 
function showResultOld(key,value,result){
setVisibility();
if (key!=0){
	if(result!==notFound){
		document.getElementById(keys[0]).innerHTML = keys[key]+' : '+'<span>'+value; 
		document.getElementById(keys[2]).innerHTML = result;
		document.getElementById(keys[0]).style.display="block";
		document.getElementById(keys[2]).style.display="block";
	}
	else{
		document.getElementById(keys[0]).innerHTML = keys[key]+' : '+'<span>'+value+' '+'</span> '+notFound;
		document.getElementById(keys[0]).style.display="block";
	}
}
if(key==0){
	var code=fixedCharCodeAt(value);
	if(result!==notFound){
		document.getElementById(keys[0]).innerHTML = keys[0]+' : '+'<span>'+stringFromCodePoint(result[0])+'</span>';
		document.getElementById(keys[0]).style.display="block";
		for(var i=1;i<keys.length;i++){
		if(result[i]){
			document.getElementById(keys[i]).innerHTML = keys[i]+' : '+result[i];
			document.getElementById(keys[i]).style.display="block";
		}
	}}
	else{
		document.getElementById(keys[0]).innerHTML = keys[0]+' : '+'<span>'+value+' '+'</span> '+notFound;
		document.getElementById(keys[0]).style.display="block";
	}
}}

function radByNum(num){
	return stringFromCodePoint(0x2F00+num-1);
}

function radInSelect(){
	document.getElementById('sel').innerHTML='<option>'+'</option>'; //blank option
	for(var i=1;i<=214;i++) {
		if(i<10) document.getElementById('sel').innerHTML+=('<option>'+'00'+i+' : '+radByNum(i)+'</option>');
		else if(i>9 && i<100) document.getElementById('sel').innerHTML+=('<option>'+'0'+i+' : '+radByNum(i)+'</option>');
		else document.getElementById('sel').innerHTML+=('<option>'+i+' : '+radByNum(i)+'</option>');
	}
}

/*
var t = document.getElementById('fTable');
console.log(t);
var trs = t.getElementsByTagName("tr");
var tds = null;

for (var i=0; i<trs.length; i++)
{
    tds = trs[i].getElementsByTagName("td");
    for (var n=0; n<trs.length;n++)
    {
        tds[n].onclick=function() { console.log(this.innerHTML); }
    }
}
*/