import './AssociationList.scss';

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
import Header from '../../app/Header.react';
import Nominal from './Nominal.react';
import {route} from '../../routes';
import {isEmpty} from 'ramda';

export default class AssociationList extends Component {

  static propTypes = {
    association: PropTypes.object.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    filterPlaceholder: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    removeSelected: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderFiltered = this.renderFiltered.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  renderFiltered(item) {
    const {updateItem} = this.props;
    const icon = item.id ? "md-plus" : "md-file-plus";
    const onClick = () => updateItem({associationId: item.id});
    return (
      <ListItem
        key={item.id}
        onClick={onClick}
        tappable
      >
        <div className="right">
          <Icon icon={icon} />
        </div>
        <div className="center">
          {item.name}
        </div>
      </ListItem>
    );
  }

  onSelect(e) {
    this.props.select(e.target.checked, e.target.value);
  }

  renderSelected(item) {
    const {
      updateItem,
    } = this.props;

    const inputId = `input-${item.id}`;
    const onChange = severity => updateItem({...item, severity});

    return (
      <ListItem
        key={`${item.id}-${item.associationId}`}
        modifier="longdivider selected"
        tappable
      >
        <label className="left">
          <Input
            inputId={inputId}
            type="checkbox"
            checked={item.selected}
            onChange={this.onSelect}
            value={item.id}
          />
        </label>
        <div className="center">
          <span className="name">
            {item.association && item.association.name}
          </span>
          <Nominal
            value={item.severity}
            onChange={onChange}
          />
        </div>
      </ListItem>
    );
  }

  onChangeFilter(event) {
    this.props.onChangeFilter(event.target.value);
  }

  renderHeader() {
    const {
      association: {
        filter,
      },
      filterPlaceholder,
    } = this.props;
    return (
      <ListHeader>
        <p>
          <Input
            onChange={this.onChangeFilter}
            modifier="underbar"
            placeholder={filterPlaceholder}
            value={filter}
          />
        </p>
      </ListHeader>
    );
  }

  render() {
    const {
      association: {
        filter,
        selected,
        filteredAssociations,
        selectedEntryAssociations,
      },
      removeSelected,
    } = this.props;
    const dataSource = filter ? filteredAssociations : selectedEntryAssociations;
    const renderRow = filter ? this.renderFiltered : this.renderSelected;

    return (
      <Page
        className="association-list"
      >
        <List
          dataSource={dataSource}
          renderRow={renderRow}
          renderHeader={this.renderHeader}
        />

        {!isEmpty(selected) ? (
          <Fab
            onClick={removeSelected}
            position="bottom right"
          >
            <Icon icon="md-delete" />
          </Fab>
        ) : null}

      </Page>
    );
  }

}
