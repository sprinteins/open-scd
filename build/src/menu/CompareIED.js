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
  html,
  LitElement,
  property,
  query
} from "../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-dialog.js";
import "../../_snowpack/pkg/@material/mwc-list.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../plain-compare-list.js";
import {
  compareNames,
  getNameAttribute,
  identity,
  isPublic,
  newPendingStateEvent,
  selector
} from "../foundation.js";
const tctrClass = `LN[lnClass='TCTR']`;
const tvtrClass = `LN[lnClass='TVTR']`;
const setMag = `SDI[name='setMag'] Val`;
const setVal = `DAI[name='setVal'] Val`;
const filterToIgnore = {
  ":scope": {
    attributes: {
      name: true
    }
  },
  P: {
    full: true
  }
};
filterToIgnore[`${tctrClass} DOI[name='Rat'] ${setMag}`] = {
  full: true
};
filterToIgnore[`${tctrClass} DOI[name='ARtg'] ${setMag}`] = {
  full: true
};
filterToIgnore[`${tctrClass} DOI[name='ARtgNom'] ${setMag}`] = {
  full: true
};
filterToIgnore[`${tctrClass} DOI[name='ARtgSec'] ${setVal}`] = {
  full: true
};
filterToIgnore[`${tvtrClass} DOI[name='VRtg'] ${setMag}`] = {
  full: true
};
filterToIgnore[`${tvtrClass} DOI[name='Rat'] ${setMag}`] = {
  full: true
};
filterToIgnore[`${tvtrClass} DOI[name='VRtgSec'] ${setVal}`] = {
  full: true
};
export default class CompareIEDPlugin extends LitElement {
  constructor() {
    super(...arguments);
    this.templateDocName = "";
  }
  get ieds() {
    if (this.doc) {
      return Array.from(this.doc.querySelectorAll(`IED`)).filter(isPublic).sort(compareNames);
    }
    return [];
  }
  get templateIeds() {
    if (this.templateDoc) {
      return Array.from(this.templateDoc.querySelectorAll(`IED`)).filter(isPublic).sort(compareNames);
    }
    return [];
  }
  async run() {
    this.dialog.open = true;
  }
  onClosed() {
    this.templateDoc = void 0;
    this.selectedProjectIed = void 0;
    this.selectedTemplateIed = void 0;
  }
  getSelectedListItem(doc, listId) {
    const selectListItem = this.shadowRoot.querySelector(`mwc-list[id='${listId}']`).selected;
    const identity2 = selectListItem?.value;
    if (identity2) {
      return doc.querySelector(selector("IED", identity2)) ?? void 0;
    }
    return void 0;
  }
  async getTemplateFile(evt) {
    const file = evt.target?.files?.item(0) ?? false;
    if (!file)
      return;
    this.templateDocName = file.name;
    const templateText = await file.text();
    this.templateDoc = new DOMParser().parseFromString(templateText, "application/xml");
    this.templateFileUI.onchange = null;
  }
  renderSelectIedButton() {
    return html`<mwc-button
      slot="primaryAction"
      icon="arrow_back"
      trailingIcon
      label="${translate("compare-ied.selectIedButton")}"
      @click=${() => {
      this.selectedProjectIed = void 0;
      this.selectedTemplateIed = void 0;
    }}
    ></mwc-button>`;
  }
  renderCompareButton() {
    return html`<mwc-button
      slot="primaryAction"
      icon="compare_arrows"
      trailingIcon
      label="${translate("compare.compareButton")}"
      @click=${() => {
      this.selectedProjectIed = this.getSelectedListItem(this.doc, "currentDocument");
      this.selectedTemplateIed = this.getSelectedListItem(this.templateDoc, "currentTemplate");
    }}
    ></mwc-button>`;
  }
  renderCloseButton() {
    return html`<mwc-button
      slot="secondaryAction"
      dialogAction="close"
      label="${translate("close")}"
      style="--mdc-theme-primary: var(--mdc-theme-error)"
    ></mwc-button>`;
  }
  renderCompare() {
    const leftHandTitle = identity(this.selectedProjectIed);
    const rightHandTitle = identity(this.selectedTemplateIed);
    return html`<plain-compare-list
        .leftHandObject=${this.selectedProjectIed}
        .rightHandObject=${this.selectedTemplateIed}
        .leftHandTitle=${typeof leftHandTitle === "number" ? "" : leftHandTitle}
        .rightHandTitle=${typeof rightHandTitle === "number" ? "" : rightHandTitle}
        .leftHandSubtitle=${this.docName}
        .rightHandSubtitle=${this.templateDocName}
        .filterToIgnore=${filterToIgnore}
      ></plain-compare-list>
      ${this.renderSelectIedButton()} ${this.renderCloseButton()}`;
  }
  renderIEDList(ieds, id) {
    return html`<mwc-list id="${id}" activatable>
      ${ieds.map((ied) => {
      const name = getNameAttribute(ied);
      return html`<mwc-list-item value="${identity(ied)}" left>
          <span>${name}</span>
        </mwc-list-item>`;
    })}
    </mwc-list>`;
  }
  renderIEDLists() {
    return html`<div class="splitContainer">
        <div>
          <div>${translate("compare-ied.projectIedTitle")}</div>
          <div class="iedList">
            ${this.renderIEDList(this.ieds, "currentDocument")}
          </div>
        </div>
        <div>
          <div>${translate("compare-ied.templateIedTitle")}</div>
          <div class="iedList">
            ${this.renderIEDList(this.templateIeds, "currentTemplate")}
          </div>
        </div>
      </div>
      ${this.renderCompareButton()} ${this.renderCloseButton()}`;
  }
  renderSelectTemplateFile() {
    return html`<div>
        <input
          id="template-file"
          accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
          type="file"
          hidden
          required
          @change=${(evt) => this.dispatchEvent(newPendingStateEvent(this.getTemplateFile(evt)))}
        />

        <mwc-button
          label="${translate("compare-ied.selectTemplateButton")}"
          @click=${() => {
      const input = this.shadowRoot.querySelector("#template-file");
      input?.click();
    }}
        ></mwc-button>
      </div>
      ${this.renderCloseButton()}`;
  }
  renderDialog(content, heading) {
    return html`<mwc-dialog heading="${heading}" @closed=${this.onClosed}>
      ${content}
    </mwc-dialog>`;
  }
  render() {
    if (!this.doc)
      return html``;
    if (this.selectedProjectIed && this.selectedTemplateIed) {
      return this.renderDialog(this.renderCompare(), get("compare-ied.resultTitle"));
    } else if (this.templateDoc) {
      return this.renderDialog(this.renderIEDLists(), get("compare-ied.selectIedTitle"));
    } else {
      return this.renderDialog(this.renderSelectTemplateFile(), get("compare-ied.selectProjectTitle"));
    }
  }
}
CompareIEDPlugin.styles = css`
    mwc-dialog {
      --mdc-dialog-min-width: 64vw;
    }

    .splitContainer {
      display: flex;
      padding: 8px 6px 16px;
      height: 64vh;
    }

    .iedList {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: auto;
    }

    .resultTitle {
      font-weight: bold;
    }
  `;
__decorate([
  property({attribute: false})
], CompareIEDPlugin.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], CompareIEDPlugin.prototype, "templateDoc", 2);
__decorate([
  property({attribute: false})
], CompareIEDPlugin.prototype, "selectedProjectIed", 2);
__decorate([
  property({attribute: false})
], CompareIEDPlugin.prototype, "selectedTemplateIed", 2);
__decorate([
  query("mwc-dialog")
], CompareIEDPlugin.prototype, "dialog", 2);
__decorate([
  query("#template-file")
], CompareIEDPlugin.prototype, "templateFileUI", 2);
__decorate([
  property({attribute: false})
], CompareIEDPlugin.prototype, "docName", 2);
