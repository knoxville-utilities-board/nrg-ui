import EmberRouter from '@ember/routing/router';
import config from 'docs/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('showcase');
  this.route('cards');
  this.route('marketing');
  this.route('promo');
  this.route('workflow-tray');
  this.route('theme');
  this.route(
    'core-components',
    {
      path: '/components',
    },
    function () {
      this.route('accordion');
      this.route('button');
      this.route('card');
      this.route('context-menu');
      this.route('dropdown');
      this.route('header');
      this.route('form', function () {
        this.route('checkbox');
        this.route('checkbox-group');
        this.route('datetime');
        this.route('file-upload');
        this.route('multi-select');
        this.route('phone-input');
        this.route('radio-group');
        this.route('search');
        this.route('select');
        this.route('text-area');
        this.route('text-input');
      });
      this.route('footer');
      this.route('icon');
      this.route('loading-indicator');
      this.route('modal');
      this.route('pagination');
      this.route('popover');
      this.route('toaster');
      this.route('tooltip');
    },
  );
  this.route('helpers');
  this.route('mktg-components', function () {
    this.route('card');
    this.route('card-container');
    this.route('footer');
    this.route('header');
    this.route('navbar');
    this.route('promo');
    this.route('promo-container');
    this.route('section-header');
    this.route('service-pricing');
  });
  this.route('modifiers', function () {
    this.route('on-click-outside');
    this.route('on-destroy');
    this.route('on-insert');
  });
  this.route('scaffold');
  this.route('services');
  this.route('side-by-side', function () {
    this.route(
      'detail',
      {
        path: ':item_id',
      },
      function () {},
    );
  });
  this.route(
    'stacked-pane',
    {
      path: 'stacked-pane/list',
    },
    function () {
      this.route(
        'selected-item',
        {
          path: ':item_id/sublist',
        },
        function () {
          this.route(
            'selected-subitem',
            {
              path: ':subitem_id',
            },
            function () {
              this.route(
                'selected-subitem-2',
                {
                  path: ':subitem_2_id',
                },
                function () {},
              );
            },
          );
        },
      );
    },
  );
});
