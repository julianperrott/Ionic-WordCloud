import { HomePage } from './home/home';
import { AboutPage } from './about/about';
import { DisqusPage } from './disqus/disqus';
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
        displayName: 'Discus the application here',
        iconName: 'chatbubbles',
        component: DisqusPage,
        selected: true
    },
    {
        displayName: 'About',
        iconName: 'information-circle',
        component: AboutPage,
        selected: true
    }
];

export const RootPage = HomePage;
