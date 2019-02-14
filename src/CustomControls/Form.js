// @flow
import React from 'react';
import PropTypes from 'prop-types';

import CustomTextField from './CustomTextField';
import CustomTextarea from './CustomTextarea';
import CustomCheckBox from './CustomCheckBox';
import CustomSelect from './CustomSelect';
import CustomRadio from './CustomRadio';
import CustomLabel from './CustomLabel';
import CustomTextAreaTab from './CustomTextAreaTab';
import DatePickerField from './DatePickerField';
import CustomMap from './CustomMap';
import CustomPlusMinus from './CustomPlusMinus';
import FakeSelect from './FakeSelect';
import './Form.scss';

import { notEmpty } from '../helpers/utils';

const Form = class extends React.Component<any, any> {

	static defaultProps = {
		textBeforeButton: null,
		textAfterButton: null,
		bindChange: false,
		onChange: null,
		resetForm: false,
		sendButton: null,
		skipButton: null,
		skipSend: null,
		style: null,
		sendForm: null,
	};

	state = {
		controls: this.props.controls,
		resetForm: null,
	};

	componentWillReceiveProps(nextProps: Object) {
		if (nextProps.resetForm) {
			this.setState({
				controls: nextProps.controls,
				resetForm: true,
			});
		}
	}

	onUpdate(e: Object, hasError: boolean) {
		if (this.props.bindChange) {
			this.props.onChange(e);
		} else {
			const updatedControls = [];

			this.state.controls.map((item) => {
				const itemX = item;
				if (e.target.name === item.name) {
					itemX.isValid = !hasError;
					itemX.value = e.target.value;
					updatedControls.push(itemX);
				} else {
					if (typeof item.hideIf === 'object') {
						let hide = false;
						item.hideIf.map((v) => {
							const control = this.state.controls.filter(o => o.name === v.field);
							if (control.length > 0) {
								if (control[0].value.toString().match(v.regEx) != null) {
									hide = true;
								}
							}
							return null;
						});
						item.value = hide ? '' : item.value;
						item.hide = hide;
					}
					if (item.label && typeof item.label.changeIf === 'object') {
						item.label.changeIf.map((v) => {
							const control = this.state.controls.filter(o => o.name === v.field);
							if (control.length > 0) {
								item.label.text = control[0].value.toString().match(v.regEx) != null ? v.ifTrue : v.ifFalse;
							}
							return null;
						});
					}
					if (typeof item.optionIf === 'object') {
						item.optionIf.map((v) => {
							const control = this.state.controls.filter(o => o.name === v.field);
							if (control.length > 0) {
								item.options = v.options.filter(o => o.type.indexOf(parseFloat(control[0].value))	!== -1);
							}
							return null;
						});
					}
					if (typeof item.changeStyleIf === 'object') {
						item.changeStyleIf.map((v) => {
							const control = this.state.controls.filter(o => o.name === v.field);
							if (control.length > 0) {
								if (control[0].value.toString().match(v.regEx) != null) {
									item.style = v.style;
								} else {
									item.style = v.altStyle;
								}
							}
							return null;
						});
					}

					updatedControls.push(item);
				}
				return null;
			});

			this.setState({
				controls: updatedControls,
				resetForm: false,
			});

			if (this.props.updateFather) {
				this.props.updateFather(updatedControls);
			}
		}
	}

	formIsValid(val: string) {
		if (val !== 'btn btn-succeed' && val !== 'btn btn-error' && val !== 'btn btn-succeed btn-succeed-big') {
			let formIsValid = true;

			const updatedControls = [];
			this.state.controls.map((item) => {
				const itemX = item;
				if (item.isRequired && !item.hide) {
					if (item.control !== 'select' && (item.value === '' || !item.value)) {
						itemX.isValid = false;
						formIsValid = false;
					} else if (item.control === 'select' && item.value === '0' && item.value === 0) {
						itemX.isValid = false;
						formIsValid = false;
					}
				}

				if (typeof itemX.value === 'object' && itemX.valueAsObject) {
					if (item.value && item.value.filter(o => o.isRequired === true).length > 0) {
						const updatedValues = [];
						item.value.map((itemS) => {
							if (itemS.isRequired) {
								if (itemS.value === '' || !itemS.value) {
									itemS.isValid = false;
									itemX.isValid = false;
									formIsValid = false;
								}
							}
							updatedValues.push(itemS);
							return null;
						});
						itemX.value = updatedValues;
					}
				}
				if (item.regEx !== undefined && !item.hide) {
					if (item.value !== '' &&	!item.regEx.test(item.value)) {
						itemX.isValid = false;
						formIsValid = false;
					}
				}
				if (item.equalTo !== undefined) {
					if (!(item.value === item.equalTo) || item.value === '') {
						itemX.isValid = false;
						formIsValid = false;
					}
				}
				if (item.greaterThan !== undefined) {
					const valueToCompare = this.state.controls.filter(o => o.name === item.greaterThan)[0].value;
					if (parseFloat(item.value.toString().replace(/\./g, '')) < parseFloat(valueToCompare.toString().replace(/\./g, ''))) {
						itemX.isValid = false;
						formIsValid = false;
					}
				}
				updatedControls.push(itemX);
				return null;
			});

			this.setState({
				controls: updatedControls,
				resetForm: false,
			});

			const formObject = {};
			updatedControls.map((item) => {
				if (item.control !== 'label') {
					formObject[item.name] = item.value;
				}
				return null;
			});

			if (formIsValid) {
				this.props.sendForm(formObject);
			} else {
				const firstRequired = updatedControls.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid))[0];

				if (typeof firstRequired.value === 'object') {
					const subFieldRequired = firstRequired.value.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid))[0];
					// flow-disable-next-line
					document.getElementById(subFieldRequired.name).focus();
				} else {
					// flow-disable-next-line
					document.getElementById(firstRequired.name).focus();
				}
			}
		}
	}

	// eslint-disable-next-line
	equalTo(val: string) {
		if (val !== undefined) {
			try {
				const updatedControls = [];
				const formObject = {};
				updatedControls.map((item) => {
					if (item.control !== 'label') {
						formObject[item.name] = item.value;
					}
					return null;
				});
				return formObject[val].state.value;
			} catch (e) {
				return null;
			}
		} else {
			return val;
		}
	}

	skipSend() {
		this.props.skipSend();
	}

	render() {
		const { className, style, viewport } = this.props;

		return (
			<div className={`form-container ${className !== null && className !== undefined ? className : ''}`} style={style}>
				{ this.state.controls.map((item) => {
					switch (item.control) {
					default:
						return null;
					case 'external':
						return (
							<div {...{ key: item.name }}>
								{item.component}
							</div>
						);
					case 'map':
						if (item.hide) return (null);
						return (
							<CustomMap {...{
								value: item.value,
								key: item.name,
								name: item.name,
								google: this.props.google,
								actions: item.actions,
								jwt: item.jwt,
								onUpdate: this.onUpdate.bind(this),
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								device: this.props.device,
								isRequired: item.isRequired,
								isValid: item.isValid,
								valueAsObject: item.valueAsObject,
								viewport,
								mapTexts: item.mapTexts,
							}} />
						);
					case 'text':
						if (item.hide) return (null);
						return (
							<CustomTextField {...{
								type: item.type,
								onlyNumber: item.onlyNumber,
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value ? item.value : '',
								onUpdate: this.onUpdate.bind(this),
								isRequired: item.isRequired,
								regEx: item.regEx,
								isValid: item.isValid,
								disabled: item.disabled,
								equalTo: this.equalTo.bind(this, item.equalTo),
								errorMessage: item.errorMessage,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								style: item.style,
								textAfter: item.textAfter,
								formIsValid: this.formIsValid.bind(this),
								noValidation: item.noValidation,
								updateOnChange: item.updateOnChange,
								greaterThan: item.greaterThan,
								limitChar: item.limitChar,
								currency: item.currency
							}} />
						);
					case 'plusMinus':
						if (item.hide) return (null);
						return (
							<CustomPlusMinus {...{
								type: item.type,
								onlyNumber: item.onlyNumber,
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: parseFloat(item.value),
								onUpdate: this.onUpdate.bind(this),
								isRequired: item.isRequired,
								regEx: item.regEx,
								isValid: item.isValid,
								disabled: item.disabled,
								equalTo: this.equalTo.bind(this, item.equalTo),
								errorMessage: item.errorMessage,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								style: item.style,
								textAfter: item.textAfter,
								formIsValid: this.formIsValid.bind(this),
								noValidation: item.noValidation,
							}} />
						);
					case 'textArea':
						if (item.hide) return (null);
						return (
							<CustomTextarea {...{
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value,
								onUpdate: this.onUpdate.bind(this),
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								style: item.style,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
							}} />
						);
					case 'select':
						if (item.hide) return (null);
						return (
							<CustomSelect {...{
								key: item.name,
								name: item.name,
								label: item.label,
								disabled: item.disabled,
								options: item.options,
								onUpdate: this.onUpdate.bind(this),
								value: item.value,
								style: item.style,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								default: item.default,
								greaterThan: item.greaterThan,
							}} />
						);
					case 'check':
						if (item.hide) return (null);
						return (
							<CustomCheckBox {...{
								key: item.name,
								name: item.name,
								label: item.label,
								value: item.value,
								style: item.style,
								textBefore: item.textBefore,
								textAfter: item.textAfter,
								hideCheck: item.hideCheck,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								onUpdate: this.onUpdate.bind(this),
							}} />
						);
					case 'radio':
						if (item.hide) return (null);
						return (
							<CustomRadio {...{
								key: item.name,
								name: item.name,
								label: item.label,
								options: item.options,
								onUpdate: this.onUpdate.bind(this),
								value: notEmpty(item.value) ? item.value : item.default,
								hideRadio: item.hideRadio,
								uncheck: item.uncheck,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								style: item.style,
								highlightSel: item.highlightSel,
							}} />
						);
					case 'label':
						if (item.hide) return (null);
						return (
							<CustomLabel {...{
								key: item.name,
								name: item.name,
								label: item.label,
								style: item.style,
								text: item.text,
								value: item.value,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
							}} />
						);
					case 'tabTextArea':
						if (item.hide) return (null);
						return (
							<CustomTextAreaTab {...{
								key: item.name,
								name: item.name,
								value: item.value,
								tabs: item.tabs,
								onUpdate: this.onUpdate.bind(this),
								style: item.style,
								device: this.props.device,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								isRequired: item.isRequired,
								isValid: item.isValid,
								errorMessage: item.errorMessage,
								valueAsObject: item.valueAsObject,
								limitChar: item.limitChar,
							}} />
						);
					case 'datepicker':
						if (item.hide) return (null);
						return (
							<DatePickerField {...{
								key: item.name,
								placeholder: item.placeholder,
								name: item.name,
								label: item.label,
								value: item.value,
								onUpdate: this.onUpdate.bind(this),
								style: item.style,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								updateOnChange: item.updateOnChange,
								errorMessage: item.errorMessage,
								greaterThan: item.greaterThan,
								isValid: item.isValid,
							}} />
						);
					case 'fakeselect':
						if (item.hide) return (null);
						return (
							<FakeSelect {...{
								key: item.name,
								name: item.name,
								label: item.label,
								value: item.value,
								text: item.text,
								onUpdate: this.onUpdate.bind(this),
								style: item.style,
								firstRange: item.firstRange,
								secondRange: item.secondRange,
								rangesStyle: item.rangesStyle,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
							}} />
						);
					}
				})}
				{ this.props.textBeforeButton ? this.props.textBeforeButton : null }
				{ this.props.sendButton ? (
					<div className="button-container" style={this.props.buttonContainerStyle}>
						{ this.props.skipButton ? (
							<div className="skip" style={this.props.skipStyle}>
								{/* eslint-disable-next-line */}
								<button {...{
									className: this.props.skipButton.className,
									style: this.props.skipButton.style,
									onClick: this.skipSend.bind(this),
									type: 'button'
								}}>
									{this.props.skipButton.value}
								</button>
							</div>
						)
							: null
						}
						{/* eslint-disable-next-line */}
						<button {...{
							className: `${this.props.sendButton.className} ${(this.props.sendButton.disabled ? 'btn-disabled' : '')}`,
							style: this.props.sendButton.style,
							onClick: !this.props.sendButton.disabled ? this.formIsValid.bind(this, this.props.sendButton.className) : undefined,
							type: 'button'
						}}>
							{this.props.sendButton.value}
						</button>
					</div>
				)
					: null }
				{ this.props.textAfterButton ? this.props.textAfterButton : null }
			</div>
		);
	}
};

Form.propTypes = {
	textBeforeButton: PropTypes.element,
	textAfterButton: PropTypes.element,
	bindChange: PropTypes.bool,
	controls: PropTypes.instanceOf(Object).isRequired,
	onChange: PropTypes.func,
	resetForm: PropTypes.bool,
	sendForm: PropTypes.func,
	sendButton: PropTypes.instanceOf(Object),
	skipButton: PropTypes.instanceOf(Object),
	skipSend: PropTypes.func,
	style: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
};

Form.defaultProps = {
	textBeforeButton: null,
	textAfterButton: null,
	bindChange: false,
	onChange: null,
	resetForm: false,
	sendButton: null,
	skipButton: null,
	skipSend: null,
	style: null,
	onUpdate: null,
	sendForm: null,
};

export default Form;
