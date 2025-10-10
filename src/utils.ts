interface ThemeOptions {
  themes?: string[]
  selector?: string
  darkValue?: string
}
export function useThemes(options: ThemeOptions) {
  const { themes, selector = 'html', darkValue = 'dark' } = options
  const el = document.querySelector(selector) || document.documentElement
  function toggleTheme(theme: string) {
    if (!themes?.includes(theme) || theme === undefined)
      return

    themes.forEach((t) => {
      if (t === theme) {
        if (t) {
          el.classList.add(t)
        }
      }
      else {
        if (t) {
          el.classList.remove(t)
        }
      }
    })
  }

  function toggleDark(isDark?: boolean) {
    if (isDark === undefined) {
      el.classList.toggle(darkValue)
    }
    else if (isDark) {
      el.classList.add(darkValue)
    }
    else {
      el.classList.remove(darkValue)
    }
  }
  return { toggleTheme, toggleDark } as const
}
