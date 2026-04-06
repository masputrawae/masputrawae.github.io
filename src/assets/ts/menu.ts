interface MenuToggleType {
  open?: boolean
  menu?: HTMLElement | null
  iOpen?: HTMLElement | null
  iClose?: HTMLElement | null
}

function menuToggle({ open, menu, iOpen, iClose }: MenuToggleType) {
  menu?.classList.toggle('invisible', !open)
  menu?.classList.toggle('scale-y-0', !open)

  iOpen?.classList.toggle('hidden', open)
  iClose?.classList.toggle('hidden', !open)
}

export function menuHandler() {
  // document element
  const menu = document.getElementById('menu')
  const btn = document.getElementById('btn-menu')
  const iOpen = document.getElementById('icon-menu-open')
  const iClose = document.getElementById('icon-menu-close')

  // state
  let open = false

  btn?.addEventListener('click', (e) => {
    e.stopPropagation()
    open = !open
    menuToggle({ open, menu, iOpen, iClose })
  })

  document.addEventListener('click', () => {
    open = false
    menuToggle({ open, menu, iOpen, iClose })
  })
}
