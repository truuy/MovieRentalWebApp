Ext.define('MovieRentalUI.store.CustomersStore', {
    extend: 'Ext.data.Store',
    alias: 'store.customersstore',
    model: 'MovieRentalUI.model.Customers',
    // call api
    proxy: {
        type: 'ajax',
        url: 'https://localhost:7177/api/Customers',
        api: {
            create: 'https://localhost:7177/api/Customers/addCustomer',
            read: 'https://localhost:7177/api/Customers',
            update: 'https://localhost:7177/api/Customers/updateCustomer',
            delete: 'https://localhost:7177/api/Customers/deleteCustomer'
          },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        }
    },



    listeners: {
        write: function(store, operation, eOpts) {
            if (operation.success) {
                Ext.Msg.alert('Success', 'Customer added successfully');
            } else {
                Ext.Msg.alert('Error', 'Failed to add customer');
                console.log(operation.getError());
            }
        }
    }
});