import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Heart-U_NNoxhN.js";import{n as i,t as a}from"./Avatar-DK_lj_Yy.js";import{n as o,t as s}from"./Chip-Di-XvBhB.js";var c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{n(),i(),o(),c=t(),l=(0,c.jsx)(a,{type:`letters`,initials:`GG`,size:`sm`}),u=(0,c.jsx)(a,{type:`letters`,initials:`GG`,size:`xsm`}),d={title:`Components/Chip`,component:s,parameters:{docs:{description:{component:"A chip on top of the headless Base UI Toggle: an interactive element “for selection or indication”. `size` (medium / small); selection comes from Base UI `pressed` / `defaultPressed` / `onPressedChange` (in a group, `ChipGroup`). `status` (success / error) colors the fill. Slots: `icon` or `avatar` on the left, `counter` on the right. The `action` mode turns the chip into a remove button (`true`: a cross + `onAction`) or a plain button (`'press'`). Styles use `--baseui-*` tokens, theme via `data-theme`."}}},args:{children:`Label`,size:`md`,defaultPressed:!1,disabled:!1,action:!1},argTypes:{children:{control:`text`,description:`Label text`},size:{control:`inline-radio`,options:[`md`,`sm`],description:`Size`},status:{control:`inline-radio`,options:[`none`,`error`,`success`],mapping:{none:void 0},description:`Semantic status`},defaultPressed:{control:`boolean`,description:`Selected initially (uncontrolled)`},disabled:{control:`boolean`,description:`Disabled`},action:{control:`inline-radio`,options:[!1,!0,`press`],description:"Not a toggle: `true` is a removable chip (cross + onAction), `'press'` is a plain button"},counter:{control:`text`,description:`Counter on the right`}}},f={},m={parameters:{controls:{disable:!0}},render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[`filled`].map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{children:`Enabled`}),(0,c.jsx)(s,{defaultPressed:!0,children:`Selected`}),(0,c.jsx)(s,{disabled:!0,children:`Disabled`}),(0,c.jsx)(s,{disabled:!0,defaultPressed:!0,children:`Disabled selected`})]},e))})},h={parameters:{controls:{disable:!0}},render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[`filled`].map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{status:`success`,children:`Success`}),(0,c.jsx)(s,{status:`error`,children:`Error`})]},e))})},g={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{avatar:l,children:`Label`}),(0,c.jsx)(s,{counter:6,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),"aria-label":`Add to favorites`})]})},_={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),defaultPressed:!0,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),disabled:!0,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),counter:6,children:`Label`}),(0,c.jsx)(s,{icon:(0,c.jsx)(r,{}),"aria-label":`Add to favorites`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{size:`sm`,icon:(0,c.jsx)(r,{}),children:`Label`}),(0,c.jsx)(s,{size:`sm`,icon:(0,c.jsx)(r,{}),defaultPressed:!0,children:`Label`}),(0,c.jsx)(s,{size:`sm`,icon:(0,c.jsx)(r,{}),"aria-label":`Add to favorites`})]})]})},v={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{avatar:l,children:`John Smith`}),(0,c.jsx)(s,{avatar:l,defaultPressed:!0,children:`John Smith`}),(0,c.jsx)(s,{avatar:l,disabled:!0,children:`John Smith`}),(0,c.jsx)(s,{avatar:l,counter:6,action:!0,actionLabel:`Remove John Smith`})]}),(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{size:`sm`,avatar:u,children:`John Smith`}),(0,c.jsx)(s,{size:`sm`,avatar:u,defaultPressed:!0,children:`John Smith`}),]})]})},y={parameters:{controls:{disable:!0}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-12)`,alignItems:`center`},children:[(0,c.jsx)(s,{action:!0,actionLabel:`Remove: Label`,children:`Label`}),(0,c.jsx)(s,{action:!0,size:`sm`,actionLabel:`Remove: Label`,children:`Label`}),(0,c.jsx)(s,{action:!0,disabled:!0,actionLabel:`Remove: Label`,children:`Label`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source},description:{story:`Interactive playground.`,...f.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-12)',
      alignItems: 'center'
    }}>
          <Chip>Enabled</Chip>
          <Chip defaultPressed>
            Selected
          </Chip>
          <Chip disabled>
            Disabled
          </Chip>
          <Chip disabled defaultPressed>
            Disabled selected
          </Chip>
        </div>
    </div>
}`,...m.parameters?.docs?.source},description:{story:`States: enabled · selected · disabled.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-12)',
      alignItems: 'center'
    }}>
          <Chip status="success">
            Success
          </Chip>
          <Chip status="error">
            Error
          </Chip>
        </div>
    </div>
}`,...h.parameters?.docs?.source},description:{story:`Status: success · error.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-spacing-12)',
    alignItems: 'center'
  }}>
      <Chip>Label</Chip>
      <Chip icon={<Heart />}>Label</Chip>
      <Chip avatar={AVATAR_MD}>Label</Chip>
      <Chip counter={6}>Label</Chip>
      <Chip icon={<Heart />} aria-label="Add to favorites" />
    </div>
}`,...g.parameters?.docs?.source},description:{story:"Slots: icon · avatar · counter · no label (needs `aria-label`).",...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-12)',
      alignItems: 'center'
    }}>
        <Chip icon={<Heart />}>Label</Chip>
        <Chip icon={<Heart />} defaultPressed>
          Label
        </Chip>
        <Chip icon={<Heart />} disabled>
          Label
        </Chip>
        <Chip icon={<Heart />} counter={6}>
          Label
        </Chip>
        <Chip icon={<Heart />} aria-label="Add to favorites" />
      </div>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-12)',
      alignItems: 'center'
    }}>
        <Chip size="sm" icon={<Heart />}>
          Label
        </Chip>
        <Chip size="sm" icon={<Heart />} defaultPressed>
          Label
        </Chip>
        <Chip size="sm" icon={<Heart />} aria-label="Add to favorites" />
      </div>
    </div>
}`,..._.parameters?.docs?.source},description:{story:"The icon inherits `currentColor`: white when `selected` (filled), muted when `disabled`.",..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-12)',
      alignItems: 'center'
    }}>
        <Chip avatar={AVATAR_MD}>John Smith</Chip>
        <Chip avatar={AVATAR_MD} defaultPressed>
          John Smith
        </Chip>
        <Chip avatar={AVATAR_MD} disabled>
          John Smith
        </Chip>
        <Chip avatar={AVATAR_MD} counter={6} action actionLabel="Remove John Smith" />
      </div>
      <div style={{
      display: 'flex',
      gap: 'var(--baseui-spacing-12)',
      alignItems: 'center'
    }}>
        <Chip size="sm" avatar={AVATAR_SM}>
          John Smith
        </Chip>
        <Chip size="sm" avatar={AVATAR_SM} defaultPressed>
          John Smith
        </Chip>
      </div>
    </div>
}`,...v.parameters?.docs?.source},description:{story:"Avatar in a chip: the left padding shrinks to the avatar frame. The `<Avatar>` size\nmatches the chip size: `sm` (32px) / `xsm` (24px).",...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    gap: 'var(--baseui-spacing-12)',
    alignItems: 'center'
  }}>
      <Chip action actionLabel="Remove: Label">
        Label
      </Chip>
      <Chip action size="sm" actionLabel="Remove: Label">
        Label
      </Chip>
      <Chip action disabled actionLabel="Remove: Label">
        Label
      </Chip>
    </div>
}`,...y.parameters?.docs?.source},description:{story:"`action` mode: a click anywhere on the chip removes it (the cross is decorative).",...y.parameters?.docs?.description}}},b=[`Playground`,`States`,`Status`,`Slots`,`WithIcon`,`WithAvatar`,`Action`]})))()}x();export{y as Action,f as Playground,g as Slots,m as States,h as Status,v as WithAvatar,_ as WithIcon,b as __namedExportsOrder,d as default};