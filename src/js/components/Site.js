'use strict';

var React = require('react');
var Router = require('react-router');
var GoogleAnalytics = require('react-g-analytics');
var mui = require('material-ui');
var alt = require('config/alt');
var UserActions = require('actions/UserActions');
var AppConstants = require('constants/AppConstants');
var RouteHandler = Router.RouteHandler;
import { supplyFluxContext } from 'alt-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
var toastr = require('toastr');
var pace = require('pace-js');

import {
  blue400, blue700, blueA400, black, pinkA400,
  lightBlack, darkBlack, grey900, cyan700, pinkA100,
  grey100, grey300, blue900, grey500, pinkA200,
  grey600, fullWhite, white
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: "#43C7D5",
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  appBar: {
    color: '#303030',
    textColor: white
  },
  raisedButton: {
    textColor: white,
    primaryTextColor: white,
    secondaryTextColor: white
  }
});

class Site extends React.Component {
  constructor(props) {
    super(props);
    UserActions.loadLocalUser();
  }

  componentWillMount() {
    pace.start({
      restartOnRequestAfter: 10 // ms
    });
    toastr.options.positionClass = "toast-bottom-left";
  }

  componentDidMount() {
  }

  render() {
    var YEAR = new Date().getFullYear();
    var copyright_years = AppConstants.YEAR;
    if (YEAR != AppConstants.YEAR) copyright_years = copyright_years + " - " + YEAR;
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <GoogleAnalytics id="UA-7713869-14" />
            <div>{this.props.children}</div>

            <div id="footer">
              MIT License. &copy; { copyright_years } { AppConstants.AUTHOR }<br/>
            </div>
          </div>
        </MuiThemeProvider>
    )
  }
};

// Important!
Site.childContextTypes = {
  muiTheme: React.PropTypes.object
};

var injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

export default supplyFluxContext(alt)(Site)