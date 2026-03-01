/* eslint-disable @typescript-eslint/no-this-alias */
export default function debounce(fn, delay = 500) {
  let timer = null

  const debounced = function (...args) {
    const ctx = this
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.call(ctx, ...args)
      timer = null
    }, delay)
  }

  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return debounced
}
