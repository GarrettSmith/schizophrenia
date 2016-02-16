import Component from 'react-pure-render/component';
import React, {
  ListView,
  PropTypes,
  Text,
  View,
} from 'react-native';

import appStyles from '../../app/styles';

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    logging: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.entrySymptomsDataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => a.id !== b.id,
    });

    this.state = {
      entrySymptoms: this.calcEntrySymptoms(props.logging.newEntrySymptoms),
    };

    this.calcEntrySymptoms = this.calcEntrySymptoms.bind(this);
  }

  calcEntrySymptoms(entrySymptoms) {
    return this.entrySymptomsDataSource.cloneWithRows(entrySymptoms);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      entrySymptoms: this.calcEntrySymptoms(newProps.logging.newEntrySymptoms),
    });
  }

  render() {
    const {entrySymptoms} = this.state;

    return (
      <ListView
        dataSource={entrySymptoms}
        renderRow={es => <Text>{es.symptom.name}: {es.severity}</Text>}
      />
    );
  }

}
