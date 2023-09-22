import { ColDef, GridOptions } from 'ag-grid-community';

export const gridOptions: GridOptions = { domLayout: 'autoHeight' };

export const gameColumns: ColDef[] = [
  {
    field: 'title',
    sortable: true,
    initialSort: 'asc',
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 504,
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
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'format',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'progress',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'added_on',
    headerName: 'Added on',
    sortable: true,
    cellRenderer: (params: { value: number }) => {
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
    sortable: true,
    initialSort: 'asc',
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 504,
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
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'format',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'progress',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'added_on',
    headerName: 'Added on',
    sortable: true,
    cellRenderer: (params: { value: number }) => {
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
    sortable: true,
    initialSort: 'asc',
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 504,
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
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'format',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'progress',
    sortable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    width: 180,
  },
  {
    field: 'added_on',
    headerName: 'Added on',
    sortable: true,
    cellRenderer: (params: { value: number }) => {
      return new Date(params.value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
];
