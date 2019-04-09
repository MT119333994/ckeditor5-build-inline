/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module heading/headingediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LineHeightCommand from './line-height-command';

const defaultModelElement = '4mm';

/**
 * The headings engine feature. It handles switching between block formats &ndash; headings and paragraph.
 * This class represents the engine part of the heading feature. See also {@link module:heading/heading~Heading}.
 * It introduces `heading1`-`headingN` commands which allow to convert paragraphs into headings.
 *
 * @extends module:core/plugin~Plugin
 */
export default class LineHeightEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor (editor) {
		super(editor);

		editor.config.define('lineHeight', {
			options: [
				{model: '4mm', view: 'p', title: '4mm', class: 'ck-line-height-4'},
				{model: '5mm', view: 'p', title: '5mm', class: 'ck-line-height-5'},
				{model: '6mm', view: 'p', title: '6mm', class: 'ck-line-height-6'},
				{model: '7mm', view: 'p', title: '7mm', class: 'ck-line-height-7'},
				{model: '8mm', view: 'p', title: '8mm', class: 'ck-line-height-8'},
				{model: '9mm', view: 'p', title: '9mm', class: 'ck-line-height-9'},
				{model: '10mm', view: 'p', title: '10mm', class: 'ck-line-height-10'},
				{model: '11mm', view: 'p', title: '11mm', class: 'ck-line-height-11'},
				{model: '12mm', view: 'p', title: '12mm', class: 'ck-line-height-12'},
				{model: '13mm', view: 'p', title: '13mm', class: 'ck-line-height-13'},
				{model: '14mm', view: 'p', title: '14mm', class: 'ck-line-height-14'},
				{model: '15mm', view: 'p', title: '15mm', class: 'ck-line-height-15'}
			]
		});
	}

	/**
	 * @inheritDoc
	 */
	init () {
		const editor = this.editor;
		const schema = editor.model.schema;
		const options = editor.config.get('lineHeight.options');

		// Allow alignment attribute on all blocks.
		schema.extend('$block', {allowAttributes: 'lineHeight'});

		const modelElements = [];

		for (const option of options) {
			// Skip paragraph - it is defined in required Paragraph feature.
			// Schema.
			editor.model.schema.register(option.model, {
				inheritAllFrom: '$block'
			});

			editor.conversion.elementToElement(option);

			modelElements.push(option.model);
		}

		const definition = _buildDefinition(options);

		editor.conversion.attributeToAttribute(definition);

		// Register the heading command for this option.
		editor.commands.add('lineHeight', new LineHeightCommand(editor, modelElements));
	}
}

function _buildDefinition (options) {
	const definition = {
		model: {
			key: 'lineHeight',
			values: options.map(e => {
				return e.model
			})
		},
		view: {}
	};

	for (const option of options) {
		definition.view[option.title] = {
			key: 'style',
			value: {
				'line-height': option.model
			}
		};
	}

	return definition;
}
