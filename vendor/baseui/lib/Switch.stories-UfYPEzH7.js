import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Switch-C2ggHNbo.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={title:`Components/Switch`,component:r,parameters:{docs:{description:{component:"Свитч поверх headless Base UI Switch: мгновенное вкл/выкл независимой настройки. Размеры medium/large, состояния checked/disabled, ошибка — текст под полем (`error`). Стили — на токенах `--baseui-*`, инвертируются по теме (`data-theme`). Группы нет намеренно: несколько свитчей — независимые boolean-поля (для выбора N из M — `CheckboxGroup`). Для форм — `SwitchField` из `@baseui/ui/rhf/Switch`."}}},args:{label:`Label`,size:`medium`,defaultChecked:!1,disabled:!1,error:``},argTypes:{label:{control:`text`,description:`Текст лейбла справа`},size:{control:`inline-radio`,options:[`medium`,`large`],description:`Размер`},defaultChecked:{control:`boolean`,description:`Начальное значение (неконтролируемый)`},disabled:{control:`boolean`,description:`Отключён`},error:{control:`text`,description:`Текст ошибки под полем`}}},o={},s={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-M)`},children:[(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-M)`,alignItems:`center`},children:[(0,i.jsx)(r,{"aria-label":`unchecked`}),(0,i.jsx)(r,{"aria-label":`checked`,defaultChecked:!0}),(0,i.jsx)(r,{"aria-label":`disabled`,disabled:!0}),(0,i.jsx)(r,{"aria-label":`disabled-checked`,disabled:!0,defaultChecked:!0})]}),(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-M)`,alignItems:`center`},children:[(0,i.jsx)(r,{size:`large`,"aria-label":`unchecked large`}),(0,i.jsx)(r,{size:`large`,"aria-label":`checked large`,defaultChecked:!0}),(0,i.jsx)(r,{size:`large`,"aria-label":`disabled large`,disabled:!0}),(0,i.jsx)(r,{size:`large`,"aria-label":`disabled-checked large`,disabled:!0,defaultChecked:!0})]})]})},c={parameters:{controls:{disable:!0}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,i.jsx)(r,{label:`Medium-лейбл (Text-16)`,defaultChecked:!0}),(0,i.jsx)(r,{size:`large`,label:`Large-лейбл (Text-20)`,defaultChecked:!0})]})},l={parameters:{controls:{disable:!0}},render:()=>(0,i.jsx)(r,{label:`Принять условия`,error:`Обязательное поле`})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-Space-M)'
  }}>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-Space-M)',
      alignItems: 'center'
    }}>
        <Switch aria-label="unchecked" />
        <Switch aria-label="checked" defaultChecked />
        <Switch aria-label="disabled" disabled />
        <Switch aria-label="disabled-checked" disabled defaultChecked />
      </div>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-Space-M)',
      alignItems: 'center'
    }}>
        <Switch size="large" aria-label="unchecked large" />
        <Switch size="large" aria-label="checked large" defaultChecked />
        <Switch size="large" aria-label="disabled large" disabled />
        <Switch size="large" aria-label="disabled-checked large" disabled defaultChecked />
      </div>
    </div>
}`,...s.parameters?.docs?.source},description:{story:`Состояния обоих размеров: unchecked · checked · disabled · disabled-checked.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
      <Switch label="Medium-лейбл (Text-16)" defaultChecked />
      <Switch size="large" label="Large-лейбл (Text-20)" defaultChecked />
    </div>
}`,...c.parameters?.docs?.source},description:{story:`С лейблом обоих размеров.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Switch label="Принять условия" error="Обязательное поле" />
}`,...l.parameters?.docs?.source},description:{story:"Ошибка без RHF: текст под полем через проп `error`.",...l.parameters?.docs?.description}}},u=[`Playground`,`States`,`WithLabel`,`WithError`]})))()}d();export{o as Playground,s as States,l as WithError,c as WithLabel,u as __namedExportsOrder,a as default};