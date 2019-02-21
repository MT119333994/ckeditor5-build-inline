import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class SpecialConverters extends Plugin {
	init () {
		const schema = this.editor.model.schema
		const conversion = this.editor.conversion

		this._handleDivsOptionA(schema, conversion)
	}

	// Option A: Handle div with a specific attributes.
	//
	// This specific div:								<div class="my-special-section" data-poc="false">
	// Will be converted to a model element called:		<specialSection>
	//
	// It's a good option when the number of different types of HTML markup is limited and
	// you can assign special meanings to those structures. Then, converting them to a more
	// semantical model elements gives you a great control over how they behave and what markup
	// is produced by the editor.getData() method.
	_handleDivsOptionA (schema, conversion) {
		// Define special-section block in the schema.
		schema.register('specialSection', {
			allowWhere: '$block',
			allowContentOf: ['$root', '$block']
		})

		// Add two-way (view-to-model and model-to-view) converter for special-section.
		conversion.elementToElement({
			model: 'specialSection',
			view: {
				name: 'div',
				classes: 'my-special-section',
				// If the "data-poc" flag is not needed the whole `attributes` block can be dropped.
				// After removing it the model-to-view converter will render <div class="my-special-section"></div>
				attributes: {
					'data-poc': 'false'
				}
			}
		})
	}
}
