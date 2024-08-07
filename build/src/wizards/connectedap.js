import {html} from "../../_snowpack/pkg/lit-element.js";
import {ifDefined} from "../../_snowpack/pkg/lit-html/directives/if-defined.js";
import {translate, get} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../_snowpack/pkg/@material/mwc-icon.js";
import "../wizard-textfield.js";
import "../filtered-list.js";
import {
  compareNames,
  getValue,
  createElement,
  isPublic,
  identity
} from "../foundation.js";
import {
  getTypes,
  typeMaxLength,
  typeNullable,
  typePattern
} from "./foundation/p-types.js";
import {
  mACAddressGenerator,
  appIdGenerator
} from "../foundation/generators.js";
function compareAccessPointConnection(a, b) {
  if (a.connected !== b.connected)
    return b.connected ? -1 : 1;
  return 0;
}
function initSMVElements(doc, connectedAp, options) {
  const actions = [];
  const ied = doc.querySelector(`IED[name="${connectedAp.getAttribute("iedName")}"]`);
  Array.from(ied?.querySelectorAll("SampledValueControl") ?? []).filter((sampledValueControl) => {
    const id = identity(sampledValueControl);
    if (options.unconnectedSampledValueControl.has(id)) {
      options.unconnectedSampledValueControl.delete(id);
      return true;
    }
    return false;
  }).forEach((sampledValueControl) => {
    const cbName = sampledValueControl.getAttribute("name");
    const ldInst = sampledValueControl.closest("LDevice")?.getAttribute("inst") ?? null;
    const sMV = createElement(connectedAp.ownerDocument, "SMV", {
      cbName,
      ldInst
    });
    actions.push({new: {parent: connectedAp, element: sMV}});
    const address = createElement(connectedAp.ownerDocument, "Address", {});
    actions.push({new: {parent: sMV, element: address}});
    const pMac = createElement(connectedAp.ownerDocument, "P", {
      type: "MAC-Address"
    });
    pMac.textContent = options.macGeneratorSmv();
    actions.push({new: {parent: address, element: pMac}});
    const pAppId = createElement(connectedAp.ownerDocument, "P", {
      type: "APPID"
    });
    pAppId.textContent = options.appidGeneratorSmv();
    actions.push({new: {parent: address, element: pAppId}});
    const pVlanId = createElement(connectedAp.ownerDocument, "P", {
      type: "VLANID"
    });
    pVlanId.textContent = "000";
    actions.push({new: {parent: address, element: pVlanId}});
    const pVlanPrio = createElement(connectedAp.ownerDocument, "P", {
      type: "VLAN-Priority"
    });
    pVlanPrio.textContent = "4";
    actions.push({new: {parent: address, element: pVlanPrio}});
  });
  return actions;
}
function initGSEElements(doc, connectedAp, options) {
  const actions = [];
  const ied = doc.querySelector(`IED[name="${connectedAp.getAttribute("iedName")}"]`);
  Array.from(ied?.querySelectorAll("GSEControl") ?? []).filter((gseControl) => {
    const id = identity(gseControl);
    if (options.unconnectedGseControl.has(id)) {
      options.unconnectedGseControl.delete(id);
      return true;
    }
    return false;
  }).forEach((gseControl) => {
    const cbName = gseControl.getAttribute("name");
    const ldInst = gseControl.closest("LDevice")?.getAttribute("inst") ?? null;
    const gSE = createElement(connectedAp.ownerDocument, "GSE", {
      cbName,
      ldInst
    });
    actions.push({new: {parent: connectedAp, element: gSE}});
    const address = createElement(connectedAp.ownerDocument, "Address", {});
    actions.push({new: {parent: gSE, element: address}});
    const pMac = createElement(connectedAp.ownerDocument, "P", {
      type: "MAC-Address"
    });
    pMac.textContent = options.macGeneratorGse();
    actions.push({new: {parent: address, element: pMac}});
    const pAppId = createElement(connectedAp.ownerDocument, "P", {
      type: "APPID"
    });
    pAppId.textContent = options.appidGeneratorGse();
    actions.push({new: {parent: address, element: pAppId}});
    const pVlanId = createElement(connectedAp.ownerDocument, "P", {
      type: "VLANID"
    });
    pVlanId.textContent = "000";
    actions.push({new: {parent: address, element: pVlanId}});
    const pVlanPrio = createElement(connectedAp.ownerDocument, "P", {
      type: "VLAN-Priority"
    });
    pVlanPrio.textContent = "4";
    actions.push({new: {parent: address, element: pVlanPrio}});
    const minTime = createElement(connectedAp.ownerDocument, "MinTime", {
      unit: "s",
      multiplier: "m"
    });
    minTime.textContent = "10";
    actions.push({new: {parent: gSE, element: minTime}});
    const maxTime = createElement(connectedAp.ownerDocument, "MaxTime", {
      unit: "s",
      multiplier: "m"
    });
    maxTime.textContent = "10000";
    actions.push({new: {parent: gSE, element: maxTime}});
  });
  return actions;
}
function unconnectedGseControls(doc) {
  const allGseControl = Array.from(doc.querySelectorAll("GSEControl"));
  const unconnectedGseControl = allGseControl.filter((gseControl) => {
    const iedName = gseControl.closest("IED")?.getAttribute("name");
    const ldInst = gseControl.closest("LDevice")?.getAttribute("inst");
    const cbName = gseControl.getAttribute("name");
    return !doc.querySelector(`ConnectedAP[iedName="${iedName}"] > GSE[ldInst="${ldInst}"][cbName="${cbName}"]`);
  }).map((gseControl) => identity(gseControl));
  const mySet = new Set(unconnectedGseControl);
  return mySet;
}
function unconnectedSampledValueControls(doc) {
  const allSmvControl = Array.from(doc.querySelectorAll("SampledValueControl"));
  const unconnectedSmvControl = allSmvControl.filter((gseControl) => {
    const iedName = gseControl.closest("IED")?.getAttribute("name");
    const ldInst = gseControl.closest("LDevice")?.getAttribute("inst");
    const cbName = gseControl.getAttribute("name");
    return !doc.querySelector(`ConnectedAP[iedName="${iedName}"] > SMV[ldInst="${ldInst}"][cbName="${cbName}"]`);
  }).map((gseControl) => identity(gseControl));
  const mySet = new Set(unconnectedSmvControl);
  return mySet;
}
function createConnectedApAction(parent) {
  return (_, __, list) => {
    const doc = parent.ownerDocument;
    const macGeneratorSmv = mACAddressGenerator(doc, "SMV");
    const appidGeneratorSmv = appIdGenerator(doc, "SMV");
    const macGeneratorGse = mACAddressGenerator(doc, "GSE");
    const appidGeneratorGse = appIdGenerator(doc, "GSE");
    const unconnectedGseControl = unconnectedGseControls(doc);
    const unconnectedSampledValueControl = unconnectedSampledValueControls(doc);
    if (!list)
      return [];
    const identities = list.selected.map((item) => item.value);
    const actions = identities.map((identity2) => {
      const [iedName, apName] = identity2.split(">");
      const actions2 = [];
      const connectedAp = createElement(parent.ownerDocument, "ConnectedAP", {
        iedName,
        apName
      });
      actions2.push({new: {parent, element: connectedAp}});
      actions2.push(...initSMVElements(doc, connectedAp, {
        macGeneratorSmv,
        appidGeneratorSmv,
        unconnectedSampledValueControl
      }));
      actions2.push(...initGSEElements(doc, connectedAp, {
        macGeneratorGse,
        appidGeneratorGse,
        unconnectedGseControl
      }));
      return {title: "Added ConnectedAP", actions: actions2};
    });
    return actions;
  };
}
function existConnectedAp(accesspoint) {
  const iedName = accesspoint.closest("IED")?.getAttribute("name");
  const apName = accesspoint.getAttribute("name");
  const connAp = accesspoint.ownerDocument.querySelector(`ConnectedAP[iedName="${iedName}"][apName="${apName}"]`);
  return (connAp && isPublic(connAp)) ?? false;
}
export function createTypeRestrictionCheckbox(element) {
  return html`<mwc-formfield
    label="${translate("connectedap.wizard.addschemainsttype")}"
    ><mwc-checkbox
      id="typeRestriction"
      ?checked=${hasTypeRestriction(element)}
    ></mwc-checkbox>
  </mwc-formfield>`;
}
export function createPTextField(element, pType) {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    ?nullable=${typeNullable[pType]}
    .maybeValue=${element.querySelector(`:scope > Address > P[type="${pType}"]`)?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
  ></wizard-textfield>`;
}
export function createConnectedApWizard(element) {
  const doc = element.ownerDocument;
  const accessPoints = Array.from(doc.querySelectorAll(":root > IED")).sort(compareNames).flatMap((ied) => Array.from(ied.querySelectorAll(":root > IED > AccessPoint"))).map((accesspoint) => {
    return {
      element: accesspoint,
      connected: existConnectedAp(accesspoint)
    };
  }).sort(compareAccessPointConnection);
  return [
    {
      title: get("wizard.title.add", {tagName: "ConnectedAP"}),
      primary: {
        icon: "save",
        label: get("save"),
        action: createConnectedApAction(element)
      },
      content: [
        html` <filtered-list id="apList" multi
          >${accessPoints.map((accesspoint) => {
          const id = identity(accesspoint.element);
          return html`<mwc-check-list-item
              value="${id}"
              ?disabled=${accesspoint.connected}
              ><span>${id}</span></mwc-check-list-item
            >`;
        })}
        </filtered-list>`
      ]
    }
  ];
}
function isEqualAddress(oldAddress, newAddress) {
  return Array.from(oldAddress.querySelectorAll("Address > P")).every((pType) => newAddress.querySelector(`Address > P[type="${pType.getAttribute("type")}"]`)?.isEqualNode(pType));
}
function createAddressElement(inputs, parent, typeRestriction) {
  const element = createElement(parent.ownerDocument, "Address", {});
  inputs.filter((input) => getValue(input) !== null).forEach((validInput) => {
    const type = validInput.label;
    const child = createElement(parent.ownerDocument, "P", {type});
    if (typeRestriction)
      child.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:type", "tP_" + type);
    child.textContent = getValue(validInput);
    element.appendChild(child);
  });
  return element;
}
function updateConnectedApAction(parent) {
  return (inputs, wizard) => {
    const typeRestriction = wizard.shadowRoot?.querySelector("#typeRestriction")?.checked ?? false;
    const newAddress = createAddressElement(inputs, parent, typeRestriction);
    const oldAddress = parent.querySelector("Address");
    const complexAction = {
      actions: [],
      title: get("connectedap.action.addaddress", {
        iedName: parent.getAttribute("iedName") ?? "",
        apName: parent.getAttribute("apName") ?? ""
      })
    };
    if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
      complexAction.actions.push({
        old: {
          parent,
          element: oldAddress
        }
      });
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress
        }
      });
    } else if (oldAddress === null)
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress
        }
      });
    return complexAction.actions.length ? [complexAction] : [];
  };
}
function hasTypeRestriction(element) {
  return Array.from(element.querySelectorAll("Address > P")).filter((p) => isPublic(p)).some((pType) => pType.getAttribute("xsi:type"));
}
export function editConnectedApWizard(element) {
  return [
    {
      title: get("wizard.title.edit", {tagName: element.tagName}),
      element,
      primary: {
        icon: "save",
        label: get("save"),
        action: updateConnectedApAction(element)
      },
      content: [
        html`${createTypeRestrictionCheckbox(element)}
        ${getTypes(element).map((pType) => html`${createPTextField(element, pType)}`)}`
      ]
    }
  ];
}
