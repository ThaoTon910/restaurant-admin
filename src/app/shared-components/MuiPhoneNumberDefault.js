import MuiPhoneNumber from 'material-ui-phone-number';

export default function MuiPhoneNumberDefault(props) {
	return (
		<MuiPhoneNumber
			onlyCountries={['us']}
			disableAreaCodes
			countryCodeEditable={false}
			defaultCountry="us"
			{...props}
		/>
	);
}
