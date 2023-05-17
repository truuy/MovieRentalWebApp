Ext.define('MovieRentalUI.view.MoviesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'moviesGrid',
    id: 'movieGrid',
    //Set the viewmodel
    viewModel: {
        type: 'moviesvm'
    },
    //Bind the movies to the grid
    bind: {
        store: '{movies}'
    },

    columns: [
        { text: 'Movie ID', dataIndex: 'movieId' },
        { text: 'Title', dataIndex: 'title' },
        { text: 'Release Year', dataIndex: 'releaseYear' },
        { text: 'Genre', dataIndex: 'genre' },
        { text: 'Available Copies', dataIndex: 'availableCopies' },
    ],
    forceFit: true,
    width: 900,
    height: 500,
    autoScroll: true,
    controller: 'moviesgridcontroller', // Add the controller
    listeners: {
        itemclick: 'onItemClick'
    },
    tbar: [
        {
            xtype: 'textfield',
            fieldLabel: 'Search',
            labelWidth: 50,
            width: 200,
            listeners: {
                change: 'onSearchInputChange'
            }
        },
        '->',
        {
            text: 'Add Movie',
            handler: function() {
                
                var movieForm = Ext.create('Ext.form.Panel', {
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'title',
                            fieldLabel: 'Title',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'releaseYear',
                            fieldLabel: 'Release Year',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'genre',
                            fieldLabel: 'Genre',
                            width: 300
                        },
                        {
                            xtype: 'textfield',
                            name: 'availableCopies',
                            fieldLabel: 'Available Copies',
                            width: 300

                        }
                    ]
                });
            
                var movieWindow = Ext.create('Ext.window.Window', {
                    title: 'Add Movie',
                    width: 700,
                    height: 700,
                   
                    layout: 'fit',
                    items: [movieForm],
                    buttons: [
                        {
                            text: 'Add',
                            handler: function() {
                                // Perform add operation

                                //Get values from the form
                                var values = movieForm.getValues();
                                //Get the store used by the grid
                                var store = Ext.getCmp('movieGrid').getStore();
                                

                               // Create a new record with the form values
                                var newMovie = Ext.create('MovieRentalUI.model.Movies');
                                newMovie.set(values);

                                // Save the new movie to the server
                                newMovie.save({
                                    url: store.getProxy().api.create,
                                    success: function(record, operation) {
                                        Ext.Msg.alert('Success', 'Movie added successfully');
                                        // Add the new movie to the store
                                        store.add(record);
                                    },
                                    failure: function(record, operation) {
                                        Ext.Msg.alert('Error', 'Failed to add movie');
                                    },
                                    callback: function(record, operation, success) {
                                        if (!success) {
                                            console.log(operation.getError());
                                        }
                                    }
                                });

                                // Close the window
                                movieForm.up('window').close();
                            }
                            
                        },
                        {
                            text: 'Cancel',
                            handler: function() {
                                movieWindow.close();
                            }
                        }
                    ]
                });
            
                movieWindow.show();
            }
        }
    ]
    
});