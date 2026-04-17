export interface MenuChangeOptions {
  open: boolean
  menuElm?: HTMLElement | null | undefined
  iconOpen?: HTMLElement | null | undefined
  iconClose?: HTMLElement | null | undefined
}

export function menuChange({ open, menuElm, iconOpen, iconClose }: MenuChangeOptions) {
  setTimeout(
    () => {
      menuElm?.classList.toggle('hidden', open)
      menuElm?.classList.toggle('hidden', !open)
    },
    !open ? 400 : 0
  )

  setTimeout(() => {
    menuElm?.classList.toggle('scale-y-0', !open)
    iconOpen?.classList.toggle('hidden', open)
    iconClose?.classList.toggle('hidden', !open)
  }, 100)
}

export function menuToggle() {
  let open = false

  const menuElm = document.getElementById('menu-elm')
  const btn = document.getElementById('menu-btn')
  const iconOpen = document.getElementById('menu-btn-icon-open')
  const iconClose = document.getElementById('menu-btn-icon-close')

  btn?.addEventListener('click', (e) => {
    e.stopPropagation()
    open = !open
    menuChange({ open, menuElm, iconOpen, iconClose })
  })

  document.addEventListener('click', () => {
    open = false
    menuChange({ open, menuElm, iconOpen, iconClose })
  })
}
