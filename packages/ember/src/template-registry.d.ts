import NrgButton from '@nrg-ui/ember/components/nrg/button';

export default interface Registry {
  'Nrg::Button': typeof NrgButton;
  'nrg/button': typeof NrgButton;
}
