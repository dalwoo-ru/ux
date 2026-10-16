import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Heart-U_NNoxhN.js";import{n as i,t as a}from"./Button-BkLOZOMm.js";var o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{n(),i(),o=t(),s=[`primary`,`secondary`,`custom`,`text`],c=[`xsm`,`sm`,`md`,`lg`],l=({children:e})=>(0,o.jsx)(`div`,{style:{display:`flex`,gap:`var(--baseui-spacing-16)`,alignItems:`center`,flexWrap:`wrap`},children:e}),u=({title:e,children:t})=>(0,o.jsxs)(`section`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-12)`},children:[(0,o.jsx)(`h3`,{style:{margin:0,font:`var(--baseui-Typography-Text-14-Semi-Bold)`,opacity:.6},children:e}),t]}),d={title:`Components/Button`,component:a,parameters:{docs:{description:{component:"A branded button on top of the headless Base UI Button. Variants, sizes, a loading state, stretching to the container width and icon slots. Styles use semantic `--baseui-*` tokens; the theme switches with the `data-theme` attribute."}}},args:{children:`Label`,variant:`primary`,size:`md`,loading:!1,fullWidth:!1,disabled:!1},argTypes:{variant:{control:`inline-radio`,options:s,description:`Visual variant`,table:{type:{summary:s.map(e=>`'${e}'`).join(` | `)}}},size:{control:`inline-radio`,options:c,description:`Size`,table:{type:{summary:c.map(e=>`'${e}'`).join(` | `)}}},loading:{control:`boolean`,description:`Loading state (spinner, click blocked)`},fullWidth:{control:`boolean`,description:`Stretches the button to the container width`},disabled:{control:`boolean`,description:`Disabled state`},customBackground:{control:`color`,description:`Background color for variant="custom" (CSS variable, hex or rgb)`},customColor:{control:`color`,description:`Text color for variant="custom" (CSS variable, hex or rgb)`}}},f={},p={parameters:{controls:{disable:!0}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--baseui-spacing-32)`},children:[(0,o.jsx)(u,{title:`Variants × sizes`,children:s.map(e=>(0,o.jsx)(l,{children:c.map(t=>(0,o.jsxs)(a,{variant:e,size:t,children:[e,`/`,t]},t))},e))}),(0,o.jsx)(u,{title:`States (enabled · disabled · loading)`,children:s.map(e=>(0,o.jsxs)(l,{children:[(0,o.jsx)(a,{variant:e,children:`Enabled`}),(0,o.jsx)(a,{variant:e,disabled:!0,children:`Disabled`}),(0,o.jsx)(a,{variant:e,loading:!0,children:`Loading`})]},e))}),(0,o.jsx)(u,{title:`Icons (left · right · both)`,children:(0,o.jsxs)(l,{children:[(0,o.jsx)(a,{startIcon:(0,o.jsx)(r,{}),children:`Left`}),(0,o.jsx)(a,{endIcon:(0,o.jsx)(r,{}),children:`Right`}),(0,o.jsx)(a,{startIcon:(0,o.jsx)(r,{}),endIcon:(0,o.jsx)(r,{}),children:`Both`})]})}),(0,o.jsx)(u,{title:`Full container width`,children:(0,o.jsx)(`div`,{style:{width:360,maxWidth:`100%`},children:(0,o.jsx)(a,{fullWidth:!0,children:`Full width`})})}),(0,o.jsx)(u,{title:`Custom: any colors (customBackground · customColor)`,children:(0,o.jsxs)(l,{children:[(0,o.jsx)(a,{variant:`custom`,customBackground:`#7C3AED`,customColor:`#FFFFFF`,children:`Hex`}),(0,o.jsx)(a,{variant:`custom`,customBackground:`rgb(220, 38, 38)`,customColor:`rgb(255, 255, 255)`,children:`RGB`}),(0,o.jsx)(a,{variant:`custom`,customBackground:`var(--baseui-Background-Brand)`,children:`CSS variable`})]})})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source},description:{story:"Interactive playground: change `variant`, `size`, `loading`, `disabled`\nin the controls panel.",...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--baseui-spacing-32)'
  }}>
      <Section title="Variants × sizes">
        {VARIANTS.map(variant => <Row key={variant}>
            {SIZES.map(size => <Button key={size} variant={variant} size={size}>
                {variant}/{size}
              </Button>)}
          </Row>)}
      </Section>

      <Section title="States (enabled · disabled · loading)">
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

      <Section title="Icons (left · right · both)">
        <Row>
          <Button startIcon={<Heart />}>Left</Button>
          <Button endIcon={<Heart />}>Right</Button>
          <Button startIcon={<Heart />} endIcon={<Heart />}>
            Both
          </Button>
        </Row>
      </Section>

      <Section title="Full container width">
        <div style={{
        width: 360,
        maxWidth: '100%'
      }}>
          <Button fullWidth>Full width</Button>
        </div>
      </Section>

      <Section title="Custom: any colors (customBackground · customColor)">
        <Row>
          <Button variant="custom" customBackground="#7C3AED" customColor="#FFFFFF">
            Hex
          </Button>
          <Button variant="custom" customBackground="rgb(220, 38, 38)" customColor="rgb(255, 255, 255)">
            RGB
          </Button>
          <Button variant="custom" customBackground="var(--baseui-Background-Brand)">
            CSS variable
          </Button>
        </Row>
      </Section>
    </div>
}`,...p.parameters?.docs?.source},description:{story:`A static showcase of every variant × size, state and icon slot —
the whole surface of the component on one screen (no controls to operate).`,...p.parameters?.docs?.description}}},m=[`Playground`,`Overview`]})))()}h();export{p as Overview,f as Playground,m as __namedExportsOrder,d as default};