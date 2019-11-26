# JavaScript进阶学习

# 面向对象

**编程思想**

	面向过程(POP:process-oriented programming)分析出解决问题的步骤。
	面向对象(OOP:object oriented programming)将事物分析成对象，然后由对象进行分工合作。

**面向对象的优点**

灵活、代码可复用、可维护、适合多人合作的大型软件项目

**面向对象的特性**

	封装性
	继承性
	多态性

## ES6中的类和对象

**思维特点**：

	抽取（抽象）对象共用的属性和行为组织（封装）成一个类（模板）；
	对象实例化，获取类的对象；

**对象**

万物皆对象

对象由**属性**和**方法**组成

	属性：事物的特征（名词）
	方法：事物的行为（动词）

### 类

ES6中增加了类class概念，使用```class```关键字声明一个类，用这个类来实例化对象；

类抽象了对象的公共部分，泛指；

对象特指某一个，通过类实例化。

**创建一个类**

语法：

	class classname{
		//class body
	}

创建实例：

	var 变量名=new classname()

必须使用new实例化一个类；

**constructor()**

类的构造函数（默认方法），用于传递参数和返回实例对象，通过```new```生成对象实例时，自动调用给方法；如果没有显示定义，类内部会自动创建一个constructor();

在类中所有的函数都不需要加```function```;

类中共有的属性放在constructor中；

	constructor(){
		……
	}

**方法**

和constructor类相似，不需要加function；

多个函数之间不需要加逗号分隔

## 类的继承

**extends关键字**

	class Son extends Father{
		……
	}

**super关键字**

在子类的构造函数中调用父类的构造函数

	class Son extends Father{
		constructor(){
			super();//调用父类的构造函数		
		}
	}

super除了调用父类的普通函数

	class Son extends Father{
		普通函数(){
			super.普通函数();
		}
	}

super必须在子类this**之前**调用

**注意**

在ES6中类没有变量提升，所以需要先定义类，才能通过类实例化；

类里共有的属性和方法一定要加this使用；

类里面this的指向问题：

	constructor中的this指向的是创建的对象
	普通函数中的this指向的是实例化对象，但是this始终指向的是方法的调用者

## 面向对象实例

[添加标签](./demo/02-添加标签的案例.html)

# 构造函数和原型

在ES6之前，JS没有引入构造函数的概念；使用**构造函数创建对象**的，class是在ES6之后才有的；

在ES6之前使用构造函数和原型来模拟实现类和类的继承；

## 构造函数和原型

**创建对象**

	var obj=new Object();//使用new
	var obj={};//使用字面量

构造函数创建对象：

	function 构造函数(){
		this.属性=属性值；
		……
	};//使用构造函数
	var obj=new 构造函数();//实例化对象

**静态成员和实例成员**

实例成员是构造函数内部通过**this添加**的成员，通过实例化对象（new）进行访问，不能通过构造函数访问

静态成员是在**构造函数**本身上添加成员，通过构造函数来访问，不能通过对象访问；

**构造函数的问题**

构造函数存在浪费内存的问题：

	创建构造函数的实例时，会使用到new（new创建对象会有四个步骤）；
	如果构造函数中有复杂的数据类型，每new一个会重新开辟一个新的内存空间；

有时候我们希望所有的对象都使用同一个函数，不用去新开辟一个空间存放这个函数；

我们可以使用prototype，实现函数共享！

**构造函数原型prototype**

每一个**构造函数**里面都有一个```prototype```属性，指向一个对象(原型对象)。

通过Prototype（原型）分配的函数是所有的对象所共享的。

所以我们可以**把不变的方法直接定义在prototype对象上**，这样所有的对象就可以共享一个对象；

原型是一个可以**共享**的方法。

**在prototype上定义方法**

	Obj.prototype.sing=function(){
		console.log("sing a song");
	}

注意：

	一般情况下，公共属性定义在构造函数里面；公共方法定义在原型对象上；

**对象原型_proto_**

_proto_指向构造函数上的原型对象，所以对象就可以使用构造函数上的原型函数；

_proto_**不能直接使用**，他只用于指向构造函数中的原型。

**constructor构造函数**

```构造函数的原型对象(prototype)```和```对象原型(_proto_)```中都有一个```constructor```属性；

用于指明对象是由哪个构造函数创建的；

许多情况下会使用```constructor```这个属性只会原来的构造函数

如果修改了原来的原型对象，给原型对象赋值了一个**对象**，则必须**手动指回原来的构造函数**，不然就变成一个孤儿；

	构造函数.prototype={
		constructor:构造函数;//手动指回原来的构造函数，如果没有构造函数会被后面的对象覆盖；
		fn1:function(){
		……
		},
		fn1:function(){
		……
		}
	}

对象原型（_proto_）里的constructor是通过原型对象（prototype）里的constructor指回的构造函数。

	对象.__proto__.constructor==构造函数.prototype.constructor

原型对象（prototype）中也有一个对象原型```__proto__```，指向的是Object的原型对象（prototype）；

Object原型对象（prototype）的对象原型（__proto__）为**空（null）**;

**js中的查找机制**

按照**原型链**的顺序进行查找：

	1.先在构造函数中查找；
	2.构造函数中没有，就在构造函数的原型上查找；
	3.构造函数的原型中查找不到就在Object的原型中查找；
	4.如果Object的原型上查找不到，就会返回查找不到。

注意：查找规则是**就近原则**；

tips:toString()在Object的原型（prototype）上；

**原型对象上的this指向**

构造函数中的this指向调用者（实例对象）；

原型对象中的this也是指向的调用者（实例对象）；

	以函数形式调用：this指向window（函数是由window调用的，所以实际上还是指向调用者）;
	以方法形式调用：this指向调用方法的对象；

**扩展内置对象**

可以用原型对象，对原来的内置对象进行扩展

比如在Array中添加一个求和的方法

	Array.prototype.sum=function(){
		var sum=0;
		for(var i=0;i<this.length;i++){
			sum+=this[i];
		}
		return sum;
	}

注意：不能直接覆盖原先的内置对象的原型对象（不能让原型对象等于一个对象）！

## 继承

在ES6之前没有extends继承，我们可以通过**构造函数+原型对象**模拟实现继承，叫做**组合继承**。

### call()

调用这个函数，并且修改this的指向；

	fun.call(thisArg,arg,arg2,…);

thisArg:当前调用函数this的指向对象；

arg:传递的其他函数；

**作用**

	1.调用函数；
	2.修改函数this的指向；（主要）

**改变this指向**

	function fn(x,y){
		console.log(this);//o object
		console.log(x+y);
	}
	var o={};//object
	fn.call(o,1,2);

### 借用构造函数继承父类型的属性

	/*父构造函数*/
	function father(uname,age){
		/*this指向父构造函数的对象实例*/
		this.uname=uname;
		this.age=age;
	}
	/*子构造函数*/
	function son(uname,age){
		/*this指向子构造函数的对象实例*/
		/*如果想要使用father中的属性和方法使用call*/
		father.call(this,uname,age);//调用father构造函数，改变father中this的指向；
	}
	var s=new son('xiaoming','20');
	console.log(s);

只需要**father.call(this,uname,age);**这一句话，就可以让子类访问父类的属性；

**前面提到公共的属性写在构造函数中，公共的方法写在原型对象里**，所以在继承父类中的方法时可以使用：

	son.prototype=son.prototype;//继承父构造函数的原型

这种方法有一个问题，当子类想要在原型函数上添加一个自己的方法时，父类的原型函数也会被改变；

因为父类只是将原型地址给了子类，所以他们访问的是同一个空间；

**！！！所以上面的方法是错误的**,进一步改进：

	son.prototype=new father;/*此时访问father的原型对象的函数，会沿着原型链去查找访问*/

这时候访问父类的方法会沿着**原型链**进行访问；new会在内存中实例化一个father对象，因此不会改变构造函数；

前面提到，如果使用对象的形式改变了原型对象，**constructor会被覆盖**；

所以我们要将子类的constructor手动指回来：

	son.prototype.construtor=son;//将constructor指回子类构造函数

tips:断点调试！断点>刷新页面>F11;

### 类的本质

类的本质是一个函数(function),可以将类看作**构造函数**的另一种写法；

构造函数的特点：

	1.构造函数有一个原型对象prototype；
	2.构造函数原型对象prototype里面有constructor指向构造函数本身
	3.构造函数可以通过原型对象添加方法
	4.构造函数实例化的对象上有一个__proto__原型指向了构造函数的原型对象

**1.类中的原型对象,也可以在原型对象上添加方法**

**2.类的实例化对象也有__proto__**

**3.类其实就是语法糖，语法糖就是简化原来的写法，现在的写法更加的清晰方便**
 
## ES5中新增的方法

ES5中新增了一些方法，可以方便操作数组或则字符串。

### 数组方法

迭代（遍历）方法：forEach() map() some() every()

**forEach**

	array.forEach(function(currentValue, index[, arr]){
	……
	});//适合求数组的和

currentValue:数组当前项的值；

index:数组当前项的索引；

arr:数组对象本身；

**filter**

创建一个新数组，新数组中的元素是通过检查指定的数组中符合条件的所有元素，**主要用于筛选数组**；

	array.filter(function(currentValue,index[,arr]){
		return 返回条件;
	});//适合求满足要求的数组

参数和forEach一样；

**他会返回一个新数组！！！**

**some**

查找数组中的元素**是否**满足指定条件；

	array.some(function(currentValue,index){
		return 满足的条件;
	})//返回true/false;是否有满足条件的元素

**返回值是布尔值，如果找到了返回true，没有找到返回false;**

当查找到第一个满足条件的元素就会返回，不会继续查找后面的元素；

**filter和some的区别**

	同：都是查找满足条件的元素；
	不同：
		filter返回一个数组；返会满足条件的元素，会检查整个数组；
		some返回一个布尔值；查找到第一个满足条件的元素就返回；

map()、every()与forEach()、filter()的用法一致；

### 字符串方法



### 对象方法


