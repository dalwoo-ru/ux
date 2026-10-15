import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Checkbox-DiXHLlD3.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={title:`Components/Checkbox`,component:r,parameters:{docs:{description:{component:"Чекбокс поверх headless Base UI Checkbox. Коробка + опциональный лейбл, состояния checked/disabled/indeterminate. Стили — на токенах `--baseui-*`, цвета checked инвертируются по теме (`data-theme`). Ошибка — текст под полем (`error`), рамки у бокса нет; в формах её ставит `CheckboxField` из `@baseui/ui/rhf/Checkbox`."}}},args:{label:`Label`,defaultChecked:!1,disabled:!1,indeterminate:!1,error:``},argTypes:{label:{control:`text`,description:`Текст лейбла справа`},defaultChecked:{control:`boolean`,description:`Начальное значение (неконтролируемый)`},disabled:{control:`boolean`,description:`Отключён`},indeterminate:{control:`boolean`,description:`Промежуточное состояние`},error:{control:`text`,description:`Текст ошибки под полем (рамки нет)`}}},o={},s={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-M)`,alignItems:`center`},children:[(0,i.jsx)(r,{"aria-label":`unchecked`}),(0,i.jsx)(r,{"aria-label":`checked`,defaultChecked:!0}),(0,i.jsx)(r,{"aria-label":`indeterminate`,indeterminate:!0}),(0,i.jsx)(r,{"aria-label":`disabled`,disabled:!0}),(0,i.jsx)(r,{"aria-label":`disabled-checked`,disabled:!0,defaultChecked:!0})]})},c={parameters:{controls:{disable:!0}},render:()=>(0,i.jsx)(r,{label:`Согласен с условиями`,error:`Обязательное поле`})},l={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,i.jsx)(r,{label:`С лейблом`,defaultChecked:!0}),(0,i.jsx)(r,{"aria-label":`без лейбла`})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-Space-M)',
    alignItems: 'center'
  }}>
      <Checkbox aria-label="unchecked" />
      <Checkbox aria-label="checked" defaultChecked />
      <Checkbox aria-label="indeterminate" indeterminate />
      <Checkbox aria-label="disabled" disabled />
      <Checkbox aria-label="disabled-checked" disabled defaultChecked />
    </div>
}`,...s.parameters?.docs?.source},description:{story:`Состояния коробки: unchecked · checked · indeterminate · disabled · disabled-checked.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Checkbox label="Согласен с условиями" error="Обязательное поле" />
}`,...c.parameters?.docs?.source},description:{story:"Ошибка без RHF: текст под полем через проп `error` (рамки у бокса нет).",...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-Space-S)'
  }}>
      <Checkbox label="С лейблом" defaultChecked />
      <Checkbox aria-label="без лейбла" />
    </div>
}`,...l.parameters?.docs?.source},description:{story:"С лейблом и без. Группу чекбоксов см. в `Components/CheckboxGroup`.",...l.parameters?.docs?.description}}},u=[`Playground`,`States`,`WithError`,`WithLabel`]})))()}d();export{o as Playground,s as States,c as WithError,l as WithLabel,u as __namedExportsOrder,a as default};