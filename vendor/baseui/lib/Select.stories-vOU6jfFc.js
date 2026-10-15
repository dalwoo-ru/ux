import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./SearchLg-BL46VJpk.js";import{n as i,t as a}from"./Select-DnSjfD80.js";var o,s,c,l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{n(),i(),o=t(),s=[{value:`steam`,label:`Steam`,details:`PC`},{value:`xbox`,label:`Xbox`,details:`Console`},{value:`playstation`,label:`PlayStation`,details:`Console`},{value:`nintendo`,label:`Nintendo Switch`,details:`Console`},{value:`gog`,label:`GOG`,details:`PC`},{value:`epic`,label:`Epic Games`,details:`PC`}],c={title:`Components/Select`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:`Select поверх Base UI Select.Root. Поддерживает single/multiple, validation, клавиатурную навигацию и Portal.`}}},args:{label:`Платформа`,options:s,floatingLabel:!0,disabled:!1},argTypes:{label:{control:`text`},placeholder:{control:`text`},floatingLabel:{control:`boolean`},caption:{control:`text`},status:{control:`inline-radio`,options:[`none`,`error`,`warning`,`success`],mapping:{none:void 0}},disabled:{control:`boolean`},options:{control:!1},mobileModalProps:{control:!1,description:`Параметры Modal для шторки на viewport до 1200px включительно`}},decorators:[e=>(0,o.jsx)(`div`,{style:{width:360},children:(0,o.jsx)(e,{})})]},l={},u={parameters:{controls:{disable:!0}},decorators:[e=>(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`,width:360},children:(0,o.jsx)(e,{})})],render:()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{label:`Платформа`,options:s}),(0,o.jsx)(a,{label:`Платформа`,options:s,defaultValue:`steam`}),(0,o.jsx)(a,{multiple:!0,label:`Платформа`,options:s,defaultValue:[`steam`,`xbox`]}),(0,o.jsx)(a,{label:`Платформа`,options:s,disabled:!0}),(0,o.jsx)(a,{label:`Платформа`,options:s,defaultValue:`steam`,status:`error`,caption:`Выберите платформу`}),(0,o.jsx)(a,{label:`Платформа`,options:s,defaultValue:`steam`,status:`warning`,caption:`Проверьте выбор`}),(0,o.jsx)(a,{label:`Платформа`,options:s,defaultValue:`steam`,status:`success`,caption:`Платформа доступна`})]})},d={parameters:{controls:{disable:!0}},decorators:[e=>(0,o.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,width:360},children:(0,o.jsx)(e,{})})],render:()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{label:`Платформа`,options:s,startIcon:(0,o.jsx)(r,{size:24})}),(0,o.jsx)(a,{label:`Платформа`,options:s,startIcon:(0,o.jsx)(r,{size:24}),defaultValue:`steam`}),(0,o.jsx)(a,{label:`Платформа`,options:s,loading:!0}),(0,o.jsx)(a,{label:`Сумма`,options:s,prefix:`$`,suffix:`₽`,defaultValue:`steam`})]})},f={parameters:{controls:{disable:!0}},render:()=>(0,o.jsx)(a,{multiple:!0,label:`Платформы`,options:s,defaultValue:[`steam`,`xbox`]})},p={parameters:{controls:{disable:!0}},render:()=>(0,o.jsx)(a,{label:`Платформа`,floatingLabel:!1,options:s,defaultValue:`steam`})},m={parameters:{controls:{disable:!0}},render:()=>(0,o.jsx)(a,{label:`Платформа`,options:s,defaultOpen:!0})},h={parameters:{controls:{disable:!0},viewport:{defaultViewport:`mobile1`}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,o.jsx)(a,{label:`Платформа`,options:s}),(0,o.jsx)(a,{multiple:!0,label:`Платформы`,options:s,defaultValue:[`steam`]})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [Story => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-Space-S)',
    width: 360
  }}>
        <Story />
      </div>],
  render: () => <>
      <Select label="Платформа" options={OPTIONS} />
      <Select label="Платформа" options={OPTIONS} defaultValue="steam" />
      <Select multiple label="Платформа" options={OPTIONS} defaultValue={['steam', 'xbox']} />
      <Select label="Платформа" options={OPTIONS} disabled />
      <Select label="Платформа" options={OPTIONS} defaultValue="steam" status="error" caption="Выберите платформу" />
      <Select label="Платформа" options={OPTIONS} defaultValue="steam" status="warning" caption="Проверьте выбор" />
      <Select label="Платформа" options={OPTIONS} defaultValue="steam" status="success" caption="Платформа доступна" />
    </>
}`,...u.parameters?.docs?.source},description:{story:`Empty, filled (single), multiselect, disabled и validation из Figma.
Single-filled — без рамки; multiselect с выбором — «выбранная» тёмная рамка.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [Story => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: 360
  }}>
        <Story />
      </div>],
  render: () => <>
      <Select label="Платформа" options={OPTIONS} startIcon={<SearchLg size={24} />} />
      <Select label="Платформа" options={OPTIONS} startIcon={<SearchLg size={24} />} defaultValue="steam" />
      <Select label="Платформа" options={OPTIONS} loading />
      <Select label="Сумма" options={OPTIONS} prefix="$" suffix="₽" defaultValue="steam" />
    </>
}`,...d.parameters?.docs?.source},description:{story:`startIcon и loading — общий chrome из FieldShell (как у TextField).`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Select multiple label="Платформы" options={OPTIONS} defaultValue={['steam', 'xbox']} />
}`,...f.parameters?.docs?.source},description:{story:`Выбор нескольких значений.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Select label="Платформа" floatingLabel={false} options={OPTIONS} defaultValue="steam" />
}`,...p.parameters?.docs?.source},description:{story:`Label Off из Figma: выбранное значение остаётся по центру.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Select label="Платформа" options={OPTIONS} defaultOpen />
}`,...m.parameters?.docs?.source},description:{story:`Меню открыто сразу.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-Space-S)'
  }}>
      <Select label="Платформа" options={OPTIONS} />
      <Select multiple label="Платформы" options={OPTIONS} defaultValue={['steam']} />
    </div>
}`,...h.parameters?.docs?.source},description:{story:`На viewport до 1200px dropdown заменяется на Modal bottom sheet.`,...h.parameters?.docs?.description}}},g=[`Playground`,`States`,`IconAndLoading`,`Multiple`,`WithoutFloatingLabel`,`Opened`,`MobileSheet`]})))()}_();export{d as IconAndLoading,h as MobileSheet,f as Multiple,m as Opened,l as Playground,u as States,p as WithoutFloatingLabel,g as __namedExportsOrder,c as default};