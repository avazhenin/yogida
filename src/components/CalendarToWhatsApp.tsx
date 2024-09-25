import React, { useEffect, useMemo, useState } from 'react'

import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './style/index.css'
import { ru } from 'date-fns/locale/ru'
import { Modal } from '../modals/Modal'
import { copyImageToClipboardFnc, getImageBlob } from '../utils';
import _, { debounce } from 'lodash';
import { SCREEN_SIZE_SHOW_PICTURE } from './constants';
import { WhatsAppModal } from './WhatsAppModal';

registerLocale('ru', ru);

interface ICalendarToWhatsapp {
  logo: string;
}

const copyImageToClipboard = _.debounce(() => copyImageToClipboardFnc(), 500);

export const CalendarToWhatsapp: React.FC<ICalendarToWhatsapp> = (props) => {
  const { logo } = props;

  const [dates, setDates] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBlobModalOpen, setIsBlobModalOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(document.body.getBoundingClientRect().width);
  const [imgBlob, setImgBlob] = useState<Blob | null>();


  const getWindowDimensions = () => {
    const rect = document.body.getBoundingClientRect();
    setScreenWidth(rect.width);
  }

  const getWindowDimensionsDebounce = debounce(getWindowDimensions, 500);

  useEffect(() => {
    window.addEventListener('resize', getWindowDimensionsDebounce);
    return () => {
      window.removeEventListener('resize', getWindowDimensionsDebounce);
    }
  }, [])

  const processImage = async () => {
    copyImageToClipboard();
    setImgBlob(await getImageBlob());
  };

  useEffect(() => {
    processImage();
    return () => copyImageToClipboard.cancel();
  }, [dates])

  const needShowBlobImg = useMemo(() => screenWidth <= SCREEN_SIZE_SHOW_PICTURE && imgBlob != null && imgBlob != undefined, [screenWidth, imgBlob])

  return (
    <div id='container' className='CalendarToWhatsapp'>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 50 }}>
        <div id='calendar' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: 1}}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 5 }}>
              <div className='img_container' style={{ textAlign: 'center' }}><img src={logo} /><span>Yogida</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor='fio' style={{ fontSize: 18, fontFamily: "Roboto Mono", textAlign: 'center' }}>Йога для начинающих</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <input id='subject1' placeholder='ФИО клиента' onChange={() => copyImageToClipboard()} />
                  <input id='subject2' placeholder='Тип абонемента' />
                  <input id='subject2' placeholder='Локация' />
                </div>
              </div>
            </div>
            {!isModalOpen && !isBlobModalOpen && (
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
            )}
          </div>
        </div>
      </div>
      <button tabIndex={0} style={{ padding: 10 }} onKeyDown={e => {
        if (e.key === 'Enter') {
          setIsModalOpen(true);
        }
      }} onClick={() => {
        if (needShowBlobImg) setIsBlobModalOpen(true); else setIsModalOpen(true);
      }}>
        Отправить на whatsapp
      </button>
      <Modal
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
        }}>
        <WhatsAppModal />
      </Modal>
      <Modal closeModal={() => setIsModalOpen(false)} onRequestClose={() => setIsBlobModalOpen(false)} isOpen={isBlobModalOpen}>
        {screenWidth <= SCREEN_SIZE_SHOW_PICTURE && imgBlob != null && imgBlob != undefined && (
          <div className='blobModal' style={{ position: 'relative' }}>
            <img src={URL.createObjectURL(imgBlob)} />
          </div>
        )}
      </Modal>
    </div>
  )
}