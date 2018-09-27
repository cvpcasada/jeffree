import { transform as _transform } from 'buble'
import assign from 'object-assign';

export const _poly = { assign }

const opts = {
  objectAssign: '_poly.assign',
  target: { chrome: 63 },
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
}

export default code => _transform(code, opts).code