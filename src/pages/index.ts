import { HomePage } from '../pages/home/home';
import { MenuOptionModel } from '../components/side-menu-content/models/menu-option-model';
export const PagesList = [
    { component: HomePage,              title: 'Home' },
];

export const Menu: MenuOptionModel[] = [
    {
        displayName: 'Home',
        iconName: 'home',
        component: HomePage,
        selected: true
    }, {
        displayName: 'Beginners',
        subItems: [{
            displayName: 'Installation',
            component: HomePage,
        }]
    },  {
        displayName: 'About',
        iconName: 'home',
        component: HomePage,
        selected: true
    }
];

export const Pages = PagesList.map((page) => {
    return page.component;
});

export const RootPage = HomePage;
