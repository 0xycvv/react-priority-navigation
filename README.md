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
  <button>I'm a Button ⏹ ️</button>
  <a>This is Link 🔗</a>
  <div>I'm a Div!</div>
  <div>Looooong Div🐢🐢🐢🐢</div>
  <div>🉑</div>
</PriorityNav>;
```

## Props

| Name           | Type                                                           | Description                                        | Default       |
| -------------- | -------------------------------------------------------------- | -------------------------------------------------- | ------------- |
| `itemPadding`  | String                                                         | Padding of each children                           | 'unset'       |
| `minWidth`     | String                                                         | Min width of the nav                               | '250px'       |
| `offset`       | Number                                                         | Extra width to trigger                             | 0             |
| `delay`        | Number                                                         | Delay time trigger                                 | 0             |
| `placement`    | String                                                         | Placement of the dropdown                          | 'bottomRight' |
| `icon`         | (props: IconSetting) => React.ReactElement<HTMLElement>        | Use this to render custom Icon with `ToggleButton` | null          |
| `dropdownList` | (children: React.ReactNode) => React.ReactElement<HTMLElement> | custom dropdown, take children as props            | null          |

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
