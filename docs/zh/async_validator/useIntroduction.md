# async-validator

一个用于表单异步校验的库，参考了 [https://github.com/freeformsystems/async-validate](https://github.com/freeformsystems/async-validate)  

<!-- ## 安装
```
 npm i async-validator   
``` -->

## 使用
<br/>

基本用法包括定义描述符，将其分配给模式并将要验证的对象和回调函数传递给模式的验证方法：
@[code{2-38}](../code/validator-code.js)
<!-- docs\validate-code\code.js
docs\zh\async_validator\useIntroduction.md -->

## API

### Validate
```js
 function(source, [options], callback): Promise
```


- **source**：要验证的对象（必需）。

- **options**：描述验证处理选项的对象（可选）。

- **callback**：验证完成时调用的回调函数（必需）。

该方法将返回一个 **Promise** 对象，如：

- **then()**，验证通过

- **catch({ errors, fields })**，验证失败，errors是所有错误的数组，fields是一个以字段名为键的对象，数组为 

### Options
<br/>

- **suppressWarning**：Boolean，是否抑制内部关于无效值的警告。

- **first**：Boolean，当第一个验证规则产生错误时调用回调，不再处理更多的验证规则。 如果您的验证涉及多个异步调用（例如，数据库查询）并且您只需要第一个错误，请使用此选项。

- **firstFields**: Boolean|String[], 当指定字段的第一条验证规则出错时调用回调，不再处理同一字段的验证规则。 true 表示所有字段。

### Rules
<br/>

规则可以是执行验证的函数。
```js
 function(rule, value, callback, source, options)
```

- **rule**：源描述符中与要验证的字段名称对应的验证规则。 它总是被分配一个带有被验证字段名称的字段属性。

- **value**：正在验证的源对象属性的值。

- **callback**：验证完成后调用的回调函数。 它期望传递一个 Error 实例数组以指示验证失败。 如果检查是同步的，可以直接返回一个false或者Error或者Error Array。

- **source**：传递给验证方法的源对象。

- **options**：附加选项。

- **options.messages**：包含验证错误消息的对象，将与 defaultMessages 深度合并。

<br/>

传递给 **validate** 或 **asyncValidate** 的选项会传递给验证函数，以便您可以在验证函数中引用瞬态数据（例如模型引用）。 但是，保留了一些选项名称； 如果您使用选项对象的这些属性，它们将被覆盖。 保留的属性是消息、异常和错误。

@[code{43-61}](../code/validator-code.js)

针对单个字段的多个验证规则进行测试通常很有用，这样做可以使规则成为对象数组，例如：
@[code{64-76}](../code/validator-code.js)

#### Type
<br/>

指示要使用的验证器类型。 识别的类型值是：

- **string**: 必须是字符串类型。 这是默认类型。

- **number**: 必须是数字类型。

- **boolean**: 必须是布尔值类型。

- **method**: 必须是函数类型。

- **regexp**: 必须是RegExp的实例或创建新RegExp时不产生异常的字符串。

- **integer**: 必须是数字类型和整数。

- **float**: 必须是数字类型和浮点数。

- **array**: 必须是由 Array.isArray 确定的数组。

- **object**: 必须是对象类型，而不是 Array.isArray。

- **enum**: 枚举中必须存在值。

- **date**: 值必须由日期确定有效。

- **url**: 必须是 url 类型。

- **hex**: 必须是十六进制类型。

- **email**:必须是电子邮件类型。

- **any**: 可以是任何类型。

#### Required
<br/>

**required** 规则属性表明该字段必须存在于被验证的源对象上。

#### Pattern
<br/>

模式规则属性指示值必须匹配才能通过验证的正则表达式。 

#### Range
<br/>

范围是使用 **min** 和 **max** 属性定义的。 对于字符串和数组类型的比较是针对长度进行的，对于数字类型，数字不能小于 **min** 也不能大于 **max**。

#### Length
<br/>

要验证字段的确切长度，请指定 **len** 属性。 对于字符串和数组类型，在长度属性上进行比较，对于数字类型，此属性表示数字的精确匹配，即，它可能只严格等于 **len**。

<br/>

如果 **len** 属性与 **min** 和 **max** 范围属性结合使用，则 **len** 优先。

#### Enumerable
<br/>

>从 3.0.0 版开始，如果要验证枚举类型中的值 0 或 false，则必须明确包含它们。
<br/>

要验证可能值列表中的值，请使用枚举类型和枚举属性列出字段的有效值，例如：

```js
const descriptor = {
  role: { type: 'enum', enum: ['admin', 'user', 'guest'] },
};
```
#### Whitespace
<br/>

通常将仅包含空格的必填字段视为错误。 要为仅由空格组成的字符串添加附加测试，请将空格属性添加到值为 **true** 的规则。 规则必须是字符串类型。

<br/>

您可能希望清理用户输入而不是测试空格，请参阅转换以获取允许您去除空格的示例。 

#### Deep Rules
<br/>

如果您需要验证深层对象属性，您可以通过将嵌套规则分配给规则的字段属性来验证对象或数组类型的验证规则。

@[code{80-95}](../code/validator-code.js)
<br/>

请注意，如果您没有在父规则上指定 **required** 属性，则对于不在源对象上声明的字段是完全有效的，并且不会执行深度验证规则，因为没有任何可验证的内容。 
<br/>

深度规则验证为嵌套规则创建架构，因此您还可以指定传递给 **schema.validate()** 方法的选项。
@[code{98-116}](../code/validator-code.js)

<br/>

父规则也经过验证，因此如果您有一组规则，例如：
@[code{120-131}](../code/validator-code.js)
<br/>

并提供 **{ roles: ['admin', 'user'] }** 的源对象，然后将创建两个错误。 一种用于数组长度不匹配，另一种用于索引 2 处缺少所需的数组条目。

#### defaultField
<br/>

**defaultField** 属性可与数组或对象类型一起使用，以验证容器的所有值。 它可能是一个包含验证规则的对象或数组。 例如：

```js
const descriptor = {
  urls: {
    type: 'array',
    required: true,
    defaultField: { type: 'url' },
  },
};
```
<br/>

请注意，**defaultField** 扩展为字段，请参阅 [deep rules](#deep-rules).

#### Transform
<br/>

有时需要在验证之前转换一个值，可能是为了强制该值或以某种方式对其进行消毒。 为此，向验证规则添加一个转换函数。 属性在验证之前被转换并重新分配给源对象以改变属性的值。 

@[code{134-148}](../code/validator-code.js)

<br/>
如果输入包含前导和尾随空格，由于模式不匹配，如果没有转换函数验证将失败，但是通过添加转换函数验证通过并且字段值同时被清理。

#### Messages
<br/>

根据您的应用程序要求，您可能需要 i18n 支持，或者您可能更喜欢不同的验证错误消息。
<br/>

实现此目的的最简单方法是将消息分配给规则：

```js
{ name: { type: 'string', required: true, message: 'Name is required' } }
```
消息可以是任何类型，例如 jsx 格式。

```js
{ name: { type: 'string', required: true, message: '<b>Name is required</b>' } }
```
消息也可以是一个函数，例如 如果你使用 vue-i18n：
 
```js
{ name: { type: 'string', required: true, message: () => this.$t( 'name is required' ) } }
```
您可能需要为不同的语言使用相同的模式验证规则，在这种情况下，为每种语言复制模式规则是没有意义的。
<br/>
在这种情况下，您可以为该语言提供自己的消息并将其分配给架构：

@[code{152-160}](../code/validator-code.js)

如果您要定义自己的验证函数，最好将消息字符串分配给消息对象，然后通过验证函数中的 **options.messages** 属性访问消息。

#### validator
<br/>

您可以为指定字段自定义验证函数：

```js
const fields = {
  field: {
    validator(rule, value, callback) {
      return value === 'test';
    },
    message: 'Value is not equal to "test".',
  },

  field2: {
    validator(rule, value, callback) {
      return new Error(`${value} is not equal to 'test'.`);
    },
  },
 
  arrField: {
    validator(rule, value) {
      return [
        new Error('Message 1'),
        new Error('Message 2'),
      ];
    },
  },
};
```
## FAQ
### 如何避免警告
```js
import Schema from 'async-validator';
Schema.warning = function(){};
```
### 如何检查是否属实
<br/>

使用传递 **true** 作为选项的枚举类型。
```js
{
  type: 'enum',
  enum: [true],
  message: '',
}
```
## 测试用例

```
npm test
```

## Coverage

```
npm run coverage
```
开放 **coverage/ dir**

## License
Everything is MIT.