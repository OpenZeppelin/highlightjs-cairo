# highlightjs-cairo

[![NPM Package](https://img.shields.io/npm/v/highlightjs-cairo?color=%23e55233)](https://www.npmjs.com/package/highlightjs-cairo)

[Cairo](https://www.cairo-lang.org/) language definition for [highlight.js](https://highlightjs.org/).

### Install

```bash
npm i highlight.js highlightjs-cairo
```

### Usage

Browser:

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/cairo.min.js"></script>
<script type="text/javascript">
    hljs.highlightAll();
</script>
```

Node (Highlight.js v9):
```javascript
const hljs = require('highlight.js');
const hljsDefineCairo = require('highlightjs-cairo');

hljsDefineCairo(hljs);
const highlighted = hljs.highlight('cairo', source).value;
```

Node (Highlight.js v11):
```javascript
const hljs = require('highlight.js/lib/core');
const hljsDefineCairo = require('highlightjs-cairo');

hljsDefineCairo(hljs);
const highlighted = hljs.highlight(source, {language: 'cairo'}).value;
```