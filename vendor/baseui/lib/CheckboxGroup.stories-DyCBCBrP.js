import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./CheckboxGroup-By8iBNNa.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),r={title:`Components/CheckboxGroup`,component:n,parameters:{docs:{description:{component:"A group of checkboxes on top of the Base UI CheckboxGroup: the value is an array of checked `value`s. Title, list, caption/error under the group. The error is text only (the boxes do not turn red, like the Group node in Figma). For forms use `CheckboxGroupField` from `@baseui/ui/rhf/CheckboxGroup`."}}},args:{title:`Notification methods`,options:[{value:`sms`,label:`SMS`},{value:`email`,label:`E-mail`},{value:`push`,label:`Push`},{value:`call`,label:`Call`}],defaultValue:[`email`],caption:``,error:``},argTypes:{title:{control:`text`,description:`Group title`},caption:{control:`text`,description:`Caption under the group`},error:{control:`text`,description:`Error text (overrides caption)`}}},i={},a={args:{caption:`You can choose several`}},o={args:{defaultValue:[],error:`Choose at least one method`}},s={args:{title:`Notifications`,parent:`All notifications`,defaultValue:[`orders`],options:[{value:`orders`,label:`Orders`},{value:`promo`,label:`Promotions`},{value:`news`,label:`News`}]}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source},description:{story:`Interactive playground.`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    caption: 'You can choose several'
  }
}`,...a.parameters?.docs?.source},description:{story:`With a caption under the group.`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [],
    error: 'Choose at least one method'
  }
}`,...o.parameters?.docs?.source},description:{story:`Validation error: a message under the group, the boxes stay neutral.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Notifications',
    parent: 'All notifications',
    defaultValue: ['orders'],
    options: [{
      value: 'orders',
      label: 'Orders'
    }, {
      value: 'promo',
      label: 'Promotions'
    }, {
      value: 'news',
      label: 'News'
    }]
  }
}`,...s.parameters?.docs?.source},description:{story:"A subgroup (Subgroup from Figma): `parent` is the “select all” checkbox, it toggles all options\nat once and shows indeterminate (a dash) on a partial selection; the options are indented sub-items.",...s.parameters?.docs?.description}}},c=[`Playground`,`WithCaption`,`WithError`,`WithSubgroup`]})))()}l();export{i as Playground,a as WithCaption,o as WithError,s as WithSubgroup,c as __namedExportsOrder,r as default};