Ext.define('MovieRentalUI.viewmodel.MoviesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.moviesvm',
    stores: {
        movies: {
            type: 'moviesstore',
            autoLoad: true,
            alias: 'store.moviesstore',
            storeId: 'MoviesStore', 
            model: 'MovieRentalUI.model.Movies'
            
        }
    },
    data: {

        title: 'Movies'
        
    }
});
