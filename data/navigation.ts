import {NavigationItem} from '@/types/links';
import {SocialMedia} from '@/types/links'


export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    icon: 'home',
    to: '/',
  },
  {
    text: 'Projects',
    icon: 'projects',
    to: '/projects',
  },
  {
    text: 'About',
    icon: 'about',
    to: '/about',
  },
  {
    text: 'Contact',
    icon: 'contact',
    to: 'mailto:mohamed.bensaleh@usask.ca',
  },
];

export const links: SocialMedia[] = [
  {
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/mohamedbensaleh/',
  },
  {
    icon: 'github',
    href: 'https://github.com/MoBensaleh',
  },
];

