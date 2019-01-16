/**
 * 行间距功能
 * Created by AhnSohee on 2018-12-7.
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import LineHeightEditing from './line-height-editing';
import LineHeightUI from './line-height-ui';

export default class LineHeight extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires () {
		return [LineHeightEditing, LineHeightUI];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName () {
		return 'LineHeight';
	}
}
