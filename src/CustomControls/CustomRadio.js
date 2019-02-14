// @flow
import React from 'react';
import PropTypes from 'prop-types';

// flow-disable-next-line
import './CustomRadio.scss';

class CustomRadio extends React.Component<any, any> {

	static defaultProps = {
		fieldClassName: null,
		textBefore: null,
		hideRadio: null,
		css: null,
		label: null,
		uncheck: false,
		value: null,
	};

	state = {
		value: this.props.value !== null ? this.props.value : '',
	};

	onChange(event: Object) {
		this.setState({
			value: event.target.value
		});
		this.props.onUpdate(event);
	}

	handleClick(event: Object) {
		if (this.props.uncheck) {
			// eslint-disable-next-line
			if (this.state.value == event.target.value) {
				this.props.options.map((item) => {
					// flow-disable-next-line
					document.getElementById(this.props.name + item.value).checked = false;
					return null;
				});
				this.setState({
					value: null
				});
				this.props.onUpdate({
					target: {
						name: this.props.name,
						value: null
					}
				});
			}
		}
	}

	render() {
		const { fieldClassName, style, label, name, hideRadio, textBefore, options, css } = this.props;

		return (
			<div className={(hideRadio ? 'field-container toggle-format ' : 'field-container ') + fieldClassName} style={style}>
				{ textBefore ? (
					<div style={textBefore.style}>
						{textBefore.text}
					</div>
				) : null }
				<div className={css}>
					{ label ? (
						<div className={hideRadio ? 'field-label noselect' : ''} style={label.style}>
							{label.text}
						</div>
					) : null }
					<div className="float-container">
						{ options.map(item => <div {...{
							key: `select_${item.name}_${item.value}`,
							className:
								hideRadio &&
								item.value === this.state.value
									? `floating ${(item.value === options[0].value ? 'selected-radio' : 'selected-radio-red')} type type-selected ${item.className} text-type` : (hideRadio ? `floating type ${item.className} text-type` : item.className),
							style: item.style
						}}>
							<input {...{
								type: 'radio',
								name,
								id: name + item.value,
								value: item.value,
								disabled: item.disabled === true,
								checked: item.value === this.state.value,
								onClick: this.handleClick.bind(this),
								onChange: this.onChange.bind(this)
							}} />
							<label htmlFor={name + item.value} style={item.labelStyle ? item.labelStyle : {}}>
								{ hideRadio ? <span className="hide-radio" /> : <div style={item.disabled === true ? { opacity: 0.5 } : {}} />}
								<div dangerouslySetInnerHTML={{ __html: item.label }} />
								{ item.customObject ?
									<div className={item.value === this.state.value ? 'custom-radio-options-wrapper custom-radio-options-wrapper-sel' : 'custom-radio-options-wrapper'}>{item.customObject}</div>
									:
									null
								}
							</label>
						</div>)
						}
					</div>
				</div>
			</div>
		);
	}
}

CustomRadio.propTypes = {
	fieldClassName: PropTypes.string,
	onUpdate: PropTypes.func.isRequired,
	textBefore: PropTypes.instanceOf(Object),
	hideRadio: PropTypes.bool,
	css: PropTypes.instanceOf(Object),
	label: PropTypes.instanceOf(Object),
	options: PropTypes.instanceOf(Object).isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
	name: PropTypes.string.isRequired,
	uncheck: PropTypes.bool,
};

CustomRadio.defaultProps = {
	fieldClassName: null,
	textBefore: null,
	hideRadio: null,
	css: null,
	label: null,
	uncheck: false,
	value: null,
};

export default CustomRadio;
