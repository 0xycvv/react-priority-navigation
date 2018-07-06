# PriorityNav for React

## Example

```js
import PriorityNav, { ToggleButton } from 'react-priority-navigation';

<PriorityNav
  icon={props => (
    <ToggleButton {...props}>
      <Icon />
    </ToggleButton>
  )}
  dropdownList={children => (
    <CustomDropdown>
      {children.map(item => <CustomItem>{item}</CustomItem>)}
    </CustomDropdown>
  )}
>
  <button>I am a Button ⏹ ️</button>
  <a>This is Link 🔗</a>
  <div>I am a Div!</div>
  <div>Looooong Div🐢🐢🐢🐢</div>
  <div>🉑</div>
</PriorityNav>;
```

## Props

| Name           | Type                                                                                  | Description                                        | Default       |
| -------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------- |
| `itemPadding`  | String                                                                                | Padding of each children                           | 'unset'       |
| `minWidth`     | String                                                                                | Min width of the nav                               | '250px'       |
| `offset`       | Number                                                                                | Extra width to trigger                             | 0             |
| `debounce`        | Number                                                                                | Debounce                                           | 0             |
| `placement`    | 'left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomRight', 'bottomLeft'; | Placement of the dropdown                          | 'bottomRight' |
| `isOpen`       | Boolean                                                                               | Dropdown open state                                | false         |
| `icon`         | (props: IconSetting) => React.ReactElement<HTMLElement>                               | Use this to render custom Icon with `ToggleButton` | null          |
| `dropdownList` | (item: Array<React.ReactNode>) => React.ReactElement<HTMLElement>                     | custom dropdown, take children as props            | null          |

### ToggleButton

```
  color?: string;
  size?: number;
  hoverColor?: string;
  children?: React.ReactNode
```

### IconSetting

```
  color: string;
  size: number;
  hoverColor: string;
```
