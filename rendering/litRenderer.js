import { render } from "./../node_modules/lit-html/lit-html.js";

export class LitRenderer {
  constructor() {
  }

  createRendererHandler(domElement) {
    return function (templateResult) {
      render(templateResult, domElement)
    }
  }
}
