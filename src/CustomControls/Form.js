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
		sendButton: null,
		style: null,
		sendForm: null,
	};

	state = {
		controls: this.props.controls
	};

	onUpdate(e: Object, hasError: boolean) {
		const updatedControls = this.state.controls.map((item) => {
			if (e.target.name === item.name) {
				item.isValid = !hasError;
				item.value = e.target.value;
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
			}
			return item;
		});

		this.setState({
			controls: updatedControls
		});

		if (this.props.updateFather) {
			this.props.updateFather(updatedControls);
		}
	}

	formIsValid(val: string) {
		if (val !== 'btn btn-succeed' && val !== 'btn btn-error' && val !== 'btn btn-succeed btn-succeed-big') {
			let formIsValid = true;

			const updatedControls = this.state.controls.map((item) => {
				if (item.isRequired && !item.hide) {
					if (item.control !== 'select' && (item.value === '' || !item.value)) {
						item.isValid = false;
						formIsValid = false;
					} else if (item.control === 'select' && item.value === '0' && item.value === 0) {
						item.isValid = false;
						formIsValid = false;
					}
				}

				if (typeof item.value === 'object' && item.valueAsObject) {
					if (item.value && item.value.filter(o => o.isRequired === true).length > 0) {
						const updatedValues = item.value.map((itemS) => {
							if (itemS.isRequired) {
								if (itemS.value === '' || !itemS.value) {
									itemS.isValid = false;
									item.isValid = false;
									formIsValid = false;
								}
							}
							return null;
						});
						item.value = updatedValues;
					}
				}
				if (item.regEx !== undefined && !item.hide) {
					if (item.value !== '' &&	!item.regEx.test(item.value)) {
						item.isValid = false;
						formIsValid = false;
					}
				}
				if (item.equalTo !== undefined) {
					const valueToCompare = this.state.controls.filter(o => o.name === item.equalTo)[0].value;
					if (!(item.value === valueToCompare) || item.value === '') {
						item.isValid = false;
						formIsValid = false;
					}
				}
				if (item.greaterThan !== undefined) {
					const valueToCompare = this.state.controls.filter(o => o.name === item.greaterThan)[0].value;
					if (parseFloat(item.value.toString().replace(/\./g, '')) < parseFloat(valueToCompare.toString().replace(/\./g, ''))) {
						item.isValid = false;
						formIsValid = false;
					}
				}
				return item;
			});

			this.setState({
				controls: updatedControls
			});

			if (formIsValid) {
				const formObject = {};
				updatedControls.map((item) => {
					if (item.control !== 'label') {
						formObject[item.name] = item.value;
					}
					return null;
				});

				this.props.sendForm(formObject);
			} else {
				const firstRequired = updatedControls.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid) || (o.equalTo && !o.isValid))[0];

				if (typeof firstRequired.value === 'object') {
					const subFieldRequired = firstRequired.value.filter(o => (o.isRequired && !o.isValid) || (o.greaterThan && !o.isValid) || (o.regEx && !o.isValid) || (o.equalTo && !o.isValid))[0];
					document.getElementById(subFieldRequired.name).focus();
				} else {
					document.getElementById(firstRequired.name).focus();
				}
			}
		}
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
								isRequired: item.isRequired,
								regEx: item.regEx,
								isValid: item.isValid,
								disabled: item.disabled,
								errorMessage: item.errorMessage,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								style: item.style,
								textAfter: item.textAfter,
								noValidation: item.noValidation,
								updateOnChange: item.updateOnChange,
								greaterThan: item.greaterThan,
								limitChar: item.limitChar,
								currency: item.currency,
								equalTo: item.equalTo
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
								onUpdate: (e) => { this.onUpdate(e) },
								isRequired: item.isRequired,
								regEx: item.regEx,
								isValid: item.isValid,
								disabled: item.disabled,
								errorMessage: item.errorMessage,
								fieldClassName: item.fieldClassName ? item.fieldClassName : '',
								style: item.style,
								textAfter: item.textAfter,
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
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
								onUpdate: (e) => { this.onUpdate(e) },
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
						<button {...{
							className: `${this.props.sendButton.className} ${(this.props.sendButton.disabled ? 'btn-disabled' : '')}`,
							style: this.props.sendButton.style,
							onClick: !this.props.sendButton.disabled ? () => { this.formIsValid(this.props.sendButton.className) } : undefined,
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
	controls: PropTypes.instanceOf(Object).isRequired,
	sendForm: PropTypes.func,
	sendButton: PropTypes.instanceOf(Object),
	style: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
};

Form.defaultProps = {
	textBeforeButton: null,
	textAfterButton: null,
	sendButton: null,
	style: null,
	onUpdate: null,
	sendForm: null,
};

export default Form;
