import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import svgo from './svgo';

export default function minifySvg(file) {
  return new Promise(resolve => svgo.optimize(fs.readFileSync(file).toString(), result => resolve({
    name: path.basename(file, '.svg'),
    svg: result
  })));
}
