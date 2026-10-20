'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('themechange', callback)
  window.addEventListener('storage', sync)
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', sync)
  function sync() {
    let saved: string | null = null
    try { saved = localStorage.getItem('site-theme') } catch {}
    document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : media.matches ? 'dark' : 'light'
    callback()
  }
  return () => {
    window.removeEventListener('themechange', callback)
    window.removeEventListener('storage', sync)
    media.removeEventListener('change', sync)
  }
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === 'dark', () => false)
  return <button type="button" className="theme-toggle" aria-label="야간 모드" aria-pressed={dark} onClick={() => {
    const theme = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('site-theme', theme) } catch {}
    window.dispatchEvent(new Event('themechange'))
  }}><span aria-hidden="true">{dark ? '☀' : '☾'}</span> {dark ? '주간 모드' : '야간 모드'}</button>
}
