// @flow
import React from 'react';
import PropTypes from 'prop-types';

class CustomPlusMinus extends React.Component<any, any> {

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
		formIsValid: null,
		regEx: null,
		equalTo: null,
		isRequired: false,
		isValid: true,
		value: null,
	};


	state = {
		value: this.props.value === '' ? 0 : parseFloat(this.props.value),
		error: !this.props.isValid
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
    return false;
	}

	onChange(event: Object) {
		const value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
		this.setState({
			value: value,
			error: false,
		});
	}

	onBlur(event: Object) {
		this.props.onUpdate(event, false);
	}

	handleKeyPress(event: Object) {
		if (event.key === 'Enter') {
			event.preventDefault();
		} else {
			const value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
			this.setState({
				value: value,
				error: false,
			});
		}
	}

	plusMinus(val: string) {
		const value = val === 'min' ?
			this.state.value === 0 ? 0
				: parseFloat(this.state.value) - 1
			: parseFloat(this.state.value) + 1;
		this.setState({
			value: parseFloat(value),
			error: false,
		});

		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: parseFloat(value)
			}
		}, false);
	}

	render() {
		const { fieldClassName, style, label, name, type, disabled, noValidation, isRequired, errorMessage, textAfter } = this.props;
console.log('render', this.props.name);
		return (
			<div className={`field-container cutom-plus-minus ${fieldClassName}`} style={style}>
				<div className={this.state.error ? 'text-style has-error' : 'text-style'}>
					{ label ? (
						<label className="field-label noselect" style={Object.assign({}, label.style, this.state.error ? { color: '#e4002b' } : {})}>
							{label.text}
							{label.object ? label.object : null}
						</label>) :
						null
					}
					<div style={{ float: 'left' }}>
						<div {...{
							onClick: () => { this.plusMinus('min'); },
							style: {
								float: 'left',
								width: 30,
								lineHeight: '30px',
								borderRadius: 15,
								backgroundColor: '#323f48',
								color: '#fff',
								fontWeight: 700,
								textAlign: 'center',
								fontSize: 16,
								marginRight: 30,
								cursor: 'pointer',
								opacity: this.state.value === 0 ? 0.3 : 1
							},
							className: 'box-shadow noselect'
						}}>
							-
						</div>
						<div style={{ float: 'left' }}>
							<input {...{
								type,
								name,
								id: name,
								value: this.state.value,
								disabled,
								onKeyPress: (e) => { this.handleKeyPress(e); },
								onChange: this.onChange.bind(this),
								onBlur: this.onBlur.bind(this),
								style: { border: 'none', background: 'none', width: 40, textAlign: 'center' }
							}} />
						</div>
						<div {...{
							onClick: () => { this.plusMinus('plus'); },
							style: { float: 'left', width: 30, lineHeight: '30px', borderRadius: 15, backgroundColor: '#323f48', color: '#fff', fontWeight: 700, textAlign: 'center', fontSize: 16, marginLeft: 25, cursor: 'pointer' },
							className: 'box-shadow noselect'
						}}>
							+
						</div>
					</div>
					{ noValidation ?
						null :
						<span className="validation-error">
							{ isRequired && this.state.error ? errorMessage : '' }
							&nbsp;
						</span>
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

CustomPlusMinus.propTypes = {
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
	formIsValid: PropTypes.func,
	regEx: PropTypes.string,
	equalTo: PropTypes.func,
	isRequired: PropTypes.bool,
	isValid: PropTypes.bool,
	value: PropTypes.number,
};

CustomPlusMinus.defaultProps = {
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
	formIsValid: null,
	regEx: null,
	equalTo: null,
	isRequired: false,
	isValid: true,
	value: null,
};

export default CustomPlusMinus;
