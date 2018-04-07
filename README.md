# PriorityNav for React

## Example

```js
import PriorityNav, { ToggleButton } from '../src/index';

      <PriorityNav
        icon={(props) => (
          <ToggleButton {...props}>
             <Icon />
          </ToggleButton>
        )}
                dropdownList={(children) => (
          <CustomDropdown>
            {children.map(item => <CustomItem>{item}</CustomItem>)}
          </CustomDropdown>)
                }
      >
      <button>I'm a Button ⏹ ️</button>
        <a>This is Link 🔗</a>
        <div>I'm a Div!</div>
        <div>Looooong Div🐢🐢🐢🐢</div>
        <div>🉑</div>
      </PriorityNav>
```