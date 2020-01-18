/* function template(
  { template },
  opts,
  { imports, componentName, props, jsx, exports },
) {
  return template.ast`
    ${imports}
    const ${componentName} = (${props}) => ${jsx}
    ${exports}
  `
}
module.exports = template */

/* Template must return a Babel AST, the template function take three arguments:

api: API methods provided by Babel
opts: SVGR options
values: Pre-computed values to use (or not) in your templates */

function template(
  { template },
  opt,
  { imports, componentName, props, jsx, exports }
) {
  return template.ast`
    ${imports}
    const ${componentName} = (${props}) => ${jsx}
    ${exports}
  `;
}

module.exports = template;
