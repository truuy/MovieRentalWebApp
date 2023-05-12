Ext.define('MovieRentalUI.controller.CustomerGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customergridcontroller',

    onItemClick: function(grid, record) {
        var customerId = record.get('customerId');

        var customerWindow = Ext.create('Ext.window.Window', {
            title: 'Edit Customer',
            width: 500,
            height: 500,
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            width: 700,
                            value: record.get('firstName')
                        },
                        {
                            xtype: 'textfield',
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            width: 700,
                            value: record.get('lastName')
                        },
                        {
                            xtype: 'textfield',
                            name: 'email',
                            fieldLabel: 'Email',
                            width: 700,
                            value: record.get('email')
                        },
                        {
                            xtype: 'textfield',
                            name: 'phone',
                            fieldLabel: 'Phone',
                            width: 700,
                            value: record.get('phone')
                        },
                        
                        
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Update',
                    handler: function() {
                        var form = customerWindow.down('form');
                        if (form.isValid()) {
                            var values = form.getValues();
                            var record = grid.getSelectionModel().getSelection()[0];
                            // Exclude automatically generated ExtJS id
                            delete record.data.id;
                            record.set(values);
                            var customersStore = Ext.getCmp('customerGrid').getStore();
                            // Api Config
                            var apiConfig = customersStore.getProxy().api.update;
                            var url = apiConfig + '/' + record.get('customerId');
                            if (customersStore) {
                                Ext.Ajax.request({
                                    url: url,
                                    method: apiConfig.method || 'PUT',
                                    jsonData: record.getData(),
                                    success: function(response) {
                                        console.log(response.responseText);
                                        try {
                                            customersStore.sync();
                                            Ext.Msg.alert('Success', 'Customer updated successfully');
                                            customerWindow.close();
                                        } catch (error) {
                                            Ext.Msg.alert('Error', error);
                                        }
                                    },
                                    failure: function(response) {
                                        Ext.Msg.alert('Error', 'Failed to update customer');
                                        console.log(response);
                                        customerWindow.close();
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    text: 'Delete',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelection()[0];
                        var customerId = record.get('customerId');
                        var customersStore = Ext.getCmp('customerGrid').getStore();
                        // Api Config
                        var apiConfig = customersStore.getProxy().api.delete;
                        var url = apiConfig + '?id=' + customerId;
                        if (customersStore) {
                            Ext.Ajax.request({
                                url: url,
                                method: apiConfig.method || 'DELETE',
                                success: function(response) {
                                    console.log(response.responseText);
                                    try {
                                        customersStore.remove(record);
                                        customersStore.sync();
                                        Ext.Msg.alert('Success', 'Customer deleted successfully');
                                    } catch (error) {
                                        Ext.Msg.alert('Error', error);
                                    }
                                },
                                failure: function(response) {
                                    Ext.Msg.alert('Error', 'Failed to delete customer');
                                    console.log(response);
                                }
                            });
                        }
                        customerWindow.close();
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
});
