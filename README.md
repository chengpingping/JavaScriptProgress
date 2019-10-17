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
			super();		
		}
	}

super除了调用父类的普通函数

	class Son extands Father{
		普通函数(){
			super.普通函数();
		}
	}

## 面向对象实例