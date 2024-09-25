import React, { useEffect, useState } from 'react'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ru } from 'date-fns/locale/ru'
import { WhatsAppModal } from '../modals/WhatsAppModal'
import { copyImageToClipboardFnc } from '../utils';
import _ from 'lodash';

registerLocale('ru', ru);

interface ICalendarToWhatsapp {
  logo: string;
}

const copyImageToClipboard = _.debounce(() => copyImageToClipboardFnc(), 500);

export const CalendarToWhatsapp: React.FC<ICalendarToWhatsapp> = (props) => {
  const { logo } = props;

  const [dates, setDates] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    copyImageToClipboard();
    return () => {
      copyImageToClipboard.cancel();
    }
  }, [dates])

  const openModal = () => setIsModalOpen(true);

  return (
    <div id='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 50 }}>
        <div id='calendar' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: 1 }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <div className='img_container'><img src={logo} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor='fio' style={{ fontSize: 18, fontFamily: "Roboto Mono", textAlign: 'center' }}>Йога для начинающих</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <input id='subject' placeholder='ФИО клиента' onChange={() => copyImageToClipboard()} />
                </div>
              </div>
            </div>
            <DatePicker
              inline
              locale={ru}
              selectsMultiple
              selectedDates={dates}
              selectsRange
              monthsShown={2}
              disabledKeyboardNavigation
              onChange={dates => dates.forEach(date => {
                if (date) setDates(prev => {
                  return prev.find(d => d.getTime() === date.getTime()) ? prev.filter(d => d.getTime() !== date.getTime()) : prev.concat(date);
                })
              })}
            />
          </div>
        </div>
      </div>
      <button tabIndex={0} style={{ padding: 10 }} onKeyDown={e => {
        if (e.key === 'Enter') {
          openModal();
        }
      }} onClick={openModal}>
        Отправить на whatsapp
      </button>
      <WhatsAppModal
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick
        onRequestClose={() => setIsModalOpen(false)}
        closeModal={() => setIsModalOpen(false)}
        contentLabel="Minimal Modal Example"
        style={{
          content: {
            width: 250,
            height: 250,
            position: 'relative',
          },
          overlay: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid blue'
          }
        }}
      />
    </div>
  )
}