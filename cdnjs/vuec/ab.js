
// use as   import {ab} from '/kc/ab/kjgkbrwqbhed/1'; 'ab':ab, 


import "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify-html.min.js"
import "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.0/beautify-css.min.js"
import 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.9/src-min-noconflict/ace.js';

// help="onhover"

const VALS = {
  help:'none', // onhover 
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
	foldStyle: { v: 'markbeginend' }, //'markbegin' 
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

// font , wrap, folding , mode 
var ab = Vue.component('ab', {
  /*
  
  if t == vue-html // validate .. to check if no script .. etc 
  
  || vue-data .. validate json format  
  
  */
  
 // <button @click="localStorage.setItem('editMode', 'chrome' );"> White Theme </button>
 // <button @click="changeTheme('')"> ss Dark Theme </button>
  	 
	template: `<div> 
	<span v-if="$props.help=='onhover'" @click="showHelp = ! showHelp"> ? </span> 
	<div v-if="showHelp && $props.help=='onhover'" >
	 Theme : 
	  <button @click="setOption('theme','chrome')"> Chrome </button>
	  <button @click="setOption('theme','solarized_light')"> Light </button>
	  <button @click="setOption('theme','solarized_dark')"> Dark </button>
	  
	  <button style="float:right; " @click="showHelp = ! showHelp"> close </button>
	  <div>
	    Keybindings : 
	    <button @click="setKey('keyboard',null)"> Default </button>
	    <button @click="setKey('keyboard','ace/keyboard/vscode')"> VsCode </button>
	    <button @click="setKey('keyboard','ace/keyboard/sublime')"> Sublime </button>
	    <button @click="setKey('keyboard','ace/keyboard/vim')"> Vim </button>
	    <button @click="setKey('keyboard','ace/keyboard/emacs')"> Emacs </button>

	  </div>
	  
	  Default Shortcuts: 
	  <table role="table">
    <thead>
    <tr>
    <th align="left">Windows/Linux</th>
    <th align="left">Mac</th>
    <th align="left">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td align="left">F6 , F11</td>
    <td align="left">F6 , Fn F6</td>
    <td align="left">Full screen </td>
    </tr>
    
    <tr>
    <td align="left">Alt-L, Ctrl-F1</td>
    <td align="left">Command-Option-L, Command-F1</td>
    <td align="left">Fold selection</td>
    </tr>
    <tr>
    <td align="left">Alt-Shift-L, Ctrl-Shift-F1</td>
    <td align="left">Command-Option-Shift-                                                                                                                                                                L, Command-Shift-F1</td>
    <td align="left">Unfold</td>
    </tr>
    <tr>
    <td align="left">Alt-0</td>
    <td align="left">Command-Option-0</td>
    <td align="left">Fold all</td>
    </tr>
    <tr>
    <td align="left">Alt-Shift-0</td>
    <td align="left">Command-Option-Shift-0</td>
    <td align="left">Unfold all</td>
    </tr> 
     
<tr>
<td align="left">Ctrl-F</td>
<td align="left">Command-F</td>
<td align="left">Find</td>
</tr>
<tr>
<td align="left">Ctrl-H</td>
<td align="left">Command-Option-F</td>
<td align="left">Replace</td>
</tr>
<tr>
<td align="left">Ctrl-K</td>
<td align="left">Command-G</td>
<td align="left">Find next</td>
</tr>
<tr>
<td align="left">Ctrl-Shift-K</td>
<td align="left">Command-Shift-G</td>
<td align="left">Find previous</td>
</tr> 
 
<tr>
<td align="left">Ctrl-D</td>
<td align="left">Command-D</td>
<td align="left">Remove line</td>
</tr>
<tr>
<td align="left">Alt-Shift-Down</td>
<td align="left">Command-Option-Down</td>
<td align="left">Copy lines down</td>
</tr>
<tr>
<td align="left">Alt-Shift-Up</td>
<td align="left">Command-Option-Up</td>
<td align="left">Copy lines up</td>
</tr>
<tr>
<td align="left">Alt-Down</td>
<td align="left">Option-Down</td>
<td align="left">Move lines down</td>
</tr>
<tr>
<td align="left">Alt-Up</td>
<td align="left">Option-Up</td>
<td align="left">Move lines up</td>
</tr>
<tr>
<td align="left">Alt-Delete</td>
<td align="left">Ctrl-K</td>
<td align="left">Remove to line end</td>
</tr>
<tr>
<td align="left">Alt-Backspace</td>
<td align="left">Command-Backspace</td>
<td align="left">Remove to linestart</td>
</tr>
<tr>
<td align="left">Ctrl-Backspace</td>
<td align="left">Option-Backspace, Ctrl-Option-Backspace</td>
<td align="left">Remove word left</td>
</tr>
<tr>
<td align="left">Ctrl-Delete</td>
<td align="left">Option-Delete</td>
<td align="left">Remove word right</td>
</tr>
<tr>
<td align="left">---</td>
<td align="left">Ctrl-O</td>
<td align="left">Split line</td>
</tr> 

<tr>
<td align="left">Ctrl-Alt-Up</td>
<td align="left">Ctrl-Option-Up</td>
<td align="left">Add multi-cursor above</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Down</td>
<td align="left">Ctrl-Option-Down</td>
<td align="left">Add multi-cursor below</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Right</td>
<td align="left">Ctrl-Option-Right</td>
<td align="left">Add next occurrence to multi-selection</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Left</td>
<td align="left">Ctrl-Option-Left</td>
<td align="left">Add previous occurrence to multi-selection</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Shift-Up</td>
<td align="left">Ctrl-Option-Shift-Up</td>
<td align="left">Move multicursor from current line to the line above</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Shift-Down</td>
<td align="left">Ctrl-Option-Shift-Down</td>
<td align="left">Move multicursor from current line to the line below</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Shift-Right</td>
<td align="left">Ctrl-Option-Shift-Right</td>
<td align="left">Remove current occurrence from multi-selection and move to next</td>
</tr>
<tr>
<td align="left">Ctrl-Alt-Shift-Left</td>
<td align="left">Ctrl-Option-Shift-Left</td>
<td align="left">Remove current occurrence from multi-selection and move to previous</td>
</tr>
<tr>
<td align="left">Ctrl-Shift-L</td>
<td align="left">Ctrl-Shift-L</td>
<td align="left">Select all from multi-selection</td>
</tr>
</tbody>

    </table>

	</div>
	<div ref="root"></div> </div>`,
	props: Object.keys(VALS),
	data() {
		return {
		  showHelp:false,
			editor: null,
			// NOTE:  "lastValue" is needed to prevent cursor from always going to
			// the end after typing
			lastValue: ''
		};
	},
	methods: {
		changeTheme() {
			this.editor && this.editor.setTheme("ace/theme/solarized_dark");
		// 	this.editor && this.editor.setTheme("ace/theme/solarized_light");
		// 	this.editor.setOption('theme', 'ace/theme/nord_theme');
		  localStorage.setItem('editMode', 'nord_theme' );
		},
		start(){
		  let editMode = localStorage.getItem('editMode'); 
		  if(editMode != undefined && editMode!=''){
		    this.setOption('editMode',editMode);
		  }
		  
		  let theme = localStorage.getItem('theme'); 
		  if(theme != undefined && theme!=''){
		    this.setOption('theme',theme);
		  }
		  
		  let keyboard = localStorage.getItem('keyboard'); 
		  if(keyboard != undefined && keyboard!=''){
		    // this.setOption('keyboard',keyboard);
		    this.editor.setKeyboardHandler('ace/keyboard/'+keyboard);
		  }

		},
		setOption(key, value) {
			let { f: func } = VALS[key];

			value = /^(theme|mode|keyboard)$/.test(key)
				? `ace/${key}/${value}`
				: func
					? func(value)
					: value;

			/*console.log(value);
			if(key == 'mode'){
				console.log(value);
			}*/

			this.editor.setOption(key, value);
			// this.editor.session.insert({row:number, column:number}, text);
  		// 	this.editor.session.insert(this.editor.getCursorPosition(), `text ... \n`);
		},
		addText(z) {
		    let doc = this.editor.session.getDocument();
		    // doc.$lines 
		    // doc.$lines[0]
		    // this.editor.getOption('mode') //  /ace/mode/html
	    let l=this.editor.getCursorPosition();
	    let first = 1;
	    let last = doc.$lines.length;
		  if(z && (z.loc == 'atStart'  ) ){
  		    l = {row: 1, column: 1};
		  }
		  else if(z && (z.loc == 'atEnd'  ) ){
		    if(doc.$lines[doc.$lines.length-1].indexOf('DO_NOT_EDIT_THIS_LINE') != -1 ){
			    l= {row: doc.$lines.length-1, column: 1};
		    }else{
			    l= {row: doc.$lines.length  , column: 1};
		    }
		  }
		  else{
			  l=this.editor.getCursorPosition();
		  }
			this.editor.session.insert(l, z.text);
		},
		setKey(key, value) {
		// 	let { f: func } = VALS[key];

		// 	value = /^(theme|mode)$/.test(key)
		// 		? `ace/${key}/${value}`
		// 		: func
		// 			? func(value)
		// 			: value;

			/*console.log(value);
			if(key == 'mode'){
				console.log(value);
			}*/
		// 	this.editor.setOption(key, value);
		
      this.editor.setKeyboardHandler(value);
      // ace.config.loadModule("ace/keybinding/vim", function() {
      //     // use Vim here
      // }); 
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
					this.editor.setValue(value || '');
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
					var fullScreen = dom.toggleCssClass(document.body, "fullScreen");
					dom.setCssClass(editor.container, "fullScreen", fullScreen);
					editor.setAutoScrollEditorIntoView(!fullScreen);
					editor.resize();
				}
			});
			// var dom = require("ace/lib/dom");
			this.editor && this.editor.commands.addCommand({
				name   : "Toggle Fullscreen",
				bindKey: "Cmd+0",
				exec   : function (editor)
				{
					var $ = document.getElementById.bind(document);
					var dom = ace.require("ace/lib/dom");

					// var dom = window.document;
					var fullScreen = dom.toggleCssClass(document.body, "fullScreen");
					dom.setCssClass(editor.container, "fullScreen", fullScreen);
					editor.setAutoScrollEditorIntoView(!fullScreen);
					editor.resize();
				}
			});
			// var dom = require("ace/lib/dom");
			this.editor && this.editor.commands.addCommand({
				name   : "Toggle Fullscreen",
				bindKey: "Command+B",
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
			});
			this.editor && this.editor.commands.addCommand({
				name   : "Toggle Fullscreen",
				bindKey: "F6",
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
			});
			var _this = this; 
			this.editor && this.editor.commands.addCommand({
				name   : "Beautify",
				bindKey: "F10",
				exec   : function (editor)
				{
					_this.beautify(_this.editor);
				}
			});
			
			this.start();
			
	  // ls 
		// 	this.editor && this.editor.setOption('theme', 'ace/theme/solarized_dark');

		}catch(r){
			console.error(r);
		}

	} 
	
});

window.ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict');
window.ace.config.set('modePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict');
window.ace.config.set('themePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.5/src-min-noconflict' );
 
export {ab};
