import React from 'react';
import { withState } from '../../helpers/storybook';

import Button from '../button';

import { fieldsMask } from '../../helpers/mask';

import Form, {
  FormGroup,
  FormLabel,
  FormControl,
  FormActions,
  FormHelpText,
  FormControlLabel,
} from './index';
import { SelectOption } from '../select';

export default {
  title: 'Form',
  component: Form,
};

const action = (name) => (...params) => {
  console.log(name, params);
};

export const InputText = withState({ input: 'Campo com valor default', check: [] }, store => {
  const handleChange = (event) => {
    store.set({ input: event.target.value });
  };

  const change = () => {
    store.set({ input: '' });
  };

  return (
    <div>
      <Form onSubmit={() => {}}>
        <FormGroup>
          <FormLabel>Example of label</FormLabel>
          <FormControl placeholder="Form, FormGroup and input" />
          <FormHelpText>text</FormHelpText>
        </FormGroup>
        <FormActions>
          <Button>Cancelar</Button>
          <Button color="primary">Enviar</Button>
        </FormActions>
      </Form>
      <Form onSubmit={() => {}}>
        <FormGroup>
          <FormControlLabel label="Nome" placeholder="Form, FormGroup and input" />
          <FormHelpText>text</FormHelpText>
        </FormGroup>
        <FormActions>
          <Button>Cancelar</Button>
          <Button color="primary">Enviar</Button>
        </FormActions>
      </Form>
      <Form onSubmit={() => {}}>
        <Button onClick={change}>Deixar vazio!</Button>
        <FormGroup>
          <FormControlLabel
            label="Nome"
            placeholder="Form, FormGroup and input"
            value={store.state.input}
            onChange={handleChange}
          />
          <FormHelpText>Tem valor default controlado</FormHelpText>
        </FormGroup>
        <FormActions>
          <Button>Cancelar</Button>
          <Button color="primary">Enviar</Button>
        </FormActions>
      </Form>
      <Form>
        <FormGroup>
          <FormControlLabel
            label="Nome"
            placeholder="Form, FormGroup and input"
            defaultValue="Valor default"
          />
          <FormHelpText>Tem valor default, porém não é controlado</FormHelpText>
        </FormGroup>
        <br />
        <FormGroup>
          <FormControlLabel
            outline
            label="Nome"
            placeholder="Form, FormGroup and input"
            defaultValue="Valor default"
          />
          <FormHelpText>Versão outline!</FormHelpText>
        </FormGroup>
        <br />
        <FormGroup>
          <FormControlLabel
            iconRight="link"
            iconRightClick={() => console.log('clicou no ícone!')}
            outline
            label="Nome"
            placeholder="Form, FormGroup and input"
            defaultValue="Valor default"
          />
          <FormHelpText>Com ícone à direita</FormHelpText>
        </FormGroup>
        <br />
        <FormGroup>
          <FormControlLabel
            iconLeft="link"
            iconLeftClick={() => console.log('clicou no ícone!')}
            outline
            label="Nome"
            placeholder="Form, FormGroup and input"
            defaultValue="Valor default"
          />
          <FormHelpText>Com ícone à esquerda</FormHelpText>
        </FormGroup>
      </Form>
    </div>
  );
});

export const InputTextComIcone = () => (
  <div>
    <Form>
      <FormGroup>
        <FormControlLabel
          iconRight="link"
          iconRightClick={() => console.log('clicou no ícone!')}
          outline
          label="Nome"
          placeholder="Form, FormGroup and input"
          defaultValue="Valor default"
        />
        <FormHelpText>Com ícone à direita</FormHelpText>
      </FormGroup>
      <br />
      <FormGroup>
        <FormControlLabel
          iconLeft="link"
          iconLeftClick={() => console.log('clicou no ícone!')}
          outline
          label="Nome"
          placeholder="Form, FormGroup and input"
          defaultValue="Valor default"
        />
        <FormHelpText>Com ícone à esquerda</FormHelpText>
      </FormGroup>
    </Form>
  </div>
);

export const Select = () => (
  <div>
    <Form>
      <FormGroup>
        <FormControlLabel onChange={(data) => console.log(data)} label="Nome" type="select">
          <SelectOption value="a">a</SelectOption>
          <SelectOption value="b">b</SelectOption>
        </FormControlLabel>
        <FormHelpText>Select!</FormHelpText>
      </FormGroup>
      <br />
      <FormGroup>
        <FormControlLabel outline onChange={(data) => console.log(data)} label="Nome" type="select">
          <SelectOption value="a">a</SelectOption>
          <SelectOption value="b">b</SelectOption>
        </FormControlLabel>
        <FormHelpText>Select ouline!</FormHelpText>
      </FormGroup>
    </Form>
  </div>
);

export const Checkbox = withState({ input: 'Campo com valor default', check: [] }, store => {
  const changeCheck = () => {
    store.set({ check: [1, 2] });
  };

  const toggleCheck = (id) => {
    let check = store.state.check;

    if (store.state.check.includes(id)) {
      check = store.state.check.filter((chosen) => chosen !== id);
    } else {
      check.push(id);
    }

    store.set({ check });
  };

  return (
    <div>
      <Form>
        <Button onClick={changeCheck}>Marcar Checkboxes</Button>
        <FormGroup>
          <label htmlFor="check">Checkbox!</label>
          <FormControl
            onChange={() => toggleCheck(1)}
            checked={store.state.check.includes(1)}
            type="checkbox"
            id="check"
            value="1"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="check2">Checkbox2!</label>
          <FormControl
            theme="secondary"
            onChange={() => toggleCheck(2)}
            checked={store.state.check.includes(2)}
            type="checkbox"
            id="check2"
            value="2"
          />
        </FormGroup>
      </Form>
    </div>
  );
});

export const Radio = () => (
  <div>
    <Form>
      <FormGroup>
        <label htmlFor="radio">Radio!</label>
        <FormControl type="radio" name="test" id="radio" value="1" />
        <br />
        <label htmlFor="radio2">Radio2!</label>
        <FormControl type="radio" name="test" id="radio2" value="2" />
        <br />
        <label htmlFor="radio3">Radio3!</label>
        <FormControl type="radio" name="test" id="radio3" value="3" />
      </FormGroup>
    </Form>
  </div>
);

export const AddonText = () => (
  <FormGroup>
    <br />
    <br />
    <br />
    <FormLabel addon={'text'}>Nome:</FormLabel>
  </FormGroup>
);



export const AddonLink = () => (
  <FormGroup>
    <br />
    <br />
    <br />
    <FormLabel addon={<a href="/home">Esqueci a minha senha</a>}>Nome:</FormLabel>
  </FormGroup>
);



export const WithId = () => (
  <FormGroup controlId="test">
    <FormLabel>Nome:</FormLabel>
    <FormControl placeholder="Form group with input" />
  </FormGroup>
);



export const WithValidation = () => (
  <div>
    <FormGroup validationState="success">
      <FormLabel>Nome:</FormLabel>
      <FormControl placeholder="Form group with input" feedback />
    </FormGroup>
    <FormGroup validationState="warning">
      <FormLabel>Nome:</FormLabel>
      <FormControl placeholder="Form group with input" feedback />
    </FormGroup>
    <FormGroup validationState="error">
      <FormLabel>Nome:</FormLabel>
      <FormControl placeholder="Form group with input" feedback />
      <span className="error">testte</span>
    </FormGroup>
  </div>
);



export const Disabled = () => (
  <div>
    <FormControl value="Com texto" placeholder="Digite um nome" disabled />
    <FormControl type="email" placeholder="Com placeholder" disabled />
    <FormControl type="radio" checked={true} disabled />
    <FormControl type="checkbox" checked={true} disabled />
    <FormControl type="select" placeholder="Selecione" disabled>
      <SelectOption value="a">a</SelectOption>
      <SelectOption value="b">b</SelectOption>
    </FormControl>
    <FormControl type="textarea" disabled />
  </div>
);

export const Feedback = () => (
  <FormGroup validationState="success">
    <FormControl type="password" placeholder="Digite um valor" feedback />
  </FormGroup>
);

export const OnFocus = () => (
  <div>
    <FormControl placeholder="Digite um nome" onFocus={action('focus')} />
    <FormControl type="radio" onFocus={action('focus')} />
    <FormControl type="checkbox" onFocus={action('focus')} />
    <FormControl type="select" placeholder="Selecione" onFocus={action('focus')}>
      <SelectOption value="a">a</SelectOption>
      <SelectOption value="b">b</SelectOption>
    </FormControl>

    <FormControl type="textarea" onFocus={action('focus')} />
  </div>
);



export const OnChange = () => (
  <div>
    <FormControl placeholder="Digite um nome" onChange={action('change')} />
    <FormControl type="radio" onChange={action('change')} />
    <FormControl type="checkbox" onChange={action('change')} />
    <FormControl type="select" placeholder="selecione" onChange={action('change')}>
      <SelectOption value="a">a</SelectOption>
      <SelectOption value="b">b</SelectOption>
    </FormControl>

    <FormControl type="textarea" onChange={action('change')} />
  </div>
);



export const OnBlur = () => (
  <div>
    <FormControl placeholder="Digite um nome" onBlur={action('blur')} />
    <FormControl type="radio" onBlur={action('blur')} />
    <FormControl type="checkbox" onBlur={action('blur')} />
    <FormControl type="select" placeholder="selecione" onBlur={action('blur')}>
      <SelectOption value="a">a</SelectOption>
      <SelectOption value="b">b</SelectOption>
    </FormControl>

    <FormControl type="textarea" onBlur={action('blur')} />
  </div>
);



export const OnMask = () => {
  const handleMask = (value) => {
    return fieldsMask({ type: 'number' }, value);
  };
  return <FormControl placeholder="Digite um nome" onMask={handleMask} />;
};

export const OnValidation = withState({
  status: undefined,
  message: undefined,
  status2: undefined,
  message2: undefined,
})(({ store }) => {
  const handleValidate = (validation) => {
    store.set({ status: validation.validationState, message: validation.errorMessage });
  };

  const handleValidateTwo = (validation) => {
    store.set({ status2: validation.validationState, message2: validation.errorMessage });
  };

  return (
    <div>
      <FormGroup validationState={store.state.status}>
        <FormControlLabel
          label="Nome"
          placeholder="Digite um nome"
          onValidate={handleValidate}
          validate={[
            {
              rule: 'required',
              message: 'Campo obrigatório',
            },
            {
              rule: 'letter',
              message: 'Deve ser apenas letras',
            },
          ]}
        />
        {store.state.message && <FormHelpText>{store.state.message}</FormHelpText>}
      </FormGroup>
      <FormGroup validationState={store.state.status2}>
        <FormLabel>Nome:</FormLabel>
        <FormControl
          placeholder="Digite um nome"
          onValidate={handleValidateTwo}
          validate={[
            {
              rule: 'required',
              message: 'Campo obrigatório',
            },
            {
              rule: 'letter',
              message: 'Deve ser apenas letras',
            },
          ]}
        />
        <FormHelpText>
          {store.state.message2 ? store.state.message2 : 'Seja uma pessoa gentil e escreva aqui'}
        </FormHelpText>
      </FormGroup>
    </div>
  );
});
