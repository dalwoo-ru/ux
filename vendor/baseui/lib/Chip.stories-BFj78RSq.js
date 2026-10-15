import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Heart-U_NNoxhN.js";import{n as i,t as a}from"./Avatar-DK_lj_Yy.js";import{n as o,t as s}from"./Chip-Di-XvBhB.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{n(),i(),o(),c=t(),l=(0,c.jsx)(a,{type:`letters`,initials:`GG`,size:`small`}),u=(0,c.jsx)(a,{type:`letters`,initials:`GG`,size:`xsmall`}),d={title:`Components/Chip`,component:s,parameters:{docs:{description:{component:"Чип поверх headless Base UI Toggle: интерактивный элемент «для выбора или индикации». `variant` (filled / outlined), `size` (medium / small); выбор — через `pressed` / `defaultPressed` / `onPressedChange` Base UI (в группе — `ChipGroup`). `status` (success / error) красит фон у filled и рамку у outlined. Слоты: `icon` или `avatar` слева, `counter` справа. Режим `action` превращает чип в кнопку удаления (крестик + `onAction`). Стили — на токенах `--baseui-*`, тема — `data-theme`."}}},args:{children:`Label`,variant:`filled`,size:`medium`,defaultPressed:!1,disabled:!1,action:!1},argTypes:{children:{control:`text`,description:`Текст лейбла`},variant:{control:`inline-radio`,options:[`filled`,`outlined`],description:`Тип отрисовки`},size:{control:`inline-radio`,options:[`medium`,`small`],description:`Размер`},status:{control:`inline-radio`,options:[`none`,`error`,`success`],mapping:{none:void 0},description:`Семантический статус`},defaultPressed:{control:`boolean`,description:`Выбран изначально (неконтролируемый)`},disabled:{control:`boolean`,description:`Отключён`},action:{control:`boolean`,description:`Режим удаляемого чипа (крестик + onAction)`},counter:{control:`text`,description:`Счётчик справа`}}},f={},p={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{variant:`filled`,children:`Filled`}),(0,c.jsx)(s,{variant:`outlined`,children:`Outlined`})]})},m={parameters:{controls:{disable:!0}},render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[`filled`,`outlined`].map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{variant:e,children:`Enabled`}),(0,c.jsx)(s,{variant:e,defaultPressed:!0,children:`Selected`}),(0,c.jsx)(s,{variant:e,disabled:!0,children:`Disabled`}),(0,c.jsx)(s,{variant:e,disabled:!0,defaultPressed:!0,children:`Disabled selected`})]},e))})},h={parameters:{controls:{disable:!0}},render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[`filled`,`outlined`].map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{variant:e,status:`success`,children:`Success`}),(0,c.jsx)(s,{variant:e,status:`error`,children:`Error`})]},e))})},g={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{avatar:l,children:`Label`}),(0,c.jsx)(s,{counter:6,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),"aria-label":`В избранное`})]})},_={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),defaultPressed:!0,children:`Label`}),(0,c.jsx)(s,{variant:`outlined`,icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),disabled:!0,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),counter:6,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),"aria-label":`В избранное`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{size:`small`,icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{size:`small`,icon:(0,c.jsx)(r,{}),defaultPressed:!0,children:`Label`}),(0,c.jsx)(s,{size:`small`,variant:`outlined`,icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{size:`small`,icon:(0,c.jsx)(r,{}),"aria-label":`В избранное`})]})]})},v={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{avatar:l,children:`Иван Петров`}),(0,c.jsx)(s,{avatar:l,defaultPressed:!0,children:`Иван Петров`}),(0,c.jsx)(s,{variant:`outlined`,avatar:l,children:`Иван Петров`}),(0,c.jsx)(s,{avatar:l,disabled:!0,children:`Иван Петров`}),(0,c.jsx)(s,{avatar:l,counter:6,action:!0,actionLabel:`Убрать Ивана Петрова`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{size:`small`,avatar:u,children:`Иван Петров`}),(0,c.jsx)(s,{size:`small`,avatar:u,defaultPressed:!0,children:`Иван Петров`}),(0,c.jsx)(s,{size:`small`,variant:`outlined`,avatar:u,children:`Иван Петров`})]})]})},y={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`},children:[(0,c.jsx)(s,{action:!0,actionLabel:`Удалить: Label`,children:`Label`}),(0,c.jsx)(s,{action:!0,size:`small`,actionLabel:`Удалить: Label`,children:`Label`}),(0,c.jsx)(s,{action:!0,disabled:!0,actionLabel:`Удалить: Label`,children:`Label`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-Space-S)',
    alignItems: 'center'
  }}>
      <Chip variant="filled">Filled</Chip>
      <Chip variant="outlined">Outlined</Chip>
    </div>
}`,...p.parameters?.docs?.source},description:{story:`Тип отрисовки: filled · outlined.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
      {(['filled', 'outlined'] as const).map(variant => <div key={variant} style={{
      display: 'flex',
      gap: 'var(--baseui-Space-S)',
      alignItems: 'center'
    }}>
          <Chip variant={variant}>Enabled</Chip>
          <Chip variant={variant} defaultPressed>
            Selected
          </Chip>
          <Chip variant={variant} disabled>
            Disabled
          </Chip>
          <Chip variant={variant} disabled defaultPressed>
            Disabled selected
          </Chip>
        </div>)}
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Состояния (filled и outlined): enabled · selected · disabled.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
      {(['filled', 'outlined'] as const).map(variant => <div key={variant} style={{
      display: 'flex',
      gap: 'var(--baseui-Space-S)',
      alignItems: 'center'
    }}>
          <Chip variant={variant} status="success">
            Success
          </Chip>
          <Chip variant={variant} status="error">
            Error
          </Chip>
        </div>)}
    </div>
}`,...h.parameters?.docs?.source},description:{story:`Статус: success · error.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-Space-S)',
    alignItems: 'center'
  }}>
      <Chip>Label</Chip>
      <Chip icon={<Heart />}>Label</Chip>
      <Chip avatar={AVATAR_MD}>Label</Chip>
      <Chip counter={6}>Label</Chip>
      <Chip icon={<Heart />} aria-label="В избранное" />
    </div>
}`,...g.parameters?.docs?.source},description:{story:"Слоты: иконка · аватар · счётчик · без лейбла (нужен `aria-label`).",...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-Space-S)',
      alignItems: 'center'
    }}>
        <Chip icon={<Heart />}>Label</Chip>
        <Chip icon={<Heart />} defaultPressed>
          Label
        </Chip>
        <Chip variant="outlined" icon={<Heart />}>
          Label
        </Chip>
        <Chip icon={<Heart />} disabled>
          Label
        </Chip>
        <Chip icon={<Heart />} counter={6}>
          Label
        </Chip>
        <Chip icon={<Heart />} aria-label="В избранное" />
      </div>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-Space-S)',
      alignItems: 'center'
    }}>
        <Chip size="small" icon={<Heart />}>
          Label
        </Chip>
        <Chip size="small" icon={<Heart />} defaultPressed>
          Label
        </Chip>
        <Chip size="small" variant="outlined" icon={<Heart />}>
          Label
        </Chip>
        <Chip size="small" icon={<Heart />} aria-label="В избранное" />
      </div>
    </div>
}`,..._.parameters?.docs?.source},description:{story:"Иконка наследует `currentColor`: в `selected` (filled) — белая, в `disabled` —\nприглушённая, в `outlined` — основной цвет.",..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-Space-S)',
      alignItems: 'center'
    }}>
        <Chip avatar={AVATAR_MD}>Иван Петров</Chip>
        <Chip avatar={AVATAR_MD} defaultPressed>
          Иван Петров
        </Chip>
        <Chip variant="outlined" avatar={AVATAR_MD}>
          Иван Петров
        </Chip>
        <Chip avatar={AVATAR_MD} disabled>
          Иван Петров
        </Chip>
        <Chip avatar={AVATAR_MD} counter={6} action actionLabel="Убрать Ивана Петрова" />
      </div>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-Space-S)',
      alignItems: 'center'
    }}>
        <Chip size="small" avatar={AVATAR_SM}>
          Иван Петров
        </Chip>
        <Chip size="small" avatar={AVATAR_SM} defaultPressed>
          Иван Петров
        </Chip>
        <Chip size="small" variant="outlined" avatar={AVATAR_SM}>
          Иван Петров
        </Chip>
      </div>
    </div>
}`,...v.parameters?.docs?.source},description:{story:"Аватар в чипе: левый паддинг сжимается до рамки аватара. Размер `<Avatar>`\nподбирается под размер чипа — `small` (32px) / `xsmall` (24px).",...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-Space-S)',
    alignItems: 'center'
  }}>
      <Chip action actionLabel="Удалить: Label">
        Label
      </Chip>
      <Chip action size="small" actionLabel="Удалить: Label">
        Label
      </Chip>
      <Chip action disabled actionLabel="Удалить: Label">
        Label
      </Chip>
    </div>
}`,...y.parameters?.docs?.source},description:{story:"Режим `action`: клик по всей зоне чипа удаляет его (крестик декоративный).",...y.parameters?.docs?.description}}},b=[`Playground`,`Variants`,`States`,`Status`,`Slots`,`WithIcon`,`WithAvatar`,`Action`]})))()}x();export{y as Action,f as Playground,g as Slots,m as States,h as Status,p as Variants,v as WithAvatar,_ as WithIcon,b as __namedExportsOrder,d as default};