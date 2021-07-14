<template><h1 id="async-validator" tabindex="-1"><a class="header-anchor" href="#async-validator" aria-hidden="true">#</a> async-validator</h1>
<p>Validate form asynchronous. A variation of <a href="https://github.com/freeformsystems/async-validate" target="_blank" rel="noopener noreferrer">https://github.com/freeformsystems/async-validate<OutboundLink/></a></p>
<!-- ## Install
```
 npm i async-validator   
``` -->
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<br/>
<p>Basic usage involves defining a descriptor, assigning it to a schema and passing the object to be validated and a callback function to the validate method of the schema:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<h3 id="validate" tabindex="-1"><a class="header-anchor" href="#validate" aria-hidden="true">#</a> Validate</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">source<span class="token punctuation">,</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span><span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span><span class="token operator">:</span> Promise
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>
<p><strong>source</strong>: The object to validate (required).</p>
</li>
<li>
<p><strong>options</strong>: An object describing processing options for the validation (optional).</p>
</li>
<li>
<p><strong>callback</strong>: A callback function to invoke when validation completes (required).</p>
</li>
</ul>
<p>The method will return a Promise object like:</p>
<ul>
<li>then()，validation passed</li>
<li>catch({ errors, fields })，validation failed, errors is an array of all errors, fields is an object keyed by field name with an array of</li>
</ul>
<h3 id="options" tabindex="-1"><a class="header-anchor" href="#options" aria-hidden="true">#</a> Options</h3>
<br/>
<ul>
<li>
<p><strong>suppressWarning</strong> : Boolean, whether to suppress internal warning about invalid value.</p>
</li>
<li>
<p><strong>first</strong>: Boolean, Invoke callback when the first validation rule generates an error, no more validation rules are processed. If your validation involves multiple asynchronous calls (for example, database queries) and you only need the first error use this option.</p>
</li>
<li>
<p><strong>firstFields</strong>: Boolean|String[], Invoke callback when the first validation rule of the specified field generates an error, no more validation rules of the same field are processed. true means all fields.</p>
</li>
</ul>
<h3 id="rules" tabindex="-1"><a class="header-anchor" href="#rules" aria-hidden="true">#</a> Rules</h3>
<br/>
<p>Rules may be functions that perform validation.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">rule<span class="token punctuation">,</span> value<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> source<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>
<p><strong>rule</strong>: The validation rule in the source descriptor that corresponds to the field name being validated. It is always assigned a field property with the name of the field being validated.</p>
</li>
<li>
<p><strong>value</strong>: The value of the source object property being validated.</p>
</li>
<li>
<p><strong>callback</strong>: A callback function to invoke once validation is complete. It expects to be passed an array of Error instances to indicate validation failure. If the check is synchronous, you can directly return a false or Error or Error Array.</p>
</li>
<li>
<p><strong>source</strong>: The source object that was passed to the validate method.</p>
</li>
<li>
<p><strong>options</strong>: Additional options.</p>
</li>
<li>
<p><strong>options.messages</strong>: The object containing validation error messages, will be deep merged with defaultMessages.</p>
</li>
</ul>
<p>The options passed to validate or asyncValidate are passed on to the validation functions so that you may reference transient data (such as model references) in validation functions. However, some option names are reserved; if you use these properties of the options object they are overwritten. The reserved properties are messages, exception and error.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><p>It is often useful to test against multiple validation rules for a single field, to do so make the rule an array of objects, for example:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><h4 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> Type</h4>
<br/>
<p>Indicates the type of validator to use. Recognised type values are:</p>
<ul>
<li>
<p>string: Must be of type string. This is the default type.</p>
</li>
<li>
<p>number: Must be of type number.</p>
</li>
<li>
<p>boolean: Must be of type boolean.</p>
</li>
<li>
<p>method: Must be of type function.</p>
</li>
<li>
<p>regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.</p>
</li>
<li>
<p>integer: Must be of type number and an integer.</p>
</li>
<li>
<p>float: Must be of type number and a floating point number.</p>
</li>
<li>
<p>array: Must be an array as determined by Array.isArray.</p>
</li>
<li>
<p>object: Must be of type object and not Array.isArray.</p>
</li>
<li>
<p>enum: Value must exist in the enum.</p>
</li>
<li>
<p>date: Value must be valid as determined by Date.</p>
</li>
<li>
<p>url: Must be of type url.</p>
</li>
<li>
<p>hex: Must be of type hex.</p>
</li>
<li>
<p>email: Must be of type email.</p>
</li>
<li>
<p>any: Can be any type.</p>
</li>
</ul>
<h4 id="required" tabindex="-1"><a class="header-anchor" href="#required" aria-hidden="true">#</a> Required</h4>
<br/>
<p>The required rule property indicates that the field must exist on the source object being validated.</p>
<h4 id="pattern" tabindex="-1"><a class="header-anchor" href="#pattern" aria-hidden="true">#</a> Pattern</h4>
<br/>
<p>The pattern rule property indicates a regular expression that the value must match to pass validation.</p>
<h4 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> Range</h4>
<br/>
<p>A range is defined using the min and max properties. For string and array types comparison is performed against the length, for number types the number must not be less than min nor greater than max.</p>
<h4 id="length" tabindex="-1"><a class="header-anchor" href="#length" aria-hidden="true">#</a> Length</h4>
<br/>
<p>To validate an exact length of a field specify the len property. For string and array types comparison is performed on the length property, for the number type this property indicates an exact match for the number, ie, it may only be strictly equal to len.</p>
<br/>
<p>If the len property is combined with the min and max range properties, len takes precedence.</p>
<h4 id="enumerable" tabindex="-1"><a class="header-anchor" href="#enumerable" aria-hidden="true">#</a> Enumerable</h4>
<br/>
<blockquote>
<p>Since version 3.0.0 if you want to validate the values 0 or false inside enum types, you have to include them explicitly.
<br/></p>
</blockquote>
<p>To validate a value from a list of possible values use the enum type with a enum property listing the valid values for the field, for example:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  role<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'enum'</span><span class="token punctuation">,</span> <span class="token keyword">enum</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'admin'</span><span class="token punctuation">,</span> <span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token string">'guest'</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="whitespace" tabindex="-1"><a class="header-anchor" href="#whitespace" aria-hidden="true">#</a> Whitespace</h4>
<br/>
<p>It is typical to treat required fields that only contain whitespace as errors. To add an additional test for a string that consists solely of whitespace add a whitespace property to a rule with a value of true. The rule must be a string type.
<br/></p>
<p>You may wish to sanitize user input instead of testing for whitespace, see transform for an example that would allow you to strip whitespace.</p>
<h4 id="deep-rules" tabindex="-1"><a class="header-anchor" href="#deep-rules" aria-hidden="true">#</a> Deep Rules</h4>
<br/>
<p>If you need to validate deep object properties you may do so for validation rules that are of the object or array type by assigning nested rules to a fields property of the rule.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><br/>
<p>Note that if you do not specify the required property on the parent rule it is perfectly valid for the field not to be declared on the source object and the deep validation rules will not be executed as there is nothing to validate against.
<br/></p>
<p>Deep rule validation creates a schema for the nested rules so you can also specify the options passed to the schema.validate() method.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><br/>
<p>The parent rule is also validated so if you have a set of rules such as:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><br/>
<p>And supply a source object of { roles: ['admin', 'user'] } then two errors will be created. One for the array length mismatch and one for the missing required array entry at index 2.</p>
<h4 id="defaultfield" tabindex="-1"><a class="header-anchor" href="#defaultfield" aria-hidden="true">#</a> defaultField</h4>
<br/>
<p>The defaultField property can be used with the array or object type for validating all values of the container. It may be an object or array containing validation rules. For example:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> descriptor <span class="token operator">=</span> <span class="token punctuation">{</span>
  urls<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'array'</span><span class="token punctuation">,</span>
    required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    defaultField<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'url'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><br/>
<p>Note that defaultField is expanded to fields, see <a href="#deep-rules">deep rules</a>.</p>
<h4 id="transform" tabindex="-1"><a class="header-anchor" href="#transform" aria-hidden="true">#</a> Transform</h4>
<br/>
<p>Sometimes it is necessary to transform a value before validation, possibly to coerce the value or to sanitize it in some way. To do this add a transform function to the validation rule. The property is transformed prior to validation and re-assigned to the source object to mutate the value of the property in place.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><br/>
Without the transform function validation would fail due to the pattern not matching as the input contains leading and trailing whitespace, but by adding the transform function validation passes and the field value is sanitized at the same time.
<h4 id="messages" tabindex="-1"><a class="header-anchor" href="#messages" aria-hidden="true">#</a> Messages</h4>
<br/>
<p>Depending upon your application requirements, you may need i18n support or you may prefer different validation error messages.
<br/></p>
<p>The easiest way to achieve this is to assign a message to a rule:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'Name is required'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Message can be any type, such as jsx format.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> message<span class="token operator">:</span> <span class="token string">'&lt;b>Name is required&lt;/b>'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Message can also be a function, e.g. if you use vue-i18n:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token function-variable function">message</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$t</span><span class="token punctuation">(</span> <span class="token string">'name is required'</span> <span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Potentially you may require the same schema validation rules for different languages, in which case duplicating the schema rules for each language does not make sense.</p>
<br/>
In this scenario you could just provide your own messages for the language and assign it to the schema:
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>File not found</code></pre><div class="line-numbers"></div></div><p>If you are defining your own validation functions it is better practice to assign the message strings to a messages object and then access the messages via the options.messages property within the validation function.</p>
<h4 id="validator" tabindex="-1"><a class="header-anchor" href="#validator" aria-hidden="true">#</a> validator</h4>
<br/>
<p>You can custom validate function for specified field:</p>
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
<h3 id="how-to-avoid-warning" tabindex="-1"><a class="header-anchor" href="#how-to-avoid-warning" aria-hidden="true">#</a> How to avoid warning</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> Schema <span class="token keyword">from</span> <span class="token string">'async-validator'</span><span class="token punctuation">;</span>
Schema<span class="token punctuation">.</span><span class="token function-variable function">warning</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="how-to-check-if-it-is-true" tabindex="-1"><a class="header-anchor" href="#how-to-check-if-it-is-true" aria-hidden="true">#</a> How to check if it is true</h3>
<br/>
<p>Use enum type passing true as option.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">'enum'</span><span class="token punctuation">,</span>
  <span class="token keyword">enum</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  message<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="test-case" tabindex="-1"><a class="header-anchor" href="#test-case" aria-hidden="true">#</a> Test Case</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm test
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="coverage" tabindex="-1"><a class="header-anchor" href="#coverage" aria-hidden="true">#</a> Coverage</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm run coverage
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Open coverage/ dir</p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2>
<p>Everything is MIT.</p>
</template>
