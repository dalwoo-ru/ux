import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./RadioGroup--EYef9jg.js";var r,i,a,o,s,c,l;function u(){return(u=e((()=>{t(),r={title:`Components/RadioGroup`,component:n,parameters:{docs:{description:{component:"Группа радиокнопок поверх Base UI RadioGroup: значение — `value` выбранной опции. Заголовок, список, подпись/ошибка под группой. Ошибка — только текст (кружки не краснеют, как нода «Группа» в Figma). Для форм — `RadioGroupField` из `@baseui/ui/rhf/RadioGroup`."}}},args:{title:`Способ оплаты`,options:[{value:`card`,label:`Банковская карта`},{value:`sbp`,label:`СБП`},{value:`crypto`,label:`Криптовалюта`},{value:`balance`,label:`Баланс аккаунта`}],defaultValue:`card`,caption:``,error:``},argTypes:{title:{control:`text`,description:`Заголовок группы`},defaultValue:{control:`text`,description:`Начальное значение (неконтролируемый)`},caption:{control:`text`,description:`Подпись под группой`},error:{control:`text`,description:`Текст ошибки (перекрывает caption)`}}},i={},a={parameters:{controls:{disable:!0}},args:{title:void 0,defaultValue:`checked`,options:[{value:`unchecked`,label:`Не выбрано`},{value:`checked`,label:`Выбрано`},{value:`disabled`,label:`Отключено`,disabled:!0}]}},o={parameters:{controls:{disable:!0}},args:{title:void 0,defaultValue:`saved`,options:[{value:`saved`,label:`Сохранённый выбор`,disabled:!0},{value:`other`,label:`Другая опция`,disabled:!0}]}},s={args:{caption:`Комиссия зависит от способа`}},c={args:{defaultValue:void 0,error:`Выберите способ оплаты`}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    title: undefined,
    defaultValue: 'checked',
    options: [{
      value: 'unchecked',
      label: 'Не выбрано'
    }, {
      value: 'checked',
      label: 'Выбрано'
    }, {
      value: 'disabled',
      label: 'Отключено',
      disabled: true
    }]
  }
}`,...a.parameters?.docs?.source},description:{story:`Состояния кружка: unchecked · checked · disabled · disabled-checked.`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    title: undefined,
    defaultValue: 'saved',
    options: [{
      value: 'saved',
      label: 'Сохранённый выбор',
      disabled: true
    }, {
      value: 'other',
      label: 'Другая опция',
      disabled: true
    }]
  }
}`,...o.parameters?.docs?.source},description:{story:`Отключённое выбранное значение («заблокирована с сохранением значения»).`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    caption: 'Комиссия зависит от способа'
  }
}`,...s.parameters?.docs?.source},description:{story:`С подписью под группой.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: undefined,
    error: 'Выберите способ оплаты'
  }
}`,...c.parameters?.docs?.source},description:{story:`Ошибка валидации: сообщение под группой, кружки нейтральные.`,...c.parameters?.docs?.description}}},l=[`Playground`,`States`,`DisabledChecked`,`WithCaption`,`WithError`]})))()}u();export{o as DisabledChecked,i as Playground,a as States,s as WithCaption,c as WithError,l as __namedExportsOrder,r as default};