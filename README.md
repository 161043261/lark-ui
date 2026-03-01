# Lark UI

- [Vue](./packages/vue)
- [React](./packages/react)

## BEM

```css
.namespace-block__element--modifier {
}
```

|     | Vue `<Transition />` | react-transition-group `<CSSTransition />` |
| --- | -------------------- | ------------------------------------------ |
|     | v-enter-from         | classNames-enter                           |
|     | v-enter-active       | classNames-enter-active                    |
|     | v-enter-to           | classNames-enter-active                    |
|     | v-leave-from         | classNames-exit                            |
|     | v-leave-active       | classNames-exit-active                     |
|     | v-leave-to           | classNames-exit-active                     |


## TODO

- refCallback https://react.dev/reference/react-dom/components/common#ref-callback
- `<ErrorBoundary />` https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
- flushSync https://react.dev/reference/react-dom/flushSync
- marco task v.s. micro task
  - [Web API] `!important` queueMicrotask
  - [Web API] requestAnimationFrame
  - [Node.js] process.nextTick
  - [Node.js] setImmediate
