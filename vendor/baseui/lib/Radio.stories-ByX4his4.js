import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./Radio-D9e-xDz3.js";var o,s,c,l,u;function d(){return(d=e((()=>{n(),r(),o=t(),s={title:`Components/Radio`,component:a,parameters:{docs:{description:{component:"Одиночная радиокнопка поверх headless Base UI Radio. Своего `checked`-пропа нет — отмеченность определяется значением родительской группы, поэтому используйте `RadioGroup` (или `RadioGroupField` для форм); истории ниже обёрнуты в группу."}}},argTypes:{label:{control:`text`,description:`Текст лейбла справа`},value:{control:`text`,description:`Значение опции внутри группы`},disabled:{control:`boolean`,description:`Отключена`}}},c={parameters:{controls:{disable:!0}},args:{value:`_`},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-M)`,alignItems:`center`},children:[(0,o.jsx)(i,{children:(0,o.jsx)(a,{value:`off`,"aria-label":`unchecked`})}),(0,o.jsx)(i,{defaultValue:`on`,children:(0,o.jsx)(a,{value:`on`,"aria-label":`checked`})}),(0,o.jsx)(i,{children:(0,o.jsx)(a,{value:`off`,"aria-label":`disabled`,disabled:!0})}),(0,o.jsx)(i,{defaultValue:`on`,children:(0,o.jsx)(a,{value:`on`,"aria-label":`disabled-checked`,disabled:!0})})]})},l={parameters:{controls:{disable:!0}},args:{value:`_`},render:()=>(0,o.jsxs)(i,{defaultValue:`a`,style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,o.jsx)(a,{value:`a`,label:`С лейблом`}),(0,o.jsx)(a,{value:`b`,"aria-label":`без лейбла`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    gap: 'var(--baseui-Space-M)',
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
}`,...c.parameters?.docs?.source},description:{story:`Состояния: unchecked · checked · disabled · disabled-checked.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
    gap: 'var(--baseui-Space-S)'
  }}>
      <Radio value="a" label="С лейблом" />
      <Radio value="b" aria-label="без лейбла" />
    </BaseRadioGroup>
}`,...l.parameters?.docs?.source},description:{story:`С лейблом и без.`,...l.parameters?.docs?.description}}},u=[`States`,`WithLabel`]})))()}d();export{c as States,l as WithLabel,u as __namedExportsOrder,s as default};