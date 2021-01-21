import { divide } from 'lodash';
import Head from 'next/head';
import MaterialTable from 'material-table';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export const DataTable = ({ data }) => {
  const columns = [
    { title: 'Table Date', field: 'Table Date' },
    { title: 'Order ID', field: 'Order ID' },
    // { title: 'Title', field: 'Title' },
    { title: 'Category', field: 'Category' },
    // { title: 'ASIN/ISBN', field: 'ASIN/ISBN' },
    { title: 'Seller', field: 'Seller' },
    { title: 'List Price Per Unit', field: 'List Price Per Unit' },
    { title: 'Purchase Price Per Unit', field: 'Purchase Price Per Unit' },
    { title: 'Quantity', field: 'Quantity' },
    { title: 'Payment Instrument Type', field: 'Payment Instrument Type' },
    { title: 'Ordering Customer Email', field: 'Ordering Customer Email' },
    { title: 'Shipment Date', field: 'Shipment Date' },
    { title: 'Shipping Address Name', field: 'Shipping Address Name' },
    { title: 'Shipping Address Street 1', field: 'Shipping Address Street 1' },
    { title: 'Item Subtotal', field: 'Item Subtotal' },
    { title: 'Item Subtotal Tax', field: 'Item Subtotal Tax' },
    { title: 'Item Total', field: 'Item Total' },
    { title: 'Buyer Name', field: 'Buyer Name' },
  ];
  return (
    <>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </head>

      <MaterialTable
        title='Amazon Order Purchases'
        data={data}
        columns={columns}
        options={{ filtering: true, exportButton: true }}
        detailPanel={(rowData) => {
          return (
            <p
              style={{ fontSize: '20px', padding: '30px', paddingLeft: '65px' }}
            >
              Item : {rowData['Title']}
            </p>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </>
  );
};
