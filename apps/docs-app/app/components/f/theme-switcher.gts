import { ThemeSwitcher } from '@nrg-ui/core';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

<template>
  <FreestyleSection @name="Theme Switcher" as |Section|>
    <Section.subsection @name="Basics">
      <FreestyleUsage>
        <:example>
          <ThemeSwitcher />
        </:example>
      </FreestyleUsage>
    </Section.subsection>
  </FreestyleSection>
</template>
