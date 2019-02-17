// @flow
import React from 'react';
import PropTypes from 'prop-types';

class CustomSelect extends React.Component<any, any> {

	static defaultProps = {
		options: null,
		onUpdate: null,
		name: '',
		value: '',
		default: null,
		fieldClassName: '',
		style: null,
		label: null,
		isValid: true,
		isRequired: false,
		greaterThan: null,
		errorMessage: ''
	};

	state = {
		options: this.props.options,
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
    return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (nextProps.options.length !== this.state.options.length) {
			console.log('componentWillReceiveProps');
			this.setState({
				options: nextProps.options
			});

			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: ''
				}
			});
		}
	}

	onChange(event: Object) {
		this.props.onUpdate(event);
	}

	render() {
		const { fieldClassName, style, label, isValid, isRequired, value, greaterThan, errorMessage, name } = this.props;

		return (
			<div className={`field-container ${fieldClassName}`} style={style}>
				{ label ?
					<div className="field-label noselect" style={Object.assign({}, label.style, !isValid ? { color: '#e4002b' } : {})}>
						{label.text} {isRequired ? '*' : null}
					</div>
					:
					null
				}
				<div className="select-style" style={!isValid ? { borderColor: '#e4002b' } : {}}>
					<div>
						<select name={name} id={name} value={value} onChange={this.onChange.bind(this)}>
							{
								this.state.options.map((item, i) => {
									switch (item.value) {
									case '0':
										return <option key={`cs_${i}`} value="0" className="disabled-option">{item.label}</option>;
									default:
										return <option key={`cs_${i}`} value={item.value} disabled={item.disabled}>{item.label}</option>;
									}
								})
							}
						</select>
					</div>
				</div>
				{(isRequired || greaterThan) && !isValid ? <span className="validation-error noselect">{errorMessage}</span> : <span className="validation-error noselect">&nbsp;</span>}
			</div>
		);
	}
}

CustomSelect.propTypes = {
	options: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	default: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	fieldClassName: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	label: PropTypes.instanceOf(Object),
	isValid: PropTypes.bool,
	isRequired: PropTypes.bool,
	greaterThan: PropTypes.string,
	errorMessage: PropTypes.string
};

CustomSelect.defaultProps = {
	options: null,
	onUpdate: null,
	name: '',
	value: '',
	default: null,
	fieldClassName: '',
	style: null,
	label: null,
	isValid: true,
	isRequired: false,
	greaterThan: null,
	errorMessage: ''
};

export default CustomSelect;
