Ext.define('MovieRentalUI.viewmodel.MovieRentalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movierentalvm',
    stores: {
        customers: {
            type: 'customersstore',
            autoLoad: true,
            
        },
        movies: {
            type: 'moviesstore',
            autoLoad: true,
            
        }
    },
    data: {

        title: 'Customers'
        
    }
});