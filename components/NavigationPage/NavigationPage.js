// NavigationPage.js

'use strict';

import React, {Component, PropTypes} from 'react';
import {Platform, Navigator, View} from 'react-native';

import Theme from 'teaset/themes/Theme';
import BasePage from '../BasePage/BasePage';
import NavigationBar from '../NavigationBar/NavigationBar';
import KeyboardSpace from '../KeyboardSpace/KeyboardSpace';

export default class NavigationPage extends BasePage {

  static propTypes = {
    ...BasePage.propTypes,
    title: PropTypes.string,
    showBackButton: PropTypes.bool,
  };

  static defaultProps = {
    ...BasePage.defaultProps,
    scene: Navigator.SceneConfigs.PushFromRight,
    title: null,
    showBackButton: false,
  };

  buildProps() {
    super.buildProps();

    let {...others} = this.props;
    let pageContainerStyle = [{
      flex: 1,
      padding: 0,
      marginTop: Platform.OS === 'ios' ? 64 : 44,
    }];
    this.props = {pageContainerStyle, ...others};
  }

  renderNavigationTitle() {
    return this.props.title;
  }

  renderNavigationLeftView() {
    if (!this.props.showBackButton) return null;
    return (
      <NavigationBar.BackButton
        title={Theme.backButtonTitle}
        onPress={() => this.navigator.pop()}
        />
    );
  }

  renderNavigationRightView() {
    return null;
  }

  renderNavigationBar() {
    return (
      <NavigationBar 
        title={this.renderNavigationTitle()}
        leftView={this.renderNavigationLeftView()}
        rightView={this.renderNavigationRightView()}
        />
    );
  }

  renderPage() {
    return null;
  }

  render() {
    this.buildProps();
    
    let {autoKeyboardInsets, keyboardTopInsets, pageContainerStyle, ...others} = this.props;
    return (
      <View {...others}>
        <View style={{flex: 1}} >
          <View style={pageContainerStyle}>
            {this.renderPage()}
          </View>
          {this.renderNavigationBar()}
        </View>
        {autoKeyboardInsets ? <KeyboardSpace topInsets={keyboardTopInsets} /> : null}
      </View>
    );
  }


}
