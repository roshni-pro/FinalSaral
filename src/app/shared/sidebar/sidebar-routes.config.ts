import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '', title: 'Admin', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '#/layout/admin/people', title: 'People', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // // // { path: '#/layout/admin/deletepeople', title: 'Deleted People', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/document', title: 'Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // // // { path: '#/layout/admin/agent', title: 'Agent', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/country', title: 'Country', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/zone', title: 'Zone', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '/layout/admin/state', title: 'State', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/admin/city', title: 'City', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '#/layout/admin/region', title: 'Region', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/department', title: 'Departments', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/skill', title: 'Skills', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/designation', title: 'Designations', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/admin/role', title: 'Role', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },

    {
        path: '', title: 'Customers', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '#/layout/customer/customer', title: 'Customer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            //{ path: '#/layout/customer/customer-upload-doc', title: 'Customer Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // { path: '#/layout/admin/deletepeople', title: 'Deleted People', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // { path: '#/layout/admin/document', title: 'Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
            { path: '#/layout/customer/EwayBillOrder', title: 'Customer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
    {
        path: '', title: 'Account', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/Account/ladgerreport', title: 'Ledger Report', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/ladgercorrect', title: 'Ledger Correct', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/ladgertype', title: 'Ledger Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/accountclassificatiion', title: 'AccountClassification', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/accounttype', title: 'Account Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/accountgroup', title: 'Account Group', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/vouchertype', title: 'Voucher Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/Account/ladger', title: 'Ledger', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

            // // // { path: '#/layout/Account/ladgerreport', title: 'Ladger Report', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // { path: '#/layout/admin/document', title: 'Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },
    // // // {
    // // //     path: '', title: 'Items', icon: 'fa fa-users', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, 
    // // //     submenu: [
    // // //         { path: '#/layout/item/item-master', title: 'Item Master', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
    // // //     ]
    // // // },
    {
        path: '', title: 'Supplier', icon: 'fa fa-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/supplier/supplier', title: 'Supplier', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/ChatPage', title: 'Supplier Chat', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/payment', title: 'Payment', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/suppliercategory', title: 'Supplier Category', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/supplierpaymentdetails', title: 'Supplier Payment Details', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/SupplierOnboard', title: 'Supplier Onboarding', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/newsupplierlist', title: 'New Supplierlist ', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/editsupplier', title: ' Edit Supplier', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/adddpot', title: ' Add Depot', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/editdepot', title: ' Edit Depot', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/supplier/viewdepot', title: ' Edit Depot', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

        ]


    },


    {
        path: '', title: 'Company', icon: 'fa fa-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/company/chart', title: 'Chart', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/company/linechart', title: 'Line Chart', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },


    {
        path: '', title: 'Maps', icon: 'fa fa-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/maps/dboy', title: 'DBoy Tracker', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '#/layout/supplier/supplier/add', title: 'Add Supplier', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },

    {
        path: '', title: 'Dashboard', icon: 'fa fa-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/company-dashboard/', title: 'Company Dashboard', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/layout/company-dashboard/item/:ItemId/:ItemName', title: 'Item Dashboard', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/layout/company-dashboard/customer/:customerId/:customername', title: 'Customer Dashboard', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '#/layout/supplier/supplier/add', title: 'Add Supplier', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },


    {
        path: '', title: 'Trade Item Master', icon: 'fa fa-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/tradeitemmaster/', title: 'Trade Item Master', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/tradeitemmaster/add', title: 'Add Trade Item Master', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '#/layout/supplier/supplier/add', title: 'Add Supplier', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },

    {
        path: '', title: 'Bid', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '#/layout/bid/list', title: 'Current Bids', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/bid/priceticker', title: 'Price Ticker', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/company/linechart', title: 'Line Chart', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }

        ]
    },

    {
        path: '', title: 'Murli', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '#/layout/murli/murli', title: 'Murli', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/murli/story-list', title: 'Story', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },



        ]
    },

    {
        path: '', title: 'Current Stock', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/layout/current-stock/current-stock', title: 'Current Stock', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Tax Master', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/taxmaster/taxmaster', title: 'Tax Master', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/taxmaster/taxgroup', title: 'Tax Group', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/layout/Account/accounttype', title: 'Account Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

            // { path: '#/layout/admin/document', title: 'Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },
    {
        path: '', title: 'Warehouse', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/warehouse/warehouse', title: 'Warehouse', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/maps/ClusterDashboard', title: 'Cluster Dashboard', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },



            // { path: '#/layout/warehouse/cluster', title: 'Cluster', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/warehouse/area', title: 'Area', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // { path: '#/layout/Account/accounttype', title: 'Account Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

            // { path: '#/layout/admin/document', title: 'Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },
    {
        path: '', title: 'Delivery', icon: 'ft-align-left', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/delivery/vehicles', title: 'Vehicles', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/delivery/delivery-boy', title: 'Delivery Boy', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            //{ path: '/layout/delivery/redispatchorderapproval', title: 'Redispatch order approval', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '#/layout/Account/accounttype', title: 'Account Type', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '#/layout/admin/document', title: 'Document', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
            { path: '/layout/delivery/Createdeliveryassignment', title: 'Create Delivery Assignment', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },


        ]
    },
    {
        path: '', title: 'Permissions', icon: 'fa fa-user', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/layout/permission/pagemaster', title: 'Page Master', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/permission/role-page-permission', title: 'Role Page Permission', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/permission/page-button-permission', title: 'Page Button Permission', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/permission/RequestAccess', title: 'Request Access', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/permission/RequestApprove', title: 'Request Approve', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/layout/permission/RequestApprovebyUAC', title: 'Request Approve By UAC ', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '#/layout/permissions/pagemaster', title: 'Permissions', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            // { path: '#/layout/supplier/supplier/add', title: 'Add Supplier', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
        ]
    },
    {
        path: '', title: 'Item Category', icon: 'fa fa-users', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '#/layout/item-category/basecategory', title: 'Base Category', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/item-category/category', title: 'Category', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/item-category/subcategory', title: 'Sub Category', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
            { path: '#/layout/item-category/subsubcategory', title: 'Sub Sub Category', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
    },
    // // // // {
    // // // //     path: '', title: 'Depot', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
    // // // //         { path: '#/layout/depot/depot', title: 'Depot', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }
    // // // //     ]
    // // // // },
    // // // {
    // // //     path: '/full-layout', title: 'Full Layout', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // // // },
    // // // {
    // // //     path: '/content-layout', title: 'Content Layout', icon: 'ft-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // // // },
    // // // {
    // // //     path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    // // //     submenu: [
    // // //         { path: 'javascript:;', title: 'Second Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // // //         {
    // // //             path: '', title: 'Second Level Child', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    // // //             submenu: [
    // // //                 { path: 'javascript:;', title: 'Third Level 1.1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // // //                 { path: 'javascript:;', title: 'Third Level 1.2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // // //             ]
    // // //         },
    // // //     ]
    // // // },
    // // // {
    // // //     path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: []
    // // // },
    // // // { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
    // // // { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },

];
