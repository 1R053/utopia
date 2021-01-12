require('dotenv').config({ path: 'src/.env' })
import puppeteer from 'puppeteer'
import { v4 } from 'uuid'
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const moveFile = require('move-file')
const yn = require('yn')

const BRANCH_NAME = process.env.BRANCH_NAME
const PROJECT_ID = '5596ecdd'
// const EDITOR_URL = `http://localhost:8000/p/f8926f5a-sly-rake/`
const EDITOR_URL = `https://utopia.pizza/project/${PROJECT_ID}/?branch_name=${BRANCH_NAME}`

type FrameResult = {
  frameData: {
    frameAvg: number,
    percentile25: number | undefined,
    percentile50: number | undefined,
    percentile75: number | undefined,
  },
  frameTimesFixed: Array<number>,
}

// this is the same as utils.ts@defer
function defer() {
  var res, rej
  var promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  Object.defineProperty(promise, 'resolve', { value: res })
  Object.defineProperty(promise, 'reject', { value: rej })

  return promise
}

function consoleDoneMessage(page: puppeteer.Page, expectedConsoleMessage: string, errorMessage?: string) {
  return new Promise<void>((resolve, reject) => {
    page.on('console', (message) => {
      if (message.text().includes(expectedConsoleMessage) || (errorMessage != null && message.text().includes(errorMessage))) {
        // the editor will console.info('SCROLL_TEST_FINISHED') when the scrolling test is complete.
        // we wait until we see this console log and then we resolve the Promise
        resolve()
      }
    })
  })
}

export const setupBrowser = async function () {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--enable-thread-instruction-count'],
    headless: yn(process.env.HEADLESS),
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1500, height: 768 })
  // page.on('console', (message) =>
  //   console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`),
  // )
  await page.goto(EDITOR_URL)
  return {
    browser: browser,
    page: page,
  }
}

export const testPerformance = async function () {
  const scrollResult = await testScrollingPerformance()
  const resizeResult = await testResizePerformance()
  const selectionResult = await testSelectionPerformance()

  const scrollImage = await uploadImage(scrollResult)
  const resizeImage = await uploadImage(resizeResult)
  const selectionImage = await uploadImage(selectionResult)

  console.info(
    `::set-output name=perf-result:: ![ScrollChart](${scrollImage}) - SCROLL TEST Average frame length: ${scrollResult.frameData.frameAvg.toFixed(1)} \\n – Q1: ${scrollResult.frameData.percentile25} – Q2: ${scrollResult.frameData.percentile50} – Q3: ${
      scrollResult.frameData.percentile75
    } – Median: ${scrollResult.frameData.percentile50} ![ResizeChart](${resizeImage}) - RESIZE TEST Average frame length: ${resizeResult.frameData.frameAvg.toFixed(1)} \\n – Q1: ${resizeResult.frameData.percentile25} – Q2: ${resizeResult.frameData.percentile50} – Q3: ${
      resizeResult.frameData.percentile75
    } – Median: ${resizeResult.frameData.percentile50} ![SelectionChart](${selectionImage}) - SELECTION TEST Average frame length: ${selectionResult.frameData.frameAvg.toFixed(1)} \\n – Q1: ${selectionResult.frameData.percentile25} – Q2: ${selectionResult.frameData.percentile50} – Q3: ${
      selectionResult.frameData.percentile75
    } – Median: ${selectionResult.frameData.percentile50}`,
  )
}

export const testScrollingPerformance = async function (): Promise<FrameResult> {
  const { page, browser } = await setupBrowser()
  await page.waitForXPath("//a[contains(., 'P S')]") // the button with the text 'P S' is the "secret" trigger to start the scrolling performance test
  // we run it twice without measurements to warm up the environment
  const [button] = await page.$x("//a[contains(., 'P S')]")
  await button!.click()
  await consoleDoneMessage(page, 'SCROLL_TEST_FINISHED')
  const [button2] = await page.$x("//a[contains(., 'P S')]")
  await button2!.click()
  await consoleDoneMessage(page, 'SCROLL_TEST_FINISHED')
  // and then we run the test for a third time, this time running tracing
  await page.tracing.start({ path: 'trace.json' })
  const [button3] = await page.$x("//a[contains(., 'P S')]")
  await button3!.click()
  await consoleDoneMessage(page, 'SCROLL_TEST_FINISHED')
  await page.tracing.stop()
  await browser.close()
  let traceData = fs.readFileSync('trace.json').toString()
  const traceJson = JSON.parse(traceData)
 
  return getFrameData(traceJson, 'scroll_step_')
}

export const testResizePerformance = async function (): Promise<FrameResult> {
  const { page, browser } = await setupBrowser()
  await page.waitForXPath("//a[contains(., 'P R')]")
  // we run it twice without measurements to warm up the environment
  const [button] = await page.$x("//a[contains(., 'P R')]")
  await button!.click()

  // select element using the navigator
  const navigatorElement = await page.$('[class^="item-label-container"]')
  await navigatorElement!.click()
  const [button2] = await page.$x("//a[contains(., 'P R')]")
  await button2!.click()
  await consoleDoneMessage(page, 'RESIZE_TEST_FINISHED', 'RESIZE_TEST_MISSING_SELECTEDVIEW')
  // and then we run the test for a third time, this time running tracing
  await page.tracing.start({ path: 'trace.json' })
  const [button3] = await page.$x("//a[contains(., 'P R')]")
  await button3!.click()
  await consoleDoneMessage(page, 'RESIZE_TEST_FINISHED', 'RESIZE_TEST_MISSING_SELECTEDVIEW')
  await page.tracing.stop()
  await browser.close()
  let traceData = fs.readFileSync('trace.json').toString()
  const traceJson = JSON.parse(traceData)
  return getFrameData(traceJson, 'resize_step_')
}

export const testSelectionPerformance = async function (): Promise<FrameResult>  {
  const { page, browser } = await setupBrowser()
  await page.waitForTimeout(20000)
  await page.waitForXPath("//a[contains(., 'P E')]")
  // we run it twice without measurements to warm up the environment
  const [button] = await page.$x("//a[contains(., 'P E')]")
  await button!.click()
  await consoleDoneMessage(page, 'SELECT_TEST_FINISHED', 'SELECT_TEST_ERROR')
  // and then we run the test for a third time, this time running tracing
  await page.tracing.start({ path: 'trace.json' })
  const [button2] = await page.$x("//a[contains(., 'P E')]")
  await button2!.click()
  await consoleDoneMessage(page, 'SELECT_TEST_FINISHED', 'SELECT_TEST_ERROR')
  await page.tracing.stop()
  await browser.close()
  let traceData = fs.readFileSync('trace.json').toString()
  const traceJson = JSON.parse(traceData)
  return getFrameData(traceJson, 'select_step_')
}

const getFrameData = (traceJson: any, markNamePrefix: string): FrameResult => {
  const frameTimeEvents: any[] = traceJson.traceEvents.filter((e: any) =>
    e.name.startsWith(markNamePrefix),
  )
  let frameTimes: Array<number> = []
  let lastFrameTimestamp: number | null = null
  let totalFrameTimes = 0
  frameTimeEvents.forEach((fte) => {
    const frameID = fte.name.split(markNamePrefix)[1] - 1
    const frameTimestamp = fte.ts
    if (lastFrameTimestamp != null) {
      const frameDelta = (frameTimestamp - lastFrameTimestamp) / 1000
      frameTimes[frameID] = frameDelta
      totalFrameTimes += frameDelta
    }
    lastFrameTimestamp = frameTimestamp
  })

  let frameTimesFixed = frameTimes.map((x) => Number(x.toFixed(1)))

  const frameData = {
    frameAvg: totalFrameTimes / frameTimesFixed.length,
    percentile25: frameTimesFixed.sort((a, b) => a - b)[Math.floor(frameTimesFixed.length * 0.25)],
    percentile50: frameTimesFixed.sort((a, b) => a - b)[Math.floor(frameTimesFixed.length * 0.5)],
    percentile75: frameTimesFixed.sort((a, b) => a - b)[Math.floor(frameTimeEvents.length * 0.75)],
  }
  return {
    frameData: frameData,
    frameTimesFixed: frameTimesFixed,
  }
}

function valueOutsideCutoff(frameCutoff: Array<number>) {
  let sum = 0
  for (let i = 0; i < frameCutoff.length; i++) {
    if (frameCutoff[i]! > 130) {
      sum += 1
    }
  }
  return sum
}

async function uploadImage(result: FrameResult) {
  const imageFileName = v4() + '.png'
  const fileURI = await createTestPng(result.frameTimesFixed, imageFileName, result.frameData)
  const s3FileUrl = await uploadPNGtoAWS(fileURI)
  return s3FileUrl
}

async function createTestPng(
  frameTimesArray: Array<number>,
  testFileName: string,
  frameData: {
    frameAvg: number
    percentile25: number | undefined
    percentile50: number | undefined
    percentile75: number | undefined
  },
) {
  const plotly = require('plotly')(
    process.env.PERFORMANCE_GRAPHS_PLOTLY_USERNAME,
    process.env.PERFORMANCE_GRAPHS_PLOTLY_API_KEY,
  )

  const n = valueOutsideCutoff(frameTimesArray).toString()

  const trace = {
    x: frameTimesArray.sort((a, b) => a - b),
    name: 'Frame Times',
    type: 'histogram',
    xbins: {
      size: 0.4,
    },
  }
  const layout = {
    title: {
      text: 'Frame Time Test - percentile: solid lines left to right 25%, 50%, 75%',
      font: {
        family: 'Courier New, monospace',
        size: 10,
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      type: 'ms',
      showgrid: true,
      zeroline: true,
      showline: true,
      range: [0, 134],
      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 2,
      ticklen: 4,
      tickwidth: 2,
      tickcolor: '#000',
      title: {
        text:
          'Xaxis: Frame Times (ms) - red:60fps, black:30fps, green:15fps, yellow:7.5fps - Scrolling Test (n=' +
          n +
          ' Results not shown)',
        font: {
          family: 'Courier New, monospace',
          size: 8,
          color: '#7f7f7f',
        },
      },
    }, // Fps lines
    shapes: [
      {
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: 16.6,
        x1: 16.6,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(245, 66, 66)',
          width: 1,
          dash: 'dash',
        },
      },
      {
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: 33.33,
        x1: 33.33,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(168, 50, 149)',
          width: 1,
          dash: 'dash',
        },
      },
      {
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: 66.6,
        x1: 66.6,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(26, 255, 0)',
          width: 1,
          dash: 'dash',
        },
      },
      {
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: 133.3,
        x1: 133.3,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(255, 239, 0)',
          width: 1,
          dash: 'dash',
        },
      },
      {
        //Quartile25 Line below
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: frameData.percentile25,
        x1: frameData.percentile25,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(0, 0, 0)',
          width: 1,
          dash: 'solid',
        },
      },
      {
        //Quartile50 Line below
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: frameData.percentile50,
        x1: frameData.percentile50,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(0, 0, 0)',
          width: 1,
          dash: 'solid',
        },
      },
      {
        //Quartile75 Lines below
        type: 'line',
        xref: 'x',
        yref: 'y',
        x0: frameData.percentile75,
        x1: frameData.percentile75,
        y0: 0,
        y1: 100,
        line: {
          color: 'rgb(0, 0, 0)',
          width: 1,
          dash: 'solid',
        },
      },
    ],
    yaxis: {
      showgrid: true,
      zeroline: true,
      showline: true,
      range: [0, 50],
      autotick: false,
      ticks: 'outside',
      tick0: 0,
      dtick: 5,
      ticklen: 8,
      tickwidth: 2,
      tickcolor: '#000',
      title: {
        text: 'Frequency',
        font: {
          family: 'Courier New, monospace',
          size: 10,
          color: '#7f7f7f',
        },
      },
    },
  }
  const imgOpts = {
    format: 'png',
    width: 800,
    height: 600,
  }
  const figure = { data: [trace], layout: layout }

  return new Promise<string>((resolve, reject) => {
    plotly.getImage(figure, imgOpts, async function (error: any, imageStream: any) {
      if (error) return console.log(error)

      var fileStream = await fs.createWriteStream(testFileName)

      const writeStreamPromise = new Promise<void>((resolve, reject) => {
        imageStream
          .pipe(fileStream)
          .on('finish', () => resolve())
          .on('error', (error: any) => reject(error))
      })

      await writeStreamPromise
      const path1 = path.resolve(testFileName)
      const path2 = path.resolve('frameimages')
      await moveFile(path1, path2 + '/' + testFileName)
      resolve(path2 + '/' + testFileName)
    })
  })
}

async function uploadPNGtoAWS(testFile: string) {
  AWS.config.update({
    region: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  })

  let s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: testFile,
    Body: '',
    ContentType: 'image/png',
    ACL: 'public-read',
  }

  return new Promise<string>((resolve, reject) => {
    const path1 = path.resolve(testFile)
    let filestream = fs.createReadStream(path1)
    filestream.on('error', function (err: any) {
      console.log('File Error', err)
      reject(err)
    })
    uploadParams.Body = filestream
    uploadParams.Key = path.basename(testFile)

    s3.upload(uploadParams, function (err: any, data: any) {
      if (err) {
        console.log('Error', err)
        reject(err)
      }
      if (data) {
        console.log('Upload Success', data.Location)
        resolve(data.Location)
      }
    })
  })
}
