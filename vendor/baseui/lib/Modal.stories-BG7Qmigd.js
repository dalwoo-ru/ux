import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./Modal-MyezkFVO.js";import{n as a,t as o}from"./TextField-ChJDh_Bu.js";import{n as s,t as c}from"./Button-BkLOZOMm.js";function l({initialOpen:e=!0,...t}){let[n,r]=(0,u.useState)(e);return(0,d.jsxs)(d.Fragment,{children:[!n&&(0,d.jsx)(c,{onClick:()=>r(!0),children:`Open Modal`}),(0,d.jsx)(i,{...t,open:n,onOpenChange:r})]})}var u,d,f,p,m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{u=t(),s(),a(),r(),d=n(),f=`The morning began without any particular promise, which was perhaps why it felt unusually open. A pale light rested on the rooftops, turning windows into quiet mirrors and making the empty streets appear wider than they really were.`,p=[`one`,`two`,`three`,`four`,`five`,`six`,`seven`,`eight`],m={title:`Components/Modal`,component:i,parameters:{layout:`fullscreen`,docs:{description:{component:`An adaptive Modal on top of Base UI Dialog: a bottom sheet up to 1200px and a centered 480px window on desktop.`}}},args:{title:`A Simple and Neutral Two-Line Title`,subtitle:`Subtitle`,header:`close`,height:`content`,children:f,primaryAction:(0,d.jsx)(c,{children:`Button`}),secondaryAction:(0,d.jsx)(c,{variant:`secondary`,children:`Additional Button`})},argTypes:{title:{control:`text`},subtitle:{control:`text`},header:{control:`select`,options:[`close`,`close-and-back`,`title-only`,!1],description:`Header variant: close, back + close, title only or no header`},height:{control:`radio`,options:[`content`,`viewport`],description:`Height by content or to the available viewport height`},children:{control:`text`},primaryAction:{control:!1},secondaryAction:{control:!1},onBack:{action:`back`},onOpenChange:{action:`openChange`}},render:(e,t)=>(0,d.jsx)(l,{...e,initialOpen:t.viewMode!==`docs`})},h={},g={args:{height:`viewport`}},_={args:{header:`close-and-back`,onBack:()=>void 0}},v={args:{header:`title-only`}},y={args:{header:!1,title:`Modal without header`,subtitle:void 0}},b={args:{height:`viewport`,title:`A Simple and Neutral Two-Line Title That Becomes Shorter on Scroll`,children:p.map(e=>(0,d.jsx)(`p`,{children:f},e))}},x={args:{height:`viewport`,title:`Keyboard viewport`,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o,{label:`Quantity`,inputMode:`numeric`,"data-testid":`modal-keyboard-input`}),p.slice(0,4).map(e=>(0,d.jsx)(`p`,{children:f},e))]}),primaryAction:(0,d.jsx)(c,{"data-testid":`modal-keyboard-action`,children:`Done`}),secondaryAction:void 0}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    height: 'viewport'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    header: 'close-and-back',
    onBack: () => undefined
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    header: 'title-only'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    header: false,
    title: 'Modal without header',
    subtitle: undefined
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    height: 'viewport',
    title: 'A Simple and Neutral Two-Line Title That Becomes Shorter on Scroll',
    children: PARAGRAPH_IDS.map(id => <p key={id}>{TEXT}</p>)
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    height: 'viewport',
    title: 'Keyboard viewport',
    children: <>
        <TextField label="Quantity" inputMode="numeric" data-testid="modal-keyboard-input" />
        {PARAGRAPH_IDS.slice(0, 4).map(id => <p key={id}>{TEXT}</p>)}
      </>,
    primaryAction: <Button data-testid="modal-keyboard-action">Done</Button>,
    secondaryAction: undefined
  }
}`,...x.parameters?.docs?.source},description:{story:`Checks content shrinking and the position of the actions when the mobile keyboard is open.`,...x.parameters?.docs?.description}}},S=[`Playground`,`Viewport`,`CloseAndBack`,`TitleOnly`,`WithoutHeader`,`Scroll`,`Keyboard`]})))()}C();export{_ as CloseAndBack,x as Keyboard,h as Playground,b as Scroll,v as TitleOnly,g as Viewport,y as WithoutHeader,S as __namedExportsOrder,m as default};