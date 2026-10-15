import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./InfoCircle-D0kJp3Py.js";import{n as i,t as a}from"./clsx-CTwy9ux-.js";import{n as o,t as s}from"./Avatar-DK_lj_Yy.js";import{n as c,t as l}from"./Heart-BORkdOe6.js";var u;function d(){return(d=e((()=>{u={root:`tag-root`}})))()}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{f=`_tag_1xge5_1`,p=`_small_1xge5_21`,m=`_xsmall_1xge5_25`,h=`_counter_1xge5_30`,g=`_filled_1xge5_43`,_=`_base_1xge5_43`,v=`_secondary_1xge5_47`,y=`_accent_1xge5_51`,b=`_brand_1xge5_55`,x=`_error_1xge5_59`,S=`_warning_1xge5_63`,C=`_solid_1xge5_67`,w=`_outlined_1xge5_95`,T=`_disabled_1xge5_119`,E=`_label_1xge5_130`,D=`_icon_1xge5_145`,O=`_hintIcon_1xge5_146`,k=`_avatar_1xge5_162`,A={tag:f,small:p,xsmall:m,counter:h,filled:g,base:_,secondary:v,accent:y,brand:b,error:x,warning:S,solid:C,outlined:w,disabled:T,label:E,icon:D,hintIcon:O,avatar:k}})))()}function M({variant:e=`filled`,color:t=`base`,size:n=`small`,startIcon:i,avatar:o,counter:s,hint:c=!1,children:l,className:d,"data-testid":f=u.root,ref:p,...m}){let h=o!=null&&o!==!1,g=!h&&i!=null&&i!==!1,_=s!=null,v=l!=null&&l!==!1;return(0,N.jsxs)(`span`,{...m,ref:p,className:a(A.tag,A[e],A[t],A[n],d),"data-variant":e,"data-color":t,"data-size":n,"data-avatar":h||void 0,"data-testid":f,children:[h&&(0,N.jsx)(`span`,{className:A.avatar,children:o}),g&&(0,N.jsx)(`span`,{className:A.icon,children:i}),v&&(0,N.jsx)(`span`,{className:A.label,children:l}),_&&(0,N.jsx)(`span`,{className:A.counter,children:s}),c&&(0,N.jsx)(`span`,{className:A.hintIcon,"aria-hidden":`true`,children:(0,N.jsx)(r,{})})]})}var N;function P(){return(P=e((()=>{n(),i(),d(),j(),N=t(),M.__docgenInfo={description:`Компактный неинтерактивный тег для категории, статуса или счётчика.
Варианты, цвета и размеры соответствуют Figma component set; визуальные
значения построены на семантических токенах \`--baseui-*\`.`,methods:[],displayName:`Tag`,props:{variant:{required:!1,tsType:{name:`union`,raw:`'filled' | 'solid' | 'outlined'`,elements:[{name:`literal`,value:`'filled'`},{name:`literal`,value:`'solid'`},{name:`literal`,value:`'outlined'`}]},description:`Визуальный вариант. @default 'filled'`,defaultValue:{value:`'filled'`,computed:!1}},color:{required:!1,tsType:{name:`union`,raw:`'base' | 'secondary' | 'accent' | 'brand' | 'error' | 'warning' | 'disabled'`,elements:[{name:`literal`,value:`'base'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'accent'`},{name:`literal`,value:`'brand'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'disabled'`}]},description:`Цветовая тема. @default 'base'`,defaultValue:{value:`'base'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'xsmall'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'xsmall'`}]},description:`Размер. @default 'small'`,defaultValue:{value:`'small'`,computed:!1}},startIcon:{required:!1,tsType:{name:`ReactNode`},description:`Иконка перед лейблом. Не используется, если передан avatar.`},avatar:{required:!1,tsType:{name:`ReactNode`},description:`Аватар перед лейблом. Имеет приоритет над startIcon.`},counter:{required:!1,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:`Счётчик после лейбла. Значение 0 отображается.`},hint:{required:!1,tsType:{name:`boolean`},description:`Показывает декоративную иконку подсказки в конце тега.`,defaultValue:{value:`false`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Лейбл тега.`},className:{required:!1,tsType:{name:`string`},description:`Дополнительный класс потребителя.`},"data-testid":{required:!1,tsType:{name:`string`},description:`Стабильный селектор для автотестов. @default 'tag-root'`,defaultValue:{value:`'tag-root'`,computed:!1}},ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLSpanElement`}],raw:`Ref<HTMLSpanElement>`},description:`Ref на корневой span (React 19 — обычный проп, без forwardRef).`}},composes:[`Omit`]}})))()}var F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{l(),o(),P(),F=t(),I=[`filled`,`solid`,`outlined`],L=[`base`,`secondary`,`accent`,`brand`,`error`,`warning`,`disabled`],R=[`small`,`xsmall`],z=(0,F.jsx)(s,{type:`letters`,initials:`GG`,size:`xsmall`,variant:`rounded`,width:20,height:20}),B=({children:e})=>(0,F.jsx)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-S)`,alignItems:`center`,flexWrap:`wrap`},children:e}),V=({title:e,children:t})=>(0,F.jsxs)(`section`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,F.jsx)(`h3`,{style:{margin:0,font:`var(--baseui-Typography-Text-14-Semi-Bold)`,opacity:.6},children:e}),t]}),H={title:`Components/Tag`,component:M,parameters:{docs:{description:{component:`Компактный неинтерактивный тег для индикации категории, статуса или счётчика. Поддерживает filled/solid/outlined, семантические цвета, два размера и слоты под иконку или аватар.`}}},args:{children:`Label`,variant:`filled`,color:`base`,size:`small`,hint:!1},argTypes:{variant:{control:`inline-radio`,options:I,description:`Визуальный вариант`,table:{type:{summary:I.map(e=>`'${e}'`).join(` | `)}}},color:{control:`select`,options:L,description:`Семантическая цветовая тема`,table:{type:{summary:L.map(e=>`'${e}'`).join(` | `)}}},size:{control:`inline-radio`,options:R,description:`Размер`,table:{type:{summary:R.map(e=>`'${e}'`).join(` | `)}}},counter:{control:`number`,description:`Счётчик после лейбла`},hint:{control:`boolean`,description:`Иконка подсказки в конце тега`},startIcon:{control:!1,description:`Иконка перед лейблом`},avatar:{control:!1,description:`Аватар перед лейблом; приоритетнее startIcon`}}},U={},W={parameters:{controls:{disable:!0}},render:()=>(0,F.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-XL2)`},children:[(0,F.jsx)(V,{title:`Type`,children:(0,F.jsx)(B,{children:[`filled`,`outlined`,`solid`].map(e=>(0,F.jsx)(M,{variant:e,color:`accent`,children:`Label`},e))})}),(0,F.jsx)(V,{title:`Color`,children:(0,F.jsx)(B,{children:L.map(e=>(0,F.jsx)(M,{color:e,children:`Label`},e))})}),(0,F.jsx)(V,{title:`Icon`,children:(0,F.jsxs)(B,{children:[(0,F.jsx)(M,{children:`Label`}),(0,F.jsx)(M,{startIcon:(0,F.jsx)(c,{}),children:`Label`}),(0,F.jsx)(M,{avatar:z,children:`Label`}),(0,F.jsx)(M,{color:`brand`,children:`Label`})]})}),(0,F.jsx)(V,{title:`Size`,children:(0,F.jsx)(B,{children:R.map(e=>(0,F.jsx)(M,{size:e,children:`Label`},e))})}),(0,F.jsx)(V,{title:`Label`,children:(0,F.jsxs)(B,{children:[(0,F.jsx)(M,{startIcon:(0,F.jsx)(c,{}),children:`Label`}),(0,F.jsx)(M,{startIcon:(0,F.jsx)(c,{})})]})}),(0,F.jsx)(V,{title:`Counter`,children:(0,F.jsxs)(B,{children:[(0,F.jsx)(M,{children:`Label`}),(0,F.jsx)(M,{counter:6,children:`Label`})]})}),(0,F.jsx)(V,{title:`Hint`,children:(0,F.jsxs)(B,{children:[(0,F.jsx)(M,{children:`Label`}),(0,F.jsx)(M,{hint:!0,children:`Label`})]})})]})},G={parameters:{controls:{disable:!0}},render:()=>(0,F.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-XL2)`},children:R.map(e=>(0,F.jsx)(V,{title:e,children:L.map(t=>(0,F.jsx)(B,{children:I.flatMap(n=>[(0,F.jsx)(M,{variant:n,color:t,size:e,children:`Label`},`${n}-plain`),(0,F.jsx)(M,{variant:n,color:t,size:e,startIcon:(0,F.jsx)(c,{}),children:`Label`},`${n}-icon`),(0,F.jsx)(M,{variant:n,color:t,size:e,avatar:z,children:`Label`},`${n}-avatar`)])},t))},e))})},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{}`,...U.parameters?.docs?.source},description:{story:`Интерактивная песочница для основных визуальных свойств.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-Space-XL2)'
  }}>
      <Section title="Type">
        <Row>
          {(['filled', 'outlined', 'solid'] as const).map(variant => <Tag key={variant} variant={variant} color="accent">
              Label
            </Tag>)}
        </Row>
      </Section>

      <Section title="Color">
        <Row>
          {COLORS.map(color => <Tag key={color} color={color}>
              Label
            </Tag>)}
        </Row>
      </Section>

      <Section title="Icon">
        <Row>
          <Tag>Label</Tag>
          <Tag startIcon={<Heart />}>Label</Tag>
          <Tag avatar={TAG_AVATAR}>Label</Tag>
          <Tag color="brand">Label</Tag>
        </Row>
      </Section>

      <Section title="Size">
        <Row>
          {SIZES.map(size => <Tag key={size} size={size}>
              Label
            </Tag>)}
        </Row>
      </Section>

      <Section title="Label">
        <Row>
          <Tag startIcon={<Heart />}>Label</Tag>
          <Tag startIcon={<Heart />} />
        </Row>
      </Section>

      <Section title="Counter">
        <Row>
          <Tag>Label</Tag>
          <Tag counter={6}>Label</Tag>
        </Row>
      </Section>

      <Section title="Hint">
        <Row>
          <Tag>Label</Tag>
          <Tag hint>Label</Tag>
        </Row>
      </Section>
    </div>
}`,...W.parameters?.docs?.source},description:{story:`Свойства из документации компонента в Figma.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-Space-XL2)'
  }}>
      {SIZES.map(size => <Section key={size} title={size}>
          {COLORS.map(color => <Row key={color}>
              {VARIANTS.flatMap(variant => [<Tag key={\`\${variant}-plain\`} variant={variant} color={color} size={size}>
                  Label
                </Tag>, <Tag key={\`\${variant}-icon\`} variant={variant} color={color} size={size} startIcon={<Heart />}>
                  Label
                </Tag>, <Tag key={\`\${variant}-avatar\`} variant={variant} color={color} size={size} avatar={TAG_AVATAR}>
                  Label
                </Tag>])}
            </Row>)}
        </Section>)}
    </div>
}`,...G.parameters?.docs?.source},description:{story:`Полная матрица типов, цветов, размеров и leading-слотов из component set.`,...G.parameters?.docs?.description}}},K=[`Playground`,`Overview`,`Matrix`]})))()}q();export{G as Matrix,W as Overview,U as Playground,K as __namedExportsOrder,H as default};