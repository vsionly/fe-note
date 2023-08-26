**********************
| Typescript 学习笔记 |
**********************
******************************************************************************
TS中的数据类型
1、JS 已有类型
    a.原始类型，简单类型（number/string/boolean/null/undefined）
    b.复杂数据类型（数组，对象，函数等）

2、TS 新增类型

    a.联合类型  let arr: (number | string)[] = [1, 'a', 3, 'b']

    b.自定义类型（类型别名）

      type CustomArray = (number | string)[]
      let arr1: CustomArray = [1, 'a', 3, 'b']
      let arr2: CustomArray = ['x', 'y', 6, 7]

    c.函数类型

      函数的类型实际上指的是：函数参数和返回值的类型

      为函数指定类型的两种方式：
          单独指定参数、返回值的类型
          同时指定参数、返回值的类型

      ①.单独指定参数、返回值的类型：

        // 函数声明
        function add(a: number, b: number): number {
          return a + b
        }

        // 箭头函数
        const add = (a: number, b: number): number => {
        return a + b
        }

      ②.同时指定参数、返回值的类型:

        type AddFn = (a: number, b: number) => number

        const add: AddFn = (a, b) => {
          return a + b
        }

      解释：当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型
      注意：这种形式只适用于函数表达式

    d.void 类型
      如果函数没有返回值，那么，函数返回值类型为：void

      // 如果什么都不写，此时，add 函数的返回值类型为： void
      const add = () => {}
      // 这种写法是明确指定函数返回值类型为 void，与上面不指定返回值类型相同
      const add = (): void => {}

      *可选参数*
      function mySlice(start?: number, end?: number): void {
        console.log('起始索引：', start, '结束索引：', end)
      }

      可选参数只能出现在参数列表的最后，也就是说可选参数后面不能再出现必选参数

    e.类型推论 (某些没有明确指出类型的地方，TS 的类型推论机制会帮助提供类型)

      // 变量 age 的类型被自动推断为：number
      let age = 18

      // 函数返回值的类型被自动推断为：number
      function add(num1: number, num2: number): number {
        return num1 + num2
      }

      推荐：能省略类型注解的地方就省略（充分利用TS类型推论的能力，提升开发效率）

    f.对象类型(JS 中的对象是由属性和方法构成的，而 TS 对象的类型就是在描述对象的结构)

      ①基本写法
        // 空对象
        let person: {} = {}

        // 有属性的对象
        let person: { name: string } = {
          name: '同学'
        }

        // 既有属性又有方法的对象
        // 在一行代码中指定对象的多个属性类型时，使用 `;`（分号）来分隔
        let person: { name: string; sayHi(): void } = {
          name: 'jack',
          sayHi() {}
        }

        // 对象中如果有多个类型，可以换行写：
        // 通过换行来分隔多个属性类型，可以去掉 `;`
        let person: {
          name: string
          sayHi(): void
        } = {
          name: 'jack',
          sayHi() {}
        }

      ②箭头函数形式写法
        type Person = {
          greet: (name: string) => void
          greet(name: string):void
        }

        let person: Person = {
          greet(name) {
            console.log(name)
          }
        }

        type Config = {
          url: string
          method?: string
        }

      ③对象可选属性
        function axios(config: Config) {
          console.log(config)
        }

      ④使用类型别名

        注意：直接使用 {} 形式为对象添加类型，会降低代码的可读性（不好辨识类型和值）
        推荐：使用类型别名为对象添加类型

        // 创建类型别名
        type Person = {
          name: string
          sayHi(): void
        }

        // 使用类型别名作为对象的类型：
        let person: Person = {
          name: 'jack',
          sayHi() {}
        }

    g.接口类型

      当一个对象类型被多次使用时，一般会使用接口（interface）来描述对象的类型，达到复用的目的

      interface IPerson {
        name: string
        age: number
        sayHi(): void
      }

      let person: IPerson = {
        name: 'jack',
        age: 19,
        sayHi() {}
      }

      * 接口继承 *
      interface Point2D { x: number; y: number }
      // 继承 Point2D
      interface Point3D extends Point2D {
        z: number
      }

    h.元组类型
      let position: [number, number] = [39.5427, 116.2317]

    i.字面量类型

      const str2 = 'Hello TS'
      20 'abc' false function() {} { name: 'jack' } []

      * 使用模式和场景 *

      使用模式：字面量类型配合联合类型一起使用
      使用场景：用来表示一组明确的可选值列表
      使用字面量类型更加精确、严谨

    j.枚举类型

      enum Gender {
          Unknown = -1,
          Girl = 0,
          Boy = 1,
      }

    k.any类型
      原则:不推荐使用 any!这会让 TypeScript 变为 “AnyScript”(失去 TS 类型保护的优势)
      因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示

    l.类型断言

      const aLink = document.getElementById('link')

      该方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 a 标签特有的 href 等属性
      因此，这个类型太宽泛(不具体)，无法操作 href 等 a 标签特有的属性或方法

      解决方式：这种情况下就需要使用类型断言指定更加具体的类型

      使用类型断言：

      const aLink = document.getElementById('link') as HTMLAnchorElement

      const aLink = <HTMLAnchorElement>document.getElementById('link') // 不常用

    m.泛型
      泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用，常用于：函数、接口、class 中

      * 泛型函数 *

      定义：
        function id<Type>(value: Type): Type { return value }
        function id<T>(value: T): T { return value }

      调用：
        const num = id<number>(10)
        const str = id<string>('a')

      简化调用：
        let num = id(10)
        let str = id('a')

      * 推荐使用这种简化的方式调用泛型函数，使代码更短，更易于阅读
      * 当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数

      * 添加约束 *

        // 创建一个接口
        interface ILength { length: number }

        // Type extends ILength 添加泛型约束
        // 解释：表示传入的 类型 必须满足 ILength 接口的要求才行，也就是得有一个 number 类型的 length 属性
        function id<Type extends ILength>(value: Type): Type {
          console.log(value.length)
          return value
        }

      * 多个类型变量 *

        泛型的类型变量可以有多个，并且类型变量之间还可以约束(比如，第二个类型变量受第一个类型变量约束)

        * Type extends object 表示： Type 应该是一个对象类型，如果不是 对象 类型，就会报错
          如果要用到 对象 类型，应该用 object ，而不是 Object
        * keyof 关键字接收一个对象类型，生成其键(可能是字符串或数字)的联合类型。

        function getProperty<Type extends object, Key extends keyof Type>(obj: Type, key: Key) {
          return obj[key]
        }

      * 泛型接口 *

        interface IdFunc<Type> {
          id: (value: Type) => Type
          ids: () => Type[]
        }

        let obj: IdFunc<number> = {
          id(value) { return value },
          ids() { return [1, 3, 5] }
        }

        解释:
          ☆ 在接口名称的后面添加 <类型变量>，那么，这个接口就变成了泛型接口。
          ☆ 接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量。
          ☆ 使用泛型接口时，需要显式指定具体的类型(比如，此处的 IdFunc)。
          ☆ 此时，id 方法的参数和返回值类型都是 number;ids 方法的返回值类型是 number[]。

      *☆ 泛型很难 后面继续总结 ☆*

void
******************************************************************************
******************************************************************************
