export const menuItems = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/backoffice' } ,
            { label: 'Vehicles', icon: 'pi pi-fw pi-car', to: '/backoffice', items:[
                { label: 'Brands', icon: 'pi pi-fw pi-bookmark', to: '/backoffice' } ,
                { label: 'Models', icon: 'pi pi-fw pi-book', to: '/backoffice' } ,
            ]} ,
            { label: 'Orders', icon: 'pi pi-fw pi-wallet', to: '/backoffice' } ,
        ],
        
    },
  
  ]
