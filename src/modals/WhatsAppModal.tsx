import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import InputMask, { ReactInputMask } from 'react-input-mask';
import ReactFocusLock from 'react-focus-lock';


const PHONE_MASK = '+7(799)999 99 99';
const PHONE_PLACEHOLDER = '+7(7__)___ __ __';

ReactModal.setAppElement('#root');

export const WhatsAppModal: React.FC<{ closeModal: () => void } & ReactModal.Props> = (props) => {
  const [phone, setPhone] = useState('');
  const ref = useRef<HTMLInputElement | null>(null);
  const sendToWhatsApp = () => {
    props.closeModal();
    window.open(`https://wa.me/${phone.replace(/[\s()]/g, '')}`, '_blank');
  }

  const keyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      sendToWhatsApp();
      props.closeModal();
    }
  }

  useEffect(() => {
    const input = document.getElementById('input-mask');
    if (input) input.focus();
  }, [ref.current])


  return (
    <ReactModal {...props}>
      <ReactFocusLock>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 50, margin: 50 }} onKeyDown={keyDownHandler}>
          <InputMask
            data-autofocus
            tabIndex={0}
            inputRef={ref}
            mask={PHONE_MASK}
            value={phone}
            placeholder={PHONE_PLACEHOLDER}
            onChange={val => setPhone(val.target.value)}
          />
          <button tabIndex={0} onClick={sendToWhatsApp}>Отправить</button>
        </div>
      </ReactFocusLock>
    </ReactModal>
  )
}
