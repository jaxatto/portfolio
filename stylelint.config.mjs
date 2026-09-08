/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard'],

	referenceFiles: ['src/styles/variables.css'],

	rules: {
		'comment-empty-line-before': null,
		'custom-property-no-missing-var-function': true,
		'no-unknown-custom-properties': true,
		'font-family-no-missing-generic-family-keyword': [
			true,
			{
				ignoreFontFamilies: ['Material Symbols Rounded'],
			},
		],
	},
};
