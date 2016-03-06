import {COLORS} from '../../app/styles';
import Component from 'react-pure-render/component';
import Slider from 'react-native-slider';
import React, {
  ListView,
  PropTypes,
  Text,
  View,
} from 'react-native';


const styles = {
  symptom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DIM,
    elevation: 1,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 0,
    paddingLeft: 12,
    backgroundColor: COLORS.WHITE,
  },

  sliderThumb: {
    backgroundColor: COLORS.SECONDARY,
    width: 12,
    height: 12,
  },

  sliderTrack: {
    height: 2,
  },
};

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
    this.renderRow = this.renderRow.bind(this);
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
        renderRow={this.renderRow}
        style={{backgroundColor: COLORS.DIM}}
      />
    );
  }

  renderRow(entrySymptom) {
    const {updateEntrySymptom} = this.props.actions.logging;

    const onChange = val => updateEntrySymptom(val, entrySymptom.id);

    return (
      <View style={styles.symptom}>
        <Text>
          {entrySymptom.symptom.name}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Slider
            maximumTrackTintColor={COLORS.DIM}
            maximumValue={10}
            minimumTrackTintColor={COLORS.SECONDARY}
            minimumValue={1}
            onValueChange={onChange}
            onSlidingComplete={onChange}
            style={{flex: 1}}
            thumbStyle={styles.sliderThumb}
            trackStyle={styles.sliderTrack}
            value={entrySymptom.severity}
          />
          <View style={{paddingLeft: 12, width: 30, flex: 0}}>
            <Text>
              {entrySymptom.severity}
            </Text>
          </View>
        </View>
      </View>
    );
  }

}
