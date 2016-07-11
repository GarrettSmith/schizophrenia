import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Button,
  Fab,
  Icon,
  Input,
  List,
  ListHeader,
  ListItem,
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';
import {route} from '../../routes';
import {values} from 'ramda';

export default class Symptoms extends Component {

  static propTypes = {
    addNewSymptom: PropTypes.func.isRequired,
    addSymptom: PropTypes.func.isRequired,
    enterSymptom: PropTypes.func.isRequired,
    enteredSymptom: PropTypes.string,
    entrySymptoms: PropTypes.array.isRequired,
    suggestedSymptoms: PropTypes.array.isRequired,
    updateEntrySymptom: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.onChangeEnteredSymptom = this.onChangeEnteredSymptom.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderEntered = this.renderEntered.bind(this);
  }

  renderSuggestion(symptom) {
    const {addSymptom} = this.props;
    const icon = symptom.id ? "md-plus" : "md-file-plus";
    const onClick = () => addSymptom(symptom.id);
    return (
      <ListItem
        key={symptom.id}
        onClick={onClick}
        tappable
      >
        <div className="right">
          <Icon icon={icon} />
        </div>
        <div className="center">
          {symptom.name}
        </div>
      </ListItem>
    );
  }

  renderEntered(entrySymptom) {
    const {updateEntrySymptom} = this.props;
    const inputId = `input-${entrySymptom.id}`;
    const onChange = severity => updateEntrySymptom(severity, entrySymptom.id);
    ;
    return (
      <ListItem
        key={entrySymptom.id}
        modifier="longdivider"
      >
        <label className="left">
          <Input
            inputId={inputId}
            type="checkbox"
          />
        </label>
        <div className="center">
          <p>
            {entrySymptom.symptom.name}
          </p>
          <Nominal
            value={entrySymptom.severity}
            onChange={onChange}
          />
        </div>
      </ListItem>
    );
  }

  onChangeEnteredSymptom(event) {
    this.props.enterSymptom(event.target.value);
  }

  renderHeader() {
    const {enteredSymptom} = this.props;
    return (
      <ListHeader>
        <p>
          <Input
            onChange={this.onChangeEnteredSymptom}
            placeholder="Add a Symptom"
            value={enteredSymptom}
          />
        </p>
      </ListHeader>
    );
  }

  render() {
    const {
      entrySymptoms,
      enteredSymptom,
      suggestedSymptoms,
    } = this.props;
    const dataSource = enteredSymptom ? suggestedSymptoms : values(entrySymptoms);
    const renderRow = enteredSymptom ? this.renderSuggestion : this.renderEntered;

    return (
      <Page
        className="symptoms"
      >
        <List
          dataSource={dataSource}
          renderRow={renderRow}
          renderHeader={this.renderHeader}
        />
      </Page>
    );
  }

}
