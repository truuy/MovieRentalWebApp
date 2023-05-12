/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MovieRentalUI.Application',

    name: 'MovieRentalUI',

    requires: [
        // This will automatically load all classes in the MovieRentalUI namespace
        // so that application classes do not need to require each other.
        'MovieRentalUI.*'
    ],

    // The name of the initial view to create.
    mainView: 'MovieRentalUI.view.Main',

    
});
