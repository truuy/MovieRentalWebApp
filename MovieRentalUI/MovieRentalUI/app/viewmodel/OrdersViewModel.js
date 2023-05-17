Ext.define('MovieRentalUI.viewmodel.OrdersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ordersvm',
    stores: {
        orders: {
            type: 'rentstore',
            autoLoad: true,
            
        }
    },
    data: {

        title: 'Orders'
        
    }
});

