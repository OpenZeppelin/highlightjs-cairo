const assert = require('assert');
const parse5 = require('parse5');

const hljs = require('highlight.js');
const defineCairo = require('.');

defineCairo(hljs);

// Receives a Cairo snippet and returns an array of [type, text] tuples.
// Type is the detected token type, and text the corresponding source text.
function getTokens(source) {
  const frag = parse5.parseFragment(highlight(source));

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

function highlight(source) {
  return hljs.highlight('cairo', source).value;
}

it('numbers', function () {
  const ok = [
    '1234',
    '0x68656c6c6f',
  ];

  const fail = [
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
    '"Hello"'
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

it('keyword mod', function () {
  assert.equal(highlight('mod Foo {}'), '<span class="hljs-class"><span class="hljs-keyword">mod</span> <span class="hljs-title">Foo</span></span> {}');
});

it('keyword use', function () {
  assert.equal(highlight('use foo::Bar;'), '<span class="hljs-keyword">use</span> foo::Bar;');
});

it('keyword fn', function () {
  assert.equal(highlight('fn foo() {}'), '<span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">foo</span></span>() {}');
});

it('keyword impl', function () {
  assert.equal(highlight('impl FooImpl = BarImpl;'), '<span class="hljs-class"><span class="hljs-keyword">impl</span> <span class="hljs-title">FooImpl</span></span> = BarImpl;');
});

it('keyword ref', function () {
  assert.equal(highlight('ref self: ContractState'), '<span class="hljs-keyword">ref</span> self: ContractState');
});

it('literals', function () {
  const literals = ['true', 'false'];

  for (const b of literals) {
    assert.deepEqual(getTokens(b), [['literal', b]]);
  }
});

it('types', function () {
  const types = ['bool', 'u256'];

  for (const type of types) {
    assert.deepEqual(getTokens(type), [['type', type]]);
  }
});

it('annotations', function () {
  const annotations = ['#[starknet::contract]', '#[storage]', '#[external(v0)]'];

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