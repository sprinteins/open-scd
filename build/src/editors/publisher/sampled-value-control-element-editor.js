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
} from "../../../_snowpack/pkg/lit-element.js";
import {translate} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../wizard-checkbox.js";
import "../../wizard-select.js";
import "../../wizard-textfield.js";
import {identity} from "../../foundation.js";
import {maxLength, patterns} from "../../wizards/foundation/limits.js";
import {typeNullable, typePattern} from "../../wizards/foundation/p-types.js";
import {ifDefined} from "../../../_snowpack/pkg/lit-html/directives/if-defined.js";
export let SampledValueControlElementEditor = class extends LitElement {
  get sMV() {
    const cbName = this.element.getAttribute("name");
    const iedName = this.element.closest("IED")?.getAttribute("name");
    const apName = this.element.closest("AccessPoint")?.getAttribute("name");
    const ldInst = this.element.closest("LDevice")?.getAttribute("inst");
    return this.element.ownerDocument.querySelector(`:root > Communication > SubNetwork > ConnectedAP[iedName="${iedName}"][apName="${apName}"] > SMV[ldInst="${ldInst}"][cbName="${cbName}"]`);
  }
  renderSmvContent() {
    const sMV = this.sMV;
    if (!sMV)
      return html` <h3>
        <div>${translate("publisher.smv.commsetting")}</div>
        <div class="headersubtitle">
          ${translate("publisher.smv.noconnectionap")}
        </div>
      </h3>`;
    const hasInstType = Array.from(sMV.querySelectorAll("Address > P")).some((pType) => pType.getAttribute("xsi:type"));
    const attributes = {};
    ["MAC-Address", "APPID", "VLAN-ID", "VLAN-PRIORITY"].forEach((key) => {
      if (!attributes[key])
        attributes[key] = sMV.querySelector(`Address > P[type="${key}"]`)?.textContent?.trim() ?? null;
    });
    return html` <h3>${translate("publisher.smv.commsetting")}</h3>
      <mwc-formfield
        label="${translate("connectedap.wizard.addschemainsttype")}"
        ><mwc-checkbox
          id="instType"
          ?checked="${hasInstType}"
          disabled
        ></mwc-checkbox></mwc-formfield
      >${Object.entries(attributes).map(([key, value]) => html`<wizard-textfield
            label="${key}"
            ?nullable=${typeNullable[key]}
            .maybeValue=${value}
            pattern="${ifDefined(typePattern[key])}"
            required
            disabled
          ></wizard-textfield>`)}`;
  }
  renderSmvOptsContent() {
    const [refreshTime, sampleRate, dataSet, security, synchSourceId] = [
      "refreshTime",
      "sampleRate",
      "dataSet",
      "security",
      "synchSourceId"
    ].map((attr) => this.element.querySelector("SmvOpts")?.getAttribute(attr) ?? null);
    return html`<h3>${translate("publisher.smv.smvopts")}</h3>
      ${Object.entries({
      refreshTime,
      sampleRate,
      dataSet,
      security,
      synchSourceId
    }).map(([key, value]) => html`<wizard-checkbox
            label="${key}"
            .maybeValue=${value}
            nullable
            helper="${translate(`scl.${key}`)}"
            disabled
          ></wizard-checkbox>`)}`;
  }
  renderOtherElements() {
    return html`<div class="content">
      ${this.renderSmvOptsContent()}${this.renderSmvContent()}
    </div>`;
  }
  renderSmvControlContent() {
    const [
      name,
      desc,
      multicast,
      smvID,
      smpMod,
      smpRate,
      nofASDU,
      securityEnabled
    ] = [
      "name",
      "desc",
      "multicast",
      "smvID",
      "smpMod",
      "smpRate",
      "nofASDU",
      "securityEnabled"
    ].map((attr) => this.element?.getAttribute(attr));
    return html`<div class="content">
      <wizard-textfield
        label="name"
        .maybeValue=${name}
        helper="${translate("scl.name")}"
        required
        validationMessage="${translate("textfield.required")}"
        pattern="${patterns.asciName}"
        maxLength="${maxLength.cbName}"
        dialogInitialFocus
        disabled
      ></wizard-textfield>
      <wizard-textfield
        label="desc"
        .maybeValue=${desc}
        nullable
        helper="${translate("scl.desc")}"
        disabled
      ></wizard-textfield>
      ${multicast === "true" ? html`` : html`<wizard-checkbox
            label="multicast"
            .maybeValue=${multicast}
            helper="${translate("scl.multicast")}"
            disabled
          ></wizard-checkbox>`}
      <wizard-textfield
        label="smvID"
        .maybeValue=${smvID}
        helper="${translate("scl.id")}"
        required
        validationMessage="${translate("textfield.nonempty")}"
        disabled
      ></wizard-textfield>
      <wizard-select
        label="smpMod"
        .maybeValue=${smpMod}
        nullable
        required
        helper="${translate("scl.smpMod")}"
        disabled
        >${["SmpPerPeriod", "SmpPerSec", "SecPerSmp"].map((option) => html`<mwc-list-item value="${option}">${option}</mwc-list-item>`)}</wizard-select
      >
      <wizard-textfield
        label="smpRate"
        .maybeValue=${smpRate}
        helper="${translate("scl.smpRate")}"
        required
        type="number"
        min="0"
        disabled
      ></wizard-textfield>
      <wizard-textfield
        label="nofASDU"
        .maybeValue=${nofASDU}
        helper="${translate("scl.nofASDU")}"
        required
        type="number"
        min="0"
        disabled
      ></wizard-textfield>
      <wizard-select
        label="securityEnabled"
        .maybeValue=${securityEnabled}
        nullable
        required
        helper="${translate("scl.securityEnable")}"
        disabled
        >${["None", "Signature", "SignatureAndEncryption"].map((type) => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`)}</wizard-select
      >
    </div>`;
  }
  render() {
    return html`<h2 style="display: flex;">
        <div style="flex:auto">
          <div>SampledValueControl</div>
          <div class="headersubtitle">${identity(this.element)}</div>
        </div>
      </h2>
      <div class="parentcontent">
        ${this.renderSmvControlContent()}${this.renderOtherElements()}
      </div>`;
  }
};
SampledValueControlElementEditor.styles = css`
    .parentcontent {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    .content {
      border-left: thick solid var(--mdc-theme-on-primary);
    }

    .content > * {
      display: block;
      margin: 4px 8px 16px;
    }

    h2,
    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 4px 8px 16px;
      padding-left: 0.3em;
    }

    .headersubtitle {
      font-size: 16px;
      font-weight: 200;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }

    @media (max-width: 950px) {
      .content {
        border-left: 0px solid var(--mdc-theme-on-primary);
      }
    }
  `;
__decorate([
  property({attribute: false})
], SampledValueControlElementEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], SampledValueControlElementEditor.prototype, "element", 2);
__decorate([
  property({attribute: false})
], SampledValueControlElementEditor.prototype, "sMV", 1);
SampledValueControlElementEditor = __decorate([
  customElement("sampled-value-control-element-editor")
], SampledValueControlElementEditor);
