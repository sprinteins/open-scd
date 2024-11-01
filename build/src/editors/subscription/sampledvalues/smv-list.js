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
import {
  css,
  customElement,
  html,
  LitElement,
  property
} from "../../../../_snowpack/pkg/lit-element.js";
import {translate} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import {
  getNameAttribute,
  identity,
  newWizardEvent
} from "../../../foundation.js";
import {newSmvSelectEvent} from "./foundation.js";
import {smvIcon} from "../../../icons/icons.js";
import {getOrderedIeds, styles} from "../foundation.js";
import {classMap} from "../../../../_snowpack/pkg/lit-html/directives/class-map.js";
import {wizards} from "../../../wizards/wizard-library.js";
let selectedSmvMsg;
let selectedDataSet;
function onOpenDocResetSelectedSmvMsg() {
  selectedSmvMsg = void 0;
  selectedDataSet = void 0;
}
addEventListener("open-doc", onOpenDocResetSelectedSmvMsg);
export let SmvPublisherList = class extends LitElement {
  onSelect(smvControl) {
    const ln = smvControl.parentElement;
    const dataset = ln?.querySelector(`DataSet[name=${smvControl.getAttribute("datSet")}]`);
    selectedSmvMsg = smvControl;
    selectedDataSet = dataset;
    this.dispatchEvent(newSmvSelectEvent(selectedSmvMsg, selectedDataSet));
    this.requestUpdate();
  }
  openEditWizard(smvControl) {
    const wizard = wizards["SampledValueControl"].edit(smvControl);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  updated() {
    this.dispatchEvent(newSmvSelectEvent(selectedSmvMsg, selectedDataSet ?? void 0));
  }
  firstUpdated() {
    selectedSmvMsg = void 0;
    selectedDataSet = void 0;
  }
  renderSmv(smvControl) {
    return html`<mwc-list-item
      @click=${() => this.onSelect(smvControl)}
      graphic="large"
      hasMeta
      value="${identity(smvControl)}"
    >
      <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
      <span>${smvControl.getAttribute("name")}</span>
      <mwc-icon-button
        class="${classMap({
      hidden: smvControl !== selectedSmvMsg
    })}"
        slot="meta"
        icon="edit"
        @click=${() => this.openEditWizard(smvControl)}
      ></mwc-icon-button>
    </mwc-list-item>`;
  }
  render() {
    return html` <section tabindex="0">
      <h1>${translate("subscription.smv.publisher.title")}</h1>
      <filtered-list activatable>
        ${getOrderedIeds(this.doc).map((ied) => html`
              <mwc-list-item
                noninteractive
                graphic="icon"
                value="${Array.from(ied.querySelectorAll("SampledValueControl")).map((element) => {
      const id = identity(element);
      return typeof id === "string" ? id : "";
    }).join(" ")}"
              >
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
              ${Array.from(ied.querySelectorAll(":scope > AccessPoint > Server > LDevice > LN0 > SampledValueControl")).map((control) => this.renderSmv(control))}
            `)}
      </filtered-list>
    </section>`;
  }
};
SmvPublisherList.styles = css`
    ${styles}

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    mwc-icon-button.hidden {
      display: none;
    }

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
__decorate([
  property({attribute: false})
], SmvPublisherList.prototype, "doc", 2);
SmvPublisherList = __decorate([
  customElement("smv-list")
], SmvPublisherList);
