Ext.define('MovieRentalUI.store.MoviesStore', {
    extend: 'Ext.data.Store',

    alias: 'store.moviesstore',

    model: 'MovieRentalUI.model.Movies',
    
    //call api
    proxy: {
        type: 'ajax',
        url: 'https://localhost:7177/api/Movies',
        api: {
            create: 'https://localhost:7177/api/Movies/addMovie',
            read: 'https://localhost:7177/api/Movies',
            update: 'https://localhost:7177/api/Movies/updateMovie',
            delete: 'https://localhost:7177/api/Movies/deleteMovie'
          },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        }
    },



    listeners: {
        write: function(store, operation, eOpts) {
            if (operation.success) {
                Ext.Msg.alert('Success', 'Customer added successfully');
            } else {
                Ext.Msg.alert('Error', 'Failed to add customer');
                console.log(operation.getError());
            }
        }
    }
});

