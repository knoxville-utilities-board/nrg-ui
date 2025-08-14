// @ts-nocheck - TODO
import { A } from '@ember/array';
import { fn, hash } from '@ember/helper';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FileUpload from '@nrg-ui/core/components/form/file-upload';
import { bind } from '@nrg-ui/core/helpers/bind';
import FreestyleUsage from 'ember-freestyle/components/freestyle/usage';
import FreestyleSection from 'ember-freestyle/components/freestyle-section';

import CodeBlock from '../../../code-block';

class Model {
  @tracked
  property = [];
}

export default class FileUploadDemo extends Component {
  @tracked
  disabled = false;

  @tracked
  accept: string[] = A(['.pdf', 'image/*']);

  model = new Model();

  @action
  onSelect(files: File[]) {
    console.log('Bound value: ', this.model.property);
    for (const file of files) {
      console.log(`The file ${file['name']} was selected`);
    }
  }

  @action
  onRemove(file: File) {
    console.log('The file ' + file['name'] + ' was removed');
  }

  @action
  update(key: string, value: unknown) {
    set(this, key, value);
  }

  <template>
    <FreestyleSection @name="File Upload" as |Section|>
      <Section.subsection @name="Basic">
        <FreestyleUsage>
          <:example>
            <FileUpload
              @accept={{this.accept}}
              @binding={{bind this.model "property"}}
              @fieldOptions={{hash disabled=this.disabled}}
              @id="file-upload"
              @onSelect={{this.onSelect}}
              @onRemove={{this.onRemove}}
            />
          </:example>
          <:api as |Args|>
            <Args.Array
              @name="accept"
              @description="The accepted file types. This is a list of file extensions or MIME types."
              @defaultValue="[]"
              @items={{this.accept}}
              @type="String"
            />
            <Args.Bool
              @name="fieldOptions.disabled"
              @description="Disables the file upload component"
              @defaultValue="false"
              @value={{this.disabled}}
              @onInput={{fn this.update "disabled"}}
            />
            <Args.String
              @name="binding"
              @description="Create a two-way binding with the value. The value will be an array of files."
            />
            <Args.Action
              @name="onSelect"
              @description="The action to call when a file is selected"
            >
              <CodeBlock
                @lang="typescript"
                @code="(files: File[]) => unknown"
              />
            </Args.Action>
            <Args.Action
              @name="onRemove"
              @description="The action to call when a file is removed"
            >
              <CodeBlock @lang="typescript" @code="(file: File) => unknown" />
            </Args.Action>
          </:api>
        </FreestyleUsage>
      </Section.subsection>
    </FreestyleSection>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'F::Components::Form::FileUpload': typeof FileUploadDemo;
  }
}
