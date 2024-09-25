import React from 'react';
import ReactModal from 'react-modal';
import ReactFocusLock from 'react-focus-lock';

ReactModal.setAppElement('#root');

export const Modal: React.FC<{ closeModal: () => void } & ReactModal.Props> = (props) => {
  return (
    <ReactModal {...props} style={{ overlay: { backgroundColor: 'lightblue' } }}>
      <ReactFocusLock>
        {props.children}
      </ReactFocusLock>
    </ReactModal>
  )
}
