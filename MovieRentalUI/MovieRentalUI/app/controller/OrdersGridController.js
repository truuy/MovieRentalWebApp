Ext.define('MovieRentalUI.controller.OrdersGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ordersgridcontroller',

    onSubmitClick: function() {
        var grid = this.getView();
        var selectionModel = grid.getSelectionModel();
        var selectedRecords = selectionModel.getSelection();
    
        if (selectedRecords.length === 0) {
            return;
        }
    
        var orderIds = selectedRecords.map(function(record) {
            return record.get('orderId');
        });
    
        Ext.Msg.confirm('Confirmation', 'Are you sure you want to return these orders?', function(btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'https://localhost:7177/api/orders/deleteOrder',
                    method: 'DELETE',
                    jsonData: orderIds,
                    success: function(response) {
                        Ext.Msg.alert('Success', 'Orders returned successfully');
                        
                    },
                    failure: function(response) {
                        Ext.Msg.alert('Error', 'Failed to return orders');
                        
                    }
                });
            }
        });
    }
    
    
    
    
    
});
