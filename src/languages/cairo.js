const rust = require('./vendored/rust');

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
    keyword: MAIN_KEYWORDS.join(' '),
    literal: LITERALS.join(' '),
    type: TYPES.join(' '),
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
        className: 'class',
        beginKeywords: 'mod', end: '{',
        contains: [
          hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {endsParent: true})
        ],
      },
      {
        className: 'class',
        beginKeywords: 'impl', end: ';',
        contains: [
          hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, {endsParent: true})
        ],
      },
      {
        beginKeywords: 'let', end: ';',
        contains: [
          hljs.inherit({
            className: 'variable',
            begin: hljs.UNDERSCORE_IDENT_RE,
            relevance: 0
          },
          {
            endsParent: true
          }),
        ],
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