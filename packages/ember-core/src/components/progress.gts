import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

export interface SegmentSignature {
  Element: HTMLDivElement;
  Args: {
    animated?: boolean;
    hideLabel?: boolean;
    label?: string;
    multiple?: boolean;
    progress?: number;
    striped?: boolean;
    title?: string;
  };
}

export interface ProgressSignature {
  Element: HTMLDivElement;
  Args: {
    animated?: boolean;
    hideLabel?: boolean;
    label?: string;
    striped?: boolean;
    title?: string;
  } & (
    | {
        stacked: true;
      }
    | {
        stacked?: false;
        progress: number;
      }
  );
  Blocks: {
    default?: [ComponentLike<SegmentSignature>];
  };
}

class Segment extends Component<SegmentSignature> {
  get classList() {
    const classes = ['progress-bar'];

    if (this.args.striped) {
      classes.push('progress-bar-striped');
    }

    if (this.args.animated) {
      classes.push('progress-bar-animated');
    }

    return classes.join(' ');
  }

  get label() {
    const { label, progress } = this.args;

    return label ?? `${progress}%`;
  }

  get widthStyle() {
    return htmlSafe(`width: ${this.args.progress}%`);
  }

  <template>
    <div
      aria-label={{@title}}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={{@progress}}
      class="progress"
      role="progressbar"
      style={{if @multiple this.widthStyle}}
      title={{@title}}
    >
      <div class={{this.classList}} style={{unless @multiple this.widthStyle}} ...attributes>
        {{#unless @hideLabel}}
          {{this.label}}
        {{/unless}}
      </div>
    </div>
  </template>
}

const Progress: TOC<ProgressSignature> = <template>
  {{#if @stacked}}
    <div class="progress-stacked" ...attributes>
      {{yield
        (component Segment animated=@animated hideLabel=@hideLabel multiple=true striped=@striped)
      }}
    </div>
  {{else}}
    <Segment
      @animated={{@animated}}
      @hideLabel={{@hideLabel}}
      @label={{@label}}
      @multiple={{false}}
      @progress={{@progress}}
      @striped={{@striped}}
      @title={{@title}}
      ...attributes
    />
  {{/if}}
</template>;

export default Progress;
