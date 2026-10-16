import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./RadioGroup--EYef9jg.js";var r,i,a,o,s,c,l;function u(){return(u=e((()=>{t(),r={title:`Components/RadioGroup`,component:n,parameters:{docs:{description:{component:"A group of radio buttons on top of Base UI RadioGroup: the value is the `value` of the selected option. Title, list, caption/error under the group. The error is text only (the circles do not turn red, like the Group node in Figma). For forms use `RadioGroupField` from `@baseui/ui/rhf/RadioGroup`."}}},args:{title:`Payment method`,options:[{value:`card`,label:`Bank card`},{value:`sbp`,label:`Instant bank transfer`},{value:`crypto`,label:`Cryptocurrency`},{value:`balance`,label:`Account balance`}],defaultValue:`card`,caption:``,error:``},argTypes:{title:{control:`text`,description:`Group title`},defaultValue:{control:`text`,description:`Initial value (uncontrolled)`},caption:{control:`text`,description:`Caption under the group`},error:{control:`text`,description:`Error text (overrides caption)`}}},i={},a={parameters:{controls:{disable:!0}},args:{title:void 0,defaultValue:`checked`,options:[{value:`unchecked`,label:`Not selected`},{value:`checked`,label:`Selected`},{value:`disabled`,label:`Disabled`,disabled:!0}]}},o={parameters:{controls:{disable:!0}},args:{title:void 0,defaultValue:`saved`,options:[{value:`saved`,label:`Saved choice`,disabled:!0},{value:`other`,label:`Another option`,disabled:!0}]}},s={args:{caption:`The fee depends on the method`}},c={args:{defaultValue:void 0,error:`Choose a payment method`}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source},description:{story:`Interactive playground.`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    title: undefined,
    defaultValue: 'checked',
    options: [{
      value: 'unchecked',
      label: 'Not selected'
    }, {
      value: 'checked',
      label: 'Selected'
    }, {
      value: 'disabled',
      label: 'Disabled',
      disabled: true
    }]
  }
}`,...a.parameters?.docs?.source},description:{story:`Circle states: unchecked · checked · disabled · disabled-checked.`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    title: undefined,
    defaultValue: 'saved',
    options: [{
      value: 'saved',
      label: 'Saved choice',
      disabled: true
    }, {
      value: 'other',
      label: 'Another option',
      disabled: true
    }]
  }
}`,...o.parameters?.docs?.source},description:{story:`A disabled selected value (“locked with the value kept”).`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    caption: 'The fee depends on the method'
  }
}`,...s.parameters?.docs?.source},description:{story:`With a caption under the group.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: undefined,
    error: 'Choose a payment method'
  }
}`,...c.parameters?.docs?.source},description:{story:`Validation error: a message under the group, the circles stay neutral.`,...c.parameters?.docs?.description}}},l=[`Playground`,`States`,`DisabledChecked`,`WithCaption`,`WithError`]})))()}u();export{o as DisabledChecked,i as Playground,a as States,s as WithCaption,c as WithError,l as __namedExportsOrder,r as default};