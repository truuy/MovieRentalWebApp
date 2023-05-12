Ext.define('MovieRentalUI.viewmodel.MoviesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.moviesvm',
    stores: {
        movies: {
            type: 'moviesstore',
            autoLoad: true,
            alias: 'store.moviesstore',
            storeId: 'MoviesStore', // Add this line
            model: 'MovieRentalUI.model.Movies'
            
        }
    },
    data: {

        title: 'Movies'
        // You can define any data properties that you want to use in your view here
    }
});

var moviesStore = Ext.create('MovieRentalUI.store.MoviesStore');

// Button click handler
function onMoviesBtnClick() {
    
    moviesStore.load({
        callback: function(records, operation, success) {
            if (success) {
                // Do something with the loaded data
                console.log('Movies Button Clicked');
                console.log(records);
                
            } else {
                // Handle the error
            }
        }
    });
}