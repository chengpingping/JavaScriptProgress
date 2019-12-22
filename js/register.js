window.onload=function(){
	var tel=/^1[3|4|5|7|8]\d{9}$/;//手机号码正则式
	var qq=/^[1-9]\d{4,}$/;//QQ号正则表达式
	var name=/^[\u4e00-\u9fa5]{2,8}$/;
	var phone=document.querySelector('.phone');
	var QQ=document.querySelector('.QQ');
	var Name=document.querySelector('.name')
	//tel
	regExp(phone,tel);
	//QQ
	regExp(QQ,qq)
	//昵称
	regExp(Name,name);
	
	function regExp(element,regExp){
		element.onblur=function(){
			if(element.value==''){
				console.log(element.nextSibling)
				element.nextSibling.innerHTML='请输入！';
				element.nextSibling.className='';
				return 0;
			}
			if(regExp.test(element.value)){
				element.nextSibling.innerHTML='验证成功！';
				element.nextSibling.className='right';
			}else{
				element.nextSibling.innerHTML='输入有误！';
				element.nextSibling.className='wrong';
			}
		}
	}
	
}
