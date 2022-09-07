const assert = require('assert');
const parse5 = require('parse5');

const hljs = require('highlight.js');
const defineCairo = require('.');

defineCairo(hljs);

// Receives a Cairo snippet and returns an array of [type, text] tuples.
// Type is the detected token type, and text the corresponding source text.
function getTokens(source) {
  const { value } = hljs.highlight(source, { language: 'cairo' });
  const frag = parse5.parseFragment(value);

  return frag.childNodes.map(function (node) {
    if (node.nodeName === '#text') {
      return ['none', node.value];
    } else {
      const type = node.attrs.find(a => a.name === 'class').value.replace(/^hljs-/, '');
      assert(
        node.childNodes.length === 1 && node.childNodes[0].nodeName === '#text',
        'Unexpected nested tags',
      );
      return [type, node.childNodes[0].value];
    }
  });
}

it('numbers', function () {
  const ok = [
    '1234',
    '0x68656c6c6f',
  ];

  const fail = [
    '1234_',
    'ZZ68656c6c6f',
  ];

  for (const n of ok) {
    assert.deepEqual(getTokens(n), [['number', n]]);
  }

  for (const n of fail) {
    assert.notDeepEqual(getTokens(n), [['number', n]]);
  }
});

it('strings', function () {
  const ok = [
    '\'Hello\'', '"Hello"'
  ];

  const fail = [
    'Hello',
  ];

  for (const n of ok) {
    assert.deepEqual(getTokens(n), [['string', n]]);
  }

  for (const n of fail) {
    assert.notDeepEqual(getTokens(n), [['string', n]]);
  }
});

it('keywords', function () {
  const keywords = ['from', 'import', 'func', 'return', 'end'];

  for (const keyword of keywords) {
    assert.deepEqual(getTokens(keyword), [['keyword', keyword]]);
  }
});

it('builtins', function () {
  const builtins = ['HashBuiltin', 'SignatureBuiltin', 'BitwiseBuiltin', 'EcOpBuiltin', 'Uint256'];

  for (const b of builtins) {
    assert.deepEqual(getTokens(b), [['built_in', b]]);
  }
});

it('types', function () {
  const types = ['felt'];

  for (const type of types) {
    assert.deepEqual(getTokens(type), [['type', type]]);
  }
});

it('annotations', function () {
  const annotations = ['@constructor', '@view', '@external'];

  for (const annotation of annotations) {
    assert.deepEqual(getTokens(annotation), [['meta', annotation]]);
  }
});

it('comments', function () {
  const comments = ['//hello', '// SPDX-License-Identifier: MIT'];

  for (const comment of comments) {
    assert.deepEqual(getTokens(comment), [['comment', comment]]);
  }
});