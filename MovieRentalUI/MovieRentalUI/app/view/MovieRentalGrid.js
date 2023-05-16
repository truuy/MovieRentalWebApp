Ext.define('MovieRentalUI.view.MovieRentalGrid', {
    extend: 'Ext.container.Container',
    xtype: 'moviesRental',
    id: 'moviesRental',
    controller: 'movierentalcontroller', // Add the controller
    // Set the viewmodel
    viewModel: {
        type: 'moviesvm'
    },
    
    layout: 'container', // Use container layout
    items: [
        {
            xtype: 'panel',
            title: 'Customers',
            margin: '0 0 50 0',
            
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
                        { text: 'Rent Orders', dataIndex: 'rentOrders' },
                    ],
                    forceFit: true,
                    selModel: {
                        selType: 'rowmodel', // Use rowmodel for radio button selection
                        checkOnly: true // Only allow checking rows, not unchecking
                    },
                }
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
                        { text: 'Rating', dataIndex: 'rating' },
                        { text: 'Rental Price', dataIndex: 'rentalPrice' },
                        { text: 'Available Copies', dataIndex: 'availableCopies' },
                    ],
                    forceFit: true,
                    selModel: {
                        selType: 'checkboxmodel', // Enable multiple item selection
                        mode: 'MULTI'
                    },
                }
            ]
        }
    ],
    width: 900,
    height: 500,
    margin: '50 0 0 0',
    
});
