import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Progress from '@nrg-ui/core/components/progress';
import Section from '@nrg-ui/showcase/components/section';
import { task, timeout } from 'ember-concurrency';
import cancelAll from 'ember-concurrency/helpers/cancel-all';
import perform from 'ember-concurrency/helpers/perform';
import pageTitle from 'ember-page-title/helpers/page-title';
import { TrackedArray } from 'tracked-built-ins';

declare type SegmentControl = {
  progress: number;
  backgroundColor?: string;
};

class ProgressDemo extends Component {
  @tracked
  animated = true;

  @tracked
  hideLabel = false;

  @tracked
  label?: string;

  @tracked
  progress = 0;

  @tracked
  stacked = false;

  @tracked
  striped = false;

  @tracked
  title = 'Progress Title';

  @tracked
  segments: Array<SegmentControl> = new TrackedArray([]);

  get addSegmentDisabled() {
    return this.segmentProgressTotal === 100;
  }

  get removeSegmentDisabled() {
    return this.segments?.length === 0;
  }

  get segmentProgressTotal() {
    return this.segments?.reduce((sum, segment) => sum + segment.progress, 0);
  }

  incrementProgress = task(async () => {
    /* eslint-disable no-constant-condition */
    while (1) {
      if (this.progress === 100) {
        await timeout(1000);
        this.progress = 0;
        await timeout(1000);
      }
      this.progress++;
      await timeout(100);
    }
  });

  addSegment = () => {
    const backgroundColors = [
      'bg-primary',
      'bg-warning',
      'bg-info',
      'bg-success',
      'bg-danger',
      'bg-secondary',
      'bg-dark',
    ];
    const progressTotal = this.segmentProgressTotal;
    if (progressTotal < 100) {
      let newProgress = Math.floor(Math.random() * 35 + 5);
      if (progressTotal + newProgress >= 100) {
        newProgress = 100 - progressTotal;
      }
      const newSegment = {
        progress: newProgress,
        backgroundColor:
          backgroundColors[this.segments?.length % backgroundColors.length],
      };
      this.segments.push(newSegment);
    }
  };

  removeSegment = () => {
    if (this.segments.length > 0) {
      this.segments.pop();
    }
  };

  <template>
    <Section @name="Progress" as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <div class="mt-4">
            <Progress
              @animated={{model.animated}}
              @hideLabel={{model.hideLabel}}
              @label={{model.label}}
              @progress={{model.progress}}
              @stacked={{model.stacked}}
              @striped={{model.striped}}
              @title={{model.title}}
            />
            <Button
              class="btn-primary mt-3"
              @onClick={{perform this.incrementProgress}}
              @text="Start progress"
              @disabled={{this.incrementProgress.isRunning}}
            />
            <Button
              class="btn-primary mt-3"
              @onClick={{cancelAll this.incrementProgress}}
              @text="Stop progress"
              @disabled={{this.incrementProgress.isIdle}}
            />
          </div>
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            <Args.Boolean
              @name="animated"
              @defaultValue={{false}}
              @description="When true, the progress bar will have animated growth."
            />
            <Args.Boolean
              @name="hideLabel"
              @defaultValue={{false}}
              @description="When true, the label on the progress bar will be hidden."
            />
            <Args.String
              @name="label"
              @description="A label that centers on filled portion of the progress bar."
              @defaultValue="0%"
            />
            <Args.Number
              @name="progress"
              @description="A number from 0 - 100 that controls the progression of the progress bar. Required if stacked argument is false or undefined."
              @required={{true}}
            />
            <Args.Boolean
              @name="stacked"
              @description="When true, the progress bar will be in stacked mode and accept multiple segments as yielded components. When false, the progress argument is required."
              @hideControl={{true}}
            />
            <Args.Boolean
              @name="striped"
              @defaultValue={{false}}
              @description="When true, the progress bar will have stripes."
            />
            <Args.String
              @name="title"
              @description="The title html attribute for the div with the role of progressbar."
            />
          </Api.Arguments>
        </:api>
      </Section.Subsection>
      <Section.Subsection @name="Stacked" @model={{this}} @elementTag="div">
        <:example as |model|>
          <div class="mt-4">
            <Progress @stacked={{true}} as |Segment|>
              {{#each model.segments as |segment|}}
                <Segment
                  class={{segment.backgroundColor}}
                  @animated={{model.animated}}
                  @hideLabel={{model.hideLabel}}
                  @label={{model.label}}
                  @striped={{model.striped}}
                  @progress={{segment.progress}}
                  @title={{model.title}}
                />
              {{/each}}
            </Progress>
            <Button
              class="btn-primary mt-3"
              @onClick={{this.addSegment}}
              @disabled={{this.addSegmentDisabled}}
            >
              Add Segment
            </Button>
            <Button
              class="btn-primary mt-3"
              @onClick={{this.removeSegment}}
              @disabled={{this.removeSegmentDisabled}}
            >
              Remove Segment
            </Button>
          </div>
        </:example>
      </Section.Subsection>
    </Section>
  </template>
}

<template>
  {{pageTitle "Progress"}}

  <div class="container mx-auto">
    <ProgressDemo />
  </div>
</template>
