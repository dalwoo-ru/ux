import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./CheckboxGroup-By8iBNNa.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),r={title:`Components/CheckboxGroup`,component:n,parameters:{docs:{description:{component:"Группа чекбоксов поверх Base UI CheckboxGroup: значение — массив `value` отмеченных. Заголовок, список, подпись/ошибка под группой. Ошибка — только текст (боксы не краснеют, как нода «Группа» в Figma). Для форм — `CheckboxGroupField` из `@baseui/ui/rhf/CheckboxGroup`."}}},args:{title:`Способы уведомлений`,options:[{value:`sms`,label:`SMS`},{value:`email`,label:`E-mail`},{value:`push`,label:`Push`},{value:`call`,label:`Звонок`}],defaultValue:[`email`],caption:``,error:``},argTypes:{title:{control:`text`,description:`Заголовок группы`},caption:{control:`text`,description:`Подпись под группой`},error:{control:`text`,description:`Текст ошибки (перекрывает caption)`}}},i={},a={args:{caption:`Можно выбрать несколько`}},o={args:{defaultValue:[],error:`Выберите хотя бы один способ`}},s={args:{title:`Уведомления`,parent:`Все уведомления`,defaultValue:[`orders`],options:[{value:`orders`,label:`Заказы`},{value:`promo`,label:`Акции`},{value:`news`,label:`Новости`}]}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source},description:{story:`Интерактивная песочница.`,...i.parameters?.docs?.description}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    caption: 'Можно выбрать несколько'
  }
}`,...a.parameters?.docs?.source},description:{story:`С подписью под группой.`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    defaultValue: [],
    error: 'Выберите хотя бы один способ'
  }
}`,...o.parameters?.docs?.source},description:{story:`Ошибка валидации: сообщение под группой, боксы нейтральные.`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Уведомления',
    parent: 'Все уведомления',
    defaultValue: ['orders'],
    options: [{
      value: 'orders',
      label: 'Заказы'
    }, {
      value: 'promo',
      label: 'Акции'
    }, {
      value: 'news',
      label: 'Новости'
    }]
  }
}`,...s.parameters?.docs?.source},description:{story:"Подгруппа (Subgroup из Figma): `parent` — чекбокс «выбрать все», переключает все опции\nразом и показывает indeterminate (тире) при частичном выборе; опции — подпункты с отступом.",...s.parameters?.docs?.description}}},c=[`Playground`,`WithCaption`,`WithError`,`WithSubgroup`]})))()}l();export{i as Playground,a as WithCaption,o as WithError,s as WithSubgroup,c as __namedExportsOrder,r as default};