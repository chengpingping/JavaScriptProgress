window.onload=function(){
	var tel=/^1[3|4|5|7|8]\d{9}$/;//手机号码正则式
	var qq=/^[1-9]\d{4,}$/;//QQ号正则表达式
	var phone=document.querySelector('.phone');
	var QQ=document.querySelector('.QQ');
	//tel
	regExp(phone,tel);
	//QQ
	regExp(QQ,qq)
	function regExp(element,regExp){
		element.onblur=function(){
			if(element.value==''){
				element.nextSibling.nextSibling.innerHTML='请输入！';
				element.nextSibling.className='';
				return 0;
			}
			if(regExp.test(phone.value)){
				element.nextSibling.innerHTML='验证成功！';
				element.nextSibling.className='right';
			}else{
				element.nextSibling.innerHTML='请输入有误！';
				element.nextSibling.className='wrong';
			}
		}
	}
	
}
