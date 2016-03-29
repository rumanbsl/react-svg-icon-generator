export function cleanupName(name) {
  return name.replace(/u[A-Z0-9]{4}-/, '');
}

export function cleanupSvg(svg) {
  return svg
    .replace(/width="\d+"/, '')
    .replace(/height="\d+"/, '')
    .replace(/fill="#?\w+"/g, '')
    .replace(/viewBox/, 'fill={color} height={height || size} width={width || size} onClick={onClick} style={style} viewBox')
    .replace(/\s{2,}/g, ' ');
}
