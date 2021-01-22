import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Icon from '../icon';
import Svg from '../svg';
import Button from '../button';

import styles from './modal.styl';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.element,
    open: PropTypes.bool.isRequired,
    showClose: PropTypes.bool,
    closeOnOverlay: PropTypes.bool,
    type: PropTypes.oneOf(['custom', 'confirm', 'success', 'fail']),
    confirmInverted: PropTypes.bool,
    showButton: PropTypes.bool,
    innerPadding: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    buttonCloseSize: PropTypes.string,
  };

  static defaultProps = {
    showClose: true,
    closeOnOverlay: true,
    type: 'custom',
    confirmInverted: false,
    showButton: false,
    innerPadding: true,
    confirmButtonText: 'Okay',
    cancelButtonText: 'Cancelar',
    buttonCloseSize: '20',
  };

  renderTypeModal() {
    const { type, children } = this.props;
    const modalTypes = {
      confirm: 'renderConfirm',
      fail: 'renderAlert',
      success: 'renderAlert',
    };
    return modalTypes[type] ? this[modalTypes[type]]() : children;
  }

  renderAlert() {
    const { onClose, type, message, confirmButtonText, showButton } = this.props;
    return (
      <div className={styles.base}>
        <div className={styles.imageWrap}>
          {type === 'success'
            ? <Svg src="success" width="70px" height="70px" />
            : <Svg src="fail" width="50px" height="50px" />}
        </div>

        <div className={styles.message}>
          {message}
        </div>

        {showButton &&
          <div className={styles.actions}>
            <Button onClick={onClose}>
              {confirmButtonText}
            </Button>
          </div>}
      </div>
    );
  }

  renderConfirm() {
    const { onClose, message, onConfirm, confirmButtonText, cancelButtonText, confirmInverted } = this.props;
    return (
      <div className={styles.base}>
        <div className={styles.imageWrap}>
          <Svg src="fail" width="50px" height="50px" />
        </div>

        <div className={styles.message}>
          {message}
        </div>

        <div className={classNames(styles.actions, { [styles.isReverse]: confirmInverted })}>
          <Button
            className={styles.button}
            color={!confirmInverted ? 'variant' : 'primary'}
            modifier={!confirmInverted ? 'outline' : null}
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            className={styles.button}
            color={confirmInverted ? 'variant' : 'primary'}
            modifier={confirmInverted ? 'outline' : null}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { open, onClose, showClose, closeOnOverlay, className, innerPadding, buttonCloseSize, ...rest } = this.props;

    const fullClassName = classNames(className, styles.modal, {
      [styles.isOpen]: open,
    });

    return (
      <div className={classNames(styles.wrap, { [styles.isOpen]: open })}>
        <div className={fullClassName} {...rest}>
          {showClose && <Icon onClick={onClose} className={styles.close} size={buttonCloseSize} name="close" />}
          <div className={classNames({ [styles.content]: innerPadding })}>
            {this.renderTypeModal()}
          </div>
        </div>
        <div
          onClick={closeOnOverlay ? onClose : null}
          className={classNames(styles.overlay, { [styles.isOpen]: open })}
        />
      </div>
    );
  }
}

export default Modal;
