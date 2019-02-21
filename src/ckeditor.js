/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

// The editor creator to use.
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter'
// import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Font from '@ckeditor/ckeditor5-font/src/font'
import LineHeight from './custom-plugin/line-height/src/line-height'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

// import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
// import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list'
// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import StructureNumber from './custom-plugin/structure-number/src/structure-number'
import SpecialConverters from './custom/conversion/special-converters'

export default class InlineEditor extends InlineEditorBase {}

// Plugins to include in the build.
InlineEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	// Autoformat,
	Font,
	LineHeight,
	Bold,
	Italic,
	Underline,
	Alignment,
	// BlockQuote,
	// CKFinder,
	// EasyImage,
	// Heading,
	Image,
	// ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	// Link,
	List,
	// MediaEmbed,
	// Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	StructureNumber,
	SpecialConverters
]

// Editor configuration.
InlineEditor.defaultConfig = {
	toolbar: {
		items: [
			// 'heading',
			'fontSize',
			'lineHeight',
			'bold',
			'italic',
			'underline',
			'alignment',
			// 'link',
			'bulletedList',
			'numberedList',
			'imageUpload',
			// 'blockQuote',
			'insertTable',
			// 'mediaEmbed',
			'undo',
			'redo',
			'insertImage'
		]
	},
	fontSize: {
		options: [
			10,
			12,
			'default',
			16,
			18,
			20,
			22,
			24
		]
	},
	image: {
		toolbar: [
			'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'
		],
		styles: [
			// This option is equal to a situation where no style is applied.
			'full',

			// This represents an image aligned to the left.
			'alignLeft',

			// This represents an image aligned to the right.
			'alignRight'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'zh-cn'
}
