import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Progress from '@nrg-ui/core/components/progress';
import onInsert from '@nrg-ui/core/modifiers/on-insert';
import Section from '@nrg-ui/showcase/components/section';

export default class ProgressDemo extends Component {
  @tracked
  animated: boolean = true;

  @tracked
  hideLabel: boolean = false;

  @tracked
  label?: string;

  @tracked
  progress: number = 0;

  @tracked
  stacked: boolean = false;

  @tracked
  striped: boolean = false;

  @tracked
  title: string = 'Progress Title';

  @tracked
  segments: unknown[] = [];

  incrementProgress = () => {
    setTimeout(() => {
      if (this.progress === 100) {
        this.progress = 0;
        setTimeout(() => {
          this.incrementProgress();
        }, 1000);
      } else {
        this.progress++;
        this.incrementProgress();
      }
    }, 100);
  };

  addSegment = () => {
    const backgroundColors = [
      'bg-primary',
      'bg-warning',
      'bg-info',
      'bg-success',
    ];
    if (this.segments.length >= 4) {
      this.segments = [];
    } else {
      const newSegment = {
        progress: 25,
        label: `Segment ${this.segments?.length + 1}`,
        title: `Segment ${this.segments?.length + 1} Title`,
        backgroundColor: backgroundColors[this.segments?.length],
      };
      this.segments = [...this.segments, newSegment];
    }
  };

  <template>
    <Section @name="Progress" {{onInsert this.incrementProgress}} as |Section|>
      <Section.Subsection @name="Basics" @model={{this}} @elementTag="div">
        <:example as |model|>
          <Progress
            @animated={{model.animated}}
            @hideLabel={{model.hideLabel}}
            @label={{model.label}}
            @progress={{model.progress}}
            @stacked={{model.stacked}}
            @striped={{model.striped}}
            @title={{model.title}}
          />
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
          <Progress @stacked={{true}} as |Segment|>
            {{#each model.segments as |segment|}}
              <Segment
                @animated={{model.animated}}
                @hideLabel={{model.hideLabel}}
                @label={{segment.label}}
                @striped={{model.striped}}
                @progress={{segment.progress}}
                @title={{segment.title}}
                class={{segment.backgroundColor}}
              />
            {{/each}}
          </Progress>
          <Button class="btn-primary mt-3" @onClick={{this.addSegment}}>
            Add Segment
          </Button>
        </:example>
      </Section.Subsection>
    </Section>
  </template>
}
