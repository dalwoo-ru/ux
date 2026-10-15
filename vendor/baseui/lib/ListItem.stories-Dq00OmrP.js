import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./Heart-U_NNoxhN.js";import{n as a,t as o}from"./Settings02-DkQkzz9X.js";import{n as s,t as c}from"./Avatar-DK_lj_Yy.js";import{n as l,t as u}from"./Checkbox-DiXHLlD3.js";import{i as d,n as f,r as p,t as m}from"./List-eg3s5b4U.js";import{n as h,t as g}from"./Switch-C2ggHNbo.js";function _(){let[e,t]=(0,v.useState)(!0);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{items:[(0,y.jsx)(p,{onClick:()=>{},children:`Первый вложенный`},`a`),(0,y.jsx)(p,{onClick:()=>{},children:`Второй вложенный`},`b`)],children:`Неконтролируемая строка`}),(0,y.jsxs)(p,{expanded:e,onExpandedChange:t,items:[(0,y.jsx)(p,{onClick:()=>{},children:`Состояние держит потребитель`},`a`)],children:[`Контролируемая строка — `,e?`раскрыта`:`свёрнута`]}),(0,y.jsx)(p,{icon:(0,y.jsx)(i,{}),details:`Details`,items:[(0,y.jsx)(p,{onClick:()=>{},children:`Вместе со слотами`},`a`)],children:`Иконка и текст справа`})]})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{r(),o(),v=t(),s(),l(),f(),h(),d(),y=n(),b=(0,y.jsx)(c,{type:`letters`,initials:`GG`,size:`small`}),x={display:`flex`,padding:0,border:`none`,background:`none`,color:`inherit`,cursor:`pointer`},S={title:`Components/ListItem`,component:p,parameters:{docs:{description:{component:"Строка списка: иконка (`icon`) или аватар (`avatar`), заголовок с необязательной подписью (`subtitle`), текст справа (`details`) и слот контрола (`control`) — `<Switch>`, `<Checkbox>` или свой контрол со своим обработчиком. `items` делает строку раскрывающейся: шеврон компонент рисует сам внутри кнопки, вращает его и прячет вложенный список (свёрнутый — `inert`). `subitem` сдвигает строку на второй уровень, `active` помечает текущий пункт, `disabled` гасит тексты и иконку (аватар и контрол — своим `disabled`). Без `onClick` строка презентационная, с `onClick` — нативная кнопка с клавиатурой и focus-visible; контрол всегда вне этой кнопки. Контейнер, заголовок группы и разделитель даёт `List`. Стили — на токенах `--baseui-*`."}}},decorators:[e=>(0,y.jsx)(`div`,{style:{maxWidth:320},children:(0,y.jsx)(m,{children:(0,y.jsx)(e,{})})})],args:{children:`Item`,subitem:!1,active:!1,disabled:!1},argTypes:{children:{control:`text`,description:`Основной текст строки`},subtitle:{control:`text`,description:`Второй текст под заголовком`},details:{control:`text`,description:`Текст справа от заголовка`},subitem:{control:`boolean`,description:`Строка второго уровня (отступ слева)`},active:{control:`boolean`,description:`Текущий (выбранный) пункт`},disabled:{control:`boolean`,description:`Неактивная строка`},icon:{control:!1,description:`Ведущая иконка 24px`},avatar:{control:!1,description:`Ведущий аватар 32px (Avatar S)`},control:{control:!1,description:`Слот контрола справа`},onClick:{control:!1,description:`Клик по строке; делает её кнопкой`},items:{control:!1,description:`Вложенные строки — делают строку раскрывающейся; пустое значение игнорируется`},expanded:{control:!1,description:`Раскрыта ли строка (контролируемый режим)`},defaultExpanded:{control:`boolean`,description:`Раскрыта изначально`},onExpandedChange:{control:!1,description:`Новое состояние раскрытия`}}},C={args:{onClick:()=>{}}},w={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Enabled`}),(0,y.jsx)(p,{active:!0,onClick:()=>{},children:`Active`}),(0,y.jsx)(p,{disabled:!0,onClick:()=>{},children:`Disabled`}),(0,y.jsx)(p,{children:`Презентационная строка — без onClick, без hover`})]})},T={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Без иконки`}),(0,y.jsx)(p,{icon:(0,y.jsx)(i,{}),onClick:()=>{},children:`Иконка`}),(0,y.jsx)(p,{avatar:b,onClick:()=>{},children:`Аватар`}),(0,y.jsx)(p,{disabled:!0,icon:(0,y.jsx)(i,{}),onClick:()=>{},children:`Иконка гаснет вместе со строкой`}),(0,y.jsx)(p,{disabled:!0,avatar:(0,y.jsx)(c,{type:`letters`,initials:`GG`,size:`small`,disabled:!0}),onClick:()=>{},children:`Аватар гасит свой disabled`})]})},E={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Без контрола`}),(0,y.jsx)(p,{control:(0,y.jsx)(g,{size:`large`,"aria-label":`Уведомления`}),children:`Свитч`}),(0,y.jsx)(p,{control:(0,y.jsx)(u,{"aria-label":`Выбрать пункт`}),children:`Чекбокс`}),(0,y.jsx)(p,{control:(0,y.jsx)(`button`,{type:`button`,"aria-label":`Настройки`,style:x,children:(0,y.jsx)(a,{})}),children:`Своя кнопка`}),(0,y.jsx)(p,{disabled:!0,control:(0,y.jsx)(g,{size:`large`,disabled:!0,"aria-label":`Уведомления выключены`}),children:`Disabled — контрол inert и приглушён`})]})},D={parameters:{controls:{disable:!0}},render:()=>(0,y.jsx)(_,{})},O={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Без подписи`}),(0,y.jsx)(p,{subtitle:`Подпись`,onClick:()=>{},children:`С подписью`}),(0,y.jsx)(p,{avatar:b,subtitle:`Подпись`,details:`Details`,onClick:()=>{},children:`Всё вместе`})]})},k={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Родительский пункт`}),(0,y.jsx)(p,{subitem:!0,onClick:()=>{},children:`Значение второго уровня`}),(0,y.jsx)(p,{subitem:!0,onClick:()=>{},children:`Ещё одно`})]})},A={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p,{onClick:()=>{},children:`Без текста справа`}),(0,y.jsx)(p,{details:`Details`,onClick:()=>{},children:`С текстом справа`})]})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    onClick: () => {}
  }
}`,...C.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
      <ListItem>Презентационная строка — без onClick, без hover</ListItem>
    </>
}`,...w.parameters?.docs?.source},description:{story:`Состояния: enabled · active · disabled. Hover наводится мышью.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Без иконки</ListItem>
      <ListItem icon={<Heart />} onClick={() => {}}>
        Иконка
      </ListItem>
      <ListItem avatar={AVATAR} onClick={() => {}}>
        Аватар
      </ListItem>
      <ListItem disabled icon={<Heart />} onClick={() => {}}>
        Иконка гаснет вместе со строкой
      </ListItem>
      <ListItem disabled avatar={<Avatar type="letters" initials="GG" size="small" disabled />} onClick={() => {}}>
        Аватар гасит свой disabled
      </ListItem>
    </>
}`,...T.parameters?.docs?.source},description:{story:`Ведущий слот: без иконки · иконка 24px · аватар 32px (Avatar S).`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Без контрола</ListItem>
      <ListItem control={<Switch size="large" aria-label="Уведомления" />}>Свитч</ListItem>
      <ListItem control={<Checkbox aria-label="Выбрать пункт" />}>Чекбокс</ListItem>
      <ListItem control={<button type="button" aria-label="Настройки" style={demoIconButton}>
            <Settings02 />
          </button>}>
        Своя кнопка
      </ListItem>
      <ListItem disabled control={<Switch size="large" disabled aria-label="Уведомления выключены" />}>
        Disabled — контрол inert и приглушён
      </ListItem>
    </>
}`,...E.parameters?.docs?.source},description:{story:"Слот `control` — элементы со своим обработчиком: свитч, чекбокс, своя кнопка.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <ExpandableDemo />
}`,...D.parameters?.docs?.source},description:{story:`Раскрытие вложенных строк — неконтролируемое и контролируемое.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Без подписи</ListItem>
      <ListItem subtitle="Подпись" onClick={() => {}}>
        С подписью
      </ListItem>
      <ListItem avatar={AVATAR} subtitle="Подпись" details="Details" onClick={() => {}}>
        Всё вместе
      </ListItem>
    </>
}`,...O.parameters?.docs?.source},description:{story:`Подпись под заголовком.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Родительский пункт</ListItem>
      <ListItem subitem onClick={() => {}}>
        Значение второго уровня
      </ListItem>
      <ListItem subitem onClick={() => {}}>
        Ещё одно
      </ListItem>
    </>
}`,...k.parameters?.docs?.source},description:{story:"Второй уровень: `subitem` — для плоского списка, `items` отступ ставит сам.",...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <>
      <ListItem onClick={() => {}}>Без текста справа</ListItem>
      <ListItem details="Details" onClick={() => {}}>
        С текстом справа
      </ListItem>
    </>
}`,...A.parameters?.docs?.source},description:{story:"Текст справа (`details`).",...A.parameters?.docs?.description}}},j=[`Playground`,`States`,`Icons`,`Controls`,`Expandable`,`Subtitle`,`Subitem`,`Details`]})))()}M();export{E as Controls,A as Details,D as Expandable,T as Icons,C as Playground,w as States,k as Subitem,O as Subtitle,j as __namedExportsOrder,S as default};