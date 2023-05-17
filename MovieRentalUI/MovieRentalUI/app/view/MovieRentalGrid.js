Ext.define('MovieRentalUI.view.MovieRentalGrid', {
    extend: 'Ext.container.Container',
    xtype: 'moviesRental',
    id: 'moviesRental',
    controller: 'movierentalcontroller', // Add the controller
    // Set the viewmodel
    viewModel: {
        type: 'movierentalvm'
    },
    
    layout: 'container', // Use container layout
    items: [
        {
            xtype: 'panel',
            title: 'Customers',
            margin: '0 0 50 0',
            flex: 1,
            scrollable: 'vertical', // Make the panel scrollable vertically
            items: [
                {
                    xtype: 'grid',
                    // Bind the customers to the grid
                    bind: {
                        store: '{customers}'
                    },
                    reference: 'customersGrid', //Add Reference
                    columns: [
                        { text: 'Customer ID', dataIndex: 'customerId' },
                        { text: 'First Name', dataIndex: 'firstName' },
                        { text: 'Last Name', dataIndex: 'lastName' },
                        { text: 'Email', dataIndex: 'email' },
                        { text: 'Phone', dataIndex: 'phone' },
                        { text: 'Address', dataIndex: 'address' },
                        
                    ],
                    forceFit: true,
                    selModel: {
                        selType: 'rowmodel', // Use rowmodel for radio button selection
                        checkOnly: true // Only allow checking rows, not unchecking
                    },
                    tbar: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Search',
                            labelWidth: 50,
                            width: 200,
                            listeners: {
                                change: 'onCustomerInputChange' // Add the change listener
                            }
                        },
                    ]
                },
                
            ]
        },
        {
            xtype: 'panel',
            title: 'Movies',
            flex: 1,
            scrollable: 'vertical', // Make the panel scrollable vertically
            items: [
                {
                    xtype: 'grid',
                    // Bind the movies to the grid
                    bind: {
                        store: '{movies}'
                    },
                    reference: 'moviesGrid', //Add Reference
                    columns: [
                        { text: 'Title', dataIndex: 'title' },
                        { text: 'Release Year', dataIndex: 'releaseYear' },
                        { text: 'Genre', dataIndex: 'genre' },
                        { text: 'Available Copies', dataIndex: 'availableCopies' },
                    ],
                    forceFit: true,
                    selModel: {
                        selType: 'checkboxmodel', // Enable multiple item selection
                        mode: 'MULTI'
                    },
                    tbar: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Search',
                            labelWidth: 50,
                            width: 200,
                            listeners: {
                                change: 'onMoviesInputChange' // Add the change listener
                            }
                        },
                    ]
                }
            ]
        }
    ],
    width: 900,
    height: 900,
    margin: '0 0 0 0',
    
});
