import React from 'react';
import c from 'classnames';

import 'Scss/action-button.scss';

interface ActionButtonProps {
  onOk: () => void;
  onClose: () => void;
  disableOk?: boolean;
  disableClose?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { onOk, onClose, disableOk = false, disableClose = false } = props;

  const btnCls = (customCls: string, disable: boolean) => {
    return c({
      [customCls]: true,
      disable,
    });
  };

  return (
    <div className="btn-panel">
      <div className={btnCls('btn-cancel', disableClose)} onClick={onClose}>
        取消
      </div>
      <div className={btnCls('btn-ok', disableOk)} onClick={onOk}>
        确定
      </div>
    </div>
  );
};

export default ActionButton;
