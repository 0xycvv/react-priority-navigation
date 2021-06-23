# PriorityNav for React

## Example

```js
import PriorityNav, { ToggleButton } from 'react-priority-navigation';

<PriorityNav
  dropdown={({ dropdownItems, buttonProps }) => (
    <>
      <ToggleButton {...buttonProps.bind} />
      <PopupContent>
        {dropdownItems.map((item, i) => (
          <CustomItem key={i} {...item.props} />
        ))}
      </PopupContent>
    </>
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

| Name          | Type    | Description              | Default |
| ------------- | ------- | ------------------------ | ------- |
| `itemPadding` | String  | Padding of each children | 'unset' |
| `minWidth`    | String  | Min width of the nav     | '250px' |
| `offset`      | Number  | Extra width to trigger   | 0       |
| `debounce`    | Number  | Debounce                 | 0       |
| `isOpen`      | Boolean | Dropdown open state      | false   |

### ToggleButton

```
  children?: React.ReactNode
```
