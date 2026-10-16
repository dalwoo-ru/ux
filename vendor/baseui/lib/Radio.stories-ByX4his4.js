import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./Radio-D9e-xDz3.js";var o,s,c,l,u;function d(){return(d=e((()=>{n(),r(),o=t(),s={title:`Components/Radio`,component:a,parameters:{docs:{description:{component:"A single radio button on top of the headless Base UI Radio. It has no `checked` prop of its own: it is checked by the value of the parent group, so use `RadioGroup` (or `RadioGroupField` for forms); the stories below are wrapped in a group."}}},argTypes:{label:{control:`text`,description:`Label text on the right`},value:{control:`text`,description:`Option value inside the group`},disabled:{control:`boolean`,description:`Disabled`}}},c={parameters:{controls:{disable:!0}},args:{value:`_`},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-16)`,alignItems:`center`},children:[(0,o.jsx)(i,{children:(0,o.jsx)(a,{value:`off`,"aria-label":`unchecked`})}),(0,o.jsx)(i,{defaultValue:`on`,children:(0,o.jsx)(a,{value:`on`,"aria-label":`checked`})}),(0,o.jsx)(i,{children:(0,o.jsx)(a,{value:`off`,"aria-label":`disabled`,disabled:!0})}),(0,o.jsx)(i,{defaultValue:`on`,children:(0,o.jsx)(a,{value:`on`,"aria-label":`disabled-checked`,disabled:!0})})]})},l={parameters:{controls:{disable:!0}},args:{value:`_`},render:()=>(0,o.jsxs)(i,{defaultValue:`a`,style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[(0,o.jsx)(a,{value:`a`,label:`With a label`}),(0,o.jsx)(a,{value:`b`,"aria-label":`no label`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    value: '_'
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-spacing-16)',
    alignItems: 'center'
  }}>
      <BaseRadioGroup>
        <Radio value="off" aria-label="unchecked" />
      </BaseRadioGroup>
      <BaseRadioGroup defaultValue="on">
        <Radio value="on" aria-label="checked" />
      </BaseRadioGroup>
      <BaseRadioGroup>
        <Radio value="off" aria-label="disabled" disabled />
      </BaseRadioGroup>
      <BaseRadioGroup defaultValue="on">
        <Radio value="on" aria-label="disabled-checked" disabled />
      </BaseRadioGroup>
    </div>
}`,...c.parameters?.docs?.source},description:{story:`States: unchecked · checked · disabled · disabled-checked.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    value: '_'
  },
  render: () => <BaseRadioGroup defaultValue="a" style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-spacing-12)'
  }}>
      <Radio value="a" label="With a label" />
      <Radio value="b" aria-label="no label" />
    </BaseRadioGroup>
}`,...l.parameters?.docs?.source},description:{story:`With and without a label.`,...l.parameters?.docs?.description}}},u=[`States`,`WithLabel`]})))()}d();export{c as States,l as WithLabel,u as __namedExportsOrder,s as default};