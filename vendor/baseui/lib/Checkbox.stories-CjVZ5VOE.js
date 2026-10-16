import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Checkbox-DiXHLlD3.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={title:`Components/Checkbox`,component:r,parameters:{docs:{description:{component:"A checkbox on top of the headless Base UI Checkbox. A box plus an optional label, with checked/disabled/indeterminate states. Styles use `--baseui-*` tokens; checked colors invert by theme (`data-theme`). The error is text under the field (`error`), the box has no outline; in forms it is set by `CheckboxField` from `@baseui/ui/rhf/Checkbox`."}}},args:{label:`Label`,defaultChecked:!1,disabled:!1,indeterminate:!1,error:``},argTypes:{label:{control:`text`,description:`Label text on the right`},defaultChecked:{control:`boolean`,description:`Initial value (uncontrolled)`},disabled:{control:`boolean`,description:`Disabled`},indeterminate:{control:`boolean`,description:`Indeterminate state`},error:{control:`text`,description:`Error text under the field (no outline)`}}},o={},s={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-16)`,alignItems:`center`},children:[(0,i.jsx)(r,{"aria-label":`unchecked`}),(0,i.jsx)(r,{"aria-label":`checked`,defaultChecked:!0}),(0,i.jsx)(r,{"aria-label":`indeterminate`,indeterminate:!0}),(0,i.jsx)(r,{"aria-label":`disabled`,disabled:!0}),(0,i.jsx)(r,{"aria-label":`disabled-checked`,disabled:!0,defaultChecked:!0})]})},c={parameters:{controls:{disable:!0}},render:()=>(0,i.jsx)(r,{label:`I agree to the terms`,error:`Required field`})},l={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[(0,i.jsx)(r,{label:`With a label`,defaultChecked:!0}),(0,i.jsx)(r,{"aria-label":`no label`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source},description:{story:`Interactive playground.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-spacing-16)',
    alignItems: 'center'
  }}>
      <Checkbox aria-label="unchecked" />
      <Checkbox aria-label="checked" defaultChecked />
      <Checkbox aria-label="indeterminate" indeterminate />
      <Checkbox aria-label="disabled" disabled />
      <Checkbox aria-label="disabled-checked" disabled defaultChecked />
    </div>
}`,...s.parameters?.docs?.source},description:{story:`Box states: unchecked · checked · indeterminate · disabled · disabled-checked.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Checkbox label="I agree to the terms" error="Required field" />
}`,...c.parameters?.docs?.source},description:{story:"Error without RHF: text under the field through the `error` prop (the box has no outline).",...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-spacing-12)'
  }}>
      <Checkbox label="With a label" defaultChecked />
      <Checkbox aria-label="no label" />
    </div>
}`,...l.parameters?.docs?.source},description:{story:"With and without a label. For a group of checkboxes see `Components/CheckboxGroup`.",...l.parameters?.docs?.description}}},u=[`Playground`,`States`,`WithError`,`WithLabel`]})))()}d();export{o as Playground,s as States,c as WithError,l as WithLabel,u as __namedExportsOrder,a as default};