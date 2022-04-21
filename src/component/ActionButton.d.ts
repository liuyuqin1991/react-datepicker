import React from 'react';
import 'Scss/action-button.scss';
interface ActionButtonProps {
    onOk: () => void;
    onClose: () => void;
    disableOk?: boolean;
    disableClose?: boolean;
}
declare const ActionButton: React.FC<ActionButtonProps>;
export default ActionButton;
