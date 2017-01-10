function _camelCase(string) {
  return string.replace(/^.|-./g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase()
  );
}

function _basicCleanup(svg) {
  return svg
    .replace(/width="\d+"/, '')
    .replace(/height="\d+"/, '')
    .replace(/xmlns="(\S*)"/, '')
    .replace(/([\w-]+)="/g, (match) => _camelCase(match))
    .replace(/\s{2,}/g, ' ');
}

export function cleanupName(name) {
  return name.replace(/u[A-Z0-9]{4}-/, '');
}

export function cleanupSvg(svg, keepFillColor) {
  const cleanedSvg = _basicCleanup(svg)
    .replace(/viewBox/, 'height={height || size} width={width || size} onClick={onClick} style={style} viewBox');

  return keepFillColor
    ? cleanedSvg
    : cleanedSvg
      .replace(/fill="#?\w+"/g, '')
      .replace(/viewBox/, 'fill={color} viewBox')
      .replace(/\s{2,}/g, ' ')
      .replace(/ \>/g, '>');
}

export function cleanupNativeSvg(svg, keepFillColor) {
  const cleanedSvg = _basicCleanup(svg)
    .replace(/viewBox/, 'height={height || size} width={width || size} style={style} viewBox')
    .replace(/\<[a-z]|\<\/[a-z]/g, (match) => match.toUpperCase());

  return keepFillColor
    ? cleanedSvg
    : cleanedSvg
      .replace(/fill="#?\w+"/g, '')
      .replace(/\<Path/g, '<Path fill={color}')
      .replace(/\s{2,}/g, ' ')
      .replace(/ \>/g, '>');
}
