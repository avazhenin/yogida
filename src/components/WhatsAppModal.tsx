import { useEffect, useRef, useState } from 'react'
import InputMask from 'react-input-mask';
import { PHONE_MASK, PHONE_PLACEHOLDER } from './constants';

export const WhatsAppModal = () => {
  const [phone, setPhone] = useState('');
  
  const ref = useRef<HTMLInputElement | null>(null);

  const sendToWhatsApp = () => {
    // props.closeModal();
    window.open(`https://wa.me/${phone.replace(/[\s()]/g, '')}`, '_blank');
  }
  
  useEffect(() => {
    const input = document.getElementById('input-mask');
    if (input) input.focus();
  }, [ref.current])

  const keyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      sendToWhatsApp();
      // props.closeModal();
    }
  }
  return (
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
  )
}