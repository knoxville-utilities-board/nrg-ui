import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SideNavPageController extends Controller {
  navLinks = [
    {
      route: '#',
      display: 'Home',
    },
    {
      route: '#',
      display: 'Accounts',
      children: [
        {
          route: '#',
          display: 'Summary & History',
        },
        {
          route: '#',
          display: 'Manage Account',
        },
      ],
    },
    {
      route: '#',
      display: 'Edit Profile',
    },
    {
      route: '#',
      display: 'Billing',
      children: [
        {
          route: '#',
          display: 'Pay Now',
        },
        {
          route: '#',
          display: 'Payment Options',
        },
        {
          route: '#',
          display: 'Billing Information',
        },
        {
          route: '#',
          display: 'Past Bills',
        },
      ],
    },
    {
      route: '#',
      display: 'Outage',
      children: [
        {
          route: '#',
          display: 'Outage Map',
        },
        {
          route: '#',
          display: 'Report an Outage',
        },
        {
          route: '#',
          display: 'Check my Status',
        },
      ],
    },
    {
      route: '#',
      display: 'Fiber',
    },
    {
      route: '#',
      display: 'Contact Us',
    },
    {
      route: '#',
      display: 'About Us',
      children: [
        {
          route: '#',
          display: 'About KUB',
        },
        {
          route: '#',
          display: 'Procurement',
        },
        {
          route: '#',
          display: 'Public Records Policy',
        },
        {
          route: '#',
          display: 'Media  Center',
        },
        {
          route: '#',
          display: 'Career Center',
        },
        {
          route: '#',
          display: 'KUB in the Community',
        },
      ],
    },
    {
      route: '#',
      display: 'About Us',
      children: [
        {
          route: '#',
          display: 'About KUB',
        },
        {
          route: '#',
          display: 'Procurement',
        },
        {
          route: '#',
          display: 'Public Records Policy',
        },
        {
          route: '#',
          display: 'Media  Center',
        },
        {
          route: '#',
          display: 'Career Center',
        },
        {
          route: '#',
          display: 'KUB in the Community',
        },
      ],
    },
  ];

  @action
  onClick() {
    const nav = document.querySelector('.collapsible-side-nav');
    nav?.classList.toggle('collapse');
  }
}
