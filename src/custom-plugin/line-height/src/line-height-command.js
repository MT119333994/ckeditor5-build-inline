/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module heading/headingcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

/**
 * The heading command. It is used by the {@link module:heading/heading~Heading heading feature} to apply headings.
 *
 * @extends module:core/command~Command
 */
export default class LineHeightCommand extends Command {
	/**
	 * Creates an instance of the command.
	 *
	 * @param {module:core/editor/editor~Editor} editor Editor instance.
	 * @param {Array.<String>} modelElements Names of the element which this command can apply in the model.
	 */
	constructor (editor, modelElements) {
		super(editor);

		/**
		 * If the selection starts in a heading (which {@link #modelElements is supported by this command})
		 * the value is set to the name of that heading model element.
		 * It is  set to `false` otherwise.
		 *
		 * @observable
		 * @readonly
		 * @member {Boolean|String} #value
		 */

		/**
		 * Set of defined model's elements names that this command support.
		 * See {@link module:heading/heading~HeadingOption}.
		 *
		 * @readonly
		 * @member {Array.<String>}
		 */
		this.modelElements = modelElements;
	}

	/**
	 * @inheritDoc
	 */
	refresh () {
		const block = first(this.editor.model.document.selection.getSelectedBlocks());

		let flag = block.name !== 'image';

		this.value = (!!block && block.hasAttribute('lineHeight')) ? block.getAttribute('lineHeight') : '4mm';
		this.isEnabled = !!block && (this.editor.model.schema.checkAttribute(block, 'lineHeight') || flag);
	}

	/**
	 * Executes the command. Applies the heading to the selected blocks or, if the first selected
	 * block is a heading already, turns selected headings (of this level only) to paragraphs.
	 *
	 * @param {Object} options
	 * @param {String} options.value Name of the element which this command will apply in the model.
	 * @fires execute
	 */
	execute (options) {
		const model = this.editor.model;
		const document = model.document;

		const modelElement = options.value;

		model.change(writer => {
			const blocks = Array.from(document.selection.getSelectedBlocks())
				.filter(block => {
					return checkCanBecomeLindHeight(block, modelElement, model.schema);
				});

			for (const block of blocks) {
				writer.setAttribute('lineHeight', modelElement, block);
			}
		});
	}
}

// Checks whether the given block can be replaced by a specific heading.
//
// @private
// @param {module:engine/model/element~Element} block A block to be tested.
// @param {module:heading/headingcommand~HeadingCommand#modelElement} heading Command element name in the model.
// @param {module:engine/model/schema~Schema} schema The schema of the document.
// @returns {Boolean}
function checkCanBecomeLindHeight (block, lineHeight, schema) {
	return schema.checkChild(block.parent, lineHeight) && !schema.isObject(block);
}
