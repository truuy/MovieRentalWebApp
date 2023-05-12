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
            xtype: 'grid',
            title: 'Customers',
            margin: '0 0 50 0',
            flex: 1,
            // Bind the customers to the grid
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
                { text: 'Rent Orders', dataIndex: 'rentOrders' },
            ],
            forceFit: true,
            selModel: {
                selType: 'checkboxmodel', // Enable multiple item selection
                mode: 'MULTI'
            },
            listeners: {
                itemclick: 'onCustomerItemClick'
            }
        },
        {
            xtype: 'grid',
            title: 'Movies',
            flex: 1,
            // Bind the movies to the grid
            bind: {
                store: '{movies}'
            },
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
            listeners: {
                itemclick: 'onMovieItemClick'
            }
        }
        
    ],
    width: 900,
    height: 500,
    margin: '50 0 0 0',
    autoScroll: true
});
