Ext.define('MovieRentalUI.view.CustomerGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'customerGrid',
    id: 'customerGrid',
    //Set the viewmodel
    viewModel: {
        type: 'customersvm'
    },
    //Bind the customers to the grid
    bind: {
        store: '{customers}'
    },

    columns: [
        { text: 'Customer ID', dataIndex: 'customerId' },
        { text: 'First Name', dataIndex: 'firstName' },
        { text: 'Last Name', dataIndex: 'lastName' },
        { text: 'Email', dataIndex: 'email' },
        { text: 'Phone', dataIndex: 'phone' },
        { text: 'Address', dataIndex: 'address' },
        {
            text: 'RentOrders',
            dataIndex: 'rentOrders',
            renderer: function (value) {
                // Customize the rendering of rentOrders data
                if (value) {
                    var rentOrders = Ext.Array.map(value, function (order) {
                        return  order.orderQuantity;
                    });
                    return rentOrders.join('<br>');
                }
                return '';
            }
        },
    ],
    forceFit: true,
    width: 900,
    height: 500,
    controller: 'customergridcontroller', // Add the controller
    listeners: {
        itemclick: 'onItemClick'
    },
    
    tbar: [
        {
            text: 'Add Customer',
            handler: function() {
                
                var customerForm = Ext.create('Ext.form.Panel', {
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'customerId',
                            fieldLabel: 'CustomerID',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'email',
                            fieldLabel: 'Email',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'phone',
                            fieldLabel: 'Phone',
                            width: 300

                        },
                        {
                            xtype: 'textfield',
                            name: 'address',
                            fieldLabel: 'Address',
                            width: 300
                        }
                    ]
                });
            
                var customerWindow = Ext.create('Ext.window.Window', {
                    title: 'Add Customer',
                    width: 500,
                    height: 500,
                    layout: 'fit',
                    items: [customerForm],
                    buttons: [
                        {
                            text: 'Add',
                            handler: function() {
                                // Perform add operation

                                //Get values from the form
                                var values = customerForm.getValues();
                                //Get the store used by the grid
                                var store = Ext.getCmp('customerGrid').getStore();
                                

                               // Create a new record with the form values
                                var newCustomer = Ext.create('MovieRentalUI.model.Customers');
                                newCustomer.set(values);

                                // Save the new customer to the server
                                newCustomer.save({
                                    url: store.getProxy().api.create,
                                    success: function(record, operation) {
                                        Ext.Msg.alert('Success', 'Customer added successfully');
                                        // Add the new customer to the store
                                        store.add(record);
                                    },
                                    failure: function(record, operation) {
                                        Ext.Msg.alert('Error', 'Failed to add customer');
                                    },
                                    callback: function(record, operation, success) {
                                        if (!success) {
                                            console.log(operation.getError());
                                        }
                                    }
                                });

                                // Close the window
                                customerForm.up('window').close();
                            }
                            
                        },
                        {
                            text: 'Cancel',
                            handler: function() {
                                customerWindow.close();
                            }
                        }
                    ]
                });
            
                customerWindow.show();
            }
        }
    ]
});
