// Apply the saved theme before the page is painted to avoid a light flash.
export function ThemeInit() {
  return <script dangerouslySetInnerHTML={{ __html: `(function(){var t;try{t=localStorage.getItem('site-theme')}catch(e){}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()` }} />
}
