import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Transformer from '../utils/Transformer';

CustomEntry.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

function CustomEntry(props) {
  const {
    icon,
    label,
    header,
    footer,
    onFooterClick,
    className,
    children,
    onClick,
  } = props;

  const hasChildren = !!(children)
  const hasIcon = !!(icon);
  const hasLabel = !!(label);

  const localIcon = hasIcon ? Transformer.icon(icon) : null;

  const listClasses = classnames('navbar-menu', {'dropdown': children}, className);

  return (
    <li className={listClasses} onClick={onClick}>
      <a href="/" data-toggle="dropdown">
        {hasIcon && <FontAwesomeIcon icon={localIcon} className="margin-r-5" />}
        {hasLabel && label}
      </a>
      {
        hasChildren && (
          <ul className="dropdown-menu">
            {
              header && <li className="header">{header}</li>
            }
            <li>
              <ul className="menu">{children}</ul>
            </li>
            {
              footer && (
                <li onClick={onFooterClick}
                    onKeyPress={onFooterClick}
                    className="footer">
                  {footer}
                </li>
              )
            }
          </ul>
        )
      }
    </li>
  );
}

export default CustomEntry
