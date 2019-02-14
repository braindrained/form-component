// @flow
import React from 'react';

class CustomTextarea extends React.Component<any, any> {

	state = {
		value: this.props.value,
		error: false,
	};

	onChange(event: Object) {
		this.setState({ value: event.target.value });
		this.props.onUpdate(event);
	}

	onBlur() {
		this.validation();
	}

	validation() {
		if (this.props.isRequired) {
			const { value } = this.state;
			this.setState({ error: !value });
		}
	}

	render() {
		const { label, fieldClassName, style } = this.props;

		return (
			<div className={`field-container ${fieldClassName}`} style={style}>
				<div className={this.state.error ? 'has-error' : null}>
					<div className="field-label" style={label.style}>
						{label.text}
						{this.props.isRequired ? '*' : null}
					</div>
					<div>
						<textarea {...{
							placeholder: label.text,
							className: 'large-field',
							name: this.props.name,
							id: this.props.name,
							onChange: this.onChange.bind(this),
							onBlur: this.onBlur.bind(this),
							value: this.props.value
						}} />
					</div>
				</div>
				{ this.props.isRequired && this.state.error ? <span className="validation-error">{this.props.errorMessage}</span> : null }
			</div>
		);
	}
}

export default CustomTextarea;
