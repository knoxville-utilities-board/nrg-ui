import { A } from '@ember/array';
import { array, hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FileUpload from '@nrg-ui/core/components/form/file-upload';
import { bind } from '@nrg-ui/core/helpers/bind';
import Section from '@nrg-ui/showcase/components/section';

export default class FileUploadDemo extends Component {
  @tracked
  disabled = false;

  @tracked
  accept: string[] = A(['.pdf', 'image/*']);

  @tracked
  value = [];

  @action
  onSelect(files: File[]) {
    console.log('Bound value: ', this.value);
    for (const file of files) {
      console.log(`The file ${file['name']} was selected`);
    }
  }

  @action
  onRemove(file: File) {
    console.log('The file ' + file['name'] + ' was removed');
  }

  <template>
    <Section @name="File Upload" @parentName="form" as |Section|>
      <Section.Subsection @name="Basic" @model={{this}} @elementTag="div">
        <:example as |model|>
          <FileUpload
            @accept={{model.accept}}
            @binding={{bind model "property"}}
            @fieldOptions={{hash disabled=this.disabled}}
            @onChange={{model.onSelect}}
            @onRemove={{model.onRemove}}
          />
        </:example>
        <:api as |Api|>
          <Api.Arguments as |Args|>
            {{! TODO }}
            {{!-- <Args.Array
              @name="accept"
              @description="The accepted file types. This is a list of file extensions or MIME types."
              @defaultValue="[]"
              @items={{this.accept}}
              @type="String"
            /> --}}
            <Args.Boolean
              @name="disabled"
              @description="Disables the file upload component"
              @defaultValue={{false}}
            />
          </Api.Arguments>
          <Api.Actions as |Action p|>
            <Action
              @name="onChange"
              @description="The action to call when a file is selected"
              @parameters={{array (p "files" type="File[]")}}
            />
            <Action
              @name="onRemove"
              @description="The action to call when a file is removed"
              @parameters={{array (p "file" type="File" description="The file that was removed")}}
            />
          </Api.Actions>
        </:api>
      </Section.Subsection>
    </Section>
  </template>
}
