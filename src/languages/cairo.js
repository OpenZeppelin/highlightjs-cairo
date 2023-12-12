const rust = require('highlight.js/lib/languages/rust');

function hljsDefineCairo(hljs) {
  const cairoLanguage = rust(hljs);

  const MAIN_KEYWORDS = [
    // strict keywords - https://docs.cairo-lang.org/language_constructs/keywords.html#strict_keywords
    'break',
    'const',
    'continue',
    'else',
    'enum',
    'false',
    'for',
    'fn',
    'hint',
    'if',
    'impl',
    'in',
    'match',
    'pub',
    'return',
    'struct',
    'trait',
    'true',
    'type',
    'use',

    // reserved keywords - https://docs.cairo-lang.org/language_constructs/keywords.html#reserved_keywords
    'as',
    'assert',
    'do',
    'dyn',
    'extern',
    'let',
    'macro',
    'mod',
    'move',
    'ref',
    // 'Self',
    // 'self',
    'static_assert',
    'static',
    'super',
    'try',
    'typeof',
    'unsafe',
    'where',
    'while',
    'with',
    'yield',
  ];

  const LITERALS = [
    'true',
    'false',
  ];

  const TYPES = [
    'bool',
    'u8',
    'u16',
    'u32',
    'u64',
    'u128',
    'u256',
    'usize',
  ];

  if (typeof cairoLanguage.keywords !== 'object') {
    throw Error('Expected object');
  }

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|\w+_/,
    keyword: MAIN_KEYWORDS,
    literal: LITERALS,
    type: TYPES,
  };

  Object.assign(cairoLanguage.keywords, KEYWORDS);

  Object.assign(cairoLanguage.contains, [
      ...cairoLanguage.contains,
      {
        className: 'built_in',
        begin: 'selector!',
      },
      {
        className: 'built_in',
        begin: 'component!',
      },
      {
        begin: [
          /mod/,
          /\s+/,
          hljs.UNDERSCORE_IDENT_RE
        ],
        className: {
          1: 'keyword',
          3: 'title.class',
        }
      },
    ]
  );

  Object.assign(cairoLanguage, {
    name: 'Cairo',
    aliases: [
      'cairo'
    ]
  });

  return cairoLanguage;
}

module.exports = hljsDefineCairo;