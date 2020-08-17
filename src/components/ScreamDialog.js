import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

//Redux
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.forms,
    invisibleSeperator: {
        border: "none",
        margin: 4,
    },
    profileImage: {
        maxWidth: 160,
        height: 160,
        borderRadius: "50%",
        objectFit: "cover",
    },
    DialogContent: {
        padding: 30,
    },
    closeButton: {
        position: "absolute",
        left: "90%",
    },
    expandButton: {
        position: "absolute",
        left: "90%",
    },
    spinnerDiv: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50
    }
});

class ScreamDialog extends Component {
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
            },
            UI: { loading },
        } = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={6}>
                <Grid item sm={5}>
                    <img
                        src={userImage}
                        alt="Profile"
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variat="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />
                    <Typography variant="body1">{body}</Typography>
                </Grid>
            </Grid>
        );
        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="expand scream"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="close"
                        onClick={this.handleClose}
                        btnClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI,
});

export default connect(mapStateToProps, { getScream })(
    withStyles(styles)(ScreamDialog)
);