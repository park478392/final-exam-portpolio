'use client'

import Image from 'next/image'
import { useId, useRef, useState } from 'react'
import styles from './CertificateDialog.module.css'

export function CertificateDialog() {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" className={'button button-secondary ' + styles.trigger} aria-haspopup="dialog"
        onClick={() => {
          dialog.current?.showModal()
          setOpen(true)
        }}>
        자격 취득 확인서 보기
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className={styles.dialog}
        onClose={() => setOpen(false)}
        onClick={event => {
          if (event.target !== event.currentTarget) return
          const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect()
          if (event.clientX < left || event.clientX >= right || event.clientY < top || event.clientY >= bottom) {
            event.currentTarget.close()
          }
        }}
      >
        <div className={styles.header}>
          <h2 id={titleId}>네트워크관리사 2급 자격 취득 확인서</h2>
          <form method="dialog">
            <button type="submit" className="button button-secondary">닫기</button>
          </form>
        </div>
        <div className={styles.imageArea}>
          {open && <Image
            src="/images/certificates/network-certificate-public.png"
            alt="네트워크관리사 2급 자격 취득 확인서. 생년월일과 자격번호는 가려져 있습니다."
            width={1137}
            height={1544}
            sizes="min(calc(100vw - 56px), 66vh, 600px)"
            loading="eager"
            className={styles.image}
          />}
        </div>
      </dialog>
    </>
  )
}
