Ext.define('MovieRentalUI.view.OrdersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ordersGrid',
    id: 'ordersGrid',
    controller: 'ordersgridcontroller',
    //Set the viewmodel
    viewModel: {
        type: 'ordersvm'
    },
    //Bind the customers to the grid
    bind: {
        store: '{orders}'
    },
    selModel: {
      selType: 'checkboxmodel',
      mode: 'MULTI'
    },
    columns: [
        { text: 'Order ID', dataIndex: 'orderId' },
        { text: 'Movie Title', dataIndex: 'movieTitle' },
        { text: 'Customer Name', dataIndex: 'customerName' },
        { text: 'Order Date', dataIndex: 'orderDate' },
        { text: 'Order Quantity', dataIndex: 'orderQuantity' },
        
      ],
      

    forceFit: true,
    width: 900,
    height: 900,
   
});
