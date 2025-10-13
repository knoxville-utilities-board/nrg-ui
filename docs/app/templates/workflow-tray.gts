import { LinkTo } from '@ember/routing';
import Button from '@nrg-ui/core/components/button';
import Footer from '@nrg-ui/core/components/footer';
import MktgHeader from '@nrg-ui/core/components/mktg/header';
import MktgServicePricing from '@nrg-ui/core/components/mktg/service-pricing';
import MktgWorkflowTray from '@nrg-ui/core/components/mktg/workflow-tray';
import pageTitle from 'ember-page-title/helpers/page-title';

<template>
  {{pageTitle "WorkflowTray"}}

  <MktgHeader>
    <:brand>
      <img src="https://imageplaceholder.net/50" alt="Icon" />
    </:brand>
    <:title>
      <p class="m-0">
        Title
      </p>
    </:title>
    <:nav>
      <Button class="btn-outline-light me-1 rounded-pill">
        Prev
      </Button>
      <Button class="btn-outline-light me-1 rounded-pill">
        Next
      </Button>
    </:nav>
    <:options>
      <p class="my-0 me-2 fw-bold">
        Fiber:
      </p>
      <LinkTo @route="marketing" class="link-light me-2">
        The Gig
      </LinkTo>
      <p class="my-0 me-2 fw-bold">
        TV:
      </p>
      <LinkTo @route="marketing" class="link-light me-2">
        Add
      </LinkTo>
      <p class="my-0 me-2 fw-bold">
        Phone:
      </p>
      <LinkTo @route="marketing" class="link-light me-2">
        Add
      </LinkTo>
    </:options>
  </MktgHeader>
  <div class="m-0 row flex-fill">
    <MktgWorkflowTray>
      <div class="mx-2">
        <h2>
          Select Your Services
        </h2>
      </div>
      <div>
        <MktgServicePricing
          @label="Fiber"
          @product="The Gig 2.5"
          @description="$65/mo"
          @icon="bi-wifi"
          @selected={{true}}
          @active={{false}}
          as |Addon|
        >
          <Addon @label="Smart Gig" @price="$15/mo" />
        </MktgServicePricing>
        <MktgServicePricing
          @label="TV"
          @product="Bronze"
          @description="$107/mo"
          @icon="bi-tv"
          @selected={{true}}
          @active={{false}}
          as |Addon|
        >
          <Addon @label="FireStick" @price="$80" @quantity={{2}} />
          <Addon @label="HBO" @price="$5.99/mo" />
          <Addon @label="STARZ" @price="$4.99/mo" />
          <Addon @label="Spanish Language Channels" @price="$4.99/mo" />
        </MktgServicePricing>
        <MktgServicePricing
          @label="Phone"
          @product="KUB"
          @description="$129/mo"
          @icon="bi-telephone"
          @selected={{true}}
          @active={{true}}
        />
      </div>
      <hr class="my-0" />
      <div class="my-3">
        <div class="row justify-content-between my-2">
          <div class="col-auto">
            First Bill Including Fees
          </div>
          <div class="col-auto">
            $65/mo
          </div>
        </div>
        <div class="row justify-content-between my-2">
          <div class="col-auto">
            Monthly Total
          </div>
          <div class="col-auto">
            $65/mo
          </div>
        </div>
      </div>
      <div class="d-flex">
        <Button class="btn-primary py-3 flex-fill">
          Next
        </Button>
      </div>
    </MktgWorkflowTray>
    <div class="col-12 col-md-7 col-lg-8 order-1 order-md-2">
      <h1 class="text-center">
        Body Content Goes Here!
      </h1>
    </div>
  </div>
  <Footer>
    <:right>
      <a href="">
        Privacy
      </a>
      <a href="">
        Terms
      </a>
    </:right>
  </Footer>
</template>
