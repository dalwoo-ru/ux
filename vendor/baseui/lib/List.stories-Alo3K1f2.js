import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./List-eg3s5b4U.js";var o,s,c,l,u,d,SZ;function f(){return(f=e((()=>{n(),r(),o=t(),s={title:`Components/List`,component:a,parameters:{docs:{description:{component:"A list: a container for `<ListItem>` with an optional group title (`title`) and a divider below it (`divider`). Several titled sections are several `<List>`s in a row, all but the last with `divider`. The title sits outside the `<ul>` and is linked to the list through `aria-labelledby`, so a screen reader announces the group name. Styles use `--baseui-*` tokens."}}},decorators:[e=>(0,o.jsx)(`div`,{style:{maxWidth:320},children:e()})],args:{title:`Group Title`,divider:!1,size:`md`},argTypes:{size:{control:`inline-radio`,options:[`md`,`sm`,`xsm`],description:`Row height: md 56, sm 48, xsm 40`},title:{control:`text`,description:`Group title; gives the list an accessible name`},divider:{control:`boolean`,description:`Divider below the group`},children:{control:!1,description:`List rows: <ListItem>`}}},c={args:{children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{active:!0,onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{items:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`},`a`)],children:`Item`})]})}},l={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(160px, 1fr))`,gap:`var(--baseui-spacing-12)`},children:[(0,o.jsxs)(a,{children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]}),(0,o.jsxs)(a,{title:`Group Title`,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]})]})},u={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,o.jsxs)(a,{title:`Group Title`,divider:!0,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]}),(0,o.jsx)(a,{title:`Group Title`,children:(0,o.jsx)(i,{items:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`},`a`)],children:`Item`})})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem active onClick={() => {}}>
          Item
        </ListItem>
        <ListItem items={[<ListItem key="a" onClick={() => {}}>
              Item
            </ListItem>]}>
          Item
        </ListItem>
      </>
  }
}`,...c.parameters?.docs?.source},description:{story:`Interactive playground.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 'var(--baseui-spacing-12)'
  }}>
      <List>
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem onClick={() => {}}>Item</ListItem>
      </List>
      <List title="Group Title">
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem onClick={() => {}}>Item</ListItem>
      </List>
    </div>
}`,...l.parameters?.docs?.source},description:{story:`Group title: off · on.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  }}>
      <List title="Group Title" divider>
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem onClick={() => {}}>Item</ListItem>
      </List>
      <List title="Group Title">
        <ListItem items={[<ListItem key="a" onClick={() => {}}>
              Item
            </ListItem>]}>
          Item
        </ListItem>
      </List>
    </div>
}`,...u.parameters?.docs?.source},description:{story:`The divider separates the group from the next one. The gap between sections is kept by the
consumer layout: in the design it equals the gap between rows (2px).`,...u.parameters?.docs?.description}}},
SZ={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(160px, 1fr))`,gap:`var(--baseui-spacing-12)`},children:[(0,o.jsxs)(a,{title:`Medium`,size:`md`,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]}),(0,o.jsxs)(a,{title:`Small`,size:`sm`,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]}),(0,o.jsxs)(a,{title:`Extra Small`,size:`xsm`,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]})]})},SZ.parameters={...SZ.parameters,docs:{source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 'var(--baseui-spacing-12)'
  }}>
      <List title="Medium" size="md">
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem onClick={() => {}}>Item</ListItem>
      </List>
      <List title="Small" size="sm">
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem onClick={() => {}}>Item</ListItem>
      </List>
      <List title="Extra Small" size="xsm">
        <ListItem onClick={() => {}}>Item</ListItem>
        <ListItem onClick={() => {}}>Item</ListItem>
      </List>
    </div>
}`},description:{story:`Row height: md (56px), sm (48px) or xsm (40px).`}}},d=[`Playground`,`Sizes`,`GroupTitle`,`Divider`]})))()}f();export{SZ as Sizes,u as Divider,l as GroupTitle,c as Playground,d as __namedExportsOrder,s as default};