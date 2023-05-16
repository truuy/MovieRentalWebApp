Ext.define('MovieRentalUI.model.Rents', {
    extend: 'Ext.data.Model',
    
    fields: [
      { name: 'OrderId', type: 'string', convert: function(value, record) {
        // Generate a new GUID if one isn't already set
        if (!value) {
          value = Ext.data.identifier.Uuid.create().generate();
        }
        return value;
      }},
      { name: 'ItemId', type: 'auto' },
      { name: 'CustomerId', type: 'auto' },
      { name: 'OrderDate', type: 'date' },
      { name: 'OrderQuantity', type: 'int' },
      { name: 'id', type: 'int', persist: false },
    ],
  
    associations: [
      {
        type: 'belongsTo',
        model: 'MovieRentalUI.model.Customer',
        associationKey: 'Customer',
        foreignKey: 'CustomerId'
      },
      {
        type: 'belongsTo',
        model: 'MovieRentalUI.model.Movie',
        associationKey: 'Item',
        foreignKey: 'ItemId'
      }
    ]
  });
  