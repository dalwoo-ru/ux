import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./List-eg3s5b4U.js";var o,s,c,l,u,d;function f(){return(f=e((()=>{n(),r(),o=t(),s={title:`Components/List`,component:a,parameters:{docs:{description:{component:"Список: контейнер для `<ListItem>` с необязательным заголовком группы (`title`) и разделителем под ней (`divider`). Несколько озаглавленных секций — это несколько `<List>` подряд, у всех кроме последней `divider`. Заголовок лежит вне `<ul>` и связан со списком через `aria-labelledby`, поэтому скринридер объявляет имя группы. Стили — на токенах `--baseui-*`."}}},decorators:[e=>(0,o.jsx)(`div`,{style:{maxWidth:320},children:e()})],args:{title:`Group Title`,divider:!1},argTypes:{title:{control:`text`,description:`Заголовок группы; задаёт списку доступное имя`},divider:{control:`boolean`,description:`Разделитель под группой`},children:{control:!1,description:`Строки списка — <ListItem>`}}},c={args:{children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{active:!0,onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{items:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`},`a`)],children:`Item`})]})}},l={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(160px, 1fr))`,gap:`var(--baseui-Space-S)`},children:[(0,o.jsxs)(a,{children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]}),(0,o.jsxs)(a,{title:`Group Title`,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]})]})},u={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,o.jsxs)(a,{title:`Group Title`,divider:!0,children:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`}),(0,o.jsx)(i,{onClick:()=>{},children:`Item`})]}),(0,o.jsx)(a,{title:`Group Title`,children:(0,o.jsx)(i,{items:[(0,o.jsx)(i,{onClick:()=>{},children:`Item`},`a`)],children:`Item`})})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 'var(--baseui-Space-S)'
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
}`,...l.parameters?.docs?.source},description:{story:`Заголовок группы: off · on.`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source},description:{story:`Разделитель отделяет группу от следующей. Зазор между секциями держит раскладка
потребителя: в макете он равен зазору между строками (2px).`,...u.parameters?.docs?.description}}},d=[`Playground`,`GroupTitle`,`Divider`]})))()}f();export{u as Divider,l as GroupTitle,c as Playground,d as __namedExportsOrder,s as default};