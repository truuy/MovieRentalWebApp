Ext.define('MovieRentalUI.model.Movies', {
    extend: 'Ext.data.Model',
    store: 'MovieRentalUI.store.MoviesStore',
    fields: [
        { name: 'movieId', type: 'string', convert: function(value, record) {
            // Generate a new GUID if one isn't already set
            if (!value) {
                value = Ext.data.identifier.Uuid.create().generate();
            }
            return value;
        }},
        { name: 'title', type: 'string' },
        { name: 'releaseYear', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'rating', type: 'string' },
        { name: 'rentalPrice', type: 'number' },
        { name: 'availableCopies', type: 'int' },
        { name: 'id', type: 'int', persist: false },
        // ...
    ]
});
