import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./InfoCircle-D0kJp3Py.js";import{n as i,t as a}from"./TextField-ChJDh_Bu.js";import{n as o,t as s}from"./Heart-BORkdOe6.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{n(),s(),i(),c=t(),l={title:`Components/TextField`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:'A text field: a floating label, `filled`/`standard` types, medium (56px) / small (48px) sizes, validation/disabled/loading states, actions (`clearable` clear, password reveal for `type="password"`, a custom `action`), a `startIcon`, prefix/suffix, a `caption` and a multiline mode (`multiline` + `minRows`/`maxRows`). Styles use `--baseui-*` tokens, inverted by theme (`data-theme`). By design, a select is a separate component (not here). For forms use `TextFieldField` from `@baseui/ui/rhf/TextField`.'}}},args:{label:`Label`,variant:`filled`,size:`md`,floatingLabel:!0,caption:``,disabled:!1,loading:!1,action:`none`,multiline:!1},render:e=>(0,c.jsx)(a,{...e,clearable:e.action===`clear`,actionLabel:e.action===`clear`?`Clear`:void 0,action:e.action===`info`?(0,c.jsx)(`button`,{type:`button`,className:`bui-field-action`,"aria-label":`Info`,children:(0,c.jsx)(r,{size:24})}):e.action===`custom`?(0,c.jsx)(`button`,{type:`button`,className:`bui-field-action`,"aria-label":`Custom action`,children:(0,c.jsx)(o,{size:24})}):void 0}),argTypes:{label:{control:`text`,description:`Field label`},variant:{control:`inline-radio`,options:[`filled`,`standard`],description:`Visual variant`},size:{control:`inline-radio`,options:[`md`,`sm`],description:`Size`},floatingLabel:{control:`boolean`,description:`The label floats (or is a placeholder)`},caption:{control:`text`,description:`Caption under the field (gray, or the status color)`},status:{control:`inline-radio`,options:[`none`,`error`,`warning`,`success`],mapping:{none:void 0},description:`Validation status: outline and caption color`},disabled:{control:`boolean`,description:`Disabled`},loading:{control:`boolean`,description:`Loading skeleton`},action:{control:`inline-radio`,options:[`none`,`clear`,`info`,`custom`],description:`Trailing action: the clear button, an icon button or any custom node`},multiline:{control:`boolean`,description:`Multiline mode`},minRows:{control:`number`,if:{arg:`multiline`,eq:!0},row:`rows`,description:`Min rows (multiline)`},maxRows:{control:`number`,if:{arg:`multiline`,eq:!0},row:`rows`,description:`Max rows (multiline)`},prefix:{control:`text`,row:`affix`,description:`Prefix before the value`},suffix:{control:`text`,row:`affix`,description:`Suffix after the value`}}},u={display:`flex`,flexDirection:`column`,gap:16,maxWidth:360},d={},f={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Filled`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Standard`,variant:`standard`,defaultValue:`Filled text`})]})},p={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Empty`}),(0,c.jsx)(a,{label:`Filled`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Error`,defaultValue:`Filled text`,status:`error`,caption:`Error text`}),(0,c.jsx)(a,{label:`Warning`,defaultValue:`Filled text`,status:`warning`,caption:`Please note`}),(0,c.jsx)(a,{label:`Success`,defaultValue:`Filled text`,status:`success`,caption:`All good`}),(0,c.jsx)(a,{label:`Disabled`,disabled:!0}),(0,c.jsx)(a,{label:`Disabled filled`,defaultValue:`Filled text`,disabled:!0}),(0,c.jsx)(a,{label:`Loading`,loading:!0})]})},m={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Medium`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Small`,size:`sm`,defaultValue:`Filled text`})]})},h={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Clearable`,clearable:!0,actionLabel:`Clear`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Password`,type:`password`,actionLabel:`Show/hide password`,defaultValue:`secret123`}),(0,c.jsx)(a,{label:`Password (empty: the eye shows on focus)`,type:`password`,actionLabel:`Show/hide password`}),(0,c.jsx)(a,{label:`Custom (visible even when empty)`,action:(0,c.jsx)(`button`,{type:`button`,className:`bui-field-action`,"aria-label":`Info`,children:(0,c.jsx)(r,{size:24})})})]})},g={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Multiline`,multiline:!0,defaultValue:`Multiline
Filled text`}),(0,c.jsx)(a,{label:`minRows=2, maxRows=4`,multiline:!0,minRows:2,maxRows:4})]})},_={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Label`,floatingLabel:!1}),(0,c.jsx)(a,{label:`Label`,floatingLabel:!1,defaultValue:`Filled text`})]})},v={render:()=>(0,c.jsx)(`div`,{style:u,children:(0,c.jsx)(a,{label:`Label`,startIcon:(0,c.jsx)(o,{size:24})})})},y={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Label`,caption:`Caption`}),(0,c.jsx)(a,{label:`Label`,defaultValue:`Filled text`,caption:`Caption`,status:`error`})]})},b={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Label`,prefix:`$`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Label`,suffix:`$`,defaultValue:`Filled text`})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source},description:{story:`Interactive playground.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Filled" defaultValue="Filled text" />
      <TextField label="Standard" variant="standard" defaultValue="Filled text" />
    </div>
}`,...f.parameters?.docs?.source},description:{story:`Field types: filled has a background (the main one), standard has none (for example, chat).`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Empty" />
      <TextField label="Filled" defaultValue="Filled text" />
      <TextField label="Error" defaultValue="Filled text" status="error" caption="Error text" />
      <TextField label="Warning" defaultValue="Filled text" status="warning" caption="Please note" />
      <TextField label="Success" defaultValue="Filled text" status="success" caption="All good" />
      <TextField label="Disabled" disabled />
      <TextField label="Disabled filled" defaultValue="Filled text" disabled />
      <TextField label="Loading" loading />
    </div>
}`,...p.parameters?.docs?.source},description:{story:`States: empty, with a value, validation, disabled, loading.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Medium" defaultValue="Filled text" />
      <TextField label="Small" size="sm" defaultValue="Filled text" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Sizes: medium 56px and small 48px.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Clearable" clearable actionLabel="Clear" defaultValue="Filled text" />
      <TextField label="Password" type="password" actionLabel="Show/hide password" defaultValue="secret123" />
      <TextField label="Password (empty: the eye shows on focus)" type="password" actionLabel="Show/hide password" />
      <TextField label="Custom (visible even when empty)" action={<InfoCircle size={24} />} />
    </div>
}`,...h.parameters?.docs?.source},description:{story:"Actions on the right: clear (×), password (eye), a custom icon.\n`clearable` and password appear only on focus or value (an empty inactive\nfield is just a placeholder); a custom `action` is always visible. Priority: password > clear > custom.",...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Multiline" multiline defaultValue={'Multiline\\nFilled text'} />
      <TextField label="minRows=2, maxRows=4" multiline minRows={2} maxRows={4} />
    </div>
}`,...g.parameters?.docs?.source},description:{story:`Multiline mode: auto-size, minRows/maxRows.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" floatingLabel={false} />
      <TextField label="Label" floatingLabel={false} defaultValue="Filled text" />
    </div>
}`,..._.parameters?.docs?.source},description:{story:`floatingLabel=false: the label is a placeholder and hides when a value is entered.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" startIcon={<Heart size={24} />} />
    </div>
}`,...v.parameters?.docs?.source},description:{story:`Icon at the start of the field.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" caption="Caption" />
      <TextField label="Label" defaultValue="Filled text" caption="Caption" status="error" />
    </div>
}`,...y.parameters?.docs?.source},description:{story:`Caption under the field; with status it takes the status color.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" prefix="$" defaultValue="Filled text" />
      <TextField label="Label" suffix="$" defaultValue="Filled text" />
    </div>
}`,...b.parameters?.docs?.source},description:{story:`Prefix and suffix, for example for currencies.`,...b.parameters?.docs?.description}}},x=[`Playground`,`Types`,`States`,`Sizes`,`Actions`,`Multiline`,`PlaceholderLabel`,`WithIcon`,`Caption`,`PrefixSuffix`]})))()}S();export{h as Actions,y as Caption,g as Multiline,_ as PlaceholderLabel,d as Playground,b as PrefixSuffix,m as Sizes,p as States,f as Types,v as WithIcon,x as __namedExportsOrder,l as default};