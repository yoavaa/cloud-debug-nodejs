import {addHook} from 'pirates';
import * as sourceMap from 'source-map';
import {Buffer} from 'safe-buffer';

const sourceMaps: {path: string, sourcemap: sourceMap.RawSourceMap}[] = [];

export function initInlineSourceMaps(javascriptFileExtensions: string[]) {
  addHook(
    (code, path) => {
      let sourcemap: sourceMap.RawSourceMap | undefined = fromSource(code);
      if (sourcemap) {
        sourceMaps.push({path, sourcemap});

      }
      return code;
    },
    {
      exts: javascriptFileExtensions,
      matcher: () => true }
  );
}

export function getInlineSourcemaps(): {path: string, sourcemap: sourceMap.RawSourceMap}[] {
  return sourceMaps;
}

export function pathHasInlineSourcemap(path: string): boolean {
  return !!sourceMaps.find(_ => _.path === path)
}


const commentRegex = /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/mg;

function decodeBase64(base64: string|undefined) {
  return base64?Buffer.from(base64, 'base64').toString():undefined;
}

function stripComment(sm: string):string|undefined {
  return sm.split(',').pop();
}

function fromComment(comment: string|undefined): sourceMap.RawSourceMap | undefined {
  if (comment) {
    comment = comment
      .replace(/^\/\*/g, '//')
      .replace(/\*\/$/g, '');

    let sourcemap = decodeBase64(stripComment(comment));
    return sourcemap?JSON.parse(sourcemap) as sourceMap.RawSourceMap:undefined;
  }
  return undefined;
}

function fromSource(content: string):sourceMap.RawSourceMap | undefined {
  let m = content.match(commentRegex);
  return m?fromComment(m.pop()):undefined;
}
