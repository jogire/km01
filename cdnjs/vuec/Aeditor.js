
// import 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict/ace.js';
import 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.9/src-min-noconflict/ace.js';
// import 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict/ext-language_tools.js';
// import 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict/ext-emmet.js';

import "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify-html.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify-css.min.js"

// import '../local/ace.js';s
//console.log('s');

/* START: <ace-editor> Vue component */
//   (function () {


const VALS = {
	value: {},
	theme: { v: 'chrome' },
	autoScrollEditorIntoView: { f: toBool },
	tabSize: { f: toNum, v: 2 },
	readOnly: { f: toBool },
	minLines: { f: toNum },
	maxLines: { f: toNum },
	highlightActiveLine: { f: toBool },
	highlightSelectedWord: { f: toBool },
	cursorStyle: {},
	hScrollBarAlwaysVisible: { f: toBool },
	vScrollBarAlwaysVisible: { f: toBool },
	highlightGutterLine: { f: toBool },
	animatedScroll: { f: toBool },
	showInvisibles: { f: toBool },
	showPrintMargin: { f: toBool },
	printMarginColumn: { f: toNum },
	fadeFoldWidgets: { f: toBool },
	showFoldWidgets: { f: toBool, v: true },
	showLineNumbers: { f: toBool, v: true },
	showGutter: { f: toBool, v: true },
	displayIndentGuides: { f: toBool },
	fontSize: {},
	fontFamily: {},
	scrollPastEnd: {},
	fixedWidthGutter: { f: toBool },
	firstLineNumber: { f: toNum, v: 1 },
	overwrite: { f: toBool },
	newLineMode: {},
	useSoftTabs: { f: toBool, v: true },
	mode: { v: 'javascript' },
	foldStyle: { v: 'markbegin' },
	fullScreen: true
};

const EDITOR_EVENTS = ['blur', 'change', 'changeSelectionStyle', 'changeSession', 'copy', 'focus', 'paste'];

function toBool(value, opt_ignoreNum) {
	var result = value;
	if (result != null) {
		(value + '').replace(
			/^(?:|0|false|no|off|(1|true|yes|on))$/,
			(m, isTrue) => result = (/01/.test(m) && opt_ignoreNum) ? result : !!isTrue
		);
	}
	return result;
}

function toNum(value) {
	return (value == null || Number.isNaN(+value)) ? value : +value;
}

function toBoolOrNum(value) {
	var result = toBool(value, true);
	return 'boolean' === typeof result ? result : toNum(value);
}
// debugger;
var aceEditor = Vue.component('aceEditor', {
	template: '<div ref="root"></div>',
	props: Object.keys(VALS),
	data() {
		return {
			editor: null,
			// NOTE:  "lastValue" is needed to prevent cursor from always going to
			// the end after typing
			lastValue: ''
		};
	},
	methods: {
		setOption(key, value) {
			let { f: func } = VALS[key];

			value = /^(theme|mode)$/.test(key)
				? `ace/${key}/${value}`
				: func
					? func(value)
					: value;

			/*console.log(value);
			if(key == 'mode'){
				console.log(value);
			}*/

			this.editor.setOption(key, value);
		},
		beautify(editor) {
			let value =this.editor.getOption('value');
			let mode =this.editor.getOption('mode');
			// this.normaltext = js_beautify(this.normaltext);
			// console.log(this.editor.getOption('value'));
			// console.log(this.editor.mode);
			if(mode == 'ace/mode/html'){
				let newValue = html_beautify(value);
				this.editor.setOption('value',newValue)
			}
			else if(mode=='ace/mode/javascript'){
				let newValue = js_beautify(value);
				this.editor.setOption('value',newValue)
			}
			else if(mode=='ace/mode/json'){
				let newValue = js_beautify(value);
				this.editor.setOption('value',newValue)
			}
			else if(mode=='ace/mode/css'){
				let newValue = css_beautify(value);
				this.editor.setOption('value',newValue)
			}
			// console.log(js_beautify);
			// this.normaltext = js_beautify(this.normaltext);
		}
	},
	watch: (function () {
		let watch = {
			value(value) {
				if (this.lastValue !== value) {
					this.editor.setValue(value);
				}
			}
		};

		return Object.entries(VALS).reduce(
			(watch, [propName, prop]) => {
				if (propName !== 'value') {
					watch[propName] = function(newValue) {
						this.setOption(propName, newValue);
						// console.log(propName+", " + newValue);
						// this.editor.setOption(propName, newValue);
					};
				}
				return watch;
			},
			watch
		);
	})(),
	mounted() {
		// debugger;
		this.editor = window.ace.edit(this.$refs.root, { value: this.value });

		Object.entries(VALS).forEach(
			([propName, prop]) => {
				let value = this.$props[propName];
				this.setOption(propName, value === undefined ? prop.v : value);
			}
		);

		this.editor.on('change', (e) => {
			this.$emit('input', this.lastValue = this.editor.getValue());
		});

		EDITOR_EVENTS.forEach(eName => this.editor.on(eName, e => this.$emit(eName, e)));

		// https://github.com/ajaxorg/ace/blob/master/demo/scrollable-page.html
		try{
			// var dom = require("ace/lib/dom");
			this.editor && this.editor.commands.addCommand({
				name   : "Toggle Fullscreen",
				bindKey: "F11",
				exec   : function (editor)
				{
					var $ = document.getElementById.bind(document);
					var dom = ace.require("ace/lib/dom");

					// var dom = window.document;
					var fullScreen = dom.toggleCssClass(document.body, "fullScreen")
					dom.setCssClass(editor.container, "fullScreen", fullScreen)
					editor.setAutoScrollEditorIntoView(!fullScreen)
					editor.resize()
				}
			})
			var _this = this;

			this.editor && this.editor.commands.addCommand({
				name   : "Beautify",
				bindKey: "F10",
				exec   : function (editor)
				{
					_this.beautify(_this.editor);
				}
			})

		}catch(r){
			console.error(r);
		}

	}
});


window.ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict');
window.ace.config.set('modePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict');
window.ace.config.set('themePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict' );
 

export {aceEditor};

