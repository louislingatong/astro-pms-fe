import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Inputs} from 'adminlte-2-react';
import Transform from '../../utils/Transformer';
import {intervalUnitsAsync} from '../../store/optionSlice';

function IntervalUnitSelect(props) {
  const {name, id, label, labelPosition = 'none', placeholder = '', allowClear} = props;
  const {form = false, value, disabled, type, help} = props;
  const {onChange} = props;

  const {Select2} = Inputs;

  const dispatch = useDispatch();

  const localValue = useRef(value);

  useEffect(() => {
    localValue.current = value;
  }, [value]);

  const openOptions = (e) => {
    localValue.current = e.params.data;
  };

  const fetchOptions = (data, success) => {
    const currentLocalValue = localValue.current;

    const params = {};

    if (!data.searchValue && currentLocalValue) {
      params['keyword'] = currentLocalValue;
    }
    if ((data.searchValue && !currentLocalValue) || (data.searchValue && currentLocalValue)) {
      params['keyword'] = data.searchValue;
    }

    dispatch(intervalUnitsAsync(params))
      .unwrap()
      .then((response) => {
        const transformedOptions = Transform.toSelectOptions(response);
        success(transformedOptions);
      });
  };

  const formProps = form ? {value, disabled, type, help, options: [value]} : {};

  return (
    <Select2
      name={name}
      id={id}
      label={label}
      labelPosition={labelPosition}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      onOpen={openOptions}
      onFetchData={fetchOptions}
      fetchDataDelay={1000}
      {...formProps}
    />
  )
}

IntervalUnitSelect.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['above', 'left', 'none']),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  help: PropTypes.string,
  form: PropTypes.bool,
  onChange: PropTypes.func,
};

export default IntervalUnitSelect;