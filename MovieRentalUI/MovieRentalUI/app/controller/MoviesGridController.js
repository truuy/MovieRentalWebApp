Ext.define('MovieRentalUI.controller.MoviesGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.moviesgridcontroller',
    stores: ['Movies'],

    onItemClick: function(grid, record) {
        var movieForm = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    name: 'title',
                    fieldLabel: 'Movie title',
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
                    name: 'rating',
                    fieldLabel: 'Ratings',
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
            title: 'Edit Movies',
            width: 500,
            height: 500,
            layout: 'fit',
            items: [movieForm],
            buttons: [
                
                {
                    text: 'Update',
                    handler: function() {
                        var form = movieWindow.down('form');
                        if (form.isValid()) {
                            var values = form.getValues();
                            var record = grid.getSelectionModel().getSelection()[0];
                            // Exclude automatically generated ExtJS id
                            delete record.data.id;
                            record.set(values);
                            var moviesStore = Ext.getCmp('movieGrid').getStore();
                            // Api Config
                            var apiConfig = moviesStore.getProxy().api.update;
                            var url = apiConfig + '/' + record.get('movieId');
                            if (moviesStore) {
                                Ext.Ajax.request({
                                    url: url,
                                    method: apiConfig.method || 'PUT',
                                    jsonData: record.getData(),
                                    success: function(response) {
                                        console.log(response.responseText);
                                        try {
                                            moviesStore.sync();
                                            Ext.Msg.alert('Success', 'Movie updated successfully');
                                            movieWindow.close();
                                        } catch (error) {
                                            Ext.Msg.alert('Error', error);
                                        }
                                    },
                                    failure: function(response) {
                                        Ext.Msg.alert('Error', 'Failed to update cmovie');
                                        console.log(response);
                                        movieWindow.close();
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    text: 'Delete',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelection()[0];
                        var movieId = record.get('movieId');
                        var moviesStore = Ext.getCmp('movieGrid').getStore();
                        // Api Config
                        var apiConfig = moviesStore.getProxy().api.delete;
                        var url = apiConfig + '?id=' + movieId;
                        console.log(movieId);
                        if (moviesStore) {
                            Ext.Ajax.request({
                                url: url,
                                method: apiConfig.method || 'DELETE',
                                success: function(response) {
                                    console.log(response.responseText);
                                    try {
                                        moviesStore.remove(record);
                                        moviesStore.sync();
                                        Ext.Msg.alert('Success', 'Movie deleted successfully');
                                    } catch (error) {
                                        Ext.Msg.alert('Error', error);
                                    }
                                },
                                failure: function(response) {
                                    Ext.Msg.alert('Error', 'Failed to delete movie');
                                    console.log(response);
                                }
                            });
                        }
                        movieWindow.close();
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
    
        // Load the selected record's data into the form fields
        movieForm.loadRecord(record);
    
        movieWindow.show();
    },

    onSearchKeyUp: function(textfield) {
        var searchString = textfield.getValue();
        var store = this.getStore('MoviesStore'); // Access the store using this.getStore()
        store.clearFilter();
        if (searchString) {
            var regex = new RegExp(searchString, 'i');
            store.filterBy(function(record) {
                return regex.test(record.get('title')) || regex.test(record.get('genre'));
            });
        }
    },
    onSearchInputChange: function (textfield, newValue, oldValue, eOpts) {
        var grid = this.getView();
        var store = grid.getStore();

        store.clearFilter();

        if (newValue) {
            store.filterBy(function (record) {
                var searchValue = newValue.toLowerCase();
                var fieldsToSearch = ['title', 'genre', 'releaseYear'];

                for (var i = 0; i < fieldsToSearch.length; i++) {
                    var fieldValue = record.get(fieldsToSearch[i]).toLowerCase();

                    if (fieldValue.indexOf(searchValue) !== -1) {
                        return true; // Match found
                    }
                }

                return false; // No match found
            });
        }
    },
    
});

