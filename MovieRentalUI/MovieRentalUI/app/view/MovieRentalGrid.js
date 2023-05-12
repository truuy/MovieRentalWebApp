Ext.define('MovieRentalUI.view.MovieRentalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'moviesRental',
    id: 'moviesRental',
    // Set the viewmodel
    viewModel: {
        type: 'moviesvm'
    },
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
    width: 900,
    height: 500,
    margin: '50 0 0 0',
    autoScroll: true,
    controller: 'moviesgridcontroller', // Add the controller
    listeners: {
        itemclick: 'onItemClick'
    }
});
