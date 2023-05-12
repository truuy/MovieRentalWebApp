
Ext.define('MovieRentalUI.model.Customers', {
    extend: 'Ext.data.Model',
    alias: 'customersmodel',
    store: 'MovieRentalUI.store.CustomersStore',
    idProperty: null,
    fields: [
        { name: 'customerId', type: 'string', convert: function(value, record) {
            // Generate a new GUID if one isn't already set
            if (!value) {
                value = Ext.data.identifier.Uuid.create().generate();
            }
            return value;
        }},
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'id', type: 'int', persist: false },
        { name: 'rentOrders', type: 'auto' }
        // ...
    ]
});