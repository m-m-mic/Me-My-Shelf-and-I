import { ColDef, GridOptions } from 'ag-grid-community';

export const gridOptions: GridOptions = {
  domLayout: 'autoHeight',
  defaultColDef: {
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
};

export const gameColumns: ColDef[] = [
  {
    field: 'title',
    initialSort: 'asc',
    width: 524,
    cellRenderer: (params: { data: { id: string }; value: string }) => {
      return (
        '<a class="ag-link" href="/games/' +
        params.data.id +
        '">' +
        params.value +
        '</a>'
      );
    },
  },
  {
    field: 'platform',
  },
  {
    field: 'format',
  },
  {
    field: 'progress',
  },
  {
    field: 'added_on',
    headerName: 'Added on',
    filter: null,
    floatingFilter: false,
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
];

export const movieColumns: ColDef[] = [
  {
    field: 'title',
    initialSort: 'asc',
    width: 524,
    cellRenderer: (params: { data: { id: string }; value: string }) => {
      return (
        '<a class="ag-link" href="/movies/' +
        params.data.id +
        '">' +
        params.value +
        '</a>'
      );
    },
  },
  {
    field: 'director',
  },
  {
    field: 'format',
  },
  {
    field: 'progress',
  },
  {
    field: 'added_on',
    headerName: 'Added on',
    filter: null,
    floatingFilter: false,
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
];

export const albumColumns: ColDef[] = [
  {
    field: 'title',
    initialSort: 'asc',
    width: 524,
    cellRenderer: (params: { data: { id: string }; value: string }) => {
      return (
        '<a class="ag-link" href="/albums/' +
        params.data.id +
        '">' +
        params.value +
        '</a>'
      );
    },
  },
  {
    field: 'artist',
  },
  {
    field: 'format',
  },
  {
    field: 'progress',
  },
  {
    field: 'added_on',
    headerName: 'Added on',
    filter: null,
    floatingFilter: false,
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
];
