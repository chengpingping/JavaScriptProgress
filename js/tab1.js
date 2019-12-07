class Tab{
	constructor(id){
		//获取元素
		this.main=document.querySelector(id);
		this.ul=this.main.querySelector(".firstnav ul:first-child");
		this.tabscon=this.main.querySelector('.tabscon');
		this.tabadd=this.main.querySelector(".tabadd");
		this.init();
	}
	//获取所有的元素
	getElement(){
		this.lis=this.main.querySelectorAll('li');
		this.section=this.main.querySelectorAll('section');
		this.remove=this.main.querySelectorAll('.icon-cha');
		this.span=this.main.querySelectorAll('.firstnav li span:first-child');
	}
	init(){
		this.getElement();
		//init 初始化操作让相关的元素绑定事件
//		console.log(this.span);
		for(var i=0;i<this.lis.length;i++){
			this.lis[i].index=i;
			this.lis[i].onclick=this.toggleTab.bind(this.lis[i],this);//没有改变调用对象的this，也没有重新开辟内存保存构造函数的this；
			this.remove[i].onclick=this.removeTab(this.remove[i],this);
            this.span[i].ondblclick = this.editTab(this.span[i], this);
            this.section[i].ondblclick = this.editTab(this.section[i], this);
        }
        this.tabadd.onclick = this.addTab.bind(this.tabadd,this);//不加小括号，加小括号就直接调用函数
	}
	//切换功能
	toggleTab(that){
		that.clearClass();
		this.className='liactive';//this属于lis[i]
		that.section[this.index].className='conactive';
    }
	//清除样式
	clearClass(){
		for(var i=0;i<this.lis.length;i++){
			this.lis[i].className='';
			this.section[i].className='';
		}
	}
	//添加功能
	addTab(that){
		//清除所有的样式
		that.clearClass();
		//创建li元素
		var r=Math.random();
		var li='<li class="liactive"><span>new测试</span><span class="iconfont icon-cha"></span></li>'
		var sec='<section class="conactive">new测试'+r+'</section>';
		this.ul.insertAdjacentHTML('beforeend',li);
		this.tabscon.insertAdjacentHTML('beforeend',sec);
		this.init();
	}
	//删除功能
	removeTab(e,that){
		e.stopPropagation();//防止触发li的切换事件
		var i=this.parentNode.index;
		that.lis[i].remove();
		that.section[i].remove();
		that.init();
		//当我们删除的不是选定状态的元素不必触发鼠标事件
		if(document.querySelector('.liactive')) return;
		//让前一个li为选定状态
		i--;
		that.lis[i]&&that.lis[i].click();//直接触发点击事件
	}
	//修改功能
	editTab(e,that){
		/*e.stopPropagation();*/
		/*alert(this);*/
		var str=this.innerHTML;
		//双击禁止选定文字
		window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
		/*this.innerHTML='<input type="text" value="'+this.innerText+'"/>'*/
		this.innerHTML='<input type="text" />';
		var input=this.children[0];
		input.value=str;
		input.select();
		//失去焦点
		input.onblur=function(){
			this.parentNode.innerHTML=this.value;
		}
		//回车
		input.onkeyup=function(e){
			if(e.keyCode==13){
				this.blur();//手动调用失去焦点操作
			}
		}
		//console.log(str);
	}
}
var tab=new Tab('#tab');
