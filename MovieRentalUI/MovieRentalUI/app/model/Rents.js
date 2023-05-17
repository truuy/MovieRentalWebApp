Ext.define('MovieRentalUI.model.Rents', {
    extend: 'Ext.data.Model',
  
    fields: [
      { name: 'orderId', type: 'string', convert: function(value, record) {
        // Generate a new GUID if one isn't already set
        if (!value) {
          value = Ext.data.identifier.Uuid.create().generate();
        }
        return value;
      }},
      { name: 'movieId', type: 'auto', reference: 'MovieRentalUI.model.Movies' },
      { name: 'customerId', type: 'auto', reference: 'MovieRentalUI.model.Customers' },
      { name: 'orderDate', type: 'date' },
      { name: 'orderQuantity', type: 'int' },
      { name: 'id', type: 'int', persist: false },
      // Additional fields for customer name and movie title
      { name: 'customerName', type: 'string', persist: false },
      { name: 'movieTitle', type: 'string', persist: false },
    ],
  
    associations: [
        {
            type: 'belongsTo',
            model: 'MovieRentalUI.model.Customers',
            getterName: 'getCustomer',
            setterName: 'setCustomer',
            associationKey: 'customer'
        },
        {
            type: 'belongsTo',
            model: 'MovieRentalUI.model.Movies',
            getterName: 'getItem',
            setterName: 'setItem',
            associationKey: 'item'
        }
    ]
  });
  