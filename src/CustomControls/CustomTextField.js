// @flow
import React from 'react';
import PropTypes from 'prop-types';

class CustomTextField extends React.Component<any, any> {

	static defaultProps = {
		placeholder: null,
		name: null,
		type: null,
		disabled: false,
		label: null,
		textAfter: null,
		onUpdate: null,
		errorMessage: null,
		fieldClassName: null,
		style: null,
		equalTo: null,
		isRequired: false,
		onlyNumber: false,
		isValid: true,
		value: null,
	};

	state = {
		value: `${this.props.value}`,
		error: !this.props.isValid,
		editing: false,
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
    return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (this.state.value !== nextProps.value) {
			this.setState({
				value: nextProps.value,
			});
		}

		if (!nextProps.isValid) {
			this.setState({
				value: nextProps.value,
				error: !nextProps.isValid,
			});
		}
	}

	onChange(event: Object) {
		const value = this.props.limitChar ? event.target.value.substring(0, this.props.limitChar) : event.target.value;
		this.setState({
			value: this.props.onlyNumber ? value.replace(/\D/g, '') : value,
			error: false,
		});
		if (this.props.updateOnChange === true) {
			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: this.props.onlyNumber ? value.replace(/\D/g, '') : value,
				}
			}, false);
		}
	}

	onBlur(event: Object) {
		if (this.state.editing && this.props.value !== this.state.value) {
			this.props.onUpdate(event, false);
		}

		this.setState({
			editing: false,
		});
	}

	onFocus() {
		this.setState({
			editing: true,
		});
	}

	handleKeyPress(val: Object) {
		if (val.key === 'Enter') {
			val.preventDefault();

		} else {
			this.setState({
				value: val.target.value,
				error: false,
			});
		}
	}

	render() {
		const {
			fieldClassName, style, label, name, isRequired, greaterThan, regEx,
			errorMessage, type, placeholder, currency, disabled, noValidation, textAfter, equalTo
		} = this.props;

		return (
			<div className={`field-container ${fieldClassName}`} style={style}>
				<div className={this.state.error ? 'text-style has-error' : 'text-style'}>
					{ label ? (
						<label className="field-label noselect" style={Object.assign({}, label.style, this.state.error ? { color: '#e4002b' } : {})}>
							{label.text} { isRequired ? '*' : null }
							{label.object ? label.object : null}
						</label>) :
						null
					}
					<div>
						<input {...{
							type,
							placeholder,
							name,
							id: name,
							value: currency ? this.state.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : this.state.value,
							disabled,
							onKeyPress: (e) => { this.handleKeyPress(e); },
							onChange: (e) => { this.onChange(e); },
							onBlur: (e) => { this.onBlur(e); },
							onFocus: () => { this.onFocus(); },
							style:  this.state.error ? { border: '1px solid #e4002b' } : {}
						}} />
					</div>
					{ noValidation ?
						null
						:
						<div className="validation-error noselect">
							{(isRequired || greaterThan || regEx || equalTo) && this.state.error ? errorMessage : '' }
							&nbsp;
						</div>
					}
					{ textAfter ? (
						<div style={textAfter.style}>
							{textAfter.text}
						</div>) : null }
				</div>
			</div>
		);
	}
}

CustomTextField.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.instanceOf(Object),
	textAfter: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	errorMessage: PropTypes.string,
	fieldClassName: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	equalTo: PropTypes.string,
	isRequired: PropTypes.bool,
	onlyNumber: PropTypes.bool,
	isValid: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

CustomTextField.defaultProps = {
	placeholder: null,
	name: null,
	type: null,
	disabled: false,
	label: null,
	textAfter: null,
	onUpdate: null,
	errorMessage: null,
	fieldClassName: null,
	style: null,
	equalTo: '',
	isRequired: false,
	onlyNumber: false,
	isValid: true,
	value: null,
};

export default CustomTextField;
