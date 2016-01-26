import Component from '../components/Component.react';
import React, {PropTypes, Text, View} from 'react-native';
import appStyles from '../app/styles';
import MapView from 'react-native-maps';

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  render() {
    const {actions, msg} = this.props;

    return (
      <View style={appStyles.container}>
        <MapView
          style={appStyles.maps}
          initialRegion={{
            latitude: 37,
            longitude: -122,
            latitudeDelta: 0.09,
            longitudeDelta: 0.05,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 37,
              longitude: -122,
            }}
            title="Shit's going down"
            description="Werd"
            pinColor="green"
          />
        </MapView>
      </View>
    );
  }

}
