Ext.define('MovieRentalUI.store.RentStore', {
    extend: 'Ext.data.Store',
    alias: 'store.rentstore',
    model: 'MovieRentalUI.model.Rents',

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7177/api/orders',
        api: {
            create: 'https://localhost:7177/api/orders/addOrder',
            read: 'https://localhost:7177/api/orders',
            update: 'https://localhost:7177/api/orders/updateOrder',
            destroy: 'https://localhost:7177/api/orders/deleteOrder'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        }
    }
     
});
 