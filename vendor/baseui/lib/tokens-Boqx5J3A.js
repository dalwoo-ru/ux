import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`/*
 * Дизайн-токены baseui — источник правды для тем и foundations.
 * Плоский CSS: при сборке копируется в dist/styles.css (без трансформации),
 * потребитель подключает его как \`import '@baseui/ui/styles.css'\`.
 *
 * Компоненты ссылаются ТОЛЬКО на эти переменные: var(--baseui-...).
 *
 * Светлая тема: :root + [data-theme="light"]
 * Тёмная тема:  [data-theme="dark"]
 * Оба блока содержат ВСЕ цветовые токены явно (полное зеркало колонок Light/Dark в Figma).
 * Space / Radius / Shadow — theme-agnostic, в отдельном :root ниже.
 * Потребитель ставит data-theme на <html> (см. README → Theming).
 *
 * Источник: Figma «Figma library» (Colors, Space, Radius, Shadow).
 * Имена 1:1 с Figma-группами: «Group / Name» → --baseui-Group-Name.
 */

:root,
[data-theme="light"] {
  color-scheme: light;

  /* Text and Icon */
  --baseui-Text-and-Icon-Primary: #171717;
  --baseui-Text-and-Icon-Secondary: #848e9c;
  --baseui-Text-and-Icon-OnColor: #ffffff;
  --baseui-Text-and-Icon-Disabled: #babfca;
  --baseui-Text-and-Icon-Accent: #575df6;

  /* Background */
  --baseui-Background-Primary: #ffffff;
  --baseui-Background-Secondary: #eff2f6;
  --baseui-Background-Tertiary: #d4dae2;
  --baseui-Background-Disabled: #f0f0f0;
  --baseui-Background-Accent: #575df6;
  --baseui-Background-Brand: #171717;

  /* Border */
  --baseui-Border-Primary: #e0e2e6;
  --baseui-Border-Accent: #ccd4e1;
  --baseui-Border-Disabled: #dfe0e2;

  /* Accent Colors */
  --baseui-Accent-Colors-Green-Light: #bbfb60;
  --baseui-Accent-Colors-Pink: #ef9ffa;
  --baseui-Accent-Colors-Blue: #575df6;
  --baseui-Accent-Colors-Green: #53b67d;
  --baseui-Accent-Colors-Orange: #f5ba44;
  --baseui-Accent-Colors-Blue-Light: #8abafa;
  --baseui-Accent-Colors-Red: #e8634c;

  /* Extensions / Text and Icon */
  --baseui-Extensions-Text-and-Icon-Error: #e8634c;
  --baseui-Extensions-Text-and-Icon-Warning: #f5ba44;
  --baseui-Extensions-Text-and-Icon-Success: #44cf5e;
  --baseui-Extensions-Text-and-Icon-AlwaysDark: #171717;
  --baseui-Extensions-Text-and-Icon-AlwaysLight: #ffffff;

  /* Extensions / Background */
  --baseui-Extensions-Background-Surface: #ffffff;
  --baseui-Extensions-Background-InversePrimary: #171717;
  --baseui-Extensions-Background-OverlayDark: rgba(0, 0, 0, 0.5);
  --baseui-Extensions-Background-OverlayLight: rgba(255, 255, 255, 0.7);
  --baseui-Extensions-Background-OverlayImage: rgba(23, 23, 23, 0.06);
  --baseui-Extensions-Background-AlwaysDark: #171717;
  --baseui-Extensions-Background-AlwaysLight: #ffffff;
  --baseui-Extensions-Background-Error: #e8634c;
  --baseui-Extensions-Background-Warning: #f5ba44;
  --baseui-Extensions-Background-Success: #44cf5e;
  --baseui-Extensions-Background-LightSuccess: #dff7e3;
  --baseui-Extensions-Background-LightAccent: #e7e8fe;
  --baseui-Extensions-Background-LightError: #f9d8d2;
  --baseui-Extensions-Background-LightWarning: #fbe2b2;

  /* Extensions / Border */
  --baseui-Extensions-Border-Selected: #171717;
  --baseui-Extensions-Border-SelectedAlwaysDark: #171717;
  --baseui-Extensions-Border-SelectedAlwaysLight: #ffffff;
  --baseui-Extensions-Border-Accent: #575df6;
  --baseui-Extensions-Border-Error: #e8634c;
  --baseui-Extensions-Border-Warning: #f5ba44;
  --baseui-Extensions-Border-Success: #44cf5e;
}

[data-theme="dark"] {
  color-scheme: dark;

  /* Text and Icon */
  --baseui-Text-and-Icon-Primary: #ffffff;
  --baseui-Text-and-Icon-Secondary: #7d7d7d;
  --baseui-Text-and-Icon-OnColor: #171717;
  --baseui-Text-and-Icon-Disabled: #7a7a7a;
  --baseui-Text-and-Icon-Accent: #575df6;

  /* Background */
  --baseui-Background-Primary: #171717;
  --baseui-Background-Secondary: #2e2e2e;
  --baseui-Background-Tertiary: #373737;
  --baseui-Background-Disabled: #454545;
  --baseui-Background-Accent: #575df6;
  --baseui-Background-Brand: #ffffff;

  /* Border */
  --baseui-Border-Primary: #383838;
  --baseui-Border-Accent: #6c7989;
  --baseui-Border-Disabled: #495563;

  /* Accent Colors */
  --baseui-Accent-Colors-Green-Light: #bbfb60;
  --baseui-Accent-Colors-Pink: #ef9ffa;
  --baseui-Accent-Colors-Blue: #575df6;
  --baseui-Accent-Colors-Green: #53b67d;
  --baseui-Accent-Colors-Orange: #f5ba44;
  --baseui-Accent-Colors-Blue-Light: #8abafa;
  --baseui-Accent-Colors-Red: #e8634c;

  /* Extensions / Text and Icon */
  --baseui-Extensions-Text-and-Icon-Error: #e8634c;
  --baseui-Extensions-Text-and-Icon-Warning: #f5ba44;
  --baseui-Extensions-Text-and-Icon-Success: #44cf5e;
  --baseui-Extensions-Text-and-Icon-AlwaysDark: #171717;
  --baseui-Extensions-Text-and-Icon-AlwaysLight: #ffffff;

  /* Extensions / Background */
  --baseui-Extensions-Background-Surface: #222222;
  --baseui-Extensions-Background-InversePrimary: #ffffff;
  --baseui-Extensions-Background-OverlayDark: rgba(0, 0, 0, 0.7);
  --baseui-Extensions-Background-OverlayLight: rgba(23, 23, 23, 0.7);
  --baseui-Extensions-Background-OverlayImage: rgba(23, 23, 23, 0);
  --baseui-Extensions-Background-AlwaysDark: #171717;
  --baseui-Extensions-Background-AlwaysLight: #ffffff;
  --baseui-Extensions-Background-Error: #e8634c;
  --baseui-Extensions-Background-Warning: #f5ba44;
  --baseui-Extensions-Background-Success: #44cf5e;
  --baseui-Extensions-Background-LightSuccess: #114119;
  --baseui-Extensions-Background-LightAccent: #24276a;
  --baseui-Extensions-Background-LightError: #51150a;
  --baseui-Extensions-Background-LightWarning: #eac57b;

  /* Extensions / Border */
  --baseui-Extensions-Border-Selected: #ffffff;
  --baseui-Extensions-Border-SelectedAlwaysDark: #171717;
  --baseui-Extensions-Border-SelectedAlwaysLight: #ffffff;
  --baseui-Extensions-Border-Accent: #575df6;
  --baseui-Extensions-Border-Error: #e8634c;
  --baseui-Extensions-Border-Warning: #f5ba44;
  --baseui-Extensions-Border-Success: #44cf5e;
}

:root {
  /* Space — gap, padding, margin */
  --baseui-Space-None: 0;
  --baseui-Space-XXS: 4px;
  --baseui-Space-XS: 8px;
  --baseui-Space-S: 12px;
  --baseui-Space-M: 16px;
  --baseui-Space-L: 20px;
  --baseui-Space-XL1: 24px;
  --baseui-Space-XL2: 32px;
  --baseui-Space-XL3: 40px;
  --baseui-Space-XL4: 48px;
  --baseui-Space-XL5: 64px;
  --baseui-Space-XL6: 80px;

  /* Radius — border-radius */
  --baseui-Radius-None: 0;
  --baseui-Radius-XXS: 4px;
  --baseui-Radius-XS: 8px;
  --baseui-Radius-S: 12px;
  --baseui-Radius-M: 16px;
  --baseui-Radius-L: 20px;
  --baseui-Radius-XL1: 24px;
  --baseui-Radius-XL2: 28px;
  --baseui-Radius-XL3: 32px;
  --baseui-Radius-XL4: 36px;
  --baseui-Radius-XL5: 40px;
  --baseui-Radius-XL6: 48px;
  --baseui-Radius-XL7: 56px;
  --baseui-Radius-XL8: 64px;
  --baseui-Radius-FullRound: 1000px;

  /* Shadow — box-shadow (Always Dark @ 12%, Figma: #1B1D22) */
  --baseui-Shadow-Color: rgb(from var(--baseui-Extensions-Background-AlwaysDark) r g b / 12%);
  --baseui-Shadow-S: 0 2px 8px 0 var(--baseui-Shadow-Color);
  --baseui-Shadow-M: 0 6px 20px 0 var(--baseui-Shadow-Color);
  --baseui-Shadow-L: 0 4px 28px 0 var(--baseui-Shadow-Color);
}
`})))()}export{t as n,n as t};