import React, { Component } from 'react';
import ClickOutHandler from 'react-onclickout';

import './App.css';
import './App.scss';
import Form from './CustomControls/Form';
import { makeId } from './helpers/utils';
import { tipologies, priceRanges } from  './helpers/var';

class App extends Component {

	state = {
		editDataSpin: null,
		editSucceed: null,
		randomKey: makeId(),
	};

	sendForm(formObject: Object) {
		this.setState({
			editDataSpin: true
		});

		// put your fetch here
		setTimeout(() => {
			this.setState({
				editDataSpin: false,
				editSucceed: true
			});
		}, 2000);
	}

	resetButton() {
		if (this.state.editSucceed !== null) {
			this.setState({
				editDataSpin: null,
				editSucceed: null,
			});
		}
	}

  render() {
		const { editDataSpin, editSucceed, randomKey } = this.state;

    return (
      <div className="App">
        <header className="App-header">
					This is a Form component
        </header>
					<ClickOutHandler onClickOut={() => { this.resetButton(); }}>
						<div className="App-body" onClick={() => { this.resetButton(); }}>
							<Form {...{
								controls: [
									{
										control: 'label',
										name: 'label-1',
										text: 'This is a generic label',
										style: { lineHeight: '40px', clear: 'both', width: '100%', fontSize: 16, fontWeight: 700, marginBottom: 20 }
									},
									{
										control: 'text',
										type: 'text',
										name: 'firstName',
										onlyNumber: false,
										limitChar: 25,
										isRequired: true,
										errorMessage: 'Campo obbligatorio'
									},
									{
										control: 'text',
										type: 'text',
										name: 'lastName',
										onlyNumber: false,
										limitChar: 25,
										isRequired: true,
										errorMessage: 'Campo obbligatorio'
									},
									{
										control: 'fakeselect',
										name: 'priceRange',
										text: 'Seleziona...',
										label: {
											text: 'Fake select min/max'
										},
										style: { maxHeight: 76 },
										rangesStyle: { width: 200, maxWidth: 200 },
										value: { min: '', max: '' },
										firstRange: priceRanges,
										secondRange: priceRanges
									},
									{
										control: 'text',
										type: 'text',
										name: 'age',
										onlyNumber: true,
										limitChar: 3
									},
									{
										control: 'plusMinus',
										type: 'text',
										name: 'roomNum',
										label: {
											text: 'N. Locali',
										},
										value: 0,
										isRequired: false,
									},
									{
										control: 'select',
										name: 'propertyTypeId',
										hideRadio: true,
										options: tipologies.filter(o => o.type.indexOf(parseFloat(1)) !== -1),
										value: '',
										optionIf: [],
									},
									{
										control: 'radio',
										name: 'hasTerrace',
										label: { text: 'This is a fake radio' },
										options: [
											{ value: '', label: 'N.i.', className: 'first' },
											{ value: 'true', label: 'Sì', className: 'central' },
											{ value: 'false', label: 'No', className: 'last' },
										],
										default: '',
										value: '',
										hideRadio: true,
										className: 'custom-radio-container',
									},
									{
										control: 'radio',
										name: 'genericRadio',
										label: { text: 'This is an almost real radio', style: { } },
										options: [
											{ value: '', label: 'N.i.', style: { width: '100%', float: 'left' } },
											{ value: 'true', label: 'Sì', style: { width: '100%', float: 'left' } },
											{ value: 'false', label: 'No', style: { width: '100%', float: 'left' } },
										],
										default: '',
										value: '',
										hideRadio: false,
									},
									{
										control: 'text',
										type: 'text',
										name: 'anotherText',
										onlyNumber: false,
										placeholder: 'Another text input',
										label: { text: 'Another text input' },
										value: '',
										limitChar: 25,
									},
									{
										control: 'check',
										name: 'isACheckBox',
										label: { text: 'This is an almost real checkbox' },
										value:	false,
										hideCheck: true,
									},
									{
										control: 'text',
										type: 'password',
										name: 'password',
										onlyNumber: false,
										limitChar: 12,
										isRequired: true,
										errorMessage: 'Campo obbligatorio',
										isValid: true
									},
									{
										control: 'text',
										type: 'password',
										name: 'repeatPassword',
										onlyNumber: false,
										limitChar: 12,
										errorMessage: 'La password non coincide',
										isValid: true,
										equalTo: 'password'
									},
									{
										control: 'label',
										name: 'label-2',
										text: 'This is a generic label that separate things',
										style: { lineHeight: '40px', clear: 'both', width: '100%', fontSize: 16, fontWeight: 700, marginBottom: 20 }
									},
									{
										control: 'textArea',
										name: 'thisIsATextArea',
										value: ''
									},
									{
										control: 'text',
										type: 'text',
										name: 'aMinimalTextField',
									},
									{
										control: 'text',
										type: 'text',
										name: 'correncyField',
										currency: true,
										onlyNumber: true,
									}
								],
								textBeforeButton: <div style={{ clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }}>This is a text before button</div>,
								sendButton: {
									text: 'Save',
									errorText: 'Error saving data',
									succeedText: 'Saved!',
									style: { minWidth: 250, margin: '0 auto', float: 'none' }
								},
								textAfterButton: <div style={{ clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }}>This is a text after button</div>,
								buttonContainerStyle: { textAlign: 'center' },
								sendForm: (e) => { this.sendForm(e); },
								key: randomKey,
								succeed: editSucceed,
								isSent: editDataSpin,
								style: {
									maxWidth: 560
								},
							}} />
						</div>
					</ClickOutHandler>
      </div>
    );
  }
}

export default App;
