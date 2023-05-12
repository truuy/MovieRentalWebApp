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
        // You can define any data properties that you want to use in your view here
    }
});
var customerStore = Ext.create('MovieRentalUI.store.CustomersStore');

// Button click handler
function onCustomerBtnClick() {
    customerStore.load({
        callback: function(records, operation, success) {
            if (success) {
                // Do something with the loaded data
                console.log('Customers Button Clicked');
                console.log(records);
                
            } else {
                // Handle the error
            }
        }
    });
}

