import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

import {createDropdown, addListToDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import '../theme/line-height.css';

export default class LineHeightUI extends Plugin {
	init () {
		const editor = this.editor;
		const t = editor.t;
		const options = editor.config.get('lineHeight.options');
		const defaultTitle = t('请选择行间距');
		const dropdownTooltip = t('行间距');

		// Register UI component.
		editor.ui.componentFactory.add('lineHeight', locale => {
			const titles = {};
			const itemDefinitions = new Collection();

			const lineHeightCommand = editor.commands.get('lineHeight');
			const paragraphCommand = editor.commands.get('paragraph');

			const commands = [lineHeightCommand];

			for (const option of options) {
				const def = {
					type: 'button',
					model: new Model({
						label: option.title,
						class: option.class,
						withText: true
					})
				};

				def.model.bind('isOn').to(lineHeightCommand, 'value', value => value === option.model);
				def.model.set({
					commandName: 'lineHeight',
					commandValue: option.model
				});

				// Add the option to the collection.
				itemDefinitions.add(def);

				titles[option.model] = option.title;
			}

			const dropdownView = createDropdown(locale);
			addListToDropdown(dropdownView, itemDefinitions);

			dropdownView.buttonView.set({
				isOn: false,
				withText: true,
				tooltip: dropdownTooltip
			});

			dropdownView.extendTemplate({
				attributes: {
					class: [
						'ck-lineHeight-dropdown'
					]
				}
			});

			dropdownView.bind('isEnabled').toMany(commands, 'isEnabled', (...areEnabled) => {
				return areEnabled.some(isEnabled => isEnabled);
			});

			dropdownView.buttonView.bind('label').to(lineHeightCommand, 'value', paragraphCommand, 'value', (value, para) => {
				const whichModel = value || para && '4mm';
				// If none of the commands is active, display default title.
				return titles[whichModel] ? titles[whichModel] : defaultTitle;
			});

			// Execute command when an item from the dropdown is selected.
			this.listenTo(dropdownView, 'execute', evt => {
				editor.execute(evt.source.commandName, evt.source.commandValue ? {value: evt.source.commandValue} : undefined);
				editor.editing.view.focus();
			});

			return dropdownView;
		});
	}
}
