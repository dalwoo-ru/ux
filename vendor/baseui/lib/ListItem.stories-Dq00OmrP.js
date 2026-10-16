import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./Heart-U_NNoxhN.js";import{n as a,t as o}from"./Settings02-DkQkzz9X.js";import{n as s,t as c}from"./Avatar-DK_lj_Yy.js";import{n as l,t as u}from"./Checkbox-DiXHLlD3.js";import{i as d,n as f,r as p,t as m}from"./List-eg3s5b4U.js";import{n as h,t as g}from"./Switch-C2ggHNbo.js";function _(){let[e,t]=(0,v.useState)(!0);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{items:[(0,y.jsx)(p,{onClick:()=>{},children:`First nested`},`a`),(0,y.jsx)(p,{onClick:()=>{},children:`Second nested`},`b`)],children:`Uncontrolled row`}),(0,y.jsxs)(p,{expanded:e,onExpandedChange:t,items:[(0,y.jsx)(p,{onClick:()=>{},children:`The consumer holds the state`},`a`)],children:[`Controlled row: `,e?`expanded`:`collapsed`]}),(0,y.jsx)(p,{icon:(0,y.jsx)(i,{}),details:`Details`,items:[(0,y.jsx)(p,{onClick:()=>{},children:`With slots`},`a`)],children:`Icon and right text`})]})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j,SZ;function M(){return(M=e((()=>{r(),o(),v=t(),s(),l(),f(),h(),d(),y=n(),b=(0,y.jsx)(c,{type:`letters`,initials:`GG`,size:`sm`}),x={display:`flex`,padding:0,border:`none`,background:`none`,color:`inherit`,cursor:`pointer`},S={title:`Components/ListItem`,component:p,parameters:{docs:{description:{component:"A list row: an icon (`icon`) or avatar (`avatar`), a title with an optional caption (`subtitle`), text on the right (`details`) and a control slot (`control`): `<Switch>`, `<Checkbox>` or your own control with its own handler. `items` makes the row expandable: the component draws the chevron itself inside the button, rotates it and hides the nested list (collapsed is `inert`). `subitem` shifts the row to the second level, `active` marks the current item, `disabled` dims the texts and the icon (the avatar and the control use their own `disabled`). Without `onClick` the row is presentational, with `onClick` it is a native button with keyboard support and focus-visible; the control is always outside that button. The container, group title and divider come from `List`"}}},decorators:[e=>(0,y.jsx)(`div`,{style:{maxWidth:320},children:(0,y.jsx)(m,{children:(0,y.jsx)(e,{})})})],args:{children:`Item`,size:`md`,subitem:!1,active:!1,disabled:!1},argTypes:{size:{control:`inline-radio`,options:[`md`,`sm`,`xsm`],description:`Row height: md 56, sm 48, xsm 40`},children:{control:`text`,description:`Main text of the row`},subtitle:{control:`text`,description:`Second text under the title`},details:{control:`text`,description:`Text to the right of the title`},subitem:{control:`boolean`,description:`A second-level row (left indent)`},active:{control:`boolean`,description:`The current (selected) item`},disabled:{control:`boolean`,description:`An inactive row`},icon:{control:!1,description:`Leading 24px icon`},avatar:{control:!1,description:`Leading 32px avatar (Avatar S)`},control:{control:!1,description:`Control slot on the right`},onClick:{control:!1,description:`Row click; makes it a button`},items:{control:!1,description:`Nested rows: make the row expandable; an empty value is ignored`},expanded:{control:!1,description:`Whether the row is expanded (controlled mode)`},defaultExpanded:{control:`boolean`,description:`Initially expanded`},onExpandedChange:{control:!1,description:`New expansion state`}}},C={args:{onClick:()=>{}}},w={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Enabled`}),(0,y.jsx)(p,{active:!0,onClick:()=>{},children:`Active`}),(0,y.jsx)(p,{disabled:!0,onClick:()=>{},children:`Disabled`}),(0,y.jsx)(p,{children:`A presentational row: no onClick, no hover`})]})},T={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`No icon`}),(0,y.jsx)(p,{icon:(0,y.jsx)(i,{}),onClick:()=>{},children:`Icon`}),(0,y.jsx)(p,{avatar:b,onClick:()=>{},children:`Avatar`}),(0,y.jsx)(p,{disabled:!0,icon:(0,y.jsx)(i,{}),onClick:()=>{},children:`The icon dims together with the row`}),(0,y.jsx)(p,{disabled:!0,avatar:(0,y.jsx)(c,{type:`letters`,initials:`GG`,size:`sm`,disabled:!0}),onClick:()=>{},children:`The avatar dims with its own disabled`})]})},E={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`No control`}),(0,y.jsx)(p,{control:(0,y.jsx)(g,{size:`lg`,"aria-label":`Notifications`}),children:`Switch`}),(0,y.jsx)(p,{control:(0,y.jsx)(u,{"aria-label":`Select an item`}),children:`Checkbox`}),(0,y.jsx)(p,{control:(0,y.jsx)(`button`,{type:`button`,"aria-label":`Settings`,style:x,children:(0,y.jsx)(a,{})}),children:`Custom button`}),(0,y.jsx)(p,{disabled:!0,control:(0,y.jsx)(g,{size:`lg`,disabled:!0,"aria-label":`Notifications are off`}),children:`Disabled: the control is inert and muted`})]})},D={parameters:{controls:{disable:!0}},render:()=>(0,y.jsx)(_,{})},O={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`No caption`}),(0,y.jsx)(p,{subtitle:`Caption`,onClick:()=>{},children:`With a caption`}),(0,y.jsx)(p,{avatar:b,subtitle:`Caption`,details:`Details`,onClick:()=>{},children:`All together`})]})},k={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Parent item`}),(0,y.jsx)(p,{subitem:!0,onClick:()=>{},children:`Second-level value`}),(0,y.jsx)(p,{subitem:!0,onClick:()=>{},children:`Another one`})]})},A={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`No right text`}),(0,y.jsx)(p,{details:`Details`,onClick:()=>{},children:`With right text`})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    onClick: () => {}
  }
}`,...C.parameters?.docs?.source},description:{story:`Interactive playground.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Enabled</ListItem>
      <ListItem active onClick={() => {}}>
        Active
      </ListItem>
      <ListItem disabled onClick={() => {}}>
        Disabled
      </ListItem>
      <ListItem>A presentational row: no onClick, no hover</ListItem>
    </>
}`,...w.parameters?.docs?.source},description:{story:`States: enabled · active · disabled. Hover is with the mouse.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>No icon</ListItem>
      <ListItem icon={<Heart />} onClick={() => {}}>
        Icon
      </ListItem>
      <ListItem avatar={AVATAR} onClick={() => {}}>
        Avatar
      </ListItem>
      <ListItem disabled icon={<Heart />} onClick={() => {}}>
        The icon dims together with the row
      </ListItem>
      <ListItem disabled avatar={<Avatar type="letters" initials="GG" size="sm" disabled />} onClick={() => {}}>
        The avatar dims with its own disabled
      </ListItem>
    </>
}`,...T.parameters?.docs?.source},description:{story:`Leading slot: no icon · 24px icon · 32px avatar (Avatar S).`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>No control</ListItem>
      <ListItem control={<Switch size="lg" aria-label="Notifications" />}>Switch</ListItem>
      <ListItem control={<Checkbox aria-label="Select an item" />}>Checkbox</ListItem>
      <ListItem control={<button type="button" aria-label="Settings" style={demoIconButton}>
            <Settings02 />
          </button>}>
        Custom button
      </ListItem>
      <ListItem disabled control={<Switch size="lg" disabled aria-label="Notifications are off" />}>
        Disabled: the control is inert and muted
      </ListItem>
    </>
}`,...E.parameters?.docs?.source},description:{story:"The `control` slot: elements with their own handler: a switch, a checkbox, a custom button.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <ExpandableDemo />
}`,...D.parameters?.docs?.source},description:{story:`Expanding nested rows: uncontrolled and controlled.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>No caption</ListItem>
      <ListItem subtitle="Caption" onClick={() => {}}>
        With a caption
      </ListItem>
      <ListItem avatar={AVATAR} subtitle="Caption" details="Details" onClick={() => {}}>
        All together
      </ListItem>
    </>
}`,...O.parameters?.docs?.source},description:{story:`Caption under the title.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Parent item</ListItem>
      <ListItem subitem onClick={() => {}}>
        Second-level value
      </ListItem>
      <ListItem subitem onClick={() => {}}>
        Another one
      </ListItem>
    </>
}`,...k.parameters?.docs?.source},description:{story:"Second level: `subitem` is for a flat list, `items` sets the indent itself.",...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>No right text</ListItem>
      <ListItem details="Details" onClick={() => {}}>
        With right text
      </ListItem>
    </>
}`,...A.parameters?.docs?.source},description:{story:"Right text (`details`).",...A.parameters?.docs?.description}}},
SZ={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{size:`md`,onClick:()=>{},children:`Medium`}),(0,y.jsx)(p,{size:`sm`,onClick:()=>{},children:`Small`}),(0,y.jsx)(p,{size:`xsm`,onClick:()=>{},children:`Extra small`})]})},SZ.parameters={...SZ.parameters,docs:{source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem size="md" onClick={() => {}}>Medium</ListItem>
      <ListItem size="sm" onClick={() => {}}>Small</ListItem>
      <ListItem size="xsm" onClick={() => {}}>Extra small</ListItem>
    </>
}`},description:{story:`Row height: md (56px), sm (48px) or xsm (40px). Inside a List it follows the List size.`}}},j=[`Playground`,`Sizes`,`States`,`Icons`,`Controls`,`Expandable`,`Subtitle`,`Subitem`,`Details`]})))()}M();export{SZ as Sizes,E as Controls,A as Details,D as Expandable,T as Icons,C as Playground,w as States,k as Subitem,O as Subtitle,j as __namedExportsOrder,S as default};