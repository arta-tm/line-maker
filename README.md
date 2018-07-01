# Line Maker library

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/arta-tm/line-maker.svg)](https://greenkeeper.io/)
[![Dev Dependencies](https://david-dm.org/arta-tm/line-maker/dev-status.svg)](https://david-dm.org/arta-tm/line-maker?type=dev)

A library for creating and animating decorative lines on websites.

The main idea is based on [LineMaker](https://github.com/codrops/LineMaker/) but this library use power of the [mo-js](http://mojs.io).

### Install

```bash
npm install --save line-maker
```

OR

```html
<script src="https://unpkg.com/line-maker@1.0.0/dist/line-maker.umd.js"></script>
```

### Usage

```js
var lineMaker = new LinaMaker([
  {
    /* line options */
  }
])
```

### LineOption

```typescript
{
  origin?: string // origin of the line animation
  displaySettings: {
    color?: string | { [delta: string]: string } // color of the line [String | mojs Delta Object]
    width?: number | string // Width of the line
    start?: { // line start position relative to parent
      x: number | string
      y: number | string
    }
    end?: { // line end position relative to parent
      x: number | string
      y: number | string
    }
    zIndex?: number // line object z-index
  }
  // and any other option for mo-js html
}
```

### DEMO

[demo1](https://codepen.io/sajjad-ser/pen/WyPZgL)

### TODO

find a way to writing tests
write document
create more demos
