import { JSDOM } from "jsdom"
const dom = new JSDOM('<!DOCTYPE html><html lang="en"><body><canvas id="stage"></canvas></body></html>')
global.document = dom.window.document
global.window = dom.window
