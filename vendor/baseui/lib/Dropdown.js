// Dropdown: the list part shared by Selector and Typeahead (popup, options, details, check, empty state).
// The field (Text Input shell) is in the host component; the Dropdown only draws the list under it.
import{t as reactFactory}from"./react-BZJXY1be.js";
import{t as jsxFactory}from"./jsx-runtime-DeHZSEgm.js";
import{n as initCheck,t as Check}from"./Check-C6Isogov.js";
import{d as initStyles,s as optionLabel,u as styles}from"./useMediaLg-a1QeSKgZ.js";

initCheck();
initStyles();
const React=reactFactory();
const{jsx,jsxs}=jsxFactory();

/**
 * @param parts   Base UI parts of the host: `{ Portal, Positioner, Popup, List, Item, Indicator, ItemText?, Empty? }`
 *                (Select parts for `mode="select"`, Combobox parts for `mode="combobox"`).
 * @param mode    `select` renders the options as children, `combobox` as a render function (filtered list + empty state).
 */
export function Dropdown({parts,mode="select",positionerRef,anchor,menu=false,options,idBase,testIdPrefix,emptyText}){
  const{Portal,Positioner,Popup,List,Item,ItemText,Indicator,Empty}=parts;
  const byValue=React.useMemo(()=>new Map(options.map(o=>[o.value,o])),[options]);
  const option=(o,index)=>{
    const labelId=`${idBase}-${index}-label`,detailsId=`${idBase}-${index}-details`;
    const common={className:styles.item,value:o.value,disabled:o.disabled,"data-testid":`${testIdPrefix}-${o.value}`,"aria-labelledby":labelId,"aria-describedby":o.details?detailsId:void 0};
    const text=mode==="select"?jsx(ItemText,{id:labelId,className:styles.itemText,children:o.label}):jsx("span",{id:labelId,className:styles.itemText,children:o.label});
    return jsxs(Item,{...common,...(mode==="select"?{label:optionLabel(o,o.value)}:{index}),children:[text,o.details&&jsx("span",{id:detailsId,className:styles.details,children:o.details}),jsx(Indicator,{className:styles.indicator,keepMounted:true,children:jsx(Check,{"aria-hidden":"true"})})]},o.value);
  };
  return jsx(Portal,{children:jsx(Positioner,{ref:positionerRef,className:styles.positioner+(menu?" bui-select-menu":""),anchor:menu?void 0:anchor,sideOffset:8,align:"start",...(mode==="select"?{alignItemWithTrigger:false}:{}),collisionPadding:8,
    children:jsx(Popup,{className:styles.popup+(menu?" bui-select-menu__popup":""),children:mode==="select"
      ?jsx(List,{className:styles.list,children:options.map(option)})
      :jsxs(React.Fragment,{children:[jsx(List,{className:styles.list,children:(value,index)=>{const o=byValue.get(value);return o?option(o,index):null}}),jsx(Empty,{className:styles.empty,children:emptyText})]})})})});
}
Dropdown.__docgenInfo={description:"The dropdown list shared by Selector and Typeahead: a positioned popup with options, optional details, a check mark for the selected one and an empty state. The field itself is a Text Input shell, so size, variant and states come from Text Input.",methods:[],displayName:"Dropdown",props:{parts:{required:true,tsType:{name:"object"},description:"Base UI parts of the host component (Portal, Positioner, Popup, List, Item, Indicator, ItemText, Empty)."},mode:{required:false,tsType:{name:"union",raw:"'select' | 'combobox'"},description:"How the host feeds the list: static options (select) or a filtered render function (combobox).",defaultValue:{value:"'select'"}},options:{required:true,tsType:{name:"Array",raw:"{ value, label, details?, disabled? }[]"},description:"Options to show."},anchor:{required:false,tsType:{name:"Element"},description:"Element the popup is anchored to (the field cell); the popup is as wide as it."},menu:{required:false,tsType:{name:"boolean"},description:"A content-width menu for custom triggers instead of a field-width list.",defaultValue:{value:"false"}},emptyText:{required:false,tsType:{name:"ReactNode"},description:"Content of the empty state (combobox)."},positionerRef:{required:false,tsType:{name:"Ref"},description:"Ref to the positioner element."},idBase:{required:true,tsType:{name:"string"},description:"Prefix for option ids (accessible names)."},testIdPrefix:{required:true,tsType:{name:"string"},description:"Prefix for option test ids."}}};
