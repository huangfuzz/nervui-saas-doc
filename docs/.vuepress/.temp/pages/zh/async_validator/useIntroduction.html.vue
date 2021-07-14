<template><h1 id="async-validator" tabindex="-1"><a class="header-anchor" href="#async-validator" aria-hidden="true">#</a> async-validator</h1>
<p>一个用于表单异步校验的库，参考了 <a href="https://github.com/freeformsystems/async-validate" target="_blank" rel="noopener noreferrer">https://github.com/freeformsystems/async-validate<OutboundLink/></a></p>
<!-- ## 安装
```
 npm i async-validator   
``` -->
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<br/>
<p>基本用法包括定义描述符，将其分配给模式并将要验证的对象和回调函数传递给模式的验证方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Schema <span class="token keyword">from</span> <span class="token string">'async-validator'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function-variable function">validator</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span> value <span class="token operator">===</span> <span class="token string">'muji'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'number'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">asyncValidator</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">'too young'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// reject with error message</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'muji'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">errors<span class="token punctuation">,</span> fields</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>errors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// validation failed, errors is an array of all errors</span>
    <span class="token comment">// fields is an object keyed by field name with an array of</span>
    <span class="token comment">// errors per field</span>
    <span class="token keyword">return</span> <span class="token function">handleErrors</span><span class="token punctuation">(</span>errors<span class="token punctuation">,</span> fields<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// validation passed</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// PROMISE USAGE</span>
validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'muji'</span><span class="token punctuation">,</span> age<span class="token operator">:</span> <span class="token number">16</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// validation passed or without error message</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> errors<span class="token punctuation">,</span> fields <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">handleErrors</span><span class="token punctuation">(</span>errors<span class="token punctuation">,</span> fields<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><!-- docs\validate-code\code.js
docs\zh\async_validator\useIntroduction.md -->
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<h3 id="validate" tabindex="-1"><a class="header-anchor" href="#validate" aria-hidden="true">#</a> Validate</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span><span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span><span class="token operator">:</span> Promise
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>
<p><strong>source</strong>：要验证的对象（必需）。</p>
</li>
<li>
<p><strong>options</strong>：描述验证处理选项的对象（可选）。</p>
</li>
<li>
<p><strong>callback</strong>：验证完成时调用的回调函数（必需）。</p>
</li>
</ul>
<p>该方法将返回一个 <strong>Promise</strong> 对象，如：</p>
<ul>
<li>
<p><strong>then()</strong>，验证通过</p>
</li>
<li>
<p><strong>catch({ errors, fields })</strong>，验证失败，errors是所有错误的数组，fields是一个以字段名为键的对象，数组为</p>
</li>
</ul>
<h3 id="options" tabindex="-1"><a class="header-anchor" href="#options" aria-hidden="true">#</a> Options</h3>
<br/>
<ul>
<li>
<p><strong>suppressWarning</strong>：Boolean，是否抑制内部关于无效值的警告。</p>
</li>
<li>
<p><strong>first</strong>：Boolean，当第一个验证规则产生错误时调用回调，不再处理更多的验证规则。 如果您的验证涉及多个异步调用（例如，数据库查询）并且您只需要第一个错误，请使用此选项。</p>
</li>
<li>
<p><strong>firstFields</strong>: Boolean|String[], 当指定字段的第一条验证规则出错时调用回调，不再处理同一字段的验证规则。 true 表示所有字段。</p>
</li>
</ul>
<h3 id="rules" tabindex="-1"><a class="header-anchor" href="#rules" aria-hidden="true">#</a> Rules</h3>
<br/>
<p>规则可以是执行验证的函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> source<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>
<p><strong>rule</strong>：源描述符中与要验证的字段名称对应的验证规则。 它总是被分配一个带有被验证字段名称的字段属性。</p>
</li>
<li>
<p><strong>value</strong>：正在验证的源对象属性的值。</p>
</li>
<li>
<p><strong>callback</strong>：验证完成后调用的回调函数。 它期望传递一个 Error 实例数组以指示验证失败。 如果检查是同步的，可以直接返回一个false或者Error或者Error Array。</p>
</li>
<li>
<p><strong>source</strong>：传递给验证方法的源对象。</p>
</li>
<li>
<p><strong>options</strong>：附加选项。</p>
</li>
<li>
<p><strong>options.messages</strong>：包含验证错误消息的对象，将与 defaultMessages 深度合并。</p>
</li>
</ul>
<br/>
<p>传递给 <strong>validate</strong> 或 <strong>asyncValidate</strong> 的选项会传递给验证函数，以便您可以在验证函数中引用瞬态数据（例如模型引用）。 但是，保留了一些选项名称； 如果您使用选项对象的这些属性，它们将被覆盖。 保留的属性是消息、异常和错误。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Schema <span class="token keyword">from</span> <span class="token string">'async-validator'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">name</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> source<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> errors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[a-z0-9]+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      errors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
        util<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">'%s must be lowercase alphanumeric characters'</span><span class="token punctuation">,</span> rule<span class="token punctuation">.</span>field<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> errors<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'Firstname'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">errors<span class="token punctuation">,</span> fields</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>errors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">handleErrors</span><span class="token punctuation">(</span>errors<span class="token punctuation">,</span> fields<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// validation passed</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>针对单个字段的多个验证规则进行测试通常很有用，这样做可以使规则成为对象数组，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  email<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> pattern<span class="token operator">:</span> Schema<span class="token punctuation">.</span>pattern<span class="token punctuation">.</span>email <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> 
      <span class="token function">validator</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> source<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> errors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// test if email address already exists in a database</span>
        <span class="token comment">// and add a validation error to the errors array if it does</span>
        <span class="token keyword">return</span> errors<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> Type</h4>
<br/>
<p>指示要使用的验证器类型。 识别的类型值是：</p>
<ul>
<li>
<p><strong>string</strong>: 必须是字符串类型。 这是默认类型。</p>
</li>
<li>
<p><strong>number</strong>: 必须是数字类型。</p>
</li>
<li>
<p><strong>boolean</strong>: 必须是布尔值类型。</p>
</li>
<li>
<p><strong>method</strong>: 必须是函数类型。</p>
</li>
<li>
<p><strong>regexp</strong>: 必须是RegExp的实例或创建新RegExp时不产生异常的字符串。</p>
</li>
<li>
<p><strong>integer</strong>: 必须是数字类型和整数。</p>
</li>
<li>
<p><strong>float</strong>: 必须是数字类型和浮点数。</p>
</li>
<li>
<p><strong>array</strong>: 必须是由 Array.isArray 确定的数组。</p>
</li>
<li>
<p><strong>object</strong>: 必须是对象类型，而不是 Array.isArray。</p>
</li>
<li>
<p><strong>enum</strong>: 枚举中必须存在值。</p>
</li>
<li>
<p><strong>date</strong>: 值必须由日期确定有效。</p>
</li>
<li>
<p><strong>url</strong>: 必须是 url 类型。</p>
</li>
<li>
<p><strong>hex</strong>: 必须是十六进制类型。</p>
</li>
<li>
<p><strong>email</strong>:必须是电子邮件类型。</p>
</li>
<li>
<p><strong>any</strong>: 可以是任何类型。</p>
</li>
</ul>
<h4 id="required" tabindex="-1"><a class="header-anchor" href="#required" aria-hidden="true">#</a> Required</h4>
<br/>
<p><strong>required</strong> 规则属性表明该字段必须存在于被验证的源对象上。</p>
<h4 id="pattern" tabindex="-1"><a class="header-anchor" href="#pattern" aria-hidden="true">#</a> Pattern</h4>
<br/>
<p>模式规则属性指示值必须匹配才能通过验证的正则表达式。</p>
<h4 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> Range</h4>
<br/>
<p>范围是使用 <strong>min</strong> 和 <strong>max</strong> 属性定义的。 对于字符串和数组类型的比较是针对长度进行的，对于数字类型，数字不能小于 <strong>min</strong> 也不能大于 <strong>max</strong>。</p>
<h4 id="length" tabindex="-1"><a class="header-anchor" href="#length" aria-hidden="true">#</a> Length</h4>
<br/>
<p>要验证字段的确切长度，请指定 <strong>len</strong> 属性。 对于字符串和数组类型，在长度属性上进行比较，对于数字类型，此属性表示数字的精确匹配，即，它可能只严格等于 <strong>len</strong>。</p>
<br/>
<p>如果 <strong>len</strong> 属性与 <strong>min</strong> 和 <strong>max</strong> 范围属性结合使用，则 <strong>len</strong> 优先。</p>
<h4 id="enumerable" tabindex="-1"><a class="header-anchor" href="#enumerable" aria-hidden="true">#</a> Enumerable</h4>
<br/>
<blockquote>
<p>从 3.0.0 版开始，如果要验证枚举类型中的值 0 或 false，则必须明确包含它们。
<br/></p>
</blockquote>
<p>要验证可能值列表中的值，请使用枚举类型和枚举属性列出字段的有效值，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  role<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'enum'</span><span class="token punctuation">,</span> <span class="token keyword">enum</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'admin'</span><span class="token punctuation">,</span> <span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token string">'guest'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="whitespace" tabindex="-1"><a class="header-anchor" href="#whitespace" aria-hidden="true">#</a> Whitespace</h4>
<br/>
<p>通常将仅包含空格的必填字段视为错误。 要为仅由空格组成的字符串添加附加测试，请将空格属性添加到值为 <strong>true</strong> 的规则。 规则必须是字符串类型。</p>
<br/>
<p>您可能希望清理用户输入而不是测试空格，请参阅转换以获取允许您去除空格的示例。</p>
<h4 id="deep-rules" tabindex="-1"><a class="header-anchor" href="#deep-rules" aria-hidden="true">#</a> Deep Rules</h4>
<br/>
<p>如果您需要验证深层对象属性，您可以通过将嵌套规则分配给规则的字段属性来验证对象或数组类型的验证规则。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  address<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'object'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    fields<span class="token operator">:</span> <span class="token punctuation">{</span>
      street<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      city<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      zip<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> len<span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'invalid zip'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> address<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">errors<span class="token punctuation">,</span> fields</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// errors for address.street, address.city, address.zip</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><br/>
<p>请注意，如果您没有在父规则上指定 <strong>required</strong> 属性，则对于不在源对象上声明的字段是完全有效的，并且不会执行深度验证规则，因为没有任何可验证的内容。
<br/></p>
<p>深度规则验证为嵌套规则创建架构，因此您还可以指定传递给 <strong>schema.validate()</strong> 方法的选项。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  address<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'object'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    options<span class="token operator">:</span> <span class="token punctuation">{</span> first<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    fields<span class="token operator">:</span> <span class="token punctuation">{</span>
      street<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      city<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      zip<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> len<span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'invalid zip'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>

validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> address<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> errors<span class="token punctuation">,</span> fields <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// now only errors for street and name    </span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><br/>
<p>父规则也经过验证，因此如果您有一组规则，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  roles<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'array'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    len<span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    fields<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token number">0</span><span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><br/>
<p>并提供 <strong>{ roles: ['admin', 'user'] }</strong> 的源对象，然后将创建两个错误。 一种用于数组长度不匹配，另一种用于索引 2 处缺少所需的数组条目。</p>
<h4 id="defaultfield" tabindex="-1"><a class="header-anchor" href="#defaultfield" aria-hidden="true">#</a> defaultField</h4>
<br/>
<p><strong>defaultField</strong> 属性可与数组或对象类型一起使用，以验证容器的所有值。 它可能是一个包含验证规则的对象或数组。 例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  urls<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'array'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    defaultField<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'url'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><br/>
<p>请注意，<strong>defaultField</strong> 扩展为字段，请参阅 <a href="#deep-rules">deep rules</a>.</p>
<h4 id="transform" tabindex="-1"><a class="header-anchor" href="#transform" aria-hidden="true">#</a> Transform</h4>
<br/>
<p>有时需要在验证之前转换一个值，可能是为了强制该值或以某种方式对其进行消毒。 为此，向验证规则添加一个转换函数。 属性在验证之前被转换并重新分配给源对象以改变属性的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Schema <span class="token keyword">from</span> <span class="token string">'async-validator'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    pattern<span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^[a-z]+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
    <span class="token function">transform</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> source <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">' user  '</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
validator<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> assert<span class="token punctuation">.</span><span class="token function">equal</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">'user'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><br/>
如果输入包含前导和尾随空格，由于模式不匹配，如果没有转换函数验证将失败，但是通过添加转换函数验证通过并且字段值同时被清理。
<h4 id="messages" tabindex="-1"><a class="header-anchor" href="#messages" aria-hidden="true">#</a> Messages</h4>
<br/>
<p>根据您的应用程序要求，您可能需要 i18n 支持，或者您可能更喜欢不同的验证错误消息。
<br/></p>
<p>实现此目的的最简单方法是将消息分配给规则：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'Name is required'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>消息可以是任何类型，例如 jsx 格式。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'&lt;b>Name is required&lt;/b>'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>消息也可以是一个函数，例如 如果你使用 vue-i18n：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token function-variable function">message</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span> <span class="token string">'name is required'</span> <span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>您可能需要为不同的语言使用相同的模式验证规则，在这种情况下，为每种语言复制模式规则是没有意义的。
<br/>
在这种情况下，您可以为该语言提供自己的消息并将其分配给架构：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Schema <span class="token keyword">from</span> <span class="token string">'async-validator'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> cn <span class="token operator">=</span> <span class="token punctuation">{</span>
  required<span class="token operator">:</span> <span class="token string">'%s 必填'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> validator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Schema</span><span class="token punctuation">(</span>descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// deep merge with defaultMessages</span>
validator<span class="token punctuation">.</span><span class="token function">messages</span><span class="token punctuation">(</span>cn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>如果您要定义自己的验证函数，最好将消息字符串分配给消息对象，然后通过验证函数中的 <strong>options.messages</strong> 属性访问消息。</p>
<h4 id="validator" tabindex="-1"><a class="header-anchor" href="#validator" aria-hidden="true">#</a> validator</h4>
<br/>
<p>您可以为指定字段自定义验证函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fields <span class="token operator">=</span> <span class="token punctuation">{</span>
  field<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">validator</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value <span class="token operator">===</span> <span class="token string">'test'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    message<span class="token operator">:</span> <span class="token string">'Value is not equal to "test".'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  field2<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">validator</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is not equal to 'test'.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
 
  arrField<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">validator</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Message 1'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Message 2'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h2>
<h3 id="如何避免警告" tabindex="-1"><a class="header-anchor" href="#如何避免警告" aria-hidden="true">#</a> 如何避免警告</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Schema <span class="token keyword">from</span> <span class="token string">'async-validator'</span><span class="token punctuation">;</span>
Schema<span class="token punctuation">.</span><span class="token function-variable function">warning</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="如何检查是否属实" tabindex="-1"><a class="header-anchor" href="#如何检查是否属实" aria-hidden="true">#</a> 如何检查是否属实</h3>
<br/>
<p>使用传递 <strong>true</strong> 作为选项的枚举类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">'enum'</span><span class="token punctuation">,</span>
  <span class="token keyword">enum</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  message<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="测试用例" tabindex="-1"><a class="header-anchor" href="#测试用例" aria-hidden="true">#</a> 测试用例</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="coverage" tabindex="-1"><a class="header-anchor" href="#coverage" aria-hidden="true">#</a> Coverage</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm run coverage
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>开放 <strong>coverage/ dir</strong></p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2>
<p>Everything is MIT.</p>
</template>
