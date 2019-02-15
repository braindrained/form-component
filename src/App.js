import React, { Component } from 'react';
import ClickOutHandler from 'react-onclickout';

import './App.css';
import './App.scss';
import Form from './CustomControls/Form';
import { makeId } from './helpers/utils';
import { tipologies, priceRanges } from  './helpers/var';

class App extends Component {

	state = {
		editDataSpin: false,
		editSucceed: null,
		fieldWidth: 250,
		sendButton: {
			text: 'Save',
			success: 'Saved!',
			error: 'Errore nel salvataggio dei dati'
		},
		randomKey: makeId(),
		filter: {
			priceRange: { min: '', max: '' }
		}
	};

	sendForm(formObject: Object) {
		console.log(formObject);
		this.setState({
			editDataSpin: true
		});

		setTimeout(() => {
			this.setState({
				editDataSpin: false,
				editSucceed: true,
				saveButtonSuccessText: 'Dati salvati correttamente'
			});
		}, 3000);
	}

	resetButton() {
		if (this.state.editSucceed !== null) {
			this.setState({
				editSucceed: null,
			});
		}
	}

  render() {
		const { editDataSpin, editSucceed, fieldWidth, randomKey, sendButton, filter } = this.state;

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
										control: 'text',
										type: 'text',
										name: 'firstName',
										onlyNumber: false,
										placeholder: 'First name',
										label: { text: 'First name' },
										value: '',
										style: {
											float: 'left',
											width: fieldWidth,
										},
										limitChar: 25,
										isRequired: true,
										errorMessage: 'Campo obbligatorio'
									},
									{
										control: 'text',
										type: 'text',
										name: 'lastName',
										onlyNumber: false,
										placeholder: 'Last name',
										label: { text: 'Last name' },
										value: '',
										style: {
											float: 'left',
											width: fieldWidth
										},
										limitChar: 25,
										isRequired: true,
										errorMessage: 'Campo obbligatorio'
									},
									{
										control: 'fakeselect',
										name: 'priceRange',
										text: 'Seleziona...',
										label: {
											text: 'Prezzo min/max'
										},
										style: { width: 250, maxWidth: 250 },
										rangesStyle: { width: 250, maxWidth: 250 },
										value: filter.priceRange,
										firstRange: priceRanges,
										secondRange: priceRanges
									},
									{
										control: 'text',
										type: 'text',
										name: 'age',
										onlyNumber: true,
										placeholder: 'Age',
										label: { text: 'Age' },
										value: '',
										style: {
											float: 'left',
											width: fieldWidth
										},
										limitChar: 3
									},
									{
										control: 'plusMinus',
										type: 'text',
										name: 'roomNum',
										onlyNumber: true,
										label: {
											text: 'N. Locali',
										},
										value: 0,
										isRequired: false,
										style: {
											float: 'left',
											width: fieldWidth
										},
									},
									{
										control: 'select',
										name: 'propertyTypeId',
										label: { text: 'Tipo immobile' },
										hideRadio: true,
										options: tipologies.filter(o => o.type.indexOf(parseFloat(1)) !== -1),
										value: '',
										optionIf: [],
										style: {
											float: 'left',
											width: fieldWidth
										},
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
										fieldClassName: 'custom-radio-container',
										style: {
											width: fieldWidth
										},
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
										style: {
											minHeight: 'auto',
											width: fieldWidth
										},
									},
									{
										control: 'check',
										name: 'isACheckBox',
										label: { text: 'Questa è una checkbox' },
										value:	false,
										hideCheck: true,
										style: { },
									},
								],
								sendButton: {
									className: `${editSucceed !== null ? (editSucceed ? 'btn btn-succeed' : 'btn btn-error') : 'btn btn-red'} ${editDataSpin ? 'spinner' : ''}`,
									value: editSucceed !== null ? (editSucceed ? sendButton.success : sendButton.error) : sendButton.text,
									style: { minWidth: 250, margin: '0 auto', float: 'none' }
								},
								buttonContainerStyle: { textAlign: 'center' },
								sendForm: (e) => { this.sendForm(e); },
								key: randomKey,
								style: {
									width: 560
								},
							}} />
						</div>
					</ClickOutHandler>
      </div>
    );
  }
}

export default App;
