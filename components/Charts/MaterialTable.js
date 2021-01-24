import MaterialTable from 'material-table';

export const DataTable = ({ data }) => {
  const columns = [
    { title: 'Table Date', field: 'Table Date' },
    {
      title: 'Title',
      field: 'Title',
      cellStyle: { width: '50%' },
    },
    { title: 'Category', field: 'Category', cellStyle: { width: '15%' } },
    { title: 'List Price', field: 'List Price Per Unit' },
    { title: 'Purchase Price', field: 'Purchase Price Per Unit' },
    {
      title: 'Quantity',
      field: 'Quantity',
      cellStyle: (rowData) => ({ maxWidth: '1rem' }),
    },
    { title: 'Shipment Date', field: 'Shipment Date' },
    { title: 'Item Total', field: 'Item Total' },
    // { title: 'Order ID', field: 'Order ID' },
    // { title: 'ASIN/ISBN', field: 'ASIN/ISBN' },
    // { title: 'Seller', field: 'Seller' },
    // { title: 'Payment Instrument Type', field: 'Payment Instrument Type' },
    // { title: 'Ordering Customer Email', field: 'Ordering Customer Email' },
    // { title: 'Shipping Address Name', field: 'Shipping Address Name' },
    // { title: 'Shipping Address Street 1', field: 'Shipping Address Street 1' },
    // { title: 'Item Subtotal', field: 'Item Subtotal' },
    // { title: 'Item Subtotal Tax', field: 'Item Subtotal Tax' },
    // { title: 'Buyer Name', field: 'Buyer Name' },
  ];
  return (
    <>
      <MaterialTable
        title='Amazon Order Purchases'
        data={data}
        columns={columns}
        options={{
          filtering: true,
          exportButton: true,
          headerStyle: {
            backgroundColor: '#31c4f3',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            position: 'sticky',
            top: 0,
          },
          pageSizeOptions: [5, 10, 20, 50, 100],
          maxBodyHeight: '90vh',
          pageSize: 20,
        }}
        detailPanel={(rowData) => {
          return (
            <div
              style={{
                fontSize: '1.6rem',
                padding: '3rem',
                paddingLeft: '6.5rem',
                display: 'flex',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>ASIN : {rowData['ASIN/ISBN']} </span>
                <span>Seller : {rowData['Seller']} </span>
                <span>
                  Payment Type : {rowData['Payment Instrument Type']}{' '}
                </span>
                <span>E-Mail : {rowData['Ordering Customer Email']} </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingLeft: '3rem',
                }}
              >
                <span>Name : {rowData['Shipping Address Name']} </span>
                <span>Street : {rowData['Shipping Address Street 1']} </span>
                <span>City : {rowData['Shipping Address City']} </span>
                <span>State : {rowData['Shipping Address State']} </span>
              </div>
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </>
  );
};
