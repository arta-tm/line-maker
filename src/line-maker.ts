import { ILineOptions, Line } from './line'

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

export interface ILineMakerOption extends ILineOptions {
  parent: never
}
export default class LineMaker {
  private lines: Line[] = []
  constructor(private parent: HTMLElement, private lineOptions: ILineMakerOption[]) {
    lineOptions.forEach(lineOption => {
      this.lines.push(new Line({ ...lineOption, parent }))
    })
  }

  public play(index?: number, shift?: number) {
    if (index && this.lines[index]) {
      this.lines[index].play(shift)
    }
    this.lines.forEach(line => {
      line.play(shift)
    })
    return this
  }
  public playBackward(index?: number, shift?: number) {
    if (index && this.lines[index]) {
      this.lines[index].playBackward(shift)
    }
    this.lines.forEach(line => {
      line.playBackward(shift)
    })
    return this
  }
  public pause(index?: number) {
    if (index && this.lines[index]) {
      this.lines[index].pause()
    }
    this.lines.forEach(line => {
      line.pause()
    })
    return this
  }

  public resume(index?: number, shift?: number) {
    if (index && this.lines[index]) {
      this.lines[index].resume(shift)
    }
    this.lines.forEach(line => {
      line.resume(shift)
    })
    return this
  }

  public stop(index?: number, progress?: number) {
    if (index && this.lines[index]) {
      this.lines[index].stop(progress)
    }
    this.lines.forEach(line => {
      line.stop(progress)
    })
    return this
  }

  public then(index?: number, options?: any) {
    if (index && this.lines[index]) {
      this.lines[index].then(options)
    }
    this.lines.forEach(line => {
      line.then(options)
    })
    return this
  }
}
