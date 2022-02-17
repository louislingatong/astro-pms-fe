import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

Dialog.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

function Dialog(props) {
  const {children, show, size = 'sm'} = props;

  const handleClose = () => {
    props.onClose();
  }

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { handleClose });
  });

  return (
    <div className={classnames('modal fade', {'show d-block': show})}>
      <div className={classnames('modal-dialog', `modal-${size}`)}>
        <div className="modal-content">
          {childrenWithProps}
        </div>
      </div>
    </div>
  );
}

function Header(props) {
  const {children, closeButton} = props;
  return (
    <div className="modal-header" {...props}>
      <h4 className="modal-title">{children}</h4>
      {
        closeButton && (
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                  onClick={() => props.handleClose()}>
            <span aria-hidden="true">&times;</span>
          </button>
        )
      }
    </div>
  );
}

function Body(props) {
  const {children} = props;
  return (
    <div className="modal-body" {...props}>
      {children}
    </div>
  )
}

function Footer(props) {
  const {children} = props;
  return (
    <div className="modal-footer justify-content-between" {...props}>
      {children}
    </div>
  );
}

export default {
  Dialog,
  Header,
  Body,
  Footer
};
