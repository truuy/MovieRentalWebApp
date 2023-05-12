Ext.define('MovieRentalUI.view.MovieRentalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'moviesRental',
    id: 'moviesRental',
    controller: 'moviesgridcontroller', // Add the controller
    // Set the viewmodel
    viewModel: {
        type: 'moviesvm'
    },
    // Bind the movies to the grid
    bind: {
        store: '{movies}'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'textfield',
            emptyText: 'Search movies...',
            enableKeyEvents: true,
            listeners: {
                //keyup: 'onSearchKeyUp' // Use the controller function as the handler
            }
        }]
    }],

    columns: [
        { text: 'Title', dataIndex: 'title' },
        { text: 'Release Year', dataIndex: 'releaseYear' },
        { text: 'Genre', dataIndex: 'genre' },
        { text: 'Rating', dataIndex: 'rating' },
        { text: 'Rental Price', dataIndex: 'rentalPrice' },
        { text: 'Available Copies', dataIndex: 'availableCopies' },
    ],
    forceFit: true,
    width: 900,
    height: 500,
    margin: '50 0 0 0',
    autoScroll: true
   
});
