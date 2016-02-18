import {COLORS} from '../../app/styles';

import Component from 'react-pure-render/component';
import React, {
  ListView,
  PropTypes,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import BaseHeader from '../../app/Header.react';
import {Icon} from 'react-native-material-design';

import {Actions as Routes} from 'react-native-router-flux';

const styles = {
  input: {
    flex: 1,
    paddingBottom: 6,
    paddingTop: 6,
    color: COLORS.BLACK,
    fontSize: 20,
  },

  list: {
    backgroundColor: COLORS.WHITE,
    elevation: 2,
  },

  row: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowIcon: {
    paddingRight: 24,
  },

  rowText: {
    color: COLORS.BLACK_DARK,
    fontSize: 16,
  },
};

export default class Header extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    logging: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.suggestionsDataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b,
    });

    this.state = {
      suggestions: this.calcSuggestions(props.logging.suggestedSymptoms),
    };

    this.addSymptom = this.addSymptom.bind(this);
    this.calcSuggestions = this.calcSuggestions.bind(this);
    this.data = this.data.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.save = this.save.bind(this);
  }

  calcSuggestions(suggestions) {
    return this.suggestionsDataSource.cloneWithRows(suggestions);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      suggestions: this.calcSuggestions(newProps.logging.suggestedSymptoms),
    });
  }

  data() {
    const ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
    return ds.cloneWithRows(this.props.logging.suggestedSymptoms);
  }

  save() {
    this.props.actions.logging.saveEntry();
    Routes.pop();
  }

  addSymptom(symptomId) {
    return () => {
      this.props.actions.logging.addSymptom(symptomId);
    };
  }

  render() {
    const {
      actions,
      logging,
    } = this.props;
    const {suggestions} = this.state;

    return (
      <View>
        <BaseHeader
          leftIcon="close"
          leftIconPress={Routes.pop}
          headerColor={COLORS.WHITE}
          iconColor={COLORS.DIM_DARK}
          rightIcon="done"
          rightIconPress={this.save}
        >
          <TextInput
            autoCapitalize="sentences"
            autoCorrect
            autoFocus
            placeholder="How are you?"
            underlineColorAndroid={COLORS.DIM_DARK}
            selectionColor={COLORS.SECONDARY}
            style={styles.input}
            onChangeText={actions.logging.enterSymptom}
            onSubmitEditing={actions.logging.addNewSymptom}
            value={logging.enteredSymptom}
          />
        </BaseHeader>

        {logging.enteredSymptom ?
          <ListView
            dataSource={suggestions}
            renderRow={this.renderRow}
            style={styles.list}
          /> : null}
      </View>
    );
  }

  renderRow(data) {
    const {actions} = this.props;

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(COLORS.DIM, false)}
        onPress={this.addSymptom(data.id)}
      >
        <View style={styles.row}>
          <Icon
            name="playlist-add"
            style={styles.rowIcon}
          />
          <Text style={styles.rowText}>
            {data.name}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
