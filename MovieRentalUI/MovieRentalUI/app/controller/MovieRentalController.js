Ext.define('MovieRentalUI.controller.MovieRentalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movierentalcontroller',

    onSubmitClick: function() {
        var customersGrid = this.lookupReference('customersGrid');
        var moviesGrid = this.lookupReference('moviesGrid');
        var customersSelection = customersGrid.getSelectionModel().getSelection();
        var moviesSelection = moviesGrid.getSelectionModel().getSelection();
      
        if (customersSelection.length === 0 || moviesSelection.length === 0) {
          // No customer or movie selected, handle the error or show a message
          return;
        }
      
        var customerId = customersSelection[0].get('customerId');
        var orderData = [];
      
        Ext.each(moviesSelection, function(movie) {
          var itemId = movie.get('movieId');
          var orderQuantity = 1;
      
          var order = {
            itemId: itemId,
            customerId: customerId,
            orderQuantity: orderQuantity
          };
      
          orderData.push(order);
        });
      
        console.log(JSON.stringify(orderData));
      
        // Create a JSON object with the orderData
        var jsonData = {
          orderModels: orderData
        };
      
        // Create new records with the form values
        var newOrders = Ext.create('MovieRentalUI.model.Rents');
        newOrders.set(jsonData); // Set the orderModels field
      
        var store = Ext.getStore('rentstore');
        var movieStore = Ext.getStore('moviesstore'); // Access the movies store
      
        if (!store) {
          store = Ext.create('MovieRentalUI.store.RentStore');
          store.load({
            callback: function(records, operation, success) {
              if (success) {
                // Store loaded successfully
                newOrders.save({
                  url: store.getProxy().api.create,
                  success: function(record, operation) {
                    Ext.Msg.alert('Success', 'Order added successfully');
                    // Add the new movies to the store
                    store.add(record);               
                  },
                  failure: function(record, operation) {
                    Ext.Msg.alert('Error', 'Order added successfully');
                  },
                  callback: function(record, operation, success) {
                    if (!success) {
                      console.log(operation.getError());
                    }
                  }
                });
              } else {
                // Failed to load the store
                console.log(operation.getError());
              }
            }
          });
        } else {
          // Store is already loaded
          console.log('store loaded');
        }
      },
      onCustomerInputChange: function (textfield, newValue, oldValue, eOpts) {
        var customersStore = this.getViewModel().getStore('customers');
        customersStore.clearFilter(); // Clear any existing filters

        if (newValue) {
            customersStore.filterBy(function (record) {
                var firstName = record.get('firstName'),
                    lastName = record.get('lastName'),
                    email = record.get('email'),
                    phone = record.get('phone');
                    address= record.get('address');

                // Perform case-insensitive search on firstName, lastName, email, and phone
                return (
                    firstName.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 ||
                    lastName.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 ||
                    email.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 ||
                    phone.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 ||
                    address.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
                );
            });
        }
    },

    onMoviesInputChange: function (textfield, newValue, oldValue, eOpts) {
        var moviesStore = this.getViewModel().getStore('movies');
        moviesStore.clearFilter(); // Clear any existing filters

        if (newValue) {
            moviesStore.filterBy(function (record) {
                var title = record.get('title'),
                    releaseYear = record.get('releaseYear'),
                    genre = record.get('genre');

                // Perform case-insensitive search on title, releaseYear, and genre
                return (
                    title.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 ||
                    releaseYear.toLowerCase().indexOf(newValue.toLowerCase()) !== -1 ||
                    genre.toLowerCase().indexOf(newValue.toLowerCase()) !== -1
                );
            });
        }
    }
});
