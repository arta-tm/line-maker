import { HTMLOptions } from 'mo-js'
import omit from 'lodash.omit'
import assign from 'lodash.assign'
export interface ILineOptions extends HTMLOptions {
  el?: never
  /**
   *  Parent of the line.
   *  {String, Object}
   *  [selector, HTMLElement]
   */
  parent: HTMLElement
  origin?: string
  displaySettings: {
    color?: string | { [delta: string]: string }
    width?: number | string
    start?: {
      x: number | string
      y: number | string
    }
    end?: {
      x: number | string
      y: number | string
    }
    zIndex?: number
  }
}

interface IHelper {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
  angel: number
  distance: number
}

const lineDefaultOptions: ILineOptions = {
  parent: document.body,
  displaySettings: {
    color: { '#fff': '#000' },
    width: 1,
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: '100%',
      y: '100%'
    },
    zIndex: 0
  }
}
export class Line {
  private static idCount: number = 0
  private options: HTMLOptions
  private element: HTMLElement
  private helper: IHelper
  private mo: mojs.Html | undefined
  private progress: number = 0
  private lineID: string

  constructor(private lineOptions: ILineOptions = lineDefaultOptions) {
    this.lineOptions = assign({ ...lineDefaultOptions }, lineOptions)
    this.options = omit(this.lineOptions, ['displaySettings', 'el', 'parent', 'origin'])
    this.lineID = this.makeid()
    this.helper = this.getHelper()
    this.element = this.createElement()
    this.positonElement()
    this.lineOptions.parent.appendChild(this.element)
    this.init()
    window.addEventListener('resize', () => {
      if (this.mo) {
        this.mo.pause().setProgress(1)
      }
      this.positonElement()
    })
  }

  public play(shift?: number) {
    if (this.mo) {
      this.mo.replay(shift)
    }
    return this
  }
  public playBackward(shift?: number) {
    if (this.mo) {
      this.mo.replayBackward(shift)
    }
    return this
  }
  public pause() {
    if (this.mo) {
      this.mo.pause()
    }
    return this
  }

  public resume(shift?: number) {
    if (this.mo) {
      this.mo.resume(shift)
    }
    return this
  }

  public stop(progress?: number) {
    if (this.mo) {
      this.mo.stop(progress)
    }
    return this
  }

  public then(options?: any) {
    if (this.mo) {
      this.mo.then(options)
    }
    return this
  }

  private init() {
    this.mo = new mojs.Html({
      ...this.options,
      el: `#${this.lineID}`,
      height: this.lineOptions.displaySettings.width,
      scaleX: { 0: 1 },
      angleZ: this.helper.angel,
      background: this.lineOptions.displaySettings.color,
      delay: this.lineOptions.delay ? this.lineOptions.delay + 20 : 20
    })

    // fix google chrome background color
    if (typeof this.lineOptions.displaySettings.color === 'string') {
      const fix = new mojs.Html({
        el: `#${this.lineID}`,
        height: this.lineOptions.displaySettings.width,
        scaleX: { 0: 1 },
        angleZ: this.helper.angel,
        background: {
          '#000': this.lineOptions.displaySettings.color
        },
        duration: 20
      }).play()
    }
  }

  private createElement(): HTMLElement {
    const element = document.createElement('div')
    element.id = this.lineID
    element.style.position = 'absolute'
    if (this.lineOptions.parent.style.position === '') {
      this.lineOptions.parent.style.position = 'relative'
    }
    return element
  }

  private positonElement() {
    this.helper = this.getHelper()
    this.element.style.top = this.helper.start.y + 'px'
    this.element.style.left = this.helper.start.x + 'px'
    // this.element.style.height = this.parseValue(this.lineOptions.displaySettings.width)
    this.element.style.width = this.helper.distance + 'px'
    this.element.style.transformOrigin = this.element.style.webkitTransformOrigin = this.lineOptions
      .origin
      ? this.lineOptions.origin
      : '0% 50%'
    this.element.style.webkitTransform = this.element.style.transform = `rotate(${
      this.helper.angel
    }deg)`
  }
  private getHelper(): IHelper {
    const r: IHelper = {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      },
      angel: 0,
      distance: 0
    }
    const helper = document.createElement('div')
    helper.style.position = 'absolute'
    this.lineOptions.parent.appendChild(helper)
    helper.style.top = this.parseValue(this.lineOptions.displaySettings.width || 0)
    const w = helper.offsetTop
    helper.style.height = '1px'
    helper.style.width = '1px'

    helper.style.top = this.parseValue(
      this.lineOptions.displaySettings.start ? this.lineOptions.displaySettings.start.y : 0
    )
    helper.style.left = this.parseValue(
      this.lineOptions.displaySettings.start ? this.lineOptions.displaySettings.start.x : 0
    )
    // line left
    r.start.x = helper.offsetLeft
    // line top
    r.start.y = helper.offsetTop - w / 2

    helper.style.top = this.parseValue(
      this.lineOptions.displaySettings.end ? this.lineOptions.displaySettings.end.y : 0
    )
    helper.style.left = this.parseValue(
      this.lineOptions.displaySettings.end ? this.lineOptions.displaySettings.end.x : 0
    )
    // line end left
    r.end.x = helper.offsetLeft
    // line end top
    r.end.y = helper.offsetTop - w / 2
    r.angel = (Math.atan2(r.end.y - r.start.y, r.end.x - r.start.x) * 180) / Math.PI
    this.lineOptions.parent.removeChild(helper)
    r.distance = Math.sqrt(
      (r.start.x - r.end.x) * (r.start.x - r.end.x) + (r.start.y - r.end.y) * (r.start.y - r.end.y)
    )
    helper.remove()
    return r
  }

  private parseValue(value: number | string): string {
    return typeof value === 'string' ? value : value + 'px'
  }

  private makeid() {
    Line.idCount++
    return `line__maker_id_${Line.idCount}`
  }
}
