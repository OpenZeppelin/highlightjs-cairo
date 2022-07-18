const cairoGrammar = require("./languages/cairo.js");

module.exports = function(hljs) {
  hljs.registerLanguage("cairo", cairoGrammar);
};

module.exports.cairo = cairoGrammar;