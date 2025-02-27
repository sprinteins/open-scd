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
  LitElement,
  customElement,
  html,
  property,
  css,
  query,
  state
} from "../../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../../_snowpack/pkg/lit-html/directives/class-map.js";
import {translate} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-icon-button.js";
import "../../action-pane.js";
import "./bay-editor.js";
import "./general-equipment-editor.js";
import "./ied-editor.js";
import "./powertransformer-editor.js";
import {
  selectors,
  startMove,
  cloneSubstationElement,
  styles,
  renderGeneralEquipment,
  redirectDialog
} from "./foundation.js";
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
  tags
} from "../../foundation.js";
import {SubstationEditor} from "./substation-editor.js";
import {emptyWizard, wizards} from "../../wizards/wizard-library.js";
function childTags(element) {
  if (!element)
    return [];
  return tags[element.tagName].children.filter((child) => wizards[child].create !== emptyWizard);
}
export let VoltageLevelEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.readonly = false;
    this.showfunctions = false;
    this.getAttachedIeds = () => {
      return [];
    };
    this.cloneUI = false;
  }
  get voltage() {
    const V = this.element.querySelector(selectors.VoltageLevel + " > Voltage");
    if (V === null)
      return null;
    const v = V.textContent ?? "";
    const m = V.getAttribute("multiplier");
    const u = m === null ? "V" : " " + m + "V";
    return v ? v + u : null;
  }
  get header() {
    const name = this.element.getAttribute("name") ?? "";
    const desc = this.element.getAttribute("desc");
    return `${name} ${desc ? `- ${desc}` : ""}
    ${this.voltage === null ? "" : `(${this.voltage})`}`;
  }
  openEditWizard() {
    const wizard = wizards["VoltageLevel"].edit(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  openLNodeWizard() {
    const wizard = wizards["LNode"].create(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  remove() {
    if (this.element)
      this.dispatchEvent(newActionEvent({
        old: {
          parent: this.element.parentElement,
          element: this.element,
          reference: this.element.nextSibling
        }
      }));
  }
  openCreateWizard(tagName) {
    const wizard = wizards[tagName].create(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  updated() {
    this.addMenu.anchor = this.addButton;
  }
  renderRedirectUI() {
    if (!this.cloneUI)
      return html``;
    return redirectDialog(this.element);
  }
  renderLNodes() {
    if (!this.showfunctions)
      return html``;
    const lNodes = getChildElementsByTagName(this.element, "LNode");
    return lNodes.length ? html`<div class="container lnode">
          ${lNodes.map((lNode) => html`<l-node-editor
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>` : html``;
  }
  renderFunctions() {
    if (!this.showfunctions)
      return html``;
    const functions = getChildElementsByTagName(this.element, "Function");
    return html` ${functions.map((fUnction) => html`<function-editor
          .doc=${this.doc}
          .element=${fUnction}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`)}`;
  }
  renderIedContainer() {
    const ieds = this.getAttachedIeds?.(this.element) ?? [];
    return ieds?.length ? html`<div id="iedcontainer">
          ${ieds.map((ied) => html`<ied-editor .doc=${this.doc} .element=${ied}></ied-editor>`)}
        </div>` : html``;
  }
  renderPowerTransformerContainer() {
    const pwts = Array.from(this.element?.querySelectorAll(selectors.VoltageLevel + " > PowerTransformer") ?? []);
    return pwts?.length ? html`<div
          class="${classMap({
      ptrContent: true,
      actionicon: !this.showfunctions
    })}"
        >
          ${pwts.map((pwt) => html`<powertransformer-editor
                .doc=${this.doc}
                .element=${pwt}
                ?showfunctions=${this.showfunctions}
              ></powertransformer-editor>`)}
        </div>` : html``;
  }
  renderAddButtons() {
    return childTags(this.element).map((child) => html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
  }
  render() {
    return html`${this.renderRedirectUI()}<action-pane label="${this.header}">
        <abbr slot="action" title="${translate("lnode.tooltip")}">
          <mwc-icon-button
            icon="account_tree"
            @click=${() => this.openLNodeWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate("duplicate")}">
          <mwc-icon-button
            icon="content_copy"
            @click=${() => cloneSubstationElement(this)}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate("edit")}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate("move")}">
          <mwc-icon-button
            icon="forward"
            @click=${() => startMove(this, VoltageLevelEditor, [SubstationEditor])}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate("remove")}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
        <abbr
          slot="action"
          style="position:relative;"
          title="${translate("add")}"
        >
          <mwc-icon-button
            icon="playlist_add"
            @click=${() => this.addMenu.open = true}
          ></mwc-icon-button
          ><mwc-menu
            corner="BOTTOM_RIGHT"
            menuCorner="END"
            @action=${(e) => {
      const tagName = e.target.selected.value;
      this.openCreateWizard(tagName);
    }}
            >${this.renderAddButtons()}</mwc-menu
          >
        </abbr>
        ${renderGeneralEquipment(this.doc, this.element, this.showfunctions)}
        ${this.renderIedContainer()}${this.renderLNodes()}${this.renderFunctions()}
        ${this.renderPowerTransformerContainer()}
        <div id="bayContainer">
          ${Array.from(this.element?.querySelectorAll(selectors.Bay) ?? []).map((bay) => html`<bay-editor
              .doc=${this.doc}
              .element=${bay}
              .getAttachedIeds=${this.getAttachedIeds}
              ?readonly=${this.readonly}
              ?showfunctions=${this.showfunctions}
            ></bay-editor>`)}
        </div>
      </action-pane>`;
  }
};
VoltageLevelEditor.styles = css`
    ${styles}

    #bayContainer {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #bayContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
__decorate([
  property({attribute: false})
], VoltageLevelEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], VoltageLevelEditor.prototype, "element", 2);
__decorate([
  property({type: Boolean})
], VoltageLevelEditor.prototype, "readonly", 2);
__decorate([
  property({type: Boolean})
], VoltageLevelEditor.prototype, "showfunctions", 2);
__decorate([
  property()
], VoltageLevelEditor.prototype, "voltage", 1);
__decorate([
  property({type: String})
], VoltageLevelEditor.prototype, "header", 1);
__decorate([
  property({attribute: false})
], VoltageLevelEditor.prototype, "getAttachedIeds", 2);
__decorate([
  state()
], VoltageLevelEditor.prototype, "cloneUI", 2);
__decorate([
  query("mwc-dialog")
], VoltageLevelEditor.prototype, "dialog", 2);
__decorate([
  query("mwc-menu")
], VoltageLevelEditor.prototype, "addMenu", 2);
__decorate([
  query('mwc-icon-button[icon="playlist_add"]')
], VoltageLevelEditor.prototype, "addButton", 2);
VoltageLevelEditor = __decorate([
  customElement("voltage-level-editor")
], VoltageLevelEditor);
