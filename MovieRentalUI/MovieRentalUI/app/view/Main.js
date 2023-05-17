Ext.define('MovieRentalUI.view.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainview',
    title: 'Movie Rental App',
    requires: [
        'MovieRentalUI.view.CustomerGrid',
        'MovieRentalUI.model.Customers',
        'MovieRentalUI.store.CustomersStore',
        
    ],

    viewModel: {
        type: 'customersvm' // Specify the view model class
    },

    items: [{
        xtype: 'toolbar',
        docked: 'left',
        vertical: true,
        items: [
            {
                text: 'Movie Rental',
                
                handler: function() {
                    
                
                    // Create an instance of a window
                    var win = Ext.create('Ext.window.Window', {
                        title: 'Rent a Movie',
                        layout: 'fit',
                        modal: true,
                        autoScroll: true,
                        width: 900,
                        height: 900,
                        items: [
                            {
                                xtype: 'form', 
                                
                                items: [

                                    // Call the MoviesRentalWindow grid
                                    {
                                        xtype: 'moviesRental',
                                        selModel: {
                                            type: 'checkboxmodel',
                                            mode: 'MULTI' // Allow multiple selections
                                        }
                                    },
                                    
                                ],
                                buttons: [
                                    {
                                        text: 'Submit',
                                        handler: function() {
                                            var controller = this.up('window').down('moviesRental').getController();
                                            controller.onSubmitClick();
                                        }
                                    }
                                ]
                            },
                            
                        ]
                    });
                    win.show();
                }
                
                
            },{
            text: 'Customers',
            id: 'loadButton',
            handler: function() {

               
                
                //Create an instance of a window
                var win = Ext.create('Ext.window.Window', {
                    title: 'Customers',
                    layout: 'fit',
                    modal: true,
                    items: [
                                   
                        {
                            xtype: 'customerGrid',
                            
                        }
                    ]
                });
                win.show();
            }
        }, {
            text: 'Movies',
            id: 'moviesButton',
            viewModel: {
                type: 'moviesvm'
            },
            handler: function() {

                
                
                
                //Create an instance of a window
                var win = Ext.create('Ext.window.Window', {
                    title: 'Movies',
                    layout: 'fit',
                    modal: true,
            
                    items: [

                        {
                            xtype: 'moviesGrid'
                        }
                    ]
                });
                win.show();
            },
            
        },  {
            text: 'Orders',
            handler: function() {        
                // Create an instance of a window
                var win = Ext.create('Ext.window.Window', {
                    title: 'Orders',
                    layout: 'fit',
                    modal: true,
                    autoScroll: true,
                    width: 900,
                    height: 900,
                    items: [
                        {
                            xtype: 'form', 
                            
                            items: [

                                // Call the MoviesRentalWindow grid
                                {
                                    xtype: 'ordersGrid',
                                    reference: 'ordersGrid',
                                    controller: 'ordersgridcontroller'
                                },
                                
                            ],
                            buttons: [
                                {
                                    text: 'Submit',
                                    handler: function() {
                                        var controller = this.up('window').down('ordersGrid').getController();
                                            controller.onSubmitClick();
                                    }
                                }
                            ]
                            
                        },
                        
                    ]
                });
                win.show();
            }
        }
    ]
    },]
});
