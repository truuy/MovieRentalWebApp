Ext.define('MovieRentalUI.controller.MovieRentalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movierentalcontroller',
    stores: ['Movies','Customers'],

    onMovieItemClick: function(grid, record) {
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

    onCustomerItemClick: function(grid, record) {
        var customerId = record.get('customerId');

        var customerWindow = Ext.create('Ext.window.Window', {
            title: 'Edit Customer',
            width: 500,
            height: 500,
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            width: 700,
                            value: record.get('firstName')
                        },
                        {
                            xtype: 'textfield',
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            width: 700,
                            value: record.get('lastName')
                        },
                        {
                            xtype: 'textfield',
                            name: 'email',
                            fieldLabel: 'Email',
                            width: 700,
                            value: record.get('email')
                        },
                        {
                            xtype: 'textfield',
                            name: 'phone',
                            fieldLabel: 'Phone',
                            width: 700,
                            value: record.get('phone')
                        },
                        
                        
                    ]
                }
            ],
            
        });

        customerWindow.show();
    }
    
});

