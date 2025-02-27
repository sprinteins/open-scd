var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {css, customElement, html} from "../../../_snowpack/pkg/lit-element.js";
import "./subnetwork-container.js";
import {
  compareNames,
  createElement,
  newActionEvent,
  newWizardEvent
} from "../../foundation.js";
import {createSubNetworkWizard} from "./wizards/subnetwork.js";
import {Base104Container} from "./base-container.js";
import {getTypeAttribute} from "./foundation/foundation.js";
export let Network104Container = class extends Base104Container {
  getSubNetworkElements() {
    return Array.from(this.doc.querySelectorAll("Communication > SubNetwork") ?? []).filter((network) => getTypeAttribute(network) === "104").sort((a, b) => compareNames(a, b));
  }
  openCreateSubNetworkWizard() {
    const parent = this.doc.querySelector(":root > Communication");
    if (!parent) {
      this.dispatchEvent(newActionEvent({
        new: {
          parent: this.doc.documentElement,
          element: createElement(this.doc, "Communication", {})
        }
      }));
    }
    this.dispatchEvent(newWizardEvent(createSubNetworkWizard(parent)));
  }
  render() {
    return html`<mwc-fab
        extended
        icon="add"
        label="${get("subnetwork.wizard.title.add")}"
        @click=${() => this.openCreateSubNetworkWizard()}
      ></mwc-fab>
      <section>
        ${this.getSubNetworkElements().map((subnetwork) => html`<subnetwork-104-container
              .doc="${this.doc}"
              .element=${subnetwork}
            ></subnetwork-104-container>`)}
      </section>`;
  }
};
Network104Container.styles = css`
    :host {
      width: 100vw;
    }

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    subnetwork-104-container {
      margin: 8px 12px 16px;
    }
  `;
Network104Container = __decorate([
  customElement("network-104-container")
], Network104Container);
