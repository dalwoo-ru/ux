import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Switch-C2ggHNbo.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={title:`Components/Switch`,component:r,parameters:{docs:{description:{component:"A switch on top of the headless Base UI Switch: an instant on/off of an independent setting. Sizes medium/large, checked/disabled states, the error is text under the field (`error`). Styles use `--baseui-*` tokens, inverted by theme (`data-theme`). There is no group on purpose: several switches are independent boolean fields (for choosing N of M use `CheckboxGroup`). For forms use `SwitchField` from `@baseui/ui/rhf/Switch`."}}},args:{label:`Label`,size:`md`,defaultChecked:!1,disabled:!1,error:``},argTypes:{label:{control:`text`,description:`Label text on the right`},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`],description:`Size`},defaultChecked:{control:`boolean`,description:`Initial value (uncontrolled)`},disabled:{control:`boolean`,description:`Disabled`},error:{control:`text`,description:`Error text under the field`}}},o={},s={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-16)`},children:[(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-16)`,alignItems:`center`},children:[(0,i.jsx)(r,{"aria-label":`unchecked`}),(0,i.jsx)(r,{"aria-label":`checked`,defaultChecked:!0}),(0,i.jsx)(r,{"aria-label":`disabled`,disabled:!0}),(0,i.jsx)(r,{"aria-label":`disabled-checked`,disabled:!0,defaultChecked:!0})]}),(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-16)`,alignItems:`center`},children:[(0,i.jsx)(r,{size:`lg`,"aria-label":`unchecked large`}),(0,i.jsx)(r,{size:`lg`,"aria-label":`checked large`,defaultChecked:!0}),(0,i.jsx)(r,{size:`lg`,"aria-label":`disabled large`,disabled:!0}),(0,i.jsx)(r,{size:`lg`,"aria-label":`disabled-checked large`,disabled:!0,defaultChecked:!0}),(0,i.jsx)(r,{size:`sm`,"aria-label":`small`}),(0,i.jsx)(r,{size:`sm`,"aria-label":`small checked`,defaultChecked:!0}),(0,i.jsx)(r,{size:`sm`,"aria-label":`small disabled`,disabled:!0})]})]})},c={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[(0,i.jsx)(r,{label:`Medium label (Text-16)`,defaultChecked:!0}),(0,i.jsx)(r,{size:`lg`,label:`Large label (Text-20)`,defaultChecked:!0}),(0,i.jsx)(r,{size:`sm`,label:`Small label (Text-14)`,defaultChecked:!0})]})},l={parameters:{controls:{disable:!0}},render:()=>(0,i.jsx)(r,{label:`Accept the terms`,error:`Required field`})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source},description:{story:`Interactive playground.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-spacing-16)'
  }}>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-16)',
      alignItems: 'center'
    }}>
        <Switch aria-label="unchecked" />
        <Switch aria-label="checked" defaultChecked />
        <Switch aria-label="disabled" disabled />
        <Switch aria-label="disabled-checked" disabled defaultChecked />
      </div>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-16)',
      alignItems: 'center'
    }}>
        <Switch size="lg" aria-label="unchecked large" />
        <Switch size="lg" aria-label="checked large" defaultChecked />
        <Switch size="lg" aria-label="disabled large" disabled />
        <Switch size="lg" aria-label="disabled-checked large" disabled defaultChecked />
      </div>
    </div>
}`,...s.parameters?.docs?.source},description:{story:`States of both sizes: unchecked · checked · disabled · disabled-checked.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
      <Switch label="Medium label (Text-16)" defaultChecked />
      <Switch size="lg" label="Large label (Text-20)" defaultChecked />
    </div>
}`,...c.parameters?.docs?.source},description:{story:`With a label, both sizes.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Switch label="Accept the terms" error="Required field" />
}`,...l.parameters?.docs?.source},description:{story:"Error without RHF: text under the field through the `error` prop.",...l.parameters?.docs?.description}}},u=[`Playground`,`States`,`WithLabel`,`WithError`]})))()}d();export{o as Playground,s as States,l as WithError,c as WithLabel,u as __namedExportsOrder,a as default};