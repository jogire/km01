// import "https://cdn.jsdelivr.net/npm/ag-grid-vue@30.0.6/dist/ag-grid-community.min.js";
//  import "./ag-grid-community.min.js";
import * as agGrid from "https://cdn.jsdelivr.net/npm/ag-grid-community@30.0.6/dist/ag-grid-community.auto.esm.min.js"; //"https://cdn.jsdelivr.net/npm/ag-grid-community@30.0.6/dist/ag-grid-community.cjs.min.js";
// import 'https://cdn.jsdelivr.net/npm/ag-grid-community@30.0.6/styles/ag-grid.min.css';

var grid = {
  //create vue component
  name: "grid",
  components: {
    // 'ag-grid-vue': agGridVue.AgGridVue, // Access AgGridVue from the global scope
  },
  props: {
    // ownconfig: Object,
  },
  template: `
    <div class="ag-theme-alpine" style="height: 300px;">
      <div ref="myGrid"></div>  
    </div>
    `,
  data() {
    return {
      gridRef: {},
      gridOptions: {
        columnDefs: [
          { headerName: "Make", field: "make", sortable: true, filter: true },
          { headerName: "Model", field: "model", sortable: true, filter: true },
          { headerName: "Price", field: "price", sortable: true, filter: true },
        ],
        rowData: [
          { make: "Toyota", model: "Celica", price: 35000 },
          { make: "Mercedez", model: "GLA200", price: 37000 },
          { make: "Audi", model: "A4", price: 31000 },
          { make: "Toyota", model: "Celica", price: 35000 },
          { make: "Ford", model: "Mondeo", price: 32000 },
          { make: "Porsche", model: "Boxster", price: 72000 },
        ],
      },
    };
  },
  mounted() {
    console.log("loaaded");
    this.message = "c";

    // get div to host the grid
    const eGridDiv = this.$refs.myGrid; // document.getElementById("myGrid");
    // new grid instance, passing in the hosting DIV and Grid Options
    this.gridRef = new agGrid.Grid(eGridDiv, this.gridOptions);
  },
  methods: {
    method1: async function () {
      this.message = "b";
    },
  },
};
export default grid;
