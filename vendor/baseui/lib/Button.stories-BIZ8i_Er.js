import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Heart-U_NNoxhN.js";import{n as i,t as a}from"./Button-BkLOZOMm.js";var o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{n(),i(),o=t(),s=[`primary`,`secondary`,`custom`,`text`],c=[`large`,`medium`,`small`,`xsmall`],l=({children:e})=>(0,o.jsx)(`div`,{style:{display:`flex`,gap:`var(--baseui-Space-M)`,alignItems:`center`,flexWrap:`wrap`},children:e}),u=({title:e,children:t})=>(0,o.jsxs)(`section`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-S)`},children:[(0,o.jsx)(`h3`,{style:{margin:0,font:`var(--baseui-Typography-Text-14-Semi-Bold)`,opacity:.6},children:e}),t]}),d={title:`Components/Button`,component:a,parameters:{docs:{description:{component:"Брендовая кнопка поверх headless Base UI Button. Варианты, размеры, состояние загрузки, растягивание на ширину контейнера и слоты под иконки. Стили — на семантических токенах `--baseui-*`, тема переключается атрибутом `data-theme`."}}},args:{children:`Label`,variant:`primary`,size:`medium`,loading:!1,fullWidth:!1,disabled:!1},argTypes:{variant:{control:`inline-radio`,options:s,description:`Визуальный вариант`,table:{type:{summary:s.map(e=>`'${e}'`).join(` | `)}}},size:{control:`inline-radio`,options:c,description:`Размер`,table:{type:{summary:c.map(e=>`'${e}'`).join(` | `)}}},loading:{control:`boolean`,description:`Состояние загрузки (спиннер, клик заблокирован)`},fullWidth:{control:`boolean`,description:`Растягивает кнопку на ширину контейнера`},disabled:{control:`boolean`,description:`Отключённое состояние`},customBackground:{control:`color`,description:`Цвет фона для variant="custom" (CSS-переменная, hex или rgb)`},customColor:{control:`color`,description:`Цвет текста для variant="custom" (CSS-переменная, hex или rgb)`}}},f={},p={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-Space-XL2)`},children:[(0,o.jsx)(u,{title:`Варианты × размеры`,children:s.map(e=>(0,o.jsx)(l,{children:c.map(t=>(0,o.jsxs)(a,{variant:e,size:t,children:[e,`/`,t]},t))},e))}),(0,o.jsx)(u,{title:`Состояния (enabled · disabled · loading)`,children:s.map(e=>(0,o.jsxs)(l,{children:[(0,o.jsx)(a,{variant:e,children:`Enabled`}),(0,o.jsx)(a,{variant:e,disabled:!0,children:`Disabled`}),(0,o.jsx)(a,{variant:e,loading:!0,children:`Loading`})]},e))}),(0,o.jsx)(u,{title:`Иконки (слева · справа · обе)`,children:(0,o.jsxs)(l,{children:[(0,o.jsx)(a,{startIcon:(0,o.jsx)(r,{}),children:`Слева`}),(0,o.jsx)(a,{endIcon:(0,o.jsx)(r,{}),children:`Справа`}),(0,o.jsx)(a,{startIcon:(0,o.jsx)(r,{}),endIcon:(0,o.jsx)(r,{}),children:`Обе`})]})}),(0,o.jsx)(u,{title:`На всю ширину контейнера`,children:(0,o.jsx)(`div`,{style:{width:360,maxWidth:`100%`},children:(0,o.jsx)(a,{fullWidth:!0,children:`Full width`})})}),(0,o.jsx)(u,{title:`Custom: произвольные цвета (customBackground · customColor)`,children:(0,o.jsxs)(l,{children:[(0,o.jsx)(a,{variant:`custom`,customBackground:`#7C3AED`,customColor:`#FFFFFF`,children:`Hex`}),(0,o.jsx)(a,{variant:`custom`,customBackground:`rgb(220, 38, 38)`,customColor:`rgb(255, 255, 255)`,children:`RGB`}),(0,o.jsx)(a,{variant:`custom`,customBackground:`var(--baseui-Background-Brand)`,children:`CSS-переменная`})]})})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source},description:{story:"Интерактивная песочница: меняйте `variant`, `size`, `loading`, `disabled`\nчерез панель контролов.",...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
      <Section title="Варианты × размеры">
        {VARIANTS.map(variant => <Row key={variant}>
            {SIZES.map(size => <Button key={size} variant={variant} size={size}>
                {variant}/{size}
              </Button>)}
          </Row>)}
      </Section>

      <Section title="Состояния (enabled · disabled · loading)">
        {VARIANTS.map(variant => <Row key={variant}>
            <Button variant={variant}>Enabled</Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button variant={variant} loading>
              Loading
            </Button>
          </Row>)}
      </Section>

      <Section title="Иконки (слева · справа · обе)">
        <Row>
          <Button startIcon={<Heart />}>Слева</Button>
          <Button endIcon={<Heart />}>Справа</Button>
          <Button startIcon={<Heart />} endIcon={<Heart />}>
            Обе
          </Button>
        </Row>
      </Section>

      <Section title="На всю ширину контейнера">
        <div style={{
        width: 360,
        maxWidth: '100%'
      }}>
          <Button fullWidth>Full width</Button>
        </div>
      </Section>

      <Section title="Custom: произвольные цвета (customBackground · customColor)">
        <Row>
          <Button variant="custom" customBackground="#7C3AED" customColor="#FFFFFF">
            Hex
          </Button>
          <Button variant="custom" customBackground="rgb(220, 38, 38)" customColor="rgb(255, 255, 255)">
            RGB
          </Button>
          <Button variant="custom" customBackground="var(--baseui-Background-Brand)">
            CSS-переменная
          </Button>
        </Row>
      </Section>
    </div>
}`,...p.parameters?.docs?.source},description:{story:`Статичная витрина всех вариантов × размеров, состояний и слотов с иконками —
вся поверхность компонента на одном экране (без манипуляции контролами).`,...p.parameters?.docs?.description}}},m=[`Playground`,`Overview`]})))()}h();export{p as Overview,f as Playground,m as __namedExportsOrder,d as default};