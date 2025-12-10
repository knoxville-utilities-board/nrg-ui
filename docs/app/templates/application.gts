import { isDevelopingApp, isTesting, macroCondition } from '@embroider/macros';
import Component from '@glimmer/component';
import Scaffold from '@nrg-ui/core/components/scaffold';
import version from '@nrg-ui/core/helpers/version';
import pageTitle from 'ember-page-title/helpers/page-title';

import logo from '#app/assets/images/logo.svg';

export default class Application extends Component {
  get environment() {
    if (macroCondition(isTesting())) {
      return 'test';
    }
    if (macroCondition(isDevelopingApp())) {
      return 'dev';
    }
    return 'prod';
  }

  <template>
    {{pageTitle "@nrg-ui/core"}}

    {{! BEGIN-SNIPPET scaffold-component }}
    <Scaffold @environment={{this.environment}}>
      <:app-bar-left as |AppBar|>
        <p class="d-none d-md-block m-0 ps-3 fs-5">
          Docs | @nrg-ui/core
        </p>
        <AppBar.Environment />
      </:app-bar-left>
      <:sidebar as |Menu|>
        <Menu.Item @route="showcase">
          Showcase
        </Menu.Item>
        <Menu.Item @route="scaffold">
          Scaffold
        </Menu.Item>
        <Menu.Item @route="side-by-side">
          Side-by-Side
        </Menu.Item>
        <Menu.Item @route="stacked-pane">
          Stacked Pane
        </Menu.Item>
        <Menu.Group @route="core-components.index">
          <:badge>
            15
          </:badge>
          <:header>
            Components
          </:header>
          <:items as |Item|>
            <Item @route="core-components.accordion">
              Accordion
            </Item>
            <Item @route="core-components.button">
              Button
            </Item>
            <Item @route="core-components.card">
              Card
            </Item>
            <Item @route="core-components.context-menu">
              Context Menu
            </Item>
            <Item @route="core-components.dropdown">
              Dropdown
            </Item>
            <Item @route="core-components.footer">
              Footer
            </Item>
            <Item @route="core-components.header">
              Header
            </Item>
            <Item @route="core-components.icon">
              Icon
            </Item>
            <Item @route="core-components.loading-indicator">
              Loading Indicator
            </Item>
            <Item @route="core-components.modal">
              Modal
            </Item>
            <Item @route="core-components.pagination">
              Pagination
            </Item>
            <Item @route="core-components.popover">
              Popover
            </Item>
            <Item @route="core-components.progress">
              Progress
            </Item>
            <Item @route="core-components.toaster">
              Toaster
            </Item>
            <Item @route="core-components.tooltip">
              Tooltip
            </Item>
          </:items>
        </Menu.Group>
        <Menu.Group @route="core-components.form.index">
          <:badge>
            11
          </:badge>
          <:header>
            Forms
          </:header>
          <:items as |Item|>
            <Item @route="core-components.form.checkbox">
              Checkbox
            </Item>
            <Item @route="core-components.form.checkbox-group">
              Checkbox Group
            </Item>
            <Item @route="core-components.form.datetime">
              Datetime
            </Item>
            <Item @route="core-components.form.file-upload">
              File Upload
            </Item>
            <Item @route="core-components.form.multi-select">
              Multi Select
            </Item>
            <Item @route="core-components.form.phone-input">
              Phone Input
            </Item>
            <Item @route="core-components.form.radio-group">
              Radio Group
            </Item>
            <Item @route="core-components.form.search">
              Search
            </Item>
            <Item @route="core-components.form.select">
              Select
            </Item>
            <Item @route="core-components.form.text-area">
              Text Area
            </Item>
            <Item @route="core-components.form.text-input">
              Text Input
            </Item>
          </:items>
        </Menu.Group>
        <Menu.Group @route="mktg-components.index">
          <:badge>
            9
          </:badge>
          <:header>
            Marketing Components
          </:header>
          <:items as |Item|>
            <Item @route="marketing">
              Example
            </Item>
            <Item @route="mktg-components.card-container">
              Card Container
            </Item>
            <Item @route="mktg-components.card">
              Card
            </Item>
            <Item @route="mktg-components.footer">
              Footer
            </Item>
            <Item @route="mktg-components.header">
              Header
            </Item>
            <Item @route="mktg-components.navbar">
              Navbar
            </Item>
            <Item @route="mktg-components.promo-container">
              Promo Container
            </Item>
            <Item @route="mktg-components.promo">
              Promo
            </Item>
            <Item @route="mktg-components.section-header">
              Section Header
            </Item>
            <Item @route="mktg-components.service-pricing">
              Service Pricing
            </Item>
          </:items>
        </Menu.Group>
        <Menu.Item @url="https://example.com">
          <:default>
            External Link
          </:default>
          <:badge>
            9+
          </:badge>
        </Menu.Item>
      </:sidebar>
      <:sidebar-footer as |Item|>
        <Item
          target="_blank"
          @url="https://github.com/knoxville-utilities-board/nrg-ui"
        >
          {{version}}
        </Item>
      </:sidebar-footer>
      <:default>
        {{outlet}}
      </:default>
      <:footer-left>
        <a
          aria-label="Knoxville Utilities Board"
          class="p-0 d-none d-md-block"
          href="https://www.kub.org/"
        >
          <img src={{logo}} alt="Knoxville Utilities Board" />
        </a>
        <span class="mb-0 p-0 px-md-3 align-content-center">
          &copy; Knoxville Utilities Board
        </span>
      </:footer-left>
    </Scaffold>
    {{! END-SNIPPET }}
  </template>
}
