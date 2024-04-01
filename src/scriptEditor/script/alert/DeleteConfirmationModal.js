import React from 'react';
import './DeleteConfirmationModal.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function DeleteConfirmationModal({ targetTiTle, isOpen, onClose, onSave, onDontSave }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal" role="dialog" aria-modal="true">
                <div className="modal-header">
                    
                    <h5 className="modal-title">Grapicar Studio</h5>
                </div>
                <div className="modal-body">
                <WarningAmberIcon style={{ color: '#FFCC00', marginRight: '10px' }} />
                    <h3>{targetTiTle}에 대한 변경 내용을 저장하겠습니까?</h3>
                    변경 내용을 저장하지 않으면 손실됩니다.
                </div>
                <div className="modal-footer">
                    <button onClick={onSave} className="button button-save">저장(S)</button>
                    <button onClick={onDontSave} className="button button-dont-save">저장 안 함(N)</button>
                    <button onClick={onClose} className="button button-cancel">취소</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
