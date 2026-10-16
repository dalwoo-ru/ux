/**
 * Attaches a description to a component for its documentation page (props table).
 * props: { name: ['type', 'default' | null, 'description'] }
 */
export function describe(component, description, props) {
  component.__docgenInfo = {
    description,
    props: Object.fromEntries(Object.entries(props).map(([name, [type, def, text]]) => [name, {
      required: false,
      tsType: { name: type, raw: type },
      ...(def != null && { defaultValue: { value: def, computed: false } }),
      description: text,
    }])),
  };
  return component;
}
