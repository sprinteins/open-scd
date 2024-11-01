import {
  getNameAttribute,
  newLogEvent,
  newWizardEvent
} from "../../../foundation.js";
import {
  addPrefixAndNamespaceToDocument,
  createPrivateAddress,
  createPrivateElement,
  getPrivateElement
} from "./private.js";
import {
  findElementInOriginalLNStructure,
  getCdcValueFromDOElement,
  getEnumOrds,
  getTypeAttribute,
  isEnumDataAttribute
} from "./foundation.js";
import {editAddressWizard} from "../wizards/address.js";
import {
  determineUninitializedStructure,
  initializeElements
} from "../../../foundation/dai.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
export const supportedCdcTypes = [
  "ACT",
  "APC",
  "ASG",
  "BAC",
  "BCR",
  "BSC",
  "CMV",
  "DPC",
  "DPS",
  "ENG",
  "INC",
  "ING",
  "INS",
  "ISC",
  "MV",
  "SEC",
  "SPC",
  "SPG",
  "SPS"
];
export const cdcProcessings = {
  ACT: {
    monitor: {
      "30": {
        daPaths: [
          {path: ["general"]},
          {path: ["phsA"]},
          {path: ["phsB"]},
          {path: ["phsC"]},
          {path: ["neut"]}
        ],
        create: createAddressAction,
        inverted: true
      },
      "39": {
        daPaths: [{path: ["general"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  APC: {
    monitor: {
      "36": {
        daPaths: [{path: ["mxVal", "f"]}],
        create: createAddressAction
      }
    },
    control: {
      "63": {
        daPaths: [{path: ["Oper", "ctlVal", "f"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  ASG: {
    monitor: {
      "63": {
        daPaths: [{path: ["setMag", "f"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  BAC: {
    monitor: {
      "36": {
        daPaths: [{path: ["mxVal", "f"]}],
        create: createAddressAction
      }
    },
    control: {
      "60": {
        daPaths: [{path: ["Oper", "ctlVal"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  BCR: {
    monitor: {
      "37": {
        daPaths: [{path: ["actVal"]}, {path: ["frVal"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  BSC: {
    monitor: {
      "32": {
        daPaths: [{path: ["valWTr", "posVal"]}],
        create: createAddressAction
      }
    },
    control: {
      "60": {
        daPaths: [{path: ["Oper", "ctlVal"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  CMV: {
    monitor: {
      "35": {
        daPaths: [{path: ["mag", "i"]}, {path: ["ang", "i"]}],
        create: createAddressAction
      },
      "36": {
        daPaths: [{path: ["mag", "f"]}, {path: ["ang", "f"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  DPC: {
    monitor: {
      "31": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction
      }
    },
    control: {
      "59": {
        daPaths: [{path: ["Oper", "ctlVal"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  DPS: {
    monitor: {
      "31": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  ENG: {
    monitor: {
      "58": {
        daPaths: [{path: ["setVal"]}],
        create: createAddressWithExpectValueAction
      },
      "62": {
        daPaths: [{path: ["setVal"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  INC: {
    monitor: {
      "35": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction
      }
    },
    control: {
      "62": {
        daPaths: [{path: ["Oper", "ctlVal"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  ING: {
    monitor: {
      "62": {
        daPaths: [{path: ["setVal"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  INS: {
    monitor: {
      "30": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction,
        inverted: true
      },
      "33": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction
      },
      "35": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  ISC: {
    monitor: {
      "32": {
        daPaths: [{path: ["valWTr", "posVal"]}],
        create: createAddressAction
      }
    },
    control: {
      "62": {
        daPaths: [{path: ["Oper", "ctlVal"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  MV: {
    monitor: {
      "35": {
        daPaths: [{path: ["mag", "i"]}],
        create: createAddressAction
      },
      "36": {
        daPaths: [{path: ["mag", "f"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  SEC: {
    monitor: {
      "37": {
        daPaths: [{path: ["cnt"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  SPC: {
    monitor: {
      "30": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction,
        inverted: true
      }
    },
    control: {
      "58": {
        daPaths: [{path: ["Oper", "ctlVal"]}],
        create: createAddressAction,
        checkDaPaths: [{path: ["Oper", "Check"]}],
        checkCreate: createCheckAddressAction
      }
    }
  },
  SPG: {
    monitor: {
      "58": {
        daPaths: [{path: ["setVal"]}],
        create: createAddressAction
      }
    },
    control: {}
  },
  SPS: {
    monitor: {
      "30": {
        daPaths: [{path: ["stVal"]}],
        create: createAddressAction,
        inverted: true
      }
    },
    control: {}
  }
};
function createAddressAction(lnElement, lnClonedElement, doElement, wizard, ti, daPaths, inverted) {
  const actions = [];
  const [initializeActions, daiElements] = findOrCreateDaiElements(lnElement, lnClonedElement, doElement, wizard, daPaths);
  if (initializeActions.length > 0) {
    actions.push(...initializeActions);
  }
  if (daiElements.length > 0) {
    addPrefixAndNamespaceToDocument(lnElement.ownerDocument);
    daiElements.forEach((daiElement) => {
      const addressElements = createAddressElements(daiElement.ownerDocument, ti, inverted);
      actions.push(...createActionsForPrivate(daiElement, addressElements));
    });
  }
  startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions);
  return actions;
}
function createAddressWithExpectValueAction(lnElement, lnClonedElement, doElement, wizard, ti, daPaths, inverted) {
  const actions = [];
  const [initializeActions, daiElements] = findOrCreateDaiElements(lnElement, lnClonedElement, doElement, wizard, daPaths);
  if (initializeActions.length > 0) {
    actions.push(...initializeActions);
  }
  if (daiElements.length > 0) {
    addPrefixAndNamespaceToDocument(lnElement.ownerDocument);
    const addressElements = [];
    daiElements.forEach((daiElement) => {
      if (isEnumDataAttribute(daiElement)) {
        getEnumOrds(daiElement).forEach((ord) => addressElements.push(...createAddressElements(daiElement.ownerDocument, ti, inverted, ord)));
      } else {
        addressElements.push(...createAddressElements(daiElement.ownerDocument, ti, inverted));
      }
      actions.push(...createActionsForPrivate(daiElement, addressElements));
    });
  }
  startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions);
  return actions;
}
function createCheckAddressAction(lnElement, lnClonedElement, doElement, wizard, ti, daPaths) {
  const actions = [];
  const [initializeActions, daiElements] = findOrCreateDaiElements(lnElement, lnClonedElement, doElement, wizard, daPaths);
  if (initializeActions.length > 0) {
    actions.push(...initializeActions);
  }
  if (daiElements.length > 0) {
    addPrefixAndNamespaceToDocument(lnElement.ownerDocument);
    daiElements.forEach((daiElement) => {
      const address1Element = createPrivateAddress(daiElement.ownerDocument, ti);
      address1Element.setAttribute("check", "interlocking");
      const address2Element = createPrivateAddress(daiElement.ownerDocument, ti);
      address2Element.setAttribute("check", "synchrocheck");
      actions.push(...createActionsForPrivate(daiElement, [
        address1Element,
        address2Element
      ]));
    });
  }
  startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions);
  return actions;
}
export function createActionsForPrivate(daiElement, addressElements) {
  const actions = [];
  let privateElement = getPrivateElement(daiElement);
  if (privateElement) {
    addressElements.forEach((addressElement) => {
      actions.push({
        new: {parent: privateElement, element: addressElement}
      });
    });
  } else {
    privateElement = createPrivateElement(daiElement.ownerDocument);
    privateElement.append(...addressElements);
    actions.push({new: {parent: daiElement, element: privateElement}});
  }
  return actions;
}
export function createAddressElements(document, ti, inverted, expectedValue) {
  const addressElements = [];
  const addressElement = createPrivateAddress(document, ti);
  if (expectedValue) {
    addressElement.setAttribute("expectedValue", expectedValue);
  }
  addressElements.push(addressElement);
  if (inverted) {
    const addressElement2 = createPrivateAddress(document, ti);
    addressElement2.setAttribute("inverted", "true");
    if (expectedValue) {
      addressElement2.setAttribute("expectedValue", expectedValue);
    }
    addressElements.push(addressElement2);
  }
  return addressElements;
}
function startEditWizards(wizard, lnElement, lnClonedElement, doElement, actions) {
  actions.forEach((createAction) => {
    const newElement = createAction.new.element;
    let addressElements;
    if (newElement.tagName === "Address") {
      addressElements = [newElement];
    } else {
      addressElements = Array.from(newElement.querySelectorAll("Address"));
    }
    const parentElement = createAction.new.parent;
    const daiElement = parentElement.closest("DAI");
    if (daiElement) {
      const iedElement = lnElement.closest("IED");
      const doiElement = lnClonedElement.querySelector(`:scope > DOI[name="${getNameAttribute(doElement)}"]`);
      addressElements.forEach((addressElement) => {
        wizard.dispatchEvent(newWizardEvent(() => editAddressWizard(iedElement, doiElement, daiElement, addressElement)));
      });
    }
  });
}
function createTemplateStructure(doElement, daPath) {
  let templateStructure = [doElement];
  const doc = doElement.ownerDocument;
  const doType = getTypeAttribute(doElement) ?? "";
  let typeElement = doc.querySelector(`DOType[id="${doType}"]`);
  daPath.path.forEach((name) => {
    if (!typeElement) {
      templateStructure = null;
      return;
    }
    const daElement = typeElement.querySelector(`:scope > DA[name="${name}"], :scope > BDA[name="${name}"]`);
    if (daElement === null) {
      templateStructure = null;
      return;
    }
    templateStructure.push(daElement);
    const bType = daElement.getAttribute("bType") ?? "";
    if (bType === "Struct") {
      const type = getTypeAttribute(daElement) ?? "";
      typeElement = doc.querySelector(`DAType[id="${type}"]`);
    } else {
      typeElement = null;
    }
  });
  return templateStructure;
}
function findOrCreateDaiElements(lnElement, lnClonedElement, doElement, wizard, daPaths) {
  const daiElements = [];
  const actions = [];
  daPaths.forEach((daPath) => {
    const filter = createDaiFilter(doElement, daPath);
    const foundDaiElements = lnClonedElement.querySelectorAll(filter);
    if (foundDaiElements.length > 0) {
      foundDaiElements.forEach((clonedDaiElement) => {
        const daiElement = findElementInOriginalLNStructure(lnElement, clonedDaiElement);
        if (daiElement) {
          daiElements.push(daiElement);
        } else {
          daiElements.push(clonedDaiElement);
        }
      });
    } else {
      const templateStructure = createTemplateStructure(doElement, daPath);
      if (templateStructure) {
        const [parentClonedElement, uninitializedTemplateStructure] = determineUninitializedStructure(lnClonedElement, templateStructure);
        const newElement = initializeElements(uninitializedTemplateStructure);
        parentClonedElement.append(newElement);
        const parentElement = findElementInOriginalLNStructure(lnElement, parentClonedElement);
        if (parentElement) {
          actions.push({new: {parent: parentElement, element: newElement}});
        }
        if (newElement.tagName === "DAI") {
          daiElements.push(newElement);
        } else {
          const daiElement = newElement.querySelector("DAI");
          daiElements.push(daiElement);
        }
      } else {
        const cdc = getCdcValueFromDOElement(doElement) ?? "";
        const doType = getTypeAttribute(doElement) ?? "";
        wizard.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("protocol104.wizard.error.addAddressError", {
            structure: daPath.path.join(" > "),
            cdc,
            doType
          })
        }));
      }
    }
  });
  return [actions, daiElements];
}
function createDaiFilter(doElement, daPath) {
  const doName = getNameAttribute(doElement);
  let filter = `:scope > DOI[name="${doName}"] > `;
  daPath.path.forEach((value, index) => {
    if (index < daPath.path.length - 1) {
      filter = `${filter} SDI[name="${value}"] > `;
    } else {
      filter = `${filter} DAI[name="${value}"]`;
    }
  });
  return filter;
}
export function hasUnitMultiplierField(cdc, ti) {
  return cdc === "MV" && ["35", "36"].includes(ti) || cdc === "INS" && ti === "35";
}
export function hasScaleFields(cdc, ti) {
  return cdc === "MV" && ["35", "36"].includes(ti);
}
