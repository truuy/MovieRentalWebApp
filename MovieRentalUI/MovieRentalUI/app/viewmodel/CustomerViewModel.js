Ext.define('MovieRentalUI.viewmodel.CustomersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customersvm',
    stores: {
        customers: {
            type: 'customersstore',
            autoLoad: true,
            
        }
    },
    data: {

        title: 'Customers'
        
    }
});


