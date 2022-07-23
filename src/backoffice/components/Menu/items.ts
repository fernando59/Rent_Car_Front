export const menuItems = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/backoffice' } ,
            { label: 'Vehicles', icon: 'pi pi-fw pi-car',  items:[
                { label: 'Brands', icon: 'pi pi-fw pi-bookmark', to: '/backoffice/brands' } ,
                { label: 'Vehicle', icon: 'pi pi-fw pi-car', to: '/backoffice/vehicles' } ,
                { label: 'Models', icon: 'pi pi-fw pi-book', to: '/backoffice/models' } ,
                { label: 'TypeVehicle', icon: 'pi pi-fw pi-book', to: '/backoffice/typeVehicle' } ,
            ]} ,
            { label: 'Orders', icon: 'pi pi-fw pi-wallet', to: '/backoffice' } ,
            { label: 'Clients', icon: 'pi pi-fw pi-users', to: '/backoffice' } ,
        ],
        
    },
  
  ]
