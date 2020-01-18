const template = require('./template');

module.exports = {
  svgo: true,
  svgoConfig: {
    plugins: [{ removeViewBox: false }],
  },
  memo: false,
  ref: false,
  replaceAttrValues: [],
  svgProps: [],
  titleProp: false,
  template: template,
};

/* Specify dynamic property using curly braces: { '#000': "{props.color}" }
or --replace-attr-values #000={props.color}.
It is particularly useful with a custom template. */
