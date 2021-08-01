/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

import moment from 'moment';

import { isMobile,
         calc100ViewportHeightMinus, 
         calcGivenPixelMinus,
         readableDateFormatWithTimeUpToSeconds } from 'src/components/helper/generalHelper';

import './styles.css'

// determin if the user has a possiblity to delete notifications entirely
const DELETE_POSSIBILITY_ACTIVATED = false;

const styles = theme => ({
  root: {
    marginBottom:30,
  },
});

// @connect((state) => {
//   return Object.assign({}, state, {
//     locale: state.intl.locale,
//     messages: state.intl.messages,
//     profile: state.reducer.profile,
//     notifications: state.reducer.notifications,
//   });
// }, (dispatch) => {
//   return {
//     readNotification: (id) => dispatch(readNotification(id)),
//     deleteNotification: (id) => dispatch(deleteNotification(id)),
//   };
// })
class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    store: PropTypes.any,
    locale: PropTypes.any,
    messages: PropTypes.any,
    notifications: PropTypes.any,
    profile: PropTypes.object,

    readNotification: PropTypes.func,
    deleteNotification: PropTypes.func,

    style: PropTypes.object,
  }

  calcElementHeightForPadding(padding) {
    // height of the element is handled differently in mobile because of the 
    // viewport height not beeing the same on desktop
    if (isMobile.any()) {
      // get the window dimensions
      let _height = document.documentElement.clientHeight || document.body.clientHeight;
      return calcGivenPixelMinus(_height,padding);
    } else {
      return calc100ViewportHeightMinus(padding);
    }
  }

  deleteNotificationForever(id) {
  }

  markNotificationAsRead(id) {
  }

  renderNotification(notification) {
    let { locale, messages } = this.props;
    let _time = (typeof locale === "string") ? moment(notification.timestamp).locale(locale).format(readableDateFormatWithTimeUpToSeconds) : moment(notification.timestamp).format(readableDateFormatWithTimeUpToSeconds);
    
    // set a different bg color for system type notifications
    let _typeNotificationClass = "";
    if ("type" in notification) {
      if (notification.type === "system") {
        _typeNotificationClass = "notifications-single-admin";
      }
    }

    return (
      <ListItem key={"notifications-single-"+notification.id} className={"list-group-item" + " notifications-single-"+notification.id + " " + _typeNotificationClass}>
        {/* different width parameters for the notification according to enabled buttons */}
        <div className={"notifications-single-info " + ((DELETE_POSSIBILITY_ACTIVATED) ? "notification-buttons-two" : "notification-buttons-one")}>
          <p className="list-group-item-text">{_time}</p>
          <h4 className="list-group-item-heading">{notification.message}</h4>
        </div>
        <div className="notifications-single-read" onClick={() => {this.markNotificationAsRead(notification.id)}}>
          <Tooltip key={"notifications-single-read-"+notification.id} title={<div>{messages["notifications.button.read"] || "Mark as read"}</div>}>
            <i className="si si-2x si-checkmark" />
          </Tooltip>
        </div>
        {(DELETE_POSSIBILITY_ACTIVATED) ? <div className="notifications-single-delete" onClick={() => {this.deleteNotificationForever(notification.id)}}>
                                            <Tooltip key={"notifications-single-delete-"+notification.id} title={<div>{messages["notifications.button.delete"] || "Delete"}</div>}>
                                              <i className="si si-2x si-x" />
                                            </Tooltip>
                                          </div> 
                                        : "" }
      </ListItem>
    );
  }

  render() {
    let { props: { locale, notifications, style, classes }, 
          state: { notificationsList } } = this;

    let _latestUpdate = (Number(notifications.timestamp) > 0) ? ((typeof _locale === "string") ? moment(Number(notifications.timestamp)).locale(locale).format(readableDateFormatWithTimeUpToSeconds) 
                                                                                               : moment(Number(notifications.timestamp)).format(readableDateFormatWithTimeUpToSeconds))
                                                              : "unavailable";

    return (
      <div className="notifications-page" className="keyframeAnim" style={{height:"100%", width:"100%", display:"block",verticalAlign:"top",overflow:"hidden",...style}}>
        <Grid container justify="center" className="notifications-page-wrapper" /*fluid*/>
          <Grid item xs={11} sm={11} md={8} lg={8} key="notifications-page-title"  className="notifications-page-title">
            <Badge badgeContent={(notifications.data != null ? notifications.data.length : "?")} color="primary" max={999}>
              <h1 className="notifications-page-title-wrapper"><FormattedMessage id={"notifications.title"}/></h1>
            </Badge>
          </Grid>
          <Grid container justify="center" className="notifications-page-notifications" style={{height:this.calcElementHeightForPadding(250), overflowY:"auto", overflowX:"hidden", WebkitOverflowScrolling:"touch"}}>
            <Grid item key="notifications-page-notifications-wrapper" className="notifications-page-notifications-wrapper" xs={11} sm={11} md={8} lg={8}>
              {(notifications.data != null && notifications.data.length > 0) ?
                <Paper className={classes.root}>
                  <List>
                    {notifications.data.map((item,index) => ([this.renderNotification(item),(index < notifications.data.length-1) ? <Divider key={"notification-divider-"+index} /> : ""]))}
                  </List>
                </Paper>
              : <p style={{textAlign:"center", marginTop:"20px"}}>{"--- "}<FormattedMessage id={"notifications.update.latest"}/>{" - "+_latestUpdate+" ---"}</p>
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state, {
    locale: state.intl.locale,
    messages: state.intl.messages,
    notifications: state.reducer.notifications,
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    // readNotification: (id) => dispatch(readNotification(id)),
    // deleteNotification: (id) => dispatch(deleteNotification(id)),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notifications));
/* eslint-enable */
