import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./InfoCircle-D0kJp3Py.js";import{n as i,t as a}from"./TextField-ChJDh_Bu.js";import{n as o,t as s}from"./Heart-BORkdOe6.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{n(),s(),i(),c=t(),l={title:`Components/TextField`,component:a,tags:[`autodocs`],parameters:{docs:{description:{component:'Текстовое поле: floating label, типы `filled`/`standard`, размеры medium (56px) / small (48px), состояния validation/disabled/loading, действия (очистка `clearable`, показ пароля у `type="password"`, кастомное `action`), иконка `startIcon`, префикс/суффикс, подпись `caption` и многострочный режим (`multiline` + `minRows`/`maxRows`). Стили — на токенах `--baseui-*`, инвертируются по теме (`data-theme`). Селект по дизайну — отдельный компонент (здесь нет). Для форм — `TextFieldField` из `@baseui/ui/rhf/TextField`.'}}},args:{label:`Label`,variant:`filled`,size:`medium`,floatingLabel:!0,caption:``,disabled:!1,loading:!1,clearable:!1,multiline:!1},argTypes:{label:{control:`text`,description:`Лейбл поля`},variant:{control:`inline-radio`,options:[`filled`,`standard`],description:`Визуальный вариант`},size:{control:`inline-radio`,options:[`medium`,`small`],description:`Размер`},floatingLabel:{control:`boolean`,description:`Лейбл всплывает (или плейсхолдер)`},caption:{control:`text`,description:`Подпись под полем (серая или в цвет status)`},status:{control:`inline-radio`,options:[`none`,`error`,`warning`,`success`],mapping:{none:void 0},description:`Статус валидации: цвет рамки и подписи`},disabled:{control:`boolean`,description:`Отключено`},loading:{control:`boolean`,description:`Скелетон загрузки`},clearable:{control:`boolean`,description:`Кнопка очистки`},multiline:{control:`boolean`,description:`Многострочный режим`},minRows:{control:`number`,description:`Мин. строк (multiline)`},maxRows:{control:`number`,description:`Макс. строк (multiline)`},prefix:{control:`text`,description:`Префикс перед значением`},suffix:{control:`text`,description:`Суффикс после значения`}}},u={display:`flex`,flexDirection:`column`,gap:16,maxWidth:360},d={},f={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Filled`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Standard`,variant:`standard`,defaultValue:`Filled text`})]})},p={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Empty`}),(0,c.jsx)(a,{label:`Filled`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Error`,defaultValue:`Filled text`,status:`error`,caption:`Текст ошибки`}),(0,c.jsx)(a,{label:`Warning`,defaultValue:`Filled text`,status:`warning`,caption:`Обратите внимание`}),(0,c.jsx)(a,{label:`Success`,defaultValue:`Filled text`,status:`success`,caption:`Всё верно`}),(0,c.jsx)(a,{label:`Disabled`,disabled:!0}),(0,c.jsx)(a,{label:`Disabled filled`,defaultValue:`Filled text`,disabled:!0}),(0,c.jsx)(a,{label:`Loading`,loading:!0})]})},m={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Medium`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Small`,size:`small`,defaultValue:`Filled text`})]})},h={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Clearable`,clearable:!0,actionLabel:`Очистить`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Password`,type:`password`,actionLabel:`Показать/скрыть пароль`,defaultValue:`secret123`}),(0,c.jsx)(a,{label:`Password (пустой — глаз по фокусу)`,type:`password`,actionLabel:`Показать/скрыть пароль`}),(0,c.jsx)(a,{label:`Custom (виден и в пустом)`,action:(0,c.jsx)(r,{size:24})})]})},g={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Multiline`,multiline:!0,defaultValue:`Multiline
Filled text`}),(0,c.jsx)(a,{label:`minRows=2, maxRows=4`,multiline:!0,minRows:2,maxRows:4})]})},_={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Label`,floatingLabel:!1}),(0,c.jsx)(a,{label:`Label`,floatingLabel:!1,defaultValue:`Filled text`})]})},v={render:()=>(0,c.jsx)(`div`,{style:u,children:(0,c.jsx)(a,{label:`Label`,startIcon:(0,c.jsx)(o,{size:24})})})},y={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Label`,caption:`Caption`}),(0,c.jsx)(a,{label:`Label`,defaultValue:`Filled text`,caption:`Caption`,status:`error`})]})},b={render:()=>(0,c.jsxs)(`div`,{style:u,children:[(0,c.jsx)(a,{label:`Label`,prefix:`$`,defaultValue:`Filled text`}),(0,c.jsx)(a,{label:`Label`,suffix:`$`,defaultValue:`Filled text`})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Filled" defaultValue="Filled text" />
      <TextField label="Standard" variant="standard" defaultValue="Filled text" />
    </div>
}`,...f.parameters?.docs?.source},description:{story:`Типы поля: filled — с фоном (основной), standard — без фона (например, чат).`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Empty" />
      <TextField label="Filled" defaultValue="Filled text" />
      <TextField label="Error" defaultValue="Filled text" status="error" caption="Текст ошибки" />
      <TextField label="Warning" defaultValue="Filled text" status="warning" caption="Обратите внимание" />
      <TextField label="Success" defaultValue="Filled text" status="success" caption="Всё верно" />
      <TextField label="Disabled" disabled />
      <TextField label="Disabled filled" defaultValue="Filled text" disabled />
      <TextField label="Loading" loading />
    </div>
}`,...p.parameters?.docs?.source},description:{story:`Состояния: пустое, со значением, валидация, disabled, загрузка.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Medium" defaultValue="Filled text" />
      <TextField label="Small" size="small" defaultValue="Filled text" />
    </div>
}`,...m.parameters?.docs?.source},description:{story:`Размеры: medium 56px и small 48px.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Clearable" clearable actionLabel="Очистить" defaultValue="Filled text" />
      <TextField label="Password" type="password" actionLabel="Показать/скрыть пароль" defaultValue="secret123" />
      <TextField label="Password (пустой — глаз по фокусу)" type="password" actionLabel="Показать/скрыть пароль" />
      <TextField label="Custom (виден и в пустом)" action={<InfoCircle size={24} />} />
    </div>
}`,...h.parameters?.docs?.source},description:{story:"Действия справа: очистка (×), пароль (глаз), кастомная иконка.\n`clearable` и пароль появляются только при фокусе или значении (пустое неактивное\nполе — просто плейсхолдер); кастомный `action` виден всегда. Приоритет: password > clear > custom.",...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Multiline" multiline defaultValue={'Multiline\\nFilled text'} />
      <TextField label="minRows=2, maxRows=4" multiline minRows={2} maxRows={4} />
    </div>
}`,...g.parameters?.docs?.source},description:{story:`Многострочный режим: авторазмер, minRows/maxRows.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" floatingLabel={false} />
      <TextField label="Label" floatingLabel={false} defaultValue="Filled text" />
    </div>
}`,..._.parameters?.docs?.source},description:{story:`floatingLabel=false: лейбл — плейсхолдер, скрывается при введённом значении.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" startIcon={<Heart size={24} />} />
    </div>
}`,...v.parameters?.docs?.source},description:{story:`Иконка в начале поля.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" caption="Caption" />
      <TextField label="Label" defaultValue="Filled text" caption="Caption" status="error" />
    </div>
}`,...y.parameters?.docs?.source},description:{story:`Подпись под полем; со status красится в цвет статуса.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={column}>
      <TextField label="Label" prefix="$" defaultValue="Filled text" />
      <TextField label="Label" suffix="$" defaultValue="Filled text" />
    </div>
}`,...b.parameters?.docs?.source},description:{story:`Префикс и суффикс — например, для валют.`,...b.parameters?.docs?.description}}},x=[`Playground`,`Types`,`States`,`Sizes`,`Actions`,`Multiline`,`PlaceholderLabel`,`WithIcon`,`Caption`,`PrefixSuffix`]})))()}S();export{h as Actions,y as Caption,g as Multiline,_ as PlaceholderLabel,d as Playground,b as PrefixSuffix,m as Sizes,p as States,f as Types,v as WithIcon,x as __namedExportsOrder,l as default};