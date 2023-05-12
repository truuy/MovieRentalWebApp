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
                    // Load movies data when clicked
                    onMoviesBtnClick();
                
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
                                            var grid = Ext.getCmp('moviesRental');
                                            var selectedMovies = grid.getSelection();
                                            console.log('Selected movies:', selectedMovies);
                                            // Perform further processing with the selected movies
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

                //Load customers data when clicked
                onCustomerBtnClick();
                
                //Create an instance of a window
                var win = Ext.create('Ext.window.Window', {
                    title: 'Customers',
                    layout: 'fit',
                    modal: true,
                    //Add minimize and maximize button.
                    tools: [
                        {
                            type: 'minimize',
                            tooltip: 'Minimize',
                            
                            handler: function(window, tool, event) {
                                if (window && window.minimize) {
                                    window.minimize();
                                } else {
                                    console.error('Failed to minimize window:', window);
                                }
                            }
                        },
                        {
                            type: 'maximize',
                            tooltip: 'Maximize',
                            handler: function(window, tool, event) {
                                if (window && window.maximize) {
                                    window.maximize();
                                } else {
                                    console.error('Failed to maximize window:', window);
                                }
                            }
                        }
                    ],
                    items: [
                        {
                            //add a search bar at the top, filter the results
                            xtype: 'toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Search',
                                    labelWidth: 50,
                                    width: 200,
                                    listeners: {
                                        change: function(field, newValue, oldValue, eOpts) {
                                            var store = field.up('window').down('customerGrid').getStore();
                                            store.clearFilter();
                                            if (newValue) {
                                                var filters = [
                                                    {
                                                        property: 'firstName',
                                                        value: newValue,
                                                        anyMatch: true,
                                                        caseSensitive: false
                                                    },
                                                    {
                                                        property: 'lastName',
                                                        value: newValue,
                                                        anyMatch: true,
                                                        caseSensitive: false
                                                    },
                                                    {
                                                        property: 'customerId',
                                                        value: newValue,
                                                        anyMatch: true,
                                                        caseSensitive: false
                                                    }
                                                ];
                                                store.filter(filters);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
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

                //load movies data when clicked
                onMoviesBtnClick();
                
                
                //Create an instance of a window
                var win = Ext.create('Ext.window.Window', {
                    title: 'Movies',
                    layout: 'fit',
                    modal: true,
            
                    items: [
                        {
                            //add a search bar at the top, filter the results
                            xtype: 'toolbar',
                            docked: 'top',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Search',
                                    labelWidth: 50,
                                    width: 200,
                                    listeners: {
                                        change: function(field, newValue, oldValue, eOpts) {
                                            var store = field.up('window').down('moviesGrid').getStore();
                                            store.clearFilter();
                                            if (newValue) {
                                                var filters = [
                                                    {
                                                        property: 'title',
                                                        value: newValue,
                                                        anyMatch: true,
                                                        caseSensitive: false
                                                    },
                                                    {
                                                        property: 'genre',
                                                        value: newValue,
                                                        anyMatch: true,
                                                        caseSensitive: false
                                                    },
                                                    {
                                                        property: 'releaseYear',
                                                        value: newValue,
                                                        anyMatch: true,
                                                        caseSensitive: false
                                                    }
                                                ];
                                                store.filter(filters);
                                            }
                                        }
                                    }
                                }
                            ]
                        },
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
                console.log('Orders button clicked');
            }
        }]
    },]
});
