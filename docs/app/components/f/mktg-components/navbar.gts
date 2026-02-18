import Button from '@nrg-ui/core/components/button';
import MktgNavbar from '@nrg-ui/core/components/mktg/navbar';
import NavItem from '@nrg-ui/core/components/nav-item';
import Section from '@nrg-ui/showcase/components/section';

<template>
  <Section @name="Navbar" @parentName="mktg" as |Section|>
    <Section.Subsection @name="Basics" @model={{this}} @elementTag="nav">
      <:example>
        <MktgNavbar>
          <:brand>
            <a class="navbar-brand mx-5" href="https://www.kub.org">
              <img src="https://imageplaceholder.net/50" alt="Placeholder" />
            </a>
          </:brand>
          <:actions>
            <Button class="btn-secondary ms-auto d-lg-none" @text="I'm only visible on mobile!" />
          </:actions>
          <:default>
            <NavItem @url="#" @label="Home" />
            <NavItem @url="#" @label="Products" />
          </:default>
        </MktgNavbar>
      </:example>
    </Section.Subsection>
  </Section>
</template>
