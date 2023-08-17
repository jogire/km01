/*
<script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs/loader.js"></script> 
<link href="https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/dev/vs/editor/editor.main.min.css" rel="stylesheet">
*/
// import * as monaco from "https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs/loader.js";
var editor = {
  name: "me",
  components: {},
  props: {},
  template: `
    <div>
      <div ref="editorContainer" style="height:400px;border:1px solid black;"></div>  
    {{co}}
      </div>
    `,
  data() {
    return {
      gridRef: {},
      co:'//h',
    };
  },
  mounted() {
    console.log("loaaded");
    require.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs",
      },
    });
    require(["vs/editor/editor.main"], () => {
      monaco.editor.create(this.$refs.editorContainer, {
        value: this.co,
        language: "javascript",
        theme: "vs-dark",
      });
    });

    // this.editor = monaco.editor.create(this.$refs.editorContainer, {
    //   value: ["function x() {", '\tconsole.log("Hello world!");', "}"],
    //   language: "javascript",
    // });
    // let editor = monaco.editor.create(document.getElementById('container'), {
    //   value: [
    //     'function x() {',
    //     '\tconsole.log("Hello world!");',
    //     '}'
    //   ].join('\n'),
    //   language: 'javascript',
    //   theme: 'vs-dark'
    // });
  },
  methods: {
    method1: async function () {
      this.message = "b";
    },
  },
};
export default editor;

// var editor = {
//   //create vue component
//   name: "editor",

//   props: {
//     // ownconfig: Object,
//   },
//   template: `
//             <div class="container-fluid mt-2">
//                 LOCAL MESSAGE = {{message}}
//                 <br/>
//                 CONFIG =
//                 {{ownconfig}}
//             </div>
//             `,
//   data: function () {
//     return {
//       message: "a",
//     };
//   },
//   mounted() {
//     try {
//       // Load Monaco Editor's main script dynamically
//     //   const monaco = import(
//     //     "./monaco-editor/esm/vs/editor/editor.api"
//     //   );
//       // Initialize the editor
//       this.editor = monaco.editor.create(this.$refs.editorContainer, {
//         value: this.code,
//         language: this.language || "javascript",
//       });
//     } catch (error) {
//       console.error("Failed to initialize Monaco Editor:", error);
//     }

//     this.message = "c";
//   },
//   methods: {
//     method1: async function () {
//       this.message = "b";
//     },
//   },
// };
// export default editor;
