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
  property,
  query,
  state
} from "../../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../../_snowpack/pkg/lit-html/directives/class-map.js";
import {translate} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-icon-button.js";
import "../../../_snowpack/pkg/@material/mwc-textfield.js";
import "../../action-pane.js";
import "./ied-editor.js";
import "./conducting-equipment-editor.js";
import "./general-equipment-editor.js";
import "./powertransformer-editor.js";
import {VoltageLevelEditor} from "./voltage-level-editor.js";
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
  tags
} from "../../foundation.js";
import {emptyWizard, wizards} from "../../wizards/wizard-library.js";
import {
  cloneSubstationElement,
  renderGeneralEquipment,
  redirectDialog,
  startMove,
  styles
} from "./foundation.js";
function childTags(element) {
  if (!element)
    return [];
  return tags[element.tagName].children.filter((child) => wizards[child].create !== emptyWizard);
}
export let BayEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.readonly = false;
    this.showfunctions = false;
    this.getAttachedIeds = () => {
      return [];
    };
    this.cloneUI = false;
  }
  get header() {
    const name = this.element.getAttribute("name") ?? "";
    const desc = this.element.getAttribute("desc");
    return `${name} ${desc ? `- ${desc}` : ""}`;
  }
  openEditWizard() {
    const wizard = wizards["Bay"].edit(this.element);
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
            @click="${() => this.openLNodeWizard()}"
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
            @click=${() => startMove(this, BayEditor, [VoltageLevelEditor])}
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
        <div
          class="${classMap({
      content: true,
      actionicon: !this.showfunctions
    })}"
        >
          ${Array.from(getChildElementsByTagName(this.element, "PowerTransformer")).map((pwt) => html`<powertransformer-editor
                .doc=${this.doc}
                .element=${pwt}
                ?showfunctions=${this.showfunctions}
              ></powertransformer-editor>`)}
          ${Array.from(getChildElementsByTagName(this.element, "ConductingEquipment")).map((voltageLevel) => html`<conducting-equipment-editor
                .doc=${this.doc}
                .element=${voltageLevel}
                ?readonly=${this.readonly}
                ?showfunctions=${this.showfunctions}
              ></conducting-equipment-editor>`)}
        </div>
      </action-pane> `;
  }
};
BayEditor.styles = css`
    ${styles}

    .content.actionicon {
      display: grid;
      grid-gap: 12px;
      padding: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }

    conducting-equipment-editor[showfunctions] {
      margin: 4px 8px 16px;
    }
  `;
__decorate([
  property({attribute: false})
], BayEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], BayEditor.prototype, "element", 2);
__decorate([
  property({type: Boolean})
], BayEditor.prototype, "readonly", 2);
__decorate([
  property({type: Boolean})
], BayEditor.prototype, "showfunctions", 2);
__decorate([
  property({type: String})
], BayEditor.prototype, "header", 1);
__decorate([
  property({attribute: false})
], BayEditor.prototype, "getAttachedIeds", 2);
__decorate([
  state()
], BayEditor.prototype, "cloneUI", 2);
__decorate([
  query("mwc-dialog")
], BayEditor.prototype, "dialog", 2);
__decorate([
  query("mwc-menu")
], BayEditor.prototype, "addMenu", 2);
__decorate([
  query('mwc-icon-button[icon="playlist_add"]')
], BayEditor.prototype, "addButton", 2);
BayEditor = __decorate([
  customElement("bay-editor")
], BayEditor);
