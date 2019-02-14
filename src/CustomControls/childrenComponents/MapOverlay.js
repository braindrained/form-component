// @flow
import React from 'react';

import Form from '../Form';

const MapOverlay = (props: Object) => {
	const { options, resetForm, hideConfirm, closeOverlay, confirmPosition } = props;

	return (
		<div>
			<Form {...{
				key: resetForm,
				controls: [
					{
						control: 'radio',
						name: 'confirmSelection',
						default: 1,
						options,
						hideRadio: false,
						style: {
							minHeight: 'auto',
							width: '100%',
						},
						value: 1,
					},
				],
				buttonContainerStyle: { float: 'none', display: 'inline-block', position: 'relative', width: 420, textAlign: 'center', marginTop: 10 },
				sendButton: {
					className: 'btn btn-red',
					value: 'Conferma',
					style: { display: hideConfirm ? 'none' : 'inline-block', margin: '0 auto', fontSize: 15 }
				},
				skipSend: () => { closeOverlay(); },
				sendForm: (o) => { confirmPosition(o); },
				style: { marginTop: 0 },
				textAfterButton:
	<div>
		<div {...{
			style: { width: 70, margin: '0 auto', textAlign: 'center', cursor: 'pointer', marginTop: 17, fontSize: 15 },
			onClick: () => { closeOverlay(); }
		}}>
			Annulla
		</div>
	</div>
			}} />
		</div>
	);
};


export default MapOverlay;
