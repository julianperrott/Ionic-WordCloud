import { HomePage } from './home/home';
import { AboutPage } from './about/about';
import { DiscusPage } from './discus/discus';
import { MenuOptionModel } from '../components/side-menu-content/models/menu-option-model';
export const PagesList = [{ component: HomePage, title: 'Home' }, { component: AboutPage, title: 'About' }];

export const Pages = [HomePage, AboutPage];

export const Menu: MenuOptionModel[] = [
    {
        displayName: 'Word Cloud',
        iconName: 'home',
        component: HomePage,
        selected: true
    },
    {
        displayName: 'About',
        iconName: 'information-circle',
        component: AboutPage,
        selected: true
    },
    {
        displayName: 'Comment on the App',
        iconName: 'chatbubbles',
        component: DiscusPage,
        selected: true
    }
];

export const RootPage = HomePage;
